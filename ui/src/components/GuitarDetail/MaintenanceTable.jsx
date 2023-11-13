/** @module MaintenanceTable */

import React from 'react';

import PropTypes from 'prop-types';
import { Row } from 'reactstrap';

const MaintenanceTable = props => {
  const { guitar } = props;
  console.log("MaintenanceTable", guitar);
  return (
    <Row>
      <h5 className="mt-2 text-decoration-underline">Maintenance History</h5>
    </Row>
  );
};

MaintenanceTable.propTypes = {
  guitar: PropTypes.objectOf(PropTypes.any)
};

MaintenanceTable.defaultProps = {
  guitar: {}
};

export default MaintenanceTable;
