import {
  SET_USER,
  SET_UNAUTHENTICATED,
  CHANGE_PICTURE,
  SET_AUTHENTICATED,
  SET_CURRENT_USER,
  SET_LOADING_PICTURE,
} from "../types";

const initialState = {
  authenticated: false,
  user: {},
  currentUser: null,
  loading: false,
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
        ...state,
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

    case SET_LOADING_PICTURE:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
}
