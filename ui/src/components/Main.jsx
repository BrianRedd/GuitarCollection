import React, { useEffect, useState } from "react";

import axios from "axios";
import { Formik } from "formik";

import List from "./List";
import { getGuitars } from "../utils/apiFunctions";
import { baseURL } from "../utils/constants";

const Main = () => {
  const [input, setInput] = useState("");
  const [guitars, setGuitars] = useState([]);
  const [udpateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    getGuitars().then(response => setGuitars(response));
  }, [udpateUI]);

  const addGuitar = inputObject => {
    axios.post(`${baseURL}/save`, inputObject).then(response => {
      setInput("");
      setUpdateUI(previousState => !previousState);
    });
  };

  const updateGuitar = inputObject => {
    axios
      .put(`${baseURL}/update/${updateId}`, { name: input })
      .then(response => {
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
      <h1 className="title">Brian's Guitar Collection</h1>
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
          {({ values, handleChange, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <input
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={values.name}
                />

                <button type="submit">Add Guitar</button>
              </form>
            );
          }}
        </Formik>
      </div>
      <ul>
        {guitars.map(guitar => (
          <List
            key={guitar._id}
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
