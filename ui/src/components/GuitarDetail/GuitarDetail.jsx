/** @module GuitarDetail */

import React from "react";

import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Alert } from "reactstrap";

/**
 * @function GuitarDetail
 * @returns {React.ReactNode}
 */
const GuitarDetail = () => {
  const { id: matchId } = useParams();

  const guitars = useSelector(state => state.guitarsState?.list) ?? [];

  const guitar = guitars.find(
    guitar => guitar._id === matchId || guitar.name === matchId
  );

  return (
    <Box sx={{ width: "100%" }} className="p-4">
      {guitar?._id && matchId ? (
        <React.Fragment>
          <h1>{guitar.name}</h1>
          {JSON.stringify(guitar, null, 2)}
        </React.Fragment>
      ) : (
        <Alert className="m-0" color={"danger"}>
          {matchId ?? "Guitar"} Not Found or Valid
        </Alert>
      )}
    </Box>
  );
};

export default GuitarDetail;
