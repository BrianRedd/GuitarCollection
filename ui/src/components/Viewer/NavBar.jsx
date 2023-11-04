/** @module NavBar */

import React, { useState } from "react";

import { faGuitar, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  Collapse,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler
} from "reactstrap";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

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
    </Navbar>
  );
};

export default NavBar;
