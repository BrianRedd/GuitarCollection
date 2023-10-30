import React, { useEffect } from "react";

import { Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { addGuitar, getGuitars } from "../redux/Actions/GuitarActions";

import List from "./List";

/**
 * @function Main
 * @returns {React.Component}
 */
const Main = () => {
  const dispatch = useDispatch();
  const guitars = useSelector(state => state.guitarsState?.list) ?? [];

  useEffect(() => {
    dispatch(getGuitars());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues = {
    name: ""
  };

  return (
    <main>
      <h1 className="title">Brian&apos;s Guitar Collection</h1>
      <div className="input_holder">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            return dispatch(addGuitar(values)).then(() => {
              actions.resetForm(initialValues);
            });
          }}
        >
          <Form>
            <label htmlFor="name">Name: </label>
            <Field name="name" type="text" />
            <Button variant="contained" type="submit">
              Add Guitar
            </Button>
          </Form>
        </Formik>
      </div>
      <ul>
        {guitars.map(guitar => (
          <List
            // eslint-disable-next-line no-underscore-dangle
            key={guitar._id}
            guitar={guitar}
          />
        ))}
      </ul>
    </main>
  );
};

export default Main;
