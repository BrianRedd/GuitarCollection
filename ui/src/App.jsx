/* istanbul ignore file */
/** @module App */

import React from "react";

import { Provider } from "react-redux";

import store from "./store/store";

import Main from "./components/Main";

import "./styles/App.scss";

/**
 * @function App
 * @returns {React.ReactNode}
 */
function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
