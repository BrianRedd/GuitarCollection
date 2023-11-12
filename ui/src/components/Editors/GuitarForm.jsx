import React from "react";

import { faCircleXmark, faGuitar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { Formik } from "formik";
import _ from "lodash";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Form, FormGroup, Row } from "reactstrap";

import {
  COLOR_OPTION_DEFAULTS,
  COUNTRY_OPTION_DEFAULTS,
  INSTRUMENT_OPTION_DEFAULTS,
  SOUNDSCAPE_OPTION_DEFAULTS,
  STATUS_OPTION_DEFAULTS,
  TUNING_OPTION_DEFAULTS
} from "../data/constants";
import { guitarsValidationSchema } from "./data/validationSchemas";

import InputFreeFormField from "../common/InputFreeFormField";
import InputSelectField from "../common/InputSelectField";
import InputTextField from "../common/InputTextField";
import PurchaseHistory from "./PurchaseHistory";

/**
 * @function GuitarForm
 * @returns {React.ReactNode}
 */
const GuitarForm = props => {
  const { handleSubmit, initialValues, buttonText } = props;
  const navigate = useNavigate();

  const guitars = useSelector(state => state.guitarsState?.list) ?? [];
  const brands = useSelector(state => state.brandsState.list) ?? [];

  const countryOptions = _.uniq(
    _.compact([
      ...COUNTRY_OPTION_DEFAULTS,
      ...guitars.map(guitar => guitar.countyOfOrigin).sort()
    ])
  );
  const instrumentOptions = _.uniq(
    _.compact([
      ...INSTRUMENT_OPTION_DEFAULTS,
      ...guitars.map(guitar => guitar.instrumentType).sort()
    ])
  );
  const soundScapeOptions = _.uniq(
    _.compact([
      ...SOUNDSCAPE_OPTION_DEFAULTS,
      ...guitars.map(guitar => guitar.soundScape)
    ])
  ).sort();
  const colorOptions = _.uniq(
    _.compact([
      ...COLOR_OPTION_DEFAULTS,
      ...guitars.map(guitar => guitar.color)
    ])
  ).sort();
  const statusOptions = _.uniq(
    _.compact([
      ...STATUS_OPTION_DEFAULTS,
      ...guitars.map(guitar => guitar.status)
    ])
  ).sort();
  const tuningOptions = _.uniq(
    _.compact([
      ...TUNING_OPTION_DEFAULTS,
      ...guitars.map(guitar => guitar.tuning).sort()
    ])
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={guitarsValidationSchema}
    >
      {formProps => {
        const writePurchaseHistory = rows => {
          formProps.setFieldValue("purchaseHistory", rows);
        };
        return (
          <Form>
            <FormGroup>
              <Row>
                <InputTextField name="name" required />
                <InputSelectField
                  name="brandId"
                  label="Brand"
                  required
                  options={brands?.map(brand => ({
                    value: brand.id,
                    label: brand.name
                  }))}
                />
                <InputTextField name="model" required />
                <InputTextField name="serialNo" label="S/N" required />
                <InputTextField name="year" required />
                <InputFreeFormField
                  name="countyOfOrigin"
                  label="Country of Origin"
                  options={countryOptions}
                />
                <InputTextField name="case" width="wide" />
                <InputFreeFormField
                  name="instrumentType"
                  label="Instrument Type"
                  required
                  options={instrumentOptions}
                />
                <InputTextField
                  name="noOfStrings"
                  label="Number of Strings"
                  required
                  otherProps={{
                    type: "number"
                  }}
                />
                <InputFreeFormField
                  name="soundScape"
                  label="Sound Scape"
                  required
                  options={soundScapeOptions}
                  width="wide"
                />
                <InputFreeFormField
                  name="color"
                  required
                  options={colorOptions}
                  width="wide"
                />
                <InputTextField
                  name="appearanceNotes"
                  label="Notes on Appearance"
                  width="wide"
                />
              </Row>
              <PurchaseHistory writePurchaseHistory={writePurchaseHistory} />
              <Row>
                <InputTextField
                  name="story"
                  otherProps={{
                    multiline: true,
                    rows: 4
                  }}
                  width="full"
                />
              </Row>
              <Row>
                <InputFreeFormField
                  name="status"
                  required
                  options={statusOptions}
                  width="wide"
                />
                <InputFreeFormField
                  name="tuning"
                  options={tuningOptions}
                  width="wide"
                />
                <InputTextField
                  name="lastPlayed"
                  label="Last Played"
                  otherProps={{
                    type: "date",
                    InputLabelProps: { shrink: true }
                  }}
                />
              </Row>
            </FormGroup>
            <Row className="pt-5">
              <Col xs={0} md={6} />
              <Col xs={12} md={6} className="d-flex justify-content-end">
                <Button
                  onClick={formProps.handleSubmit}
                  variant="contained"
                  disableElevation
                  color="primary"
                  className="font-weight-bold"
                >
                  <FontAwesomeIcon icon={faGuitar} className="me-3" />
                  {buttonText}
                </Button>
                <Button
                  className="ms-2"
                  onClick={() => {
                    formProps.resetForm(initialValues);
                    navigate("/");
                  }}
                  variant="outlined"
                  color="secondary"
                >
                  <FontAwesomeIcon icon={faCircleXmark} className="me-3" />
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
};

GuitarForm.propTypes = {
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.objectOf(PropTypes.any),
  buttonText: PropTypes.string
};

GuitarForm.defaultTypes = {
  handleSubmit: () => {},
  initialValues: {},
  buttonText: ""
};

export default GuitarForm;
