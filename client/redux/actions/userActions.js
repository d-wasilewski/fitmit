import { SET_USER } from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  //   dispatch({ type: LOADING_UI });
  const { login: username, password } = userData;

  axios
    .post("/login", { username, password })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
      //   setAuthorizationHeader(res.data.token);
      //   dodac nawigacje po logowaniu
    })
    .catch((err) => console.log(err));
};

// export const getUserData = () => (dispatch) => {
//   //   dispatch({ type: LOADING_USER });
//   axios
//     .get("/user")
//     .then((res) => {
//       dispatch({
//         type: SET_USER,
//         payload: res.data,
//       });
//     })
//     .catch((err) => console.log(err));
// };
