/** @module store */

import { configureStore } from "@reduxjs/toolkit";

import brandsReducer from "./slices/brandsSlice";
import guitarsReducer from "./slices/guitarsSlice";

const store = configureStore({
  reducer: { guitarsState: guitarsReducer, brandsState: brandsReducer }
});

export default store;
