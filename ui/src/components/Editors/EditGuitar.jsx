import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { updateGuitar } from "../../store/slices/guitarsSlice";
import * as types from "../../types/types";

import { Box } from "@mui/system";
import { Alert } from "reactstrap";
import GuitarForm from "./GuitarForm";

/**
 * @function EditGuitar
 * @returns {React.ReactNode}
 */
const EditGuitar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: matchId } = useParams();

  const guitars = useSelector(state => state.guitarsState?.list) ?? [];

  const initialValues = {
    ...types.guitar.defaults,
    ...guitars.find(guitar => guitar._id === matchId || guitar.name === matchId)
  };

  return (
    <Box sx={{ width: "100%" }} className="p-4">
      {initialValues?._id && matchId ? (
        <React.Fragment>
          <h1>Edit {initialValues.name ?? "Guitar"}</h1>
          <GuitarForm
            initialValues={initialValues}
            handleSubmit={(values, actions) => {
              const submissionValues = {
                ...values
              };
              dispatch(updateGuitar(submissionValues)).then(() => {
                actions.resetForm(initialValues);
                navigate("/");
              });
            }}
            buttonText="Update Guitar"
          />
        </React.Fragment>
      ) : (
        <Alert className="m-0" color={"danger"}>
          {matchId ?? "Item"} Not Found or Valid
        </Alert>
      )}
    </Box>
  );
};

export default EditGuitar;
