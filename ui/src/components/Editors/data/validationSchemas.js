/** @module validationSchemas */

import * as Yup from "yup";
import { TEXT_REQUIRED } from "../../data/constants";

export const guitarsValidationSchema = Yup.object().shape({
  name: Yup.string().required(TEXT_REQUIRED),
  make: Yup.string().required(TEXT_REQUIRED),
  makeOther: Yup.string()
    .nullable()
    .when("make", {
      is: val => val === "Other",
      then: () => Yup.string().required(TEXT_REQUIRED)
    }),
  makeParent: Yup.string().nullable(),
  model: Yup.string().required(TEXT_REQUIRED),
  year: Yup.string().required(TEXT_REQUIRED),
  serialNo: Yup.string().required(TEXT_REQUIRED),
  countyOfOrigin: Yup.string().required(TEXT_REQUIRED),
  countyOfOriginOther: Yup.string()
    .nullable()
    .when("countyOfOrigin", {
      is: val => val === "Other",
      then: () => Yup.string().required(TEXT_REQUIRED)
    }),
  purchaseData: Yup.object().shape({
    ownershipStatus: Yup.string().required(TEXT_REQUIRED),
    where: Yup.string().nullable(),
    when: Yup.string().nullable(),
    who: Yup.string().nullable(),
    amount: Yup.number()
      .typeError(TEXT_REQUIRED)
      .required(TEXT_REQUIRED)
      .when("ownershipStatus", {
        is: val => val === "Gifted",
        then: () => Yup.number().nullable()
      })
  })
});
