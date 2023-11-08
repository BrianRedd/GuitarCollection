/** @module InputFields */

import React from "react";

import { InputAdornment, MenuItem, TextField } from "@material-ui/core";
import { useFormikContext } from "formik";
import _ from "lodash";
import PropTypes from "prop-types";
import { Col } from "reactstrap";

export const InputTextField = props => {
  const { label: labelFromProps, hidden, name, onChange, prefix, width } = props;

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
          Boolean(formProps?.touched?.[name]) &&
          Boolean(formProps?.errors?.[name])
        }
        fullWidth
        helperText={formProps?.errors?.[name]}
        label={label}
        name={name}
        onBlur={formProps.handleBlur}
        onChange={value => {
          formProps.handleChange(value);
          onChange(value);
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
        value={formProps?.values?.[name]}
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
  onChange: () => {},
  prefix: undefined,
  width: ""
};

export const InputSelectField = props => {
  const {
    label: labelFromProps,
    hidden,
    name,
    onChange,
    options,
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
          Boolean(formProps?.touched?.[name]) &&
          Boolean(formProps?.errors?.[name])
        }
        fullWidth
        helperText={formProps?.errors?.[name]}
        label={label}
        name={name}
        onBlur={formProps.handleBlur}
        onChange={value => {
          formProps.handleChange(value);
          onChange(value);
        }}
        select
        size="small"
        value={formProps?.values?.[name]}
      >
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
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
  width: PropTypes.string
};

InputSelectField.defaultProps = {
  hidden: false,
  label: undefined,
  lg: 2,
  md: 4,
  name: "",
  onChange: () => {},
  options: [],
  width: ""
};
