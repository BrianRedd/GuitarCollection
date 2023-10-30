import React from "react";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { removeGuitar } from "../redux/Actions/GuitarActions";

/**
 * @function List
 * @returns {React.ReactNode}
 */
const List = props => {
  const { guitar } = props;

  const dispatch = useDispatch();

  return (
    <li>
      <span className="cell-width">{guitar.name}</span>
      <span className="cell-width">{guitar.make}</span>
      <div className="icon_holder">
        <IconButton>
          <Link to={`/editguitar/${guitar._id}`}>
            <FontAwesomeIcon icon={faEdit} />
          </Link>
        </IconButton>
        <IconButton onClick={() => dispatch(removeGuitar(guitar._id))}>
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
      </div>
    </li>
  );
};

List.propTypes = {
  guitar: PropTypes.objectOf(PropTypes.any)
};

List.defaultProps = {
  guitar: {}
};

export default List;
