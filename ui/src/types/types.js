/** @module types */

import {
  any,
  arrayOf,
  bool,
  number,
  objectOf,
  oneOfType,
  shape,
  string
} from "prop-types";
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
    appearanceNotes: string,
    story: string,
    status: string,
    tuning: string,
    lastPlayed: oneOfType([string, objectOf(any)]),
    specs: arrayOf(
      shape({
        id: string,
        specType: string,
        specification: string,
        notes: string
      })
    ),
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
    instrumentType: "",
    noOfStrings: null,
    soundScape: "",
    color: "",
    appearanceNotes: "",
    story: "",
    status: "",
    tuning: "",
    lastPlayed: "",
    specs: [],
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
    notes: string
  }),
  defaults: {
    id: "",
    name: "",
    logo: "",
    notes: ""
  }
};

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

/*
 GALLERY TYPES
 ------------*/
/**
 * @const galleryImage
 */
export const galleryImage = {
  types: shape({
    image: string,
    capttion: string
  }),
  defaults: {
    image: "",
    caption: ""
  }
};

/**
 * @const galleryState
 * @description Types for galleryState Redux store
 */
export const galleryState = {
  types: shape({
    list: arrayOf(galleryImage.types),
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
