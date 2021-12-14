import { SET_USER, SET_UNAUTHENTICATED } from "../types";

const initialState = {
  authenticated: false,
  user: {},
  test: true,
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

    default:
      return state;
  }
}
