import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import ReactQueryProvider from "./common/api/react-query";

import Home from "./home";
import {
  PlanetResident,
  PlanetResidents,
  Planets,
  SinglePlanet,
} from "./planets";
import { store } from "./common/redux/store";

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <ReactQueryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="planets" element={<Planets />} />
              <Route path="planets/:planetName" element={<SinglePlanet />} />
              <Route
                path="planets/:planetName/residents"
                element={<PlanetResidents />}
              />
              <Route
                path="planets/:planetName/residents/:residentId"
                element={<PlanetResident />}
              />
              <Route path="*" element={<div>No Match</div>} />
            </Route>
            <Route path="*" element={<div>No Match</div>} />
          </Routes>
        </BrowserRouter>
      </ReactQueryProvider>
    </Provider>
  );
};

export default App;
