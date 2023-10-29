import React, { useEffect, useState } from "react";

import axios from "axios";

import List from "./components/List";
import { baseURL } from "./utils/constants";

const App = () => {
  const [input, setInput] = useState("");
  const [guitars, setGuitars] = useState([]);
  const [udpateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then(response => {
      console.log(response.data);
      setGuitars(response.data);
    });
  }, [udpateUI]);

  const addGuitar = () => {
    axios.post(`${baseURL}/save`, { name: input }).then(response => {
      console.log(response.data);
      setInput("");
      setUpdateUI(previousState => !previousState);
    });
  };

  const updateGuitar = () => {
    axios
      .put(`${baseURL}/update/${updateId}`, { name: input })
      .then(response => {
        console.log(response.data);
        setInput("");
        setUpdateId(null);
        setUpdateUI(previousState => !previousState);
      });
  };

  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdateId(id);
  };

  return (
    <main>
      <h1 className="title">Brian's Guitar Collection</h1>
      <div className="input_holder">
        <input
          type="text"
          value={input}
          onChange={evt => {
            const value = evt.target.value;
            console.log("value", value);
            setInput(value);
          }}
        />
        <button type="submit" onClick={updateId ? updateGuitar : addGuitar}>
          {updateId ? "Update Guitar" : "Add Guitar"}
        </button>
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

export default App;
