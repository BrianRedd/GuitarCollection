import React from "react";

import { IconButton } from "@material-ui/core";
import axios from "axios";
import PropTypes from "prop-types";
import { baseURL } from "../utils/constants";

/**
 * @function List
 * @returns {React.Component}
 */
const List = props => {
  const { id, setUpdateUI, guitar, updateMode } = props;

  const removeGuitar = () => {
    axios.delete(`${baseURL}/delete/${id}`).then(() => {
      setUpdateUI(previousState => !previousState);
    });
  };

  return (
    <li>
      {guitar.name}
      <div className="icon_holder">
        <IconButton onClick={() => updateMode(id, guitar.name)}>
          <span className="fas fa-edit" />
        </IconButton>
        <IconButton onClick={removeGuitar}>
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
