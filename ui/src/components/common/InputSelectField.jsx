/** @module InputSelectField */

import React from "react";

import { MenuItem, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import _ from "lodash";
import PropTypes from "prop-types";
import { Col } from "reactstrap";

const InputSelectField = props => {
  const {
    label: labelFromProps,
    hidden,
    name,
    onChange,
    options,
    width,
    valueProp = "value",
    labelProp = "label",
    otherProps = {}
  } = props;

  const formProps = useFormikContext();

  const label = labelFromProps || _.capitalize(name);

  const xs = 12;
  const md = width === "wide" ? 6 : 3;
  const lg = width === "wide" ? 4 : 2;

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
        select
        size="small"
        value={_.get(formProps.values, name)}
      >
        {options.map(option => {
          let value;
          let label;
          if (typeof option === "string") {
            value = option;
            label = option;
          } else {
            value = option[valueProp];
            label = option[labelProp];
          }
          return (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          );
        })}
      </TextField>
    </Col>
  );
};

InputSelectField.propTypes = {
  hidden: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  width: PropTypes.string,
  valueProp: PropTypes.string,
  labelProp: PropTypes.string,
  otherProps: PropTypes.objectOf(PropTypes.any)
};

InputSelectField.defaultProps = {
  hidden: false,
  label: undefined,
  name: "",
  onChange: undefined,
  options: [],
  width: "",
  valueProp: "value",
  labelProp: "label",
  otherProps: {}
};

export default InputSelectField;
