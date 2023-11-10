/** @module InputFreeFormField */

import React from "react";

import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import _ from "lodash";
import PropTypes from "prop-types";
import { Col } from "reactstrap";

const filter = createFilterOptions();

const InputFreeFormField = props => {
  const {
    label: labelFromProps,
    hidden,
    name,
    onChange,
    options,
    required,
    width
  } = props;

  const formProps = useFormikContext();

  const setValue = value => {
    const newValue = value?.title ?? value ?? "";
    formProps.setFieldValue(name, newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const label = labelFromProps || _.capitalize(name);

  const xs = 12;
  const md = width === "wide" ? 6 : 3;
  const lg = width === "wide" ? 4 : 2;

  return (
    <Col xs={xs} md={md} lg={lg} className={`mb-3 ${hidden ? "d-none" : ""}`}>
      <Autocomplete
        onChange={(event, newValue) => {
          console.log("newValue", newValue);
          if (!newValue) {
            setValue("");
          } else if (typeof newValue === "string") {
            setValue({
              title: newValue
            });
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              title: newValue.inputValue
            });
          } else {
            setValue(newValue);
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
        id="free-solo-with-text-demo"
        options={(options ?? []).map(option => ({
          title: option
        }))}
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
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        freeSolo
        fullWidth
        name={name}
        size="small"
        value={_.get(formProps.values, name)}
        renderInput={params => (
          <TextField
            {...params}
            label={label}
            required={required}
            error={
              Boolean(_.get(formProps.touched, name)) &&
              Boolean(_.get(formProps.errors, name))
            }
            helperText={_.get(formProps.errors, name)}
          />
        )}
      />
    </Col>
  );
};

InputFreeFormField.propTypes = {
  hidden: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  required: PropTypes.bool,
  width: PropTypes.string
};

InputFreeFormField.defaultProps = {
  hidden: false,
  label: undefined,
  lg: 2,
  md: 4,
  name: "",
  onChange: () => {},
  options: [],
  required: false,
  width: ""
};

export default InputFreeFormField;
