/** @module SpecificationsTable */

import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import PropTypes from "prop-types";
import { Row } from "reactstrap";

export const SpecificationsTable = props => {
  const { guitar } = props;
  return (
    <Row className="mt-3">
      <h5 className="mt-2 text-decoration-underline">Specifications</h5>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="250">Type</TableCell>
            <TableCell>Specification</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(guitar.specifications ?? []).map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.specType}
              </TableCell>
              <TableCell>{row.specification}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
