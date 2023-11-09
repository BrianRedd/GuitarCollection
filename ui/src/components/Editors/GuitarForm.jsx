import React from "react";

import {
  faCircleXmark,
  faGuitar
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { Formik } from "formik";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Form, FormGroup, Row } from "reactstrap";

import { InputSelectField, InputTextField } from "./InputFields";
import PurchaseHistory from "./PurchaseHistory";
import { guitarsValidationSchema } from "./data/validationSchemas";

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
        }
        return (
          <Form className="p-5">
            <FormGroup>
              <Row>
                <InputTextField name="name" required />
                <InputSelectField
                  name="make"
                  required
                  onChange={evt => {
                    formProps.setFieldValue("makeParent", evt?.target?.value);
                  }}
                  options={[...makeOptions, "Other"]}
                  width={formProps?.values?.make !== "Other" ? "wide" : ""}
                />
                <InputTextField
                  label="Other Make"
                  hidden={formProps?.values?.make !== "Other"}
                  name="makeOther"
                  onChange={evt => {
                    formProps.setFieldValue("makeParent", evt?.target?.value);
                  }}
                  required={formProps?.values?.make === "Other"}
                />
                <InputTextField name="makeParent" label="Maker Parent" />
                <InputTextField name="model" required />
                <InputTextField name="year" required />
                <InputTextField name="serialNo" label="S/N" required />
                <InputSelectField
                  name="countyOfOrigin"
                  label="Country of Origin"
                  required
                  options={[...countryOptions, "Other"]}
                  width={
                    formProps?.values?.countyOfOrigin !== "Other" ? "wide" : ""
                  }
                />
                <InputTextField
                  label="Other Country"
                  hidden={formProps?.values?.countyOfOrigin !== "Other"}
                  name="countyOfOriginOther"
                  required={formProps?.values?.countyOfOrigin === "Other"}
                />
              </Row>
              <PurchaseHistory writePurchaseHistory={writePurchaseHistory}/>
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
