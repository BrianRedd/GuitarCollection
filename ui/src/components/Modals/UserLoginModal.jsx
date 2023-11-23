/** @module UserLoginModal */

import React, { useState } from "react";

import {
  faEye,
  faEyeSlash,
  faSave,
  faXmarkCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, IconButton } from "@mui/material";
import { Formik } from "formik";
import _ from "lodash";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Alert, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { getUser, updateUser, writeUser } from "../../store/slices/userSlice";

import InputTextField from "../common/InputTextField";
import { userLoginValidationSchema } from "./data/modalData";

/**
 * @function UserLoginModal
 * @returns {React.ReactNode}
 */
const UserLoginModal = props => {
  const { isModalOpen, toggle } = props;
  const dispatch = useDispatch();

  const [userObject, setUserObject] = useState({});
  const [error, setError] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const initialValues = {
    isNewPassword: false,
    username: "",
    password: "",
    passwordConfirm: ""
  };

  const EyeAdornment = (
    <IconButton
      size="small"
      onClick={() => {
        setIsPasswordVisible(!isPasswordVisible);
      }}
      color="info"
    >
      <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
    </IconButton>
  );

  return (
    <Modal isOpen={isModalOpen} toggle={toggle}>
      <Formik
        initialValues={initialValues}
        validationSchema={userLoginValidationSchema}
        onSubmit={values => {
          console.log("values", values);
          if (values.isNewPassword) {
            dispatch(
              updateUser({
                ..._.pick(userObject, [
                  "_id",
                  "username",
                  "firstname",
                  "lastname",
                  "permissions"
                ]),
                password: values.password
              })
            );
          } else if (values.password === userObject.password) {
            dispatch(writeUser(userObject));
          } else {
            setError("Wrong Password");
            return false;
          }
          toggle();
        }}
      >
        {formProps => (
          <React.Fragment>
            <ModalHeader toggle={toggle}>User Login</ModalHeader>
            <ModalBody>
              {error && (
                <Alert className="m-0 mb-3" color={"danger"}>
                  {error}
                </Alert>
              )}
              <InputTextField
                name="username"
                required
                width="full"
                Adornment={
                  <IconButton
                    size="small"
                    onClick={() => {
                      dispatch(getUser(formProps.values.username)).then(
                        response => {
                          if (response?.payload?.data) {
                            if (!response.payload.data?.password) {
                              formProps.setFieldValue("isNewPassword", true);
                            }
                            setUserObject(response.payload.data);
                            setError(null);
                          } else {
                            setUserObject({});
                            setError(response?.payload?.message);
                          }
                        }
                      );
                    }}
                    color="info"
                    disabled={!formProps.values.username}
                  >
                    <FontAwesomeIcon icon={faSave} />
                  </IconButton>
                }
              />
              {userObject._id && (
                <React.Fragment>
                  {!userObject?.password ? (
                    <React.Fragment>
                      <p>
                        User {userObject?.username} Found, but without password.
                      </p>
                      <InputTextField
                        name="password"
                        required
                        otherProps={{
                          type: isPasswordVisible ? "" : "password"
                        }}
                        width="full"
                        Adornment={EyeAdornment}
                      />
                      <InputTextField
                        name="passwordConfirm"
                        label="Confirm Password"
                        required
                        otherProps={{
                          disabled: !formProps?.values?.password,
                          type: isPasswordVisible ? "" : "password"
                        }}
                        Adornment={EyeAdornment}
                        width="full"
                      />
                    </React.Fragment>
                  ) : (
                    <InputTextField
                      name="password"
                      required
                      otherProps={{
                        type: isPasswordVisible ? "" : "password"
                      }}
                      onChange={evt => {
                        const value = evt.target.value;
                        formProps.setFieldValue("passwordConfirm", value);
                      }}
                      Adornment={EyeAdornment}
                      width="full"
                    />
                  )}
                </React.Fragment>
              )}
            </ModalBody>
            <ModalFooter>
              <Button onClick={toggle} className="me-3">
                <FontAwesomeIcon icon={faXmarkCircle} className="me-2" />
                Close
              </Button>
              <Button
                onClick={formProps.handleSubmit}
                variant="contained"
                disableElevation
                color="primary"
                className="font-weight-bold"
                disabled={!formProps.values?.password}
              >
                <FontAwesomeIcon icon={faSave} className="me-2" />
                Login
              </Button>
            </ModalFooter>
          </React.Fragment>
        )}
      </Formik>
    </Modal>
  );
};

UserLoginModal.propTypes = {
  image: PropTypes.objectOf(PropTypes.any),
  isModalOpen: PropTypes.bool,
  toggle: PropTypes.func
};

UserLoginModal.defaultProps = {
  image: {},
  isModalOpen: false,
  toggle: () => {}
};

export default UserLoginModal;
