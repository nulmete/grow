import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactQueryProvider from "./common/api/react-query";

import Home from "./home";
import {
  PlanetResident,
  PlanetResidents,
  Planets,
  SinglePlanet,
} from "./planets";

const App = (): JSX.Element => {
  return (
    <ReactQueryProvider>
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
    </ReactQueryProvider>
  );
};

export default App;
