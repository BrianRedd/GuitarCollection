/** @module TodoList */

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

export const TodoList = props => {
  const { guitar } = props;
  return (
    <Row className="mt-3">
      <h5 className="mt-2 text-decoration-underline">To Do List</h5>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Completion Date</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(guitar.todoList ?? []).map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.todoItem}
              </TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.completionDate}</TableCell>
              <TableCell>{row.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Row>
  );
};

TodoList.propTypes = {
  guitar: PropTypes.objectOf(PropTypes.any)
};

TodoList.defaultProps = {
  guitar: {}
};

export default TodoList;
