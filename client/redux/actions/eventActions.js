import { SET_EVENTS, CREATE_EVENT } from "../types";
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

export const createEvent = (obj) => (dispatch) => {
  // TODO: handle bad input
  if (obj.date < new Date().getTime()) return;
  axios.post("/event/add", { event: obj }).then((res) => {
    dispatch({
      type: CREATE_EVENT,
      payload: res.data,
    });
  });
};
