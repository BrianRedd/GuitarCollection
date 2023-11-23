/** @module store */

import { configureStore } from "@reduxjs/toolkit";

import brandsReducer from "./slices/brandsSlice";
import galleryReducer from "./slices/gallerySlice";
import guitarsReducer from "./slices/guitarsSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    brandsState: brandsReducer,
    galleryState: galleryReducer,
    guitarsState: guitarsReducer,
    userState: userReducer
  }
});

export default store;
