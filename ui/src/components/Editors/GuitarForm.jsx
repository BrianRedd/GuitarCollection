import React from "react";

import { faCircleXmark, faGuitar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { Formik } from "formik";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Form, FormGroup, Row } from "reactstrap";

import { guitarsValidationSchema } from "./data/validationSchemas";

import InputFreeFormField from "../common/InputFreeFormField";
import InputTextField from "../common/InputTextField";
import PurchaseHistory from "./PurchaseHistory";

/**
 * @function GuitarForm
 * @returns {React.ReactNode}
 */
const GuitarForm = props => {
  const { handleSubmit, initialValues, buttonText } = props;

  const guitars = useSelector(state => state.guitarsState?.list) ?? [];

  const navigate = useNavigate();

  const makeOptions = _.uniq(
    _.compact(guitars.map(guitar => guitar.make))
  ).sort();
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
                <InputFreeFormField
                  name="make"
                  required
                  onChange={value => {
                    formProps.setFieldValue("makeParent", value);
                  }}
                  options={makeOptions}
                />
                <InputTextField name="makeParent" label="Maker Parent" />
                <div className="mb-3">
                  <label htmlFor="makeLogo" className="form-label">
                    Select Image
                  </label>
                  <input
                    type="file"
                    name="makeLogo"
                    className="form-control form-control-lg"
                    onChange={event => {
                      console.log("currentTarget", event.currentTarget.files);
                      formProps.setFieldValue(
                        "makeLogo",
                        event.currentTarget.files[0]
                      );
                    }}
                    required
                  />
                </div>
                <InputTextField name="model" required />
                <InputTextField name="year" required />
                <InputTextField name="serialNo" label="S/N" required />
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

export default GuitarForm;
