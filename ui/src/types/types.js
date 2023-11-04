/** @module types */

import { arrayOf, shape, string } from "prop-types";

/*
 GUITARS TYPES
 -------------*/
/**
 * @const guitar
 */
export const guitar = {
  types: shape({
    name: string,
    make: string
  }),
  defaults: {
    name: "",
    make: ""
  }
};

/**
 * @const guitarsState
 * @description Types for cardsState Redux store
 */
export const guitarsState = {
  types: shape({
    list: arrayOf(guitar.types)
  }),
  defaults: {
    list: []
  }
};
