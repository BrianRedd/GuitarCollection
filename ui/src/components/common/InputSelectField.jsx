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
          onChange(value);
        }}
        select
        size="small"
        value={_.get(formProps.values, name)}
      >
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      {/* <Autocomplete
        value={_.get(formProps.values, name)}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            formProps.handleChange(newValue);
            onChange(newValue);
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            formProps.handleChange(newValue.inputValue);
            onChange(newValue.inputValue);
          } else {
            formProps.handleChange(newValue);
            onChange(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            option => inputValue === option.title
          );
          if (inputValue !== "" && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add "${inputValue}"`
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id={name}
        options={options}
        getOptionLabel={option => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.title;
        }}
        renderOption={(props, option) => <li {...props}>{option}</li>}
        fullWidth
        freeSolo
        size="small"
        error={
          Boolean(_.get(formProps.touched, name)) &&
          Boolean(_.get(formProps.errors, name))
        }
        helperText={_.get(formProps.errors, name)}
        renderInput={params => <TextField {...params} label={label} />}
      /> */}
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

export default InputSelectField;
