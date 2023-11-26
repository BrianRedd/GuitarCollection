/** @module InputMultiSelectField */

import React from "react";

import {
  Box,
  Checkbox,
  Chip,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select
} from "@mui/material";
import { useFormikContext } from "formik";
import _ from "lodash";
import PropTypes from "prop-types";
import { Col } from "reactstrap";

const InputMultiSelectField = props => {
  const {
    className,
    label: labelFromProps,
    hidden,
    name,
    onChange,
    options,
    width,
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
    <Col
      xs={xs}
      md={md}
      lg={lg}
      className={_.compact(["mb-3", hidden && "d-none", className]).join(" ")}
    >
      <InputLabel id="multi-select-label">{label}</InputLabel>
      <Select
        {...otherProps}
        className="w-100"
        labelId="multi-select-label"
        id={name}
        multiple
        value={_.get(formProps.values, name) ?? []}
        onChange={evt => {
          formProps.setFieldValue(name, evt.target.value);
          if (onChange) {
            onChange(evt.target.value);
          }
        }}
        required={required}
        input={<OutlinedInput label={label} />}
        renderValue={selected => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map(value => (
              <Chip
                key={value}
                label={_.startCase(_.toLower(value.replaceAll("_", " ")))}
              />
            ))}
          </Box>
        )}
      >
        {options.map(option => (
          <MenuItem key={option} value={option}>
            <Checkbox
              checked={_.get(formProps.values, name)?.indexOf(option) > -1}
            />
            <ListItemText
              primary={_.startCase(_.toLower(option.replaceAll("_", " ")))}
            />
          </MenuItem>
        ))}
      </Select>
    </Col>
  );
};

InputMultiSelectField.propTypes = {
  className: PropTypes.string,
  hidden: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  width: PropTypes.string,
  valueProp: PropTypes.string,
  labelProp: PropTypes.string,
  required: PropTypes.bool,
  otherProps: PropTypes.objectOf(PropTypes.any)
};

InputMultiSelectField.defaultProps = {
  className: "",
  hidden: false,
  label: undefined,
  name: "",
  onChange: undefined,
  options: [],
  width: "",
  valueProp: "value",
  labelProp: "label",
  required: false,
  otherProps: {}
};

export default InputMultiSelectField;
