import React, { useEffect } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useDispatch } from "react-redux";
import { getGuitars } from "../redux/Actions/GuitarActions";

import AddGuitar from "./AddGuitar";
import EditGuitar from "./EditGuitar";
import Home from "./Home";
import Layout from "./Layout";

/**
 * @function Main
 * @returns {React.ReactNode}
 */
const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGuitars());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <div className="App" data-test="component-app">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="addguitar" element={<AddGuitar />} />
            <Route path="editguitar" element={<EditGuitar />} />
            <Route path="editguitar/:id" element={<EditGuitar />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Main;
