import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {  enqueueSnackbar } from 'notistack'

import { getBrands } from "../store/slices/brandsSlice";
import { getGallery } from "../store/slices/gallerySlice";
import { getGuitars } from "../store/slices/guitarsSlice";

import Brands from "./Brands/Brands";
import AddGuitar from "./Editors/AddGuitar";
import EditGuitar from "./Editors/EditGuitar";
import Gallery from "./Gallery/Gallery";
import GuitarDetail from "./GuitarDetail/GuitarDetail";
import GuitarList from "./GuitarList/GuitarList";
import Home from "./Viewer/Home";
import Layout from "./Viewer/Layout";

/**
 * @function Main
 * @returns {React.ReactNode}
 */
const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGuitars()).then(response => {
      console.log("response", response);
      enqueueSnackbar("Test message" )
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getBrands());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getGallery());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <div className="App" data-test="component-app">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="guitarlist" element={<GuitarList />} />
            <Route path="addguitar" element={<AddGuitar />} />
            <Route path="editguitar" element={<EditGuitar />} />
            <Route path="editguitar/:id" element={<EditGuitar />} />
            <Route path="brands" element={<Brands />} />
            <Route path="guitar" element={<GuitarDetail />} />
            <Route path="guitar/:id" element={<GuitarDetail />} />
            <Route path="gallery" element={<Gallery />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Main;
