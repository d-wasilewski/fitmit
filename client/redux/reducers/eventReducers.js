import { SET_CURRENT_EVENTS, SET_EVENTS } from "../types";

const initialState = {
  eventList: [],
  currentEvents: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    //   case CREATE_GROUP:
    //     return {
    //       ...state,
    //       groupList: [...state.groupList, action.payload],
    //     };
    case SET_EVENTS:
      return {
        ...state,
        eventList: action.payload,
      };
    case SET_CURRENT_EVENTS:
      return {
        ...state,
        currentEvents: action.payload,
      };

    default:
      return state;
  }
}
