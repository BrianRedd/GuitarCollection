/** @module TodoList */

import React from "react";

import PropTypes from "prop-types";
import { Row } from "reactstrap";

const TodoList = props => {
  const { guitar } = props;
  return (
    <Row>
      <h5 className="mt-2 text-decoration-underline">ToDo List</h5>
      {JSON.stringify(guitar.todo, null, 2)}
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
