import { SET_USER, SET_UNAUTHENTICATED } from "../types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginUser = (userData) => (dispatch) => {
  //   dispatch({ type: LOADING_UI });
  const { login: username, password } = userData;

  axios
    .post("/login", { username, password })
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
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

const setAuthorizationHeader = async (token) => {
  const authToken = `Bearer ${token}`;
  try {
    await AsyncStorage.setItem("authToken", authToken);
  } catch (err) {
    console.log(err);
  }
  // axios.defaults.headers.common["Authorization"] = authToken;
};
