import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addGuitar } from "../../store/slices/guitarsSlice";
import * as types from "../../types/types";

import GuitarForm from "./GuitarForm";

/**
 * @function AddGuitar
 * @returns {React.ReactNode}
 */
const AddGuitar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = types.guitar.defaults;

  return (
    <GuitarForm
      initialValues={initialValues}
      handleSubmit={(values, actions) => {
        console.log("values", values)
        const submissionValues = {
          ...values,
          make: values.make !== "Other" ? values.make : values.makeOther,
          makeOther: null,
          countyOfOrigin: values.countyOfOrigin !== "Other" ? values.countyOfOrigin : values.countyOfOriginOther,
          countyOfOriginOther: null
        };
        dispatch(addGuitar(submissionValues)).then(() => {
          actions.resetForm(initialValues);
          navigate("/");
        });
      }}
      buttonText="Add Guitar"
    />
  );
};

export default AddGuitar;
