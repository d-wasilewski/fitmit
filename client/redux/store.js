import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import groupReducer from "./reducers/groupReducers";
import eventReducer from "./reducers/eventReducers";

const middleware = [thunk];

const rootReducer = combineReducers({
  user: userReducer,
  groups: groupReducer,
  event: eventReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
