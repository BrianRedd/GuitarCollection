import React, { useEffect, useState } from "react";

import axios from "axios";

import List from "./components/List";
import { baseURL } from "./utils/constants";

const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [udpateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then(response => {
      console.log(response.data);
      setTasks(response.data);
    });
  }, [udpateUI]);

  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: input }).then(response => {
      console.log(response.data);
      setInput("");
      setUpdateUI(previousState => !previousState);
    });
  };

  const updateTask = () => {
    axios
      .put(`${baseURL}/update/${updateId}`, { task: input })
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
      <h1 className="title">CRUD Operations</h1>
      <div className="input_holder">
        <input
          type="text"
          value={input}
          onChange={evt => setInput(evt.target.value)}
        />
        <button type="submit" onClick={updateId ? updateTask : addTask}>
          {updateId ? "Update Task" : "Add Task"}
        </button>
      </div>
      <ul>
        {tasks.map(task => (
          <List
            key={task._id}
            id={task._id}
            task={task.task}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>
    </main>
  );
};

export default App;
