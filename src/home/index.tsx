import React from "react";
import { Outlet } from "react-router-dom";

const Home = (): JSX.Element => {
  return (
    <>
      {/* All Planets / Planet Name / Resident Name */}
      <div>Breadcrumbs</div>
      <Outlet />
    </>
  );
};

export default Home;
