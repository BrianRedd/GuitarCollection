/** @module MainContainer */

import React from "react";
import PropTypes from "prop-types";

/**
 * @function MainContainer
 * @description Functional Container component for MainContainer
 * @returns {React.Component} - Rendered component.
 */
const MainContainer = props => {
  const { data } = props;

  return (
    <div data-test="container-main">
      <div>{JSON.stringify(props, null, 2)}</div>
      <div>Data: {data}</div>
    </div>
  );
};

MainContainer.propTypes = {
  data: PropTypes.string
};

MainContainer.defaultProps = {
  data: "This Data is not from Props"
};

export default MainContainer;
