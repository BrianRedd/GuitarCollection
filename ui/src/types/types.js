/** @module types */

import { shape, string } from "prop-types";

/*
 GUITARS TYPES
 -------------*/
/**
 * @const guitar
 */
export const guitar = {
  types: shape({
    _id: string
  }),
  defaults: {
    _id: ""
  }
};

/**
 * @const guitarsState
 * @description Types for cardsState Redux store
 */
export const guitarsState = {
  types: shape({
    list: guitar.types
  }),
  defaults: {
    list: []
  }
};
