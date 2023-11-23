/** @module ManageUserModal */

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
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

import { updateUser, writeUser } from "../../store/slices/userSlice";

import { getUserName } from "../../utils/utils";
import InputTextField from "../common/InputTextField";
import { manageUserValidationSchema } from "./data/modalData";

/**
 * @function ManageUserModal
 * @returns {React.ReactNode}
 */
const ManageUserModal = props => {
  const { isModalOpen, toggle } = props;
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.userState) ?? {};

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const initialValues = {
    ...user,
    oldPassword: "",
    newPassword: "",
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
        validationSchema={manageUserValidationSchema}
        onSubmit={values => {
          const submissionObject = _.pick(values, [
            "_id",
            "username",
            "firstname",
            "lastname",
            "permissions",
            "password"
          ]);
          if (values.newPassword) {
            submissionObject.password = values.newPassword;
          }
          dispatch(updateUser(submissionObject)).then(response => {
            console.log("repsonse", response);
            if (response?.payload?.data) {
              dispatch(writeUser(response?.payload?.data));
            }
          });
          toggle();
        }}
      >
        {formProps => (
          <React.Fragment>
            <ModalHeader toggle={toggle}>
              Manage {getUserName(user)} ({user.username})
            </ModalHeader>
            <ModalBody>
              <InputTextField
                name="firstname"
                label="First Name"
                required
                width="full"
              />
              <InputTextField name="lastname" label="Last Name" width="full" />
              <p>To change password, enter old password and new password</p>
              <InputTextField
                name="oldPassword"
                label="Old Password"
                otherProps={{
                  type: isPasswordVisible ? "" : "password"
                }}
                width="full"
                Adornment={EyeAdornment}
              />
              <InputTextField
                name="newPassword"
                label="New Password"
                required={Boolean(formProps?.values?.oldPassword)}
                otherProps={{
                  disabled: formProps?.values?.oldPassword !== user.password,
                  type: isPasswordVisible ? "" : "password"
                }}
                width="full"
                Adornment={EyeAdornment}
              />
              <InputTextField
                name="passwordConfirm"
                label="Confirm New Password"
                required={Boolean(formProps?.values?.oldPassword)}
                otherProps={{
                  disabled: !formProps?.values?.newPassword,
                  type: isPasswordVisible ? "" : "password"
                }}
                Adornment={EyeAdornment}
                width="full"
              />
            </ModalBody>
            <ModalFooter className="d-flex justify-content-around">
              <Button
                variant="contained"
                disableElevation
                color="success"
                onClick={formProps.handleSubmit}
              >
                <FontAwesomeIcon icon={faXmarkCircle} className="me-2" />
                Update User
              </Button>
              <Button
                variant="contained"
                disableElevation
                color="error"
                onClick={() => {
                  dispatch(writeUser({}));
                  toggle();
                }}
              >
                <FontAwesomeIcon icon={faSave} className="me-2" />
                Logout
              </Button>
            </ModalFooter>
          </React.Fragment>
        )}
      </Formik>
    </Modal>
  );
};

ManageUserModal.propTypes = {
  image: PropTypes.objectOf(PropTypes.any),
  isModalOpen: PropTypes.bool,
  toggle: PropTypes.func
};

ManageUserModal.defaultProps = {
  image: {},
  isModalOpen: false,
  toggle: () => {}
};

export default ManageUserModal;
