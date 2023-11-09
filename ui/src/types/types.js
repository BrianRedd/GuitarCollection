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
    make: string,
    makeOther: string,
    makeParent: string,
    makerLogo: string,
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
    story: string,
    specs: shape({
      instrumentType: string,
      noOfStrings: number,
      soundScape: string,
      color: string,
      material: shape({
        body: string,
        neck: string
      }),
      holeConfiguration: string,
      otherDetails: shape({
        detail: string
      })
    }),
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
    make: "",
    makeOther: "",
    makeParent: "",
    makerLogo: "",
    model: "",
    year: "",
    serialNo: "",
    countyOfOrigin: "",
    purchaseHistory: [],
    story: "",
    case: "",
    specs: {},
    tuning: "",
    status: "",
    lastPlayed: "",
    pictures: [],
    maintenance: []
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
      orderBy: DEFAULT_ORDER_BY,
      page: 0,
      pageSize: DEFAULT_PAGE_SIZE
    }
  }
};
