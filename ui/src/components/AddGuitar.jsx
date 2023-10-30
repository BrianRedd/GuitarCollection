import React from "react";

import { useDispatch } from "react-redux";

import { addGuitar } from "../redux/Actions/GuitarActions";
import * as types from "../types/types";

import GuitarForm from "./GuitarForm";

/**
 * @function AddGuitar
 * @returns {React.ReactNode}
 */
const AddGuitar = () => {
  const dispatch = useDispatch();
  const initialValues = types.guitar.defaults;

  return (
    <GuitarForm
      initialValues={initialValues}
      handleSubmit={(values, actions) => {
        dispatch(addGuitar(values)).then(() => {
          actions.resetForm(initialValues);
        });
      }}
      buttonText="Add Guitar"
    />
  );
};

export default AddGuitar;
