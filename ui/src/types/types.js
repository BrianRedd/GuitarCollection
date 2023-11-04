/** @module types */

import { arrayOf, bool, number, shape, string } from "prop-types";

/*
 GUITARS TYPES
 -------------*/
/**
 * @const guitar
 */
export const guitar = {
  types: shape({
    name: string,
    make: string,
    model: string,
    year: string,
    serialNo: string
  }),
  defaults: {
    name: "",
    make: "",
    model: "",
    year: "",
    serialNo: ""
  }
};

/**
 * @const guitarsState
 * @description Types for cardsState Redux store
 */
export const guitarsState = {
  types: shape({
    list: arrayOf(guitar.types),
    loading: bool,
    message: shape({
      type: string,
      text: string
    }),
    pagination: shape({
      order: string,
      orderBy: string,
      page: number,
      pageSize: number
    })
  }),
  defaults: {
    list: [],
    loading: false,
    message: {},
    pagination: {
      order: "asc",
      orderBy: "name",
      page: 0,
      pageSize: 5
    }
  }
};
