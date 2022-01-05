import { CREATE_GROUP, SET_GROUPS } from "../types";
import axios from "axios";

export const getGroups = (userId) => (dispatch) => {
  axios.get(`group/groupsByUserId/${userId}`).then((res) => {
    dispatch({
      type: SET_GROUPS,
      payload: res.data,
    });
  });
};

export const createGroup = (userId, name) => (dispatch) => {
  axios.post(`group/create/${userId}`, { name }).then((res) => {
    dispatch({
      type: CREATE_GROUP,
      payload: res.data,
    });
  });
};
