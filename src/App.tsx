import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import ReactQueryProvider from "./common/api/react-query";

import Home from "./home";
import { PlanetResident, PlanetResidents, Planets } from "./planets/screens";
import { store } from "./common/redux/store";

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <ReactQueryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="planets" element={<Planets />} />
              <Route
                path="planets/:planetId/residents"
                element={<PlanetResidents />}
              />
              <Route
                path="planets/:planetId/residents/:residentId"
                element={<PlanetResident />}
              />
              {/* TODO: make a NoMatch component */}
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
