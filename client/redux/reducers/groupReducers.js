import { SET_GROUPS, CREATE_GROUP, SET_CURRENT_GROUP } from "../types";

const initialState = {
  groupList: [],
  currentGroup: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_GROUP:
      return {
        ...state,
        groupList: [...state.groupList, action.payload],
      };
    case SET_GROUPS:
      return {
        ...state,
        groupList: action.payload,
      };
    case SET_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: action.payload,
      };

    default:
      return state;
  }
}
