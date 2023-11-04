import React, { useEffect } from "react";

import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Alert, Spinner } from "reactstrap";

import { clearMessage } from "../../store/slices/guitarsSlice";

import NavBar from "./NavBar";

const Layout = () => {
  const dispatch = useDispatch();

  const { loading, message } = useSelector(state => state.guitarsState) ?? {};

  useEffect(() => {
    if (!_.isEmpty(message)) {
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }
  }, [dispatch, message]);

  return (
    <React.Fragment>
      <NavBar />
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
      <div className="app-body">
        <Alert
          color={message?.type}
          isOpen={!_.isEmpty(message)}
          toggle={() => dispatch(clearMessage())}
        >
          {message?.text}
        </Alert>
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default Layout;
