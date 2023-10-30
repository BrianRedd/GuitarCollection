import React, { useState } from "react";

import {
  faClose,
  faEdit,
  faSave,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { removeGuitar, updateGuitar } from "../redux/Actions/GuitarActions";

/**
 * @function List
 * @returns {React.Component}
 */
const List = props => {
  const { guitar } = props;

  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  return (
    <li>
      {isEditing ? (
        <Formik
          initialValues={guitar}
          onSubmit={values => {
            return dispatch(updateGuitar(values)).then(() => {
              setIsEditing(false);
            });
          }}
        >
          <Form>
            <Field name="name" type="text" />
            <IconButton type="submit">
              <FontAwesomeIcon icon={faSave} />
            </IconButton>
            <IconButton onClick={() => setIsEditing(false)}>
              <FontAwesomeIcon icon={faClose} />
            </IconButton>
          </Form>
        </Formik>
      ) : (
        <React.Fragment>
          <span>{guitar.name}</span>
          <div className="icon_holder">
            <IconButton
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </IconButton>
            <IconButton onClick={() => dispatch(removeGuitar(guitar._id))}>
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          </div>
        </React.Fragment>
      )}
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
