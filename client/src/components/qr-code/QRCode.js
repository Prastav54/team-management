import PropTypes from "prop-types";
import QRCode from "qrcode.react";
import React from "react";

export default function QrCode(props) {
  return (
    <QRCode
      value={props.value}
      size={props.size}
      renderAs="svg"
      {...props}
    />
  );
}
QrCode.propTypes = {
  size: PropTypes.number,
  value: PropTypes.string,
};

QrCode.defaultProps = {
  size: 82,
  value: "",
};