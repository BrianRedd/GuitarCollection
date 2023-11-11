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
    _.compact(guitars.map(guitar => guitar.countyOfOrigin))
  ).sort();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={guitarsValidationSchema}
    >
      {formProps => {
        const writePurchaseHistory = rows => {
          console.log("rows", rows);
          formProps.setFieldValue("purchaseHistory", rows);
        };
        return (
          <Form className="p-5">
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
                  required
                  options={countryOptions}
                />
                <InputTextField name="case" width="wide" />
              </Row>
              <PurchaseHistory writePurchaseHistory={writePurchaseHistory} />
            </FormGroup>
            <Row className="pt-5">
              <Col xs={0} md={6} />
              <Col xs={12} md={6} className="d-flex justify-content-start">
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
            {JSON.stringify(formProps?.values, null, 2)}
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
