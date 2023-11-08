import React from "react";

import { faCircleXmark, faGuitar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import { Formik } from "formik";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { Col, Form, FormGroup, Row } from "reactstrap";

import { useSelector } from "react-redux";
import { OWNERSHIP_STATUS_OPTIONS } from "../data/constants";
import { InputSelectField, InputTextField } from "./InputFields";
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

  console.log("makeOptions", makeOptions, "countryOptions", countryOptions);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={guitarsValidationSchema}
    >
      {formProps => {
        const getAcquisitionLabel = () => {
          switch (formProps?.values?.purchaseData?.ownershipStatus) {
            case "Sold":
            case "Gifted":
              return `${formProps?.values?.purchaseData?.ownershipStatus} To`;
            default:
              return "Acquired";
          }
        };
        const getAmountLabel = () => {
          switch (formProps?.values?.purchaseData?.ownershipStatus) {
            case "Sold":
              return "Sold For";
            default:
              return "Amount Paid";
          }
        };
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
                  wide={formProps?.values?.make !== "Other" ? "wide" : ""}
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
                <InputTextField
                  name="makeParent"
                  label="Maker Parent"
                  hidden={!formProps?.values?.make}
                />
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
              <Row>
                <InputSelectField
                  name="purchaseData.ownershipStatus"
                  label="Ownership Status"
                  required
                  options={OWNERSHIP_STATUS_OPTIONS}
                  defaultValue={OWNERSHIP_STATUS_OPTIONS[0]}
                />
                <InputTextField
                  name="purchaseData.where"
                  label={`Where ${getAcquisitionLabel()}`}
                  width="wide"
                />
                <InputTextField
                  name="purchaseData.when"
                  label={`When ${getAcquisitionLabel()}`}
                />
                <InputTextField
                  name="purchaseData.who"
                  label={`Who ${getAcquisitionLabel()}`}
                />
                <InputTextField
                  name="purchaseData.amount"
                  label={getAmountLabel()}
                  type="number"
                  prefix="$"
                  hidden={
                    formProps?.values?.purchaseData.ownershipStatus === "Gifted"
                  }
                />
              </Row>
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
          </Form>
        );
      }}
    </Formik>
  );
};

export default GuitarForm;
