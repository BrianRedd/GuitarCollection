import React from "react";

import { Box } from "@mui/system";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "reactstrap";

import { getGuitars, updateGuitar } from "../../store/slices/guitarsSlice";
import * as types from "../../types/types";
import { DATE_FORMAT } from "../data/constants";

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
                ...values,
                lastPlayed: values.lastPlayed
                  ? moment(values.lastPlayed).format(DATE_FORMAT)
                  : ""
              };
              dispatch(updateGuitar(submissionValues)).then(() => {
                dispatch(getGuitars()).then(() => {
                  actions.resetForm(initialValues);
                  navigate(`/guitar/${values?._id ?? values?.name ?? ""}`);
                });
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
