/** @module NavBar */

import React, { useEffect, useState } from "react";

import {
  faGuitar,
  faHome,
  faIndustry
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Alert,
  Collapse,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler
} from "reactstrap";

import { clearMessage as clearGuitarMessage } from "../../store/slices/guitarsSlice";
import { clearMessage as clearBrandMessage } from "../../store/slices/brandsSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { message: guitarsMessage } =
    useSelector(state => state.guitarsState) ?? {};
  const { message: brandsMessage } =
    useSelector(state => state.brandsState) ?? {};

  useEffect(() => {
    if (!_.isEmpty(guitarsMessage)) {
      setTimeout(() => {
        dispatch(clearGuitarMessage());
      }, 3000);
    }
  }, [dispatch, guitarsMessage]);

  useEffect(() => {
    if (!_.isEmpty(brandsMessage)) {
      setTimeout(() => {
        dispatch(clearBrandMessage());
      }, 3000);
    }
  }, [brandsMessage, dispatch]);

  return (
    <Navbar color="dark" dark expand="sm" fixed="top">
      <NavbarBrand href="/">Brian's Guitars</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/addguitar">
              <FontAwesomeIcon icon={faGuitar} /> Add Guitar
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/brands">
              <FontAwesomeIcon icon={faIndustry} /> Brands
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
      <Alert
        className="my-0 mx-1"
        color={guitarsMessage?.type}
        isOpen={!_.isEmpty(guitarsMessage)}
        toggle={() => dispatch(clearGuitarMessage())}
      >
        {guitarsMessage?.text}
      </Alert>
      <Alert
        className="my-0 mx-1"
        color={brandsMessage?.type}
        isOpen={!_.isEmpty(brandsMessage)}
        toggle={() => dispatch(clearBrandMessage())}
      >
        {brandsMessage?.text}
      </Alert>
    </Navbar>
  );
};

export default NavBar;
