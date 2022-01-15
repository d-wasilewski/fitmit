import { SET_EVENTS } from "../types";
import axios from "axios";

export const getEvents = (userId) => (dispatch) => {
  if (userId) {
    axios.get(`/${userId}/events`).then((res) => {
      dispatch({
        type: SET_EVENTS,
        payload: res.data,
      });
    });
  }
};

//   export const createGroup = (userId, name) => (dispatch) => {
//     axios.post(`group/create/${userId}`, { name }).then((res) => {
//       dispatch({
//         type: CREATE_GROUP,
//         payload: res.data,
//       });
//     });
//   };
