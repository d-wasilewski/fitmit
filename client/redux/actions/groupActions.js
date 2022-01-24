import {
  CREATE_GROUP,
  SET_GROUPS,
  CHANGE_GROUP_PICTURE,
  SET_LOADING_PICTURE,
  POPULATE_MEMBERS,
  ADD_USER_TO_GROUP,
  REMOVE_USER_FROM_GROUP,
} from "../types";
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

export const populateMembers = (members) => (dispatch) => {
  axios.put("/group/usersOfTheGroup", members).then((res) => {
    dispatch({
      type: POPULATE_MEMBERS,
      payload: res.data,
    });
  });
};

export const addMemberToGroup = (group, userId) => (dispatch) => {
  axios.post(`/group/${group._id}/${userId}`).then((res) => {
    dispatch(populateMembers({ members: res.data.members }));
  });
};

export const removeMemberFromGroup = (group, userId) => (dispatch) => {
  axios.delete(`/group/${group._id}/${userId}`).then((res) => {
    dispatch(populateMembers({ members: res.data.members }));
  });
};

export const changeGroupProfilePicture =
  (groupId, profilePicture) => (dispatch) => {
    dispatch({ type: SET_LOADING_PICTURE, payload: true });
    axios
      .post("/group/uploadImage", { groupId, profilePicture })
      .then((res) => {
        dispatch({
          type: CHANGE_GROUP_PICTURE,
          payload: res.data.profilePicture.url,
        });
        dispatch({ type: SET_LOADING_PICTURE, payload: false });
      })
      .catch((err) => console.log(err));
  };
