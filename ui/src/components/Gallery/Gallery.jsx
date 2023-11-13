/** @module Gallery */

import React, { useState } from "react";

import { Box, Button } from "@mui/material";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Col, Form, FormGroup, Row } from "reactstrap";
import { galleryValidationSchema } from "./data/validationSchemas";

import {
  addGalleryImage,
  getGallery,
  updateGalleryImage
} from "../../store/slices/gallerySlice";
import * as types from "../../types/types";

import { faCircleXmark, faIndustry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputTextField from "../common/InputTextField";
import GalleryImage from "./GalleryImage";

/**
 * @function Gallery
 * @returns {ReactNode}
 */
const Gallery = () => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(
    types.galleryImage.defaults
  );
  const gallery = useSelector(state => state.galleryState.list) ?? [];

  const isEdit = Boolean(selectedImage._id);

  return (
    <Box sx={{ width: "100%" }} className="p-4">
      <h1>Gallery</h1>
      <Formik
        initialValues={selectedImage}
        onSubmit={(values, actions) => {
          const submissionValues = {
            ...values
          };
          isEdit
            ? dispatch(
                updateGalleryImage({
                  ...submissionValues,
                  old_image: selectedImage.image
                })
              ).then(() => {
                actions.resetForm(types.galleryImage.defaults);
                setSelectedImage({});
                dispatch(getGallery());
              })
            : dispatch(addGalleryImage(submissionValues)).then(() => {
                actions.resetForm(types.galleryImage.defaults);
                setSelectedImage({});
                dispatch(getGallery());
              });
        }}
        validationSchema={galleryValidationSchema}
      >
        {formProps => {
          const selectImage = image => {
            formProps.setValues(image);
            setSelectedImage(image);
          };
          return (
            <React.Fragment>
              <h4 className="mt-3">
                {isEdit ? `Edit Image` : "Upload New Image"}
              </h4>
              <Form>
                <FormGroup>
                  <Row>
                    <Col xs={12} md={isEdit ? 10 : 12}>
                      <Row>
                        <Col>
                          <input
                            type="file"
                            name="image"
                            className="form-control form-control-lg"
                            style={{ height: "59px" }}
                            onChange={event => {
                              formProps.setFieldValue(
                                "image",
                                event.currentTarget.files[0]
                              );
                            }}
                            required
                          />
                        </Col>
                        <Col>
                          <InputTextField
                            name="caption"
                            width="full"
                            height="tall"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col className="d-flex justify-content-end">
                          <Button
                            onClick={formProps.handleSubmit}
                            variant="contained"
                            disableElevation
                            color="primary"
                            className="font-weight-bold"
                          >
                            <FontAwesomeIcon
                              icon={faIndustry}
                              className="me-3"
                            />
                            {isEdit ? `Save Image` : "Upload New Image"}
                          </Button>
                          <Button
                            className="ms-2"
                            onClick={() => {
                              formProps.resetForm(types.galleryImage.defaults);
                              setSelectedImage(types.galleryImage.defaults);
                            }}
                            variant="outlined"
                            color="secondary"
                          >
                            <FontAwesomeIcon
                              icon={faCircleXmark}
                              className="me-3"
                            />
                            Cancel
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    {isEdit && (
                      <Col xs={0} md={2}>
                        <img
                          src={`http://localhost:5000/gallery/${selectedImage.image}`}
                          width="100"
                          className="img-thumbnail mt-1"
                          alt={selectedImage._id}
                        ></img>
                      </Col>
                    )}
                  </Row>
                </FormGroup>
              </Form>
              {gallery?.length ? (
                <Row>
                  {gallery?.map(image => (
                    <GalleryImage
                      key={image._id}
                      image={image}
                      selectImage={selectImage}
                    />
                  ))}
                </Row>
              ) : (
                <Alert className="m-0" color={"danger"}>
                  No Gallery Images Found
                </Alert>
              )}
            </React.Fragment>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Gallery;
