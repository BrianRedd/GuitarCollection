/** @module PurchaseDetailTable */

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

import { OWNERSHIP_STATUS_OPTIONS } from "../data/constants";

export const PurchaseDetailTable = props => {
  const { guitar } = props;
  return (
    <Row className="mt-3">
      <h5 className="mt-2 text-decoration-underline">Purchase History</h5>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ownership Status</TableCell>
            <TableCell>Transaction Location</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Store / Party</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(guitar.purchaseHistory ?? []).map(row => (
            <TableRow key={row.ownershipStatus}>
              <TableCell component="th" scope="row">
                <b>
                  {OWNERSHIP_STATUS_OPTIONS?.find(
                    option => option.value === row.ownershipStatus
                  ).label ?? row.ownershipStatus}
                </b>
              </TableCell>
              <TableCell>{row.where}</TableCell>
              <TableCell>{row.when}</TableCell>
              <TableCell>{row.who}</TableCell>
              <TableCell>
                <NumericFormat
                  value={row.amount}
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

PurchaseDetailTable.propTypes = {
  guitar: PropTypes.objectOf(PropTypes.any)
};

PurchaseDetailTable.defaultProps = {
  guitar: {}
};

export default PurchaseDetailTable;
