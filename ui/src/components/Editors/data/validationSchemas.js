/** @module validationSchemas */

import * as Yup from "yup";
// import { TEXT_REQUIRED } from "../../data/constants";

export const guitarsValidationSchema = Yup.object().shape({
  name: Yup.string().nullable(), //.required(TEXT_REQUIRED),
  make: Yup.string().nullable(), //.required(TEXT_REQUIRED),
  makeOther: Yup.string()
    .nullable()
    .when("make", {
      is: val => val === "Other",
      then: () => Yup.string().nullable() //.required(TEXT_REQUIRED)
    }),
  makeParent: Yup.string().nullable(),
  model: Yup.string().nullable(), //.required(TEXT_REQUIRED),
  year: Yup.string().nullable(), //.required(TEXT_REQUIRED),
  serialNo: Yup.string().nullable(), //.required(TEXT_REQUIRED),
  countyOfOrigin: Yup.string().nullable(), //.required(TEXT_REQUIRED),
  countyOfOriginOther: Yup.string()
    .nullable()
    .when("countyOfOrigin", {
      is: val => val === "Other",
      then: () => Yup.string().nullable() //.required(TEXT_REQUIRED)
    }),
  purchaseHistory: Yup.array().of(
    Yup.object().shape({
      ownershipStatus: Yup.string().nullable(),
      where: Yup.string().nullable(),
      when: Yup.string().nullable(),
      who: Yup.string().nullable(),
      amount: Yup.number().nullable()
    })
  )
});
