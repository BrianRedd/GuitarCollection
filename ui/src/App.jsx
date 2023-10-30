/* istanbul ignore file */
/** @module App */

import React from "react";
import { Provider } from "react-redux";

import "./styles/App.css";

import Main from "./components/Main";

import store from "./redux/configureStore";

function App() {
  return (
    <Provider store={store}>
      <div className="App" data-test="component-app">
        <Main />
      </div>
    </Provider>
  );
}

export default App;
