/** @module GuitarDetail */

import React from "react";

import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/system";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Col, Row } from "reactstrap";
import confirm from "reactstrap-confirm";

import { updateGuitar } from "../../store/slices/guitarsSlice";
import { DATE_FORMAT } from "../data/constants";
import PurchaseDetailTable from "./PurchaseDetailTable";

/**
 * @function GuitarDetail
 * @returns {React.ReactNode}
 */
const GuitarDetail = () => {
  const { id: matchId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const guitars = useSelector(state => state.guitarsState?.list) ?? [];
  const brands = useSelector(state => state.brandsState?.list) ?? [];

  const guitar =
    guitars.find(guitar => guitar._id === matchId || guitar.name === matchId) ??
    {};

  const brand = (brands ?? []).find(brand => brand.id === guitar.brandId) ?? {};

  const colWidth = width => {
    const xs = 12;
    let md = 0;
    let lg = 0;
    switch (width) {
      case "wide":
        md = 6;
        lg = 4;
        break;
      case "full":
        md = 12;
        lg = 12;
        break;
      default:
        md = 3;
        lg = 2;
    }
    return {
      xs,
      md,
      lg
    };
  };

  const DetailItem = ({ width = "", title = "", children }) => {
    const widthProps = colWidth(width);
    return (
      <Col {...widthProps} className="my-2">
        <b>{title}:</b> {children}
      </Col>
    );
  };

  return (
    <Box sx={{ width: "100%" }} className="p-4">
      {guitar?._id && matchId ? (
        <div className="d-flex w-100 justify-content-between">
          <h1>{guitar.name}</h1>
          <Button
            onClick={() => navigate(`/editguitar/${guitar._id}`)}
            variant="contained"
            disableElevation
            color="info"
          >
            <FontAwesomeIcon icon={faEdit} /> Edit
          </Button>
        </div>
      ) : (
        <Alert className="m-0" color={"danger"}>
          {matchId ?? "Guitar"} Not Found or Valid
        </Alert>
      )}
      <Row>
        <Col {...colWidth()}>
          <img
            src={`http://localhost:5000/brandLogos/${brand.logo}`}
            alt={brand.name}
          ></img>
        </Col>
        <Col>
          <Row>
            <DetailItem title="Status" width="wide">
              {guitar.status}
            </DetailItem>
            <DetailItem title="Tuning" width="wide">
              {guitar.tuning}
            </DetailItem>
            <Col {...colWidth("wide")}>
              <Button
                variant="contained"
                disableElevation
                color="success"
                onClick={async event => {
                  event.preventDefault();
                  const result = await confirm({
                    title: `Played ${guitar.name} today?`,
                    message: `Did you play ${guitar.name} today?`,
                    confirmColor: "success",
                    cancelColor: "link text-danger",
                    confirmText: "Yes!",
                    cancelText: "No"
                  });
                  if (result) {
                    dispatch(
                      updateGuitar({
                        ...guitar,
                        lastPlayed: moment().format(DATE_FORMAT)
                      })
                    );
                  }
                }}
              >
                Last Played: {guitar.lastPlayed || "N/A"}
              </Button>
            </Col>
          </Row>
          <Row>
            <DetailItem title="Model" width="wide">
              {guitar.model}
            </DetailItem>
            <DetailItem title="S/N">{guitar.serialNo}</DetailItem>
            <DetailItem title="Year">{guitar.year}</DetailItem>
            <DetailItem title="Country of Origin" width="wide">
              {guitar.countyOfOrigin}
            </DetailItem>
            <DetailItem title="Case" width="wide">
              {guitar.case}
            </DetailItem>
            <DetailItem title="Number of Strings" width="wide">
              {guitar.noOfStrings}
            </DetailItem>
            <DetailItem title="Sound Scape" width="wide">
              {guitar.soundScape}
            </DetailItem>
            <DetailItem title="Color" width="wide">
              {guitar.color}
            </DetailItem>
            <DetailItem title="Notes on Appearance" width="wide">
              {guitar.appearanceNotes}
            </DetailItem>
          </Row>
        </Col>
      </Row>
      <PurchaseDetailTable guitar={guitar} />
      <Row>
        <Col xs={12} className="mt-3">
          <b>Story: </b>
          <p>{guitar.story}</p>
        </Col>
      </Row>
    </Box>
  );
};

export default GuitarDetail;
