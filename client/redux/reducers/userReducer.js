import { SET_USER, SET_UNAUTHENTICATED, CHANGE_PICTURE } from "../types";

const initialState = {
  authenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    //    case SET_AUTHENTICATED:
    //       return {
    //          ...state,
    //          authenticated: true,
    //       }
    case SET_USER:
      return {
        authenticated: true,
        user: action.payload,
      };

    case SET_UNAUTHENTICATED:
      return initialState;

    case CHANGE_PICTURE:
      return {
        ...state,
        user: {
          ...state.user, profilePicture: {
            ...state.user.profilePicture, url: action.payload
          }
        }
      }


    default:
      return state;
  }
}
