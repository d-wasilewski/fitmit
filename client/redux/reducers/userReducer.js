import {
  SET_USER,
  SET_UNAUTHENTICATED,
  CHANGE_PICTURE,
  SET_AUTHENTICATED,
  SET_CURRENT_USER,
  SET_LOADING_PICTURE,
  SET_LOCATION,
  SET_FIRST_TIME_MESSAGE,
  SET_ERROR_MESSAGE,
  CLEAR_ERROR,
} from "../types";

const initialState = {
  authenticated: false,
  user: {},
  currentUser: null,
  loading: false,
  location: {},
  firstTime: false,
  error: null,
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

    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };

    case SET_FIRST_TIME_MESSAGE:
      return {
        ...state,
        firstTime: true,
      };

    case SET_ERROR_MESSAGE:
      return {
        ...state,
        error: "Something went wrong",
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}
