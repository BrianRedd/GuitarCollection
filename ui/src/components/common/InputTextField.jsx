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
        label={label}
        name={name}
        onBlur={formProps.handleBlur}
        onChange={value => {
          formProps.handleChange(value);
          if (onChange) {
            onChange(value);
          }
        }}
        size={height === "tall" ? "normal" : "small"}
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
  width: PropTypes.string,
  otherProps: PropTypes.objectOf(PropTypes.any)
};

InputTextField.defaultProps = {
  hidden: false,
  label: undefined,
  name: "",
  onChange: undefined,
  prefix: undefined,
  width: "",
  otherProps: {}
};

export default InputTextField;
