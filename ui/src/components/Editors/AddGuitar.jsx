import React from "react";

import { Box } from "@mui/system";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as types from "../../types/types";

import { addGuitar } from "../../store/slices/guitarsSlice";
import { DATE_FORMAT } from "../data/constants";
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
            ...values,
            lastPlayed: values.lastPlayed
              ? moment(values.lastPlayed).format(DATE_FORMAT)
              : ""
          };
          dispatch(addGuitar(submissionValues)).then(response => {
            actions.resetForm(initialValues);
            navigate(`/guitar/${response?.payload?._id ?? values?.name ?? ""}`);
          });
        }}
        buttonText="Add Guitar"
      />
    </Box>
  );
};

export default AddGuitar;
