import React from "react";

import axios from "axios";
import PropTypes from "prop-types";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { baseURL } from "../utils/constants";

const List = props => {
  const { id, setUpdateUI, task, updateMode } = props;

  const removeTask = () => {
    axios.delete(`${baseURL}/delete/${id}`).then(response => {
      console.log(response);
      setUpdateUI(previousState => !previousState);
    });
  };

  return (
    <li>
      {task}
      <div className="icon_holder">
        <BiEditAlt className="icon" onClick={() => updateMode(id, task)} />
        <BsTrash className="icon" onClick={removeTask} />
      </div>
    </li>
  );
};

List.propTypes = {
  id: PropTypes.string,
  setUpdateUI: PropTypes.func,
  task: PropTypes.string,
  updateMode: PropTypes.func
};

List.defaultProps = {
  id: "",
  setUpdateUI: () => {},
  task: "",
  updateMode: () => {}
};

export default List;
