import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { getGuitars } from "../store/slices/guitarsSlice";

import AddGuitar from "./Editors/AddGuitar";
import EditGuitar from "./Editors/EditGuitar";
import Home from "./Viewer/Home";
import Layout from "./Viewer/Layout";

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
