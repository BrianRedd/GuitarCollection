/** @module MaintenanceTable */

import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import { Row } from "reactstrap";

export const MaintenanceTable = props => {
  const { guitar } = props;
  return (
    <Row className="mt-3">
      <h5 className="mt-2 text-decoration-underline">Maintenance History</h5>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="250">Maintenance Type</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Who By</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(guitar.maintenance ?? []).map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.maintenanceType}
              </TableCell>
              <TableCell>{row.maintenanceDate}</TableCell>
              <TableCell>{row.whoBy}</TableCell>
              <TableCell>
                <NumericFormat
                  value={row.cost}
                  thousandSeparator
                  decimalScale={2}
                  fixedDecimalScale
                  prefix={"$"}
                  displayType="text"
                />
              </TableCell>
              <TableCell>{row.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
