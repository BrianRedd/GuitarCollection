import React, { useState } from "react";

import { faGuitar, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet } from "react-router-dom";
import {
  Collapse,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler
} from "reactstrap";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <React.Fragment>
      <Navbar expand="lg">
        <NavbarBrand href="/">Brian's Guitar Collection</NavbarBrand>
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
      <Outlet />
    </React.Fragment>
  );
};

export default Layout;
