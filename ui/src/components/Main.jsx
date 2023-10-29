import React, { useEffect, useState } from "react";

import { Button } from "@material-ui/core";
import axios from "axios";
import { Formik } from "formik";

import { getGuitars } from "../utils/apiFunctions";
import { baseURL } from "../utils/constants";

import List from "./List";

/**
 * @function Main
 * @returns {React.Component}
 */
const Main = () => {
  const [input, setInput] = useState("");
  const [guitars, setGuitars] = useState([]);
  const [udpateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    getGuitars().then(response => setGuitars(response));
  }, [udpateUI]);

  const addGuitar = inputObject => {
    axios.post(`${baseURL}/save`, inputObject).then(() => {
      setInput("");
      setUpdateUI(previousState => !previousState);
    });
  };

  const updateGuitar = () => {
    axios.put(`${baseURL}/update/${updateId}`, { name: input }).then(() => {
      setInput("");
      setUpdateId(null);
      setUpdateUI(previousState => !previousState);
    });
  };

  const updateMode = (id, text) => {
    setInput(text);
    setUpdateId(id);
  };

  return (
    <main>
      <h1 className="title">Brian&apos;s Guitar Collection</h1>
      <div className="input_holder">
        <Formik
          initialValues={{
            name: ""
          }}
          onSubmit={values => {
            const apiFunction = updateId ? updateGuitar : addGuitar;
            apiFunction(values);
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
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>
    </main>
  );
};

export default Main;
