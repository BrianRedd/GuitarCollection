import React, { useState } from "react";

import { faGuitar, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import {
  Alert,
  Collapse,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Spinner
} from "reactstrap";

import { clearMessage } from "../store/slices/guitarsSlice";

const Layout = () => {
  const dispatch = useDispatch();

  const { loading, message } = useSelector(state => state.guitarsState) ?? {};

  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const toggleHamburger = () => setIsHamburgerOpen(!isHamburgerOpen);

  return (
    <React.Fragment>
      <Navbar expand="lg">
        <NavbarBrand href="/">Brian's Guitar Collection</NavbarBrand>
        <NavbarToggler onClick={toggleHamburger} />
        <Collapse isOpen={isHamburgerOpen} navbar>
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
      {loading && (
        <div className="d-flex w-100 justify-content-center">
          <Spinner
            color="success"
            style={{
              height: "3rem",
              width: "3rem"
            }}
          >
            Loading...
          </Spinner>
        </div>
      )}
      <Alert
        color={message?.type}
        isOpen={!_.isEmpty(message)}
        toggle={() => dispatch(clearMessage())}
      >
        {message?.text}
      </Alert>
      <Outlet />
    </React.Fragment>
  );
};

export default Layout;
