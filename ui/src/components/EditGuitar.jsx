import React from "react";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { updateGuitar } from "../redux/Actions/GuitarActions";

import { useSelector } from "react-redux";
import GuitarForm from "./GuitarForm";

/**
 * @function EditGuitar
 * @returns {React.ReactNode}
 */
const EditGuitar = () => {
  const dispatch = useDispatch();
  const { id: matchId } = useParams();

  const guitars = useSelector(state => state.guitarsState?.list) ?? [];

  const initialValues = guitars.find(
    guitar => guitar._id === matchId || guitar.name === matchId
  );

  return (
    <React.Fragment>
      {initialValues?._id && matchId ? (
        <GuitarForm
          initialValues={initialValues}
          handleSubmit={(values, actions) => {
            dispatch(updateGuitar(values)).then(() => {
              actions.resetForm(initialValues);
            });
          }}
          buttonText="Update Guitar"
        />
      ) : (
        <div>Entry ID invalid</div>
      )}
    </React.Fragment>
  );
};

export default EditGuitar;
