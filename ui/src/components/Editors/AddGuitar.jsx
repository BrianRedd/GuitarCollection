import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addGuitar } from "../../store/slices/guitarsSlice";
import * as types from "../../types/types";

import { Box } from "@mui/system";
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
    <Box sx={{ width: "100%" }} className="p-4">
      <h1>Add Guitar</h1>
      <GuitarForm
        initialValues={initialValues}
        handleSubmit={(values, actions) => {
          const submissionValues = {
            ...values
          };
          dispatch(addGuitar(submissionValues)).then(() => {
            actions.resetForm(initialValues);
            navigate("/");
          });
        }}
        buttonText="Add Guitar"
      />
    </Box>
  );
};

export default AddGuitar;
