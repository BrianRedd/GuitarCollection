/** @module MaintenanceTable */

import React from 'react';

import PropTypes from 'prop-types';
import { Row } from 'reactstrap';

const MaintenanceTable = props => {
  const { guitar } = props;
  return (
    <Row>
      <h5 className="mt-2 text-decoration-underline">Maintenance History</h5>
      {JSON.stringify(guitar.maintenance, null, 2)}
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
