import { SET_USER } from "../types";

const initialState = {
  authenticated: false,
  user: {
    name: "FICI",
  },
  test: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    //    case SET_AUTHENTICATED:
    //       return {
    //          ...state,
    //          authenticated: true,
    //       }

    //    case SET_UNAUTHENTICATED:
    //       return initialState
    case SET_USER:
      return {
        authenticated: true,
        user: action.payload,
      };

    default:
      return state;
  }
}
