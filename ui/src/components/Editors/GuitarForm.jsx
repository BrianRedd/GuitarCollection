import React from "react";

import { Button } from "@material-ui/core";
import { Field, Formik } from "formik";
import { Col, Form, Row } from "reactstrap";

/**
 * @function GuitarForm
 * @returns {React.ReactNode}
 */
const GuitarForm = props => {
  const { handleSubmit, initialValues, buttonText } = props;

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {formProps => (
        <Form>
          <Row>
            <Col>
              <label htmlFor="name">Name: </label>
              <Field name="name" type="text" />
            </Col>
            <Col>
              <label htmlFor="name">Make: </label>
              <Field name="make" type="text" />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="contained" onClick={formProps.handleSubmit}>
               {buttonText}
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default GuitarForm;
