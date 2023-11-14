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
    width,
    height,
    required,
    otherProps = {}
  } = props;

  const formProps = useFormikContext();

  const label = labelFromProps || _.capitalize(name);

  const xs = 12;
  let md = 0;
  let lg = 0;
  switch (width) {
    case "wide":
      md = 6;
      lg = 4;
      break;
    case "full":
      md = 12;
      lg = 12;
      break;
    default:
      md = 3;
      lg = 2;
  }

  return (
    <Col xs={xs} md={md} lg={lg} className={`mb-3 ${hidden ? "d-none" : ""}`}>
      <TextField
        {...otherProps}
        error={
          Boolean(_.get(formProps.touched, name)) &&
          Boolean(_.get(formProps.errors, name))
        }
        fullWidth
        helperText={_.get(formProps.errors, name)}
        InputProps={
          prefix
            ? {
                startAdornment: (
                  <InputAdornment position="start">{prefix}</InputAdornment>
                )
              }
            : undefined
        }
        label={label}
        name={name}
        onBlur={formProps.handleBlur}
        onChange={value => {
          formProps.handleChange(value);
          if (onChange) {
            onChange(value);
          }
        }}
        required={required}
        size={height === "tall" ? "normal" : "small"}
        value={_.get(formProps.values, name) ?? ""}
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
  required: PropTypes.bool,
  width: PropTypes.string,
  otherProps: PropTypes.objectOf(PropTypes.any)
};

InputTextField.defaultProps = {
  hidden: false,
  label: undefined,
  name: "",
  onChange: undefined,
  prefix: undefined,
  required: false,
  width: "",
  otherProps: {}
};

export default InputTextField;
