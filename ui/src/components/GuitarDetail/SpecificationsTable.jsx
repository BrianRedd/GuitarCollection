/** @module SpecificationsTable */

import React from "react";

import PropTypes from "prop-types";
import { Row } from "reactstrap";

const SpecificationsTable = props => {
  const { guitar } = props;
  return (
    <Row>
      <h5 className="mt-2 text-decoration-underline">Specifications</h5>
      {JSON.stringify(guitar.specs, null, 2)}
    </Row>
  );
};

SpecificationsTable.propTypes = {
  guitar: PropTypes.objectOf(PropTypes.any)
};

SpecificationsTable.defaultProps = {
  guitar: {}
};

export default SpecificationsTable;
