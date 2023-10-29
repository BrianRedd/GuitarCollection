import React from "react";

import { Button } from "@material-ui/core";
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
        <Button onClick={() => updateMode(id, guitar.name)}>
          <i className="fa-solid fa-pen-to-square" />
        </Button>
        <Button onClick={removeGuitar}>
          <i className="fa-solid fa-trash" />
        </Button>
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
