import { SET_GROUPS, CREATE_GROUP } from "../types";

const initialState = {
  groupList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_GROUP:
      return {
        groupList: [...state.groupList, action.payload],
      };
    case SET_GROUPS:
      return {
        groupList: action.payload,
      };

    default:
      return state;
  }
}
