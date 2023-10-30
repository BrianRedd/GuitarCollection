/** @module configureStore */

import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import guitarsState from "./Reducers/GuitarsReducer";

const logger = createLogger({ collapsed: true, diff: true });

const ConfigureStore = () => {
  const storeTemplate = createStore(
    combineReducers({ guitarsState }),
    /* eslint-disable no-underscore-dangle */
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    /* eslint-enable no-underscore-dangle */
    applyMiddleware(thunk, logger)
  );
  return storeTemplate;
};

const store = ConfigureStore();

export default store;
