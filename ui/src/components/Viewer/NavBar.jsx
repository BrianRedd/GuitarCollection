/** @module NavBar */

import React, { useEffect, useState } from "react";

import { faGuitar, faHome } from "@fortawesome/free-solid-svg-icons";
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

import { clearMessage } from "../../store/slices/guitarsSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { message } = useSelector(state => state.guitarsState) ?? {};

  useEffect(() => {
    if (!_.isEmpty(message)) {
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }
  }, [dispatch, message]);

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
        </Nav>
      </Collapse>
      <Alert
        className="m-0"
        color={message?.type}
        isOpen={!_.isEmpty(message)}
        toggle={() => dispatch(clearMessage())}
      >
        {message?.text}
      </Alert>
    </Navbar>
  );
};

export default NavBar;
