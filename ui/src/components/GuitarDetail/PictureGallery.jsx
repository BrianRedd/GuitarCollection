/** @module PictureGallery */

import React from "react";

import PropTypes from "prop-types";
import { Row } from "reactstrap";

const PictureGallery = props => {
  const { guitar } = props;
  console.log("PictureGallery", guitar);
  return (
    <Row>
      <h5 className="mt-2 text-decoration-underline">Picture Gallery</h5>
    </Row>
  );
};

PictureGallery.propTypes = {
  guitar: PropTypes.objectOf(PropTypes.any)
};

PictureGallery.defaultProps = {
  guitar: {}
};

export default PictureGallery;
