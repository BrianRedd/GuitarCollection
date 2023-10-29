import React from "react";

import axios from "axios";
import PropTypes from "prop-types";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { baseURL } from "../utils/constants";

const List = props => {
  const { id, setUpdateUI, guitar, updateMode } = props;

  const removeGuitar = () => {
    axios.delete(`${baseURL}/delete/${id}`).then(response => {
      console.log(response);
      setUpdateUI(previousState => !previousState);
    });
  };

  return (
    <li>
      {guitar.name}
      <div className="icon_holder">
        <BiEditAlt className="icon" onClick={() => updateMode(id, guitar.name)} />
        <BsTrash className="icon" onClick={removeGuitar} />
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
