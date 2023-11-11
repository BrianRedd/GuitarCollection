/** @module types */

import { arrayOf, bool, number, shape, string } from "prop-types";
import {
  DEFAULT_ORDER_BY,
  DEFAULT_PAGE_SIZE
} from "../components/data/constants";

/*
 GUITARS TYPES
 -------------*/
/**
 * @const guitar
 */
export const guitar = {
  types: shape({
    name: string,
    brandId: string,
    model: string,
    year: string,
    serialNo: string,
    countyOfOrigin: string,
    purchaseHistory: arrayOf(
      shape({
        id: string,
        ownershipStatus: string,
        where: string,
        when: string,
        who: string,
        amount: string,
        notes: string
      })
    ),
    case: string,
    instrumentType: string,
    noOfStrings: number,
    soundScape: string,
    color: string,
    specs: arrayOf(
      shape({
        id: string,
        specType: string,
        specification: string,
        notes: string
      })
    ),
    story: string,
    tuning: string,
    status: string,
    lastPlayed: string,
    pictures: arrayOf(
      shape({
        title: string,
        fileName: string
      })
    ),
    maintenance: arrayOf(
      shape({
        id: string,
        type: string,
        date: string,
        whoBy: string,
        cost: string,
        notes: string
      })
    )
  }),
  defaults: {
    name: "",
    brandId: "",
    model: "",
    year: "",
    serialNo: "",
    countyOfOrigin: "",
    purchaseHistory: [],
    case: "",
    instrumentType: string,
    noOfStrings: number,
    soundScape: string,
    color: string,
    story: "",
    specs: [],
    tuning: "",
    status: "",
    lastPlayed: "",
    pictures: [],
    maintenance: []
  }
};

/**
 * @const guitarsState
 * @description Types for guitarsState Redux store
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
      orderBy: DEFAULT_ORDER_BY,
      page: 0,
      pageSize: DEFAULT_PAGE_SIZE
    }
  }
};

/*
 BRANDS TYPES
 ------------*/
/**
 * @const brand
 */
export const brand = {
  types: shape({
    id: string,
    name: string,
    logo: string,
    parent: string
  }),
  defaults: {
    id: "",
    name: "",
    logo: "",
    parent: ""
  }
}

/**
 * @const brandsState
 * @description Types for brandsState Redux store
 */
export const brandsState = {
  types: shape({
    list: arrayOf(brand.types),
    loading: bool,
    message: shape({
      type: string,
      text: string
    })
  }),
  defaults: {
    list: [],
    loading: false,
    message: {}
  }
};
