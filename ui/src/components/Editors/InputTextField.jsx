import React from "react";

import { TextField } from "@material-ui/core";
import { useFormikContext } from "formik";
import _ from "lodash";
import PropTypes from "prop-types";

const InputTextField = props => {
  const { name, label: labelFromProps } = props;

  const label = labelFromProps || _.capitalize(name);

  const formProps = useFormikContext();

  return (
    <TextField
      name={name}
      label={label}
      value={formProps?.values?.[name]}
      onChange={formProps.handleChange}
      onBlur={formProps.handleBlur}
      required
    />
  );
};

InputTextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string
};

InputTextField.defaultProps = {
  name: "",
  label: undefined
};

export default InputTextField;
