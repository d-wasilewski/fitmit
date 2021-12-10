import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";

const middleware = [thunk];

const rootReducer = combineReducers({ user: userReducer });

// const configureStore = () => {
//   return createStore(rootReducer, composeWithDevTools());
// };

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
