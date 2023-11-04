/** @module store */

import { configureStore } from "@reduxjs/toolkit";

import guitarsReducer from "./slices/guitarsSlice";

const store = configureStore({
  reducer: { guitarsState: guitarsReducer }
});

export default store;
