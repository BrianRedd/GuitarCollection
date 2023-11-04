import React from "react";

import { useSelector } from "react-redux";

import List from "./List";

/**
 * @function Home
 * @returns {React.ReactNode}
 */
const Home = () => {
  const guitars = useSelector(state => state.guitarsState?.list) ?? [];

  console.log("guitars", guitars);

  return (
    <ul>
      {(guitars ?? []).map(guitar => (
        <List
          // eslint-disable-next-line no-underscore-dangle
          key={guitar._id}
          guitar={guitar}
        />
      ))}
    </ul>
  );
};

export default Home;
