import {
  SET_USER,
  SET_UNAUTHENTICATED,
  SET_LOADING_PICTURE,
  CHANGE_PICTURE,
} from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getGroups } from "./groupActions";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { getEvents } from "./eventActions";

export const loginUser = (userData) => (dispatch) => {
  const { login: username, password, checkboxState } = userData;

  axios
    .post("/login", { username, password, checkboxState })
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
      dispatch(getGroups(res.data._id));
      dispatch(getEvents(res.data._id));
      registerForPushNotificationsAsync().then((pushToken) =>
        dispatch(
          updateUserData(res.data._id, { userId: res.data._id, pushToken })
        )
      );
    })
    .catch((err) => console.log(err));
};

export const registerUser = (userData) => (dispatch) => {
  const { login, email, password } = userData;

  axios
    .post("/register", {
      username: login,
      email,
      password,
    })
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
      dispatch(getGroups(res.data._id));
      dispatch(getEvents(res.data._id));
      registerForPushNotificationsAsync().then((pushToken) =>
        dispatch(
          updateUserData(res.data._id, { userId: res.data._id, pushToken })
        )
      );
    })
    .catch((err) => console.log(err));
};

export const logoutUser = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem("authToken");
  } catch (e) {
    console.log(e);
  }
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = (userId) => (dispatch) => {
  //   dispatch({ type: LOADING_USER });
  axios
    .get(`${userId}`)
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const updateUserData = (userId, newData) => (dispatch) => {
  console.log("NEW DATA: ", newData);
  axios
    .put(`/${userId}`, {
      newData,
    })
    .then((res) => console.log("User po pucie: ", res.data))
    .catch((err) => console.log(err));

  if (newData?.settings?.dontLogout) {
    axios.put(`/refreshToken/${userId}`).catch((err) => console.log(err));
  }
};

const setAuthorizationHeader = async (token) => {
  const authToken = `Bearer ${token}`;
  try {
    await AsyncStorage.setItem("authToken", authToken);
  } catch (err) {
    console.log(err);
  }
  // axios.defaults.headers.common["Authorization"] = authToken;
};

export const changeProfilePicture = (userId, profilePicture) => (dispatch) => {
  dispatch({ type: SET_LOADING_PICTURE, payload: true });
  axios
    .post("/uploadImage", { userId, profilePicture })
    .then((res) => {
      dispatch({ type: SET_LOADING_PICTURE, payload: false });
      dispatch({
        type: CHANGE_PICTURE,
        payload: res.data.profilePicture.url,
      });
    })
    .catch((err) => console.log(err));
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
