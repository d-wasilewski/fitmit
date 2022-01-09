import {
  SET_USER,
  SET_UNAUTHENTICATED,
  CHANGE_PICTURE,
  SET_AUTHENTICATED,
  SET_CURRENT_USER,
} from "../types";

const initialState = {
  authenticated: false,
  user: {},
  currentUser: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_USER:
      return {
        authenticated: true,
        user: action.payload,
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    case SET_UNAUTHENTICATED:
      return initialState;

    case CHANGE_PICTURE:
      return {
        ...state,
        user: {
          ...state.user,
          profilePicture: {
            ...state.user.profilePicture,
            url: action.payload,
          },
        },
      };

    default:
      return state;
  }
}
