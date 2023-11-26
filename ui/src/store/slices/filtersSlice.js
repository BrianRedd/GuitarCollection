/** @module filtersSlice */

import { createSlice } from "@reduxjs/toolkit";

import * as types from "../../types/types";

const initialState = types.filtersState.defaults;

const filtersSlice = createSlice({
  name: "filtersState",
  initialState,
  reducers: {
    writeFilter(state, action) {
      state.filter = action.payload;
    }
  }
});

export const { writeFilter } = filtersSlice.actions;

export default filtersSlice.reducer;
