/** @module brandsSlice */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

import * as types from "../../types/types";
import { baseURL } from "../../utils/constants";

const initialState = types.brandsState.defaults;

/**
 * @function getBrands
 * @description Makes API call to retrieve brands from DB
 */
export const getBrands = createAsyncThunk("brands/getBrands", () => {
  return axios.get(`${baseURL}/getbrands`).then(response => {
    return response.data;
  });
});

/**
 * @function addBrand
 * @description Makes API call add new brand to DB
 * @param {Object} brandObject
 */
export const addBrand = createAsyncThunk("brands/saveBrand", brandObject => {
  return axios
    .post(`${baseURL}/savebrand`, brandObject, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(response => {
      console.log("addBrand", response);
      return response.data;
    });
});

/**
 * @function updateBrand
 * @description Makes API call update existing guitar in DB
 * @param {Object} brandObject
 */
export const updateBrand = createAsyncThunk(
  "brands/updatebrand",
  brandObject => {
    console.log("brandObject", brandObject);
    return axios
      .put(`${baseURL}/updatebrand/${brandObject._id}`, brandObject, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log("updateBrand", response);
        return response;
      });
  }
);

/**
 * @function deleteBrand
 * @description Makes API call remove existing guitar from DB
 * @param {string} id
 */
export const deleteBrand = createAsyncThunk("brands/deleteBrand", id => {
  return axios.delete(`${baseURL}/deletebrand/${id}`).then(response => {
    console.log("deleteBrand", response);
    return response.data;
  });
});

const brandsSlice = createSlice({
  name: "brandsState",
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
    builder.addCase(getBrands.pending, state => {
      state.loading = true;
    });
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.loading = false;
      state.list = _.orderBy(action.payload, "id");
      state.message = {
        type: "info",
        text: `${action.payload?.length} Brand${
          action.payload?.length !== 1 ? "s" : ""
        } Loaded`
      };
    });
    builder.addCase(getBrands.rejected, (state, action) => {
      state.loading = false;
      state.list = [];
      state.message = {
        type: "danger",
        text: action.error.message
      };
    });
    // POST
    builder.addCase(addBrand.pending, state => {
      state.loading = true;
    });
    builder.addCase(addBrand.fulfilled, (state, action) => {
      state.loading = false;
      state.list = [{ ...action.payload, isNew: true }, ...state.list];
      state.message = {
        type: "success",
        text: `${action.payload.name} Successfully Added`
      };
    });
    builder.addCase(addBrand.rejected, (state, action) => {
      state.loading = false;
      state.message = {
        type: "danger",
        text: action.error.message
      };
    });
    // PUT
    builder.addCase(updateBrand.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateBrand.fulfilled, (state, action) => {
      const list = state.list;
      const idx = list.map(item => item._id).indexOf(action.payload._id);
      list[idx] = action.payload;
      state.loading = false;
      state.list = list;
      state.message = {
        type: "success",
        text: `${action.payload.name} Successfully Updated`
      };
    });
    builder.addCase(updateBrand.rejected, (state, action) => {
      state.loading = false;
      state.message = {
        type: "danger",
        text: action.error.message
      };
    });
    // DELETE
    builder.addCase(deleteBrand.pending, state => {
      state.loading = true;
    });
    builder.addCase(deleteBrand.fulfilled, (state, action) => {
      const list = state.list;
      const idx = list.map(item => item._id).indexOf(action.payload._id);
      list.splice(idx, 1);
      state.loading = false;
      state.list = list;
      state.message = {
        type: "success",
        text: `${action.payload.name} Successfully Deleted`
      };
    });
    builder.addCase(deleteBrand.rejected, (state, action) => {
      state.loading = false;
      state.message = {
        type: "danger",
        text: action.error.message
      };
    });
  }
});

export const { clearMessage } = brandsSlice.actions;

export default brandsSlice.reducer;
