import {
  SET_GROUPS,
  CREATE_GROUP,
  SET_CURRENT_GROUP,
  CHANGE_GROUP_PICTURE,
  POPULATE_MEMBERS,
  ADD_USER_TO_GROUP,
} from "../types";

const initialState = {
  groupList: [],
  currentGroup: {},
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

    case ADD_USER_TO_GROUP:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          members: [...state.currentGroup.members, action.payload],
        },
      };

    case POPULATE_MEMBERS:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          members: action.payload,
        },
      };

    case CHANGE_GROUP_PICTURE:
      return {
        ...state,
        currentGroup: {
          ...state.currentGroup,
          profilePicture: {
            ...state.currentGroup.profilePicture,
            url: action.payload,
          },
        },
      };

    default:
      return state;
  }
}
