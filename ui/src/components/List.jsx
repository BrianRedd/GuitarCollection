import React from "react";

import { IconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { removeGuitar } from "../utils/apiFunctions";

/**
 * @function List
 * @returns {React.Component}
 */
const List = props => {
  const { id, guitar } = props;
  const dispatch = useDispatch();

  return (
    <li>
      {guitar.name}
      <div className="icon_holder">
        <IconButton
          onClick={() => {
            console.log("Edit guitar");
          }}
        >
          <span className="fas fa-edit" />
        </IconButton>
        <IconButton onClick={() => dispatch(removeGuitar(id))}>
          <span className="fas fa-trash" />
        </IconButton>
      </div>
    </li>
  );
};

List.propTypes = {
  id: PropTypes.string,
  setUpdateUI: PropTypes.func,
  guitar: PropTypes.objectOf(PropTypes.any),
  updateMode: PropTypes.func
};

List.defaultProps = {
  id: "",
  setUpdateUI: () => {},
  guitar: {},
  updateMode: () => {}
};

export default List;
