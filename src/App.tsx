import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./home";
import {
  PlanetResident,
  PlanetResidents,
  Planets,
  SinglePlanet,
} from "./planets";

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="planets" element={<Planets />} />
          <Route path="planets/:planetId" element={<SinglePlanet />} />
          <Route
            path="planets/:planetId/residents"
            element={<PlanetResidents />}
          />
          <Route
            path="planets/:planetId/residents/:residentId"
            element={<PlanetResident />}
          />
          <Route path="*" element={<div>No Match</div>} />
        </Route>
        <Route path="*" element={<div>No Match</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
