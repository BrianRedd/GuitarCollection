/** @module InputTextField */

import React from "react";

import { InputAdornment, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import _ from "lodash";
import PropTypes from "prop-types";
import { Col } from "reactstrap";

const InputTextField = props => {
  const {
    label: labelFromProps,
    hidden,
    name,
    onChange,
    prefix,
    width
  } = props;

  const formProps = useFormikContext();

  const label = labelFromProps || _.capitalize(name);

  const xs = 12;
  const md = width === "wide" ? 6 : 3;
  const lg = width === "wide" ? 4 : 2;

  return (
    <Col xs={xs} md={md} lg={lg} className={`mb-3 ${hidden ? "d-none" : ""}`}>
      <TextField
        {...props}
        error={
          Boolean(_.get(formProps.touched, name)) &&
          Boolean(_.get(formProps.errors, name))
        }
        fullWidth
        helperText={_.get(formProps.errors, name)}
        label={label}
        name={name}
        onBlur={formProps.handleBlur}
        onChange={value => {
          formProps.handleChange(value);
          if (onChange) {
            onChange(value);
          }
        }}
        size="small"
        InputProps={
          prefix
            ? {
                startAdornment: (
                  <InputAdornment position="start">{prefix}</InputAdornment>
                )
              }
            : undefined
        }
        value={_.get(formProps.values, name)}
      />
    </Col>
  );
};

InputTextField.propTypes = {
  hidden: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  prefix: PropTypes.string,
  width: PropTypes.string
};

InputTextField.defaultProps = {
  hidden: false,
  label: undefined,
  name: "",
  onChange: undefined,
  prefix: undefined,
  width: ""
};

export default InputTextField;
