import React from "react";

import { faCircleXmark, faGuitar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-ui/core";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { Col, Form, FormGroup, Row } from "reactstrap";

import InputTextField from "./InputTextField";

/**
 * @function GuitarForm
 * @returns {React.ReactNode}
 */
const GuitarForm = props => {
  const { handleSubmit, initialValues, buttonText } = props;
  const navigate = useNavigate();

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {formProps => (
        <Form className="p-5">
          <FormGroup>
            <Row>
              <Col>
                <InputTextField name="name" />
              </Col>
              <Col>
                <InputTextField name="make" />
              </Col>
              <Col>
                <InputTextField name="model" />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col>
                <InputTextField name="year" />
              </Col>
              <Col>
                <InputTextField name="serialNo" label="S/N" />
              </Col>
              <Col />
            </Row>
          </FormGroup>
          <Row>
            <Col />
            <Col className="d-flex justify-content-end">
              <Button
                onClick={formProps.handleSubmit}
                variant="contained"
                disableElevation
                color="primary"
                className="font-weight-bold"
              >
                <FontAwesomeIcon icon={faGuitar} className="me-3" />{" "}
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
                <FontAwesomeIcon icon={faCircleXmark} className="me-3" /> Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default GuitarForm;
