import { SET_CURRENT_EVENTS, SET_EVENTS, CREATE_EVENT } from "../types";

const initialState = {
  eventList: [],
  currentEvents: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_EVENT:
      return {
        ...state,
        eventList: [...state.eventList, action.payload],
        currentEvents: [...state.currentEvents, action.payload],
      };
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
