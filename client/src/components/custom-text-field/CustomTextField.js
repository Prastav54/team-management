import { TextField } from '@mui/material'
import React from 'react'
import PropTypes from "prop-types";

export default function CustomTextField(props) {
  return (
    <TextField
      label={props.label}
      type={props.type}
      size={props.size}
      variant={props.variant}
      name={props.name}
      value={props.value}
      InputLabelProps={{ shrink: true }}
      onChange={props.onChange}
      fullWidth={props.fullWidth}
    />
  )
}

CustomTextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOf(['string', 'number']),
  onChange: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool
};

CustomTextField.defaultProps = {
  label: "label",
  type: "text",
  size: "small",
  variant: "outlined",
  name: "name",
  value: null,
  fullWidth: true
};
