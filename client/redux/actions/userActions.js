import { SET_USER, SET_UNAUTHENTICATED, CHANGE_PICTURE } from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getGroups } from "./groupActions";

export const loginUser = (userData) => (dispatch) => {
  //   dispatch({ type: LOADING_UI });
  console.log(userData);
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
      console.log(res.data);
      setAuthorizationHeader(res.data.token);
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
      dispatch(getGroups(res.data._id));
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
  console.log("NEW DATA: ", newData.settings.dontLogout);
  axios
    .put(`/${userId}`, {
      newData,
    })
    .then((res) => console.log("User po pucie: ", res.data))
    .catch((err) => console.log(err));

  if (newData.settings.dontLogout) {
    axios.put(`/refreshToken/${userId}`).catch((err) => console.log(err));
  }
};

// export const refreshToken = (userId) => (dispatch) => {};

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
  axios
    .post("/uploadImage", { userId, profilePicture })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: CHANGE_PICTURE,
        payload: res.data.profilePicture.url,
      });
    })
    .catch((err) => console.log(err));
};
