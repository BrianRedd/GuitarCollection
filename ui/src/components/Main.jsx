import React, { useEffect } from "react";

import { Button } from "@material-ui/core";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { addGuitar, getGuitars } from "../utils/apiFunctions";

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
  });

  return (
    <main>
      <h1 className="title">Brian&apos;s Guitar Collection</h1>
      <div className="input_holder">
        <Formik
          initialValues={{
            name: ""
          }}
          onSubmit={values => {
            dispatch(addGuitar(values));
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                type="text"
                onChange={handleChange}
                value={values.name}
              />

              <Button variant="contained" type="submit">
                Add Guitar
              </Button>
            </form>
          )}
        </Formik>
      </div>
      <ul>
        {guitars.map(guitar => (
          <List
            // eslint-disable-next-line no-underscore-dangle
            key={guitar._id}
            // eslint-disable-next-line no-underscore-dangle
            id={guitar._id}
            guitar={guitar}
          />
        ))}
      </ul>
    </main>
  );
};

export default Main;
