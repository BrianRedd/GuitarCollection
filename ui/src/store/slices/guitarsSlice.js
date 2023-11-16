/** @module guitarsSlice */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import * as types from "../../types/types";
import { baseURL } from "../../utils/constants";

const initialState = types.guitarsState.defaults;

/**
 * @function getGuitars
 * @description Makes API call to retrieve guitars from DB
 */
export const getGuitars = createAsyncThunk("guitars/getGuitars", () => {
  return axios.get(`${baseURL}/get`).then(response => {
    return response.data;
  });
});

/**
 * @function addGuitar
 * @description Makes API call add new guitar to DB
 * @param {Object} guitarObject
 */
export const addGuitar = createAsyncThunk("guitars/addGuitar", guitarObject => {
  return axios.post(`${baseURL}/save`, guitarObject).then(response => {
    console.log("addGuitar", response);
    return response.data;
  });
});

/**
 * @function updateGuitar
 * @description Makes API call update existing guitar in DB
 * @param {Object} guitarObject
 */
export const updateGuitar = createAsyncThunk(
  "guitars/updateGuitar",
  guitarObject => {
    console.log("guitarObject", guitarObject);
    return axios
      .put(`${baseURL}/update/${guitarObject._id}`, guitarObject)
      .then(response => {
        console.log("updateGuitar", response);
        return {
          ...response.data,
          ...guitarObject
        };
      });
  }
);

/**
 * @function removeGuitar
 * @description Makes API call remove existing guitar from DB
 * @param {string} id
 */
export const removeGuitar = createAsyncThunk("guitars/removeGuitar", id => {
  return axios.delete(`${baseURL}/delete/${id}`).then(response => {
    console.log("removeGuitar", response);
    return response.data;
  });
});

const guitarsSlice = createSlice({
  name: "guitarsState",
  initialState,
  reducers: {
    clearMessage(state, action) {
      state.message = {};
    },
    updatePagination(state, action) {
      state.pagination = {
        ...state.pagination,
        ...action.payload
      };
    }
  },
  extraReducers: builder => {
    // GET
    builder.addCase(getGuitars.pending, state => {
      state.loading = true;
    });
    builder.addCase(getGuitars.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
      state.message = {
        type: "info",
        text: `${action.payload?.length} Guitar${
          action.payload?.length !== 1 ? "s" : ""
        } Loaded`
      };
    });
    builder.addCase(getGuitars.rejected, (state, action) => {
      state.loading = false;
      state.list = [];
      state.message = {
        type: "danger",
        text: action.error.message
      };
    });
    // POST
    builder.addCase(addGuitar.pending, state => {
      state.loading = true;
    });
    builder.addCase(addGuitar.fulfilled, (state, action) => {
      state.loading = false;
      state.list = [{ ...action.payload, isNew: true }, ...state.list];
      state.message = {
        type: "success",
        text: `Guitar ${action.payload.name} Successfully Added`
      };
    });
    builder.addCase(addGuitar.rejected, (state, action) => {
      state.loading = false;
      state.message = {
        type: "danger",
        text: action.error.message
      };
    });
    // PUT
    builder.addCase(updateGuitar.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateGuitar.fulfilled, (state, action) => {
      const list = state.list;
      const idx = list.map(item => item._id).indexOf(action.payload._id);
      list[idx] = action.payload;
      state.loading = false;
      state.list = list;
      state.message = {
        type: "success",
        text: `Guitar ${action.payload.name} Successfully Updated`
      };
    });
    builder.addCase(updateGuitar.rejected, (state, action) => {
      state.loading = false;
      state.message = {
        type: "danger",
        text: action.error.message
      };
    });
    // DELETE
    builder.addCase(removeGuitar.pending, state => {
      state.loading = true;
    });
    builder.addCase(removeGuitar.fulfilled, (state, action) => {
      const list = state.list;
      const idx = list.map(item => item._id).indexOf(action.payload._id);
      list.splice(idx, 1);
      state.loading = false;
      state.list = list;
      state.message = {
        type: "success",
        text: `Guitar ${action.payload.name} Successfully Deleted`
      };
    });
    builder.addCase(removeGuitar.rejected, (state, action) => {
      state.loading = false;
      state.message = {
        type: "danger",
        text: action.error.message
      };
    });
  }
});

export const { clearMessage, updatePagination } = guitarsSlice.actions;

export default guitarsSlice.reducer;
