/** @module GuitarsReducer */

import * as actions from "../ActionTypes";
import * as types from "../../types/types";

/**
 * @constant guitarsState
 * @param {Object} state - guitars state object
 * @param {Object} action
 */
const cardsState = (state = types.guitarsState.defaults, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.ADD_GUITARS:
      return {
        ...state,
        list: payload
      };
    case actions.CLEAR_GUITARS:
      return {
        ...state,
        list: []
      };
    default:
      return state;
  }
};

export default cardsState;
