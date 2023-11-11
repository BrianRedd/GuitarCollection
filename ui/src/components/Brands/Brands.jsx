/** @module Brands */

import React, { useState } from "react";

import { faCircleXmark, faIndustry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button } from "@mui/material";
import { Formik } from "formik";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Col, Form, FormGroup, Row } from "reactstrap";
import { getBrandsValidationSchema } from "./data/validationSchemas";

import {
  addBrand,
  getBrands,
  updateBrand
} from "../../store/slices/brandsSlice";
import * as types from "../../types/types";

import InputTextField from "../common/InputTextField";
import BrandBlock from "./BrandBlock";

/**
 * @function Brands
 * @returns {ReactNode}
 */
const Brands = () => {
  const dispatch = useDispatch();
  const [selectedBrand, setSelectedBrand] = useState(types.brand.defaults);
  const brands = useSelector(state => state.brandsState.list);

  return (
    <Box sx={{ width: "100%" }} className="p-5">
      <Formik
        initialValues={selectedBrand}
        onSubmit={(values, actions) => {
          const isEdit = Boolean(selectedBrand._id);
          const submissionValues = {
            ...values
          };

          isEdit
            ? dispatch(
                updateBrand({
                  ...submissionValues,
                  old_logo: selectedBrand.logo
                })
              ).then(() => {
                actions.resetForm(types.brand.defaults);
                setSelectedBrand({});
                dispatch(getBrands());
              })
            : dispatch(addBrand(submissionValues)).then(() => {
                actions.resetForm(types.brand.defaults);
                setSelectedBrand({});
                dispatch(getBrands());
              });
        }}
        validationSchema={getBrandsValidationSchema({
          brands,
          thisItem: selectedBrand._id ? selectedBrand : null
        })}
      >
        {formProps => {
          const selectBrand = brand => {
            formProps.setValues(brand);
            setSelectedBrand(brand);
          };
          return (
            <React.Fragment>
              <h3>Brands</h3>
              {brands?.length ? (
                <Row>
                  {brands?.map(brand => (
                    <BrandBlock
                      key={brand.id}
                      brand={brand}
                      selectBrand={selectBrand}
                    />
                  ))}
                </Row>
              ) : (
                <Alert className="m-0" color={"danger"}>
                  No Brands Found
                </Alert>
              )}
              <h4 className="mt-3">Add Brand</h4>
              <Form>
                <FormGroup>
                  <Row>
                    <InputTextField
                      name="name"
                      required
                      onChange={evt => {
                        const value = evt.target.value;
                        console.log("value", value);
                        if (value && value.length > 2 && !selectedBrand._id) {
                          formProps.setFieldValue(
                            "id",
                            value?.slice(0, 2)?.toUpperCase()
                          );
                        }
                      }}
                    />
                    <InputTextField
                      name="id"
                      required
                      disabled={
                        !formProps.values?.name || Boolean(selectedBrand._id)
                      }
                    />
                  </Row>
                  <div className="mb-3">
                    <label htmlFor="logo" className="form-label">
                      Select Image
                    </label>
                    <input
                      type="file"
                      name="logo"
                      className="form-control form-control-lg"
                      onChange={event => {
                        console.log("currentTarget", event.currentTarget.files);
                        formProps.setFieldValue(
                          "logo",
                          event.currentTarget.files[0]
                        );
                      }}
                      required
                    />
                  </div>
                  <InputTextField name="notes" width="wide" />
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
                      <FontAwesomeIcon icon={faIndustry} className="me-3" />
                      {Boolean(selectedBrand._id)
                        ? `Save ${selectedBrand.name}`
                        : "Create New Brand"}
                    </Button>
                    <Button
                      className="ms-2"
                      onClick={() => {
                        formProps.resetForm(types.brandsState.defaults);
                        setSelectedBrand(types.brand.defaults);
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
            </React.Fragment>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Brands;
