import React from "react";

import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Spinner } from "reactstrap";

import NavBar from "./NavBar";

const Layout = () => {
  const { loading } = useSelector(state => state.guitarsState) ?? {};

  return (
    <React.Fragment>
      <NavBar />
      <div className="app-body">
        {loading && (
          <div className="d-flex w-100 justify-content-center">
            <Spinner
              color="success"
              style={{
                marginTop: "100px",
                height: "5rem",
                width: "5rem"
              }}
            >
              Loading...
            </Spinner>
          </div>
        )}
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default Layout;
