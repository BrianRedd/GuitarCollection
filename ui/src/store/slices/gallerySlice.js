/** @module gallerySlice */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import _ from "lodash";

import * as types from "../../types/types";
import { baseURL } from "../../utils/constants";

const initialState = types.galleryState.defaults;

/**
 * @function getGallery
 * @description Makes API call to retrieve gallery from DB
 */
export const getGallery = createAsyncThunk("gallery/getGallery", () => {
  return axios.get(`${baseURL}/getgallery`).then(response => {
    return response.data;
  });
});

/**
 * @function addGalleryImage
 * @description Makes API call add new brand to DB
 * @param {Object} brandObject
 */
export const addGalleryImage = createAsyncThunk("gallery/saveImage", brandObject => {
  return axios
    .post(`${baseURL}/saveimage`, brandObject, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(response => {
      console.log("addGalleryImage", response);
      return response.data;
    });
});

/**
 * @function updateGalleryImage
 * @description Makes API call update existing brand in DB
 * @param {Object} brandObject
 */
export const updateGalleryImage = createAsyncThunk(
  "gallery/updateimage",
  brandObject => {
    return axios
      .put(`${baseURL}/updateimage/${brandObject._id}`, brandObject, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        console.log("updateGalleryImage", response);
        return response;
      });
  }
);

/**
 * @function deleteGalleryImage
 * @description Makes API call remove existing brand from DB
 * @param {Object} brandObject
 */
export const deleteGalleryImage = createAsyncThunk(
  "gallery/deleteImage",
  brandObject => {
    return axios
      .delete(`${baseURL}/deleteimage/${brandObject._id}`, {
        data: brandObject
      })
      .then(response => {
        console.log("deleteGalleryImage", response);
        return response.data;
      });
  }
);

const gallerySlice = createSlice({
  name: "galleryState",
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
    builder.addCase(getGallery.pending, state => {
      state.loading = true;
    });
    builder.addCase(getGallery.fulfilled, (state, action) => {
      state.loading = false;
      state.list = _.orderBy(action.payload, "name");
      state.message = {
        type: "info",
        text: `${action.payload?.length} Gallery Image${
          action.payload?.length !== 1 ? "s" : ""
        } Loaded`
      };
    });
    builder.addCase(getGallery.rejected, (state, action) => {
      state.loading = false;
      state.list = [];
      state.message = {
        type: "danger",
        text: action.error.message
      };
    });
    // POST
    builder.addCase(addGalleryImage.pending, state => {
      state.loading = true;
    });
    builder.addCase(addGalleryImage.fulfilled, (state, action) => {
      state.loading = false;
      state.list = [{ ...action.payload, isNew: true }, ...state.list];
      state.message = {
        type: "success",
        text: `Image Successfully Added`
      };
    });
    builder.addCase(addGalleryImage.rejected, (state, action) => {
      state.loading = false;
      state.message = {
        type: "danger",
        text: action.error.message
      };
    });
    // PUT
    builder.addCase(updateGalleryImage.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateGalleryImage.fulfilled, (state, action) => {
      const list = state.list;
      const idx = list.map(item => item._id).indexOf(action.payload._id);
      list[idx] = action.payload;
      state.loading = false;
      state.list = list;
      state.message = {
        type: "success",
        text: `Image Successfully Updated`
      };
    });
    builder.addCase(updateGalleryImage.rejected, (state, action) => {
      state.loading = false;
      state.message = {
        type: "danger",
        text: action.error.message
      };
    });
    // DELETE
    builder.addCase(deleteGalleryImage.pending, state => {
      state.loading = true;
    });
    builder.addCase(deleteGalleryImage.fulfilled, (state, action) => {
      const list = state.list;
      const idx = list.map(item => item._id).indexOf(action.payload._id);
      list.splice(idx, 1);
      state.loading = false;
      state.list = list;
      state.message = {
        type: "success",
        text: `Image Successfully Deleted`
      };
    });
    builder.addCase(deleteGalleryImage.rejected, (state, action) => {
      state.loading = false;
      state.message = {
        type: "danger",
        text: action.error.message
      };
    });
  }
});

export const { clearMessage } = gallerySlice.actions;

export default gallerySlice.reducer;
