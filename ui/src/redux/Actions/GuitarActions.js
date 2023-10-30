/** @module GuitarActions */

import axios from "axios";
import { baseURL } from "../../utils/constants";
import * as actionTypes from "../ActionTypes";

/**
 * @function addGuitars
 * @description adds guitarsState.list
 * @param {Array} guitars
 */
export const addGuitars = guitars => ({
  type: actionTypes.ADD_GUITARS,
  payload: guitars
});

/**
 * @function clearGuitars
 * @description Clears guitarsState.list
 */
export const clearGuitars = () => ({
  type: actionTypes.CLEAR_GUITARS
});

/**
 * @function getGuitars
 * @description Makes API call to retrieve guitars from DB
 */
export const getGuitars = () => dispatch => {
  return axios
    .get(`${baseURL}/get`)
    .then(response => response.data)
    .then(response => {
      dispatch(addGuitars(response));
    })
    .catch(error => {
      console.error(error);
      dispatch(clearGuitars());
    });
};

/**
 * @function addGuitar
 * @description Makes API call add new guitar to DB
 * @param {Object} guitarObject
 */
export const addGuitar = guitarObject => dispatch => {
  return axios
    .post(`${baseURL}/save`, guitarObject)
    .then(response => response.data)
    .then(() => {
      dispatch(getGuitars());
    })
    .catch(error => {
      console.error(error);
    });
};

/**
 * @function updateGuitar
 * @description Makes API call update existing guitar in DB
 * @param {Object} guitarObject
 */
export const updateGuitar = guitarObject => dispatch => {
  console.log("guitarObject", guitarObject);
  return axios
    .put(`${baseURL}/update/${guitarObject._id}`, guitarObject)
    .then(response => response.data)
    .then(() => {
      dispatch(getGuitars());
    })
    .catch(error => {
      console.error(error);
    });
};

/**
 * @function removeGuitar
 * @description Makes API call remove existing guitar from DB
 * @param {string} id
 */
export const removeGuitar = id => dispatch => {
  return axios
    .delete(`${baseURL}/delete/${id}`)
    .then(response => response.data)
    .then(() => {
      dispatch(getGuitars());
    })
    .catch(error => {
      console.error(error);
    });
};
