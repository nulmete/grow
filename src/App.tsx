import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import ReactQueryProvider from "./common/api/react-query";
import { store } from "./common/redux/store";
import { PlanetResident, PlanetResidents, Planets } from "./planets/screens";
import PlanetsLayout from "./planets/components/PlanetsLayout";
import PlanetsWrapper from "./planets/components/PlanetsWrapper";
import { Home } from "./home";

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <ReactQueryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PlanetsLayout />}>
              <Route
                path="planets"
                element={
                  <div className="spacing">
                    <PlanetsWrapper />
                    <Outlet />
                  </div>
                }
              >
                <Route index element={<Planets />} />
                <Route
                  path=":planetId/residents"
                  element={<PlanetResidents />}
                />
                <Route
                  path=":planetId/residents/:residentId"
                  element={<PlanetResident />}
                />
              </Route>
            </Route>
            {/* TODO: make a NoMatch component */}
            <Route path="*" element={<div>No Match</div>} />
          </Routes>
        </BrowserRouter>
      </ReactQueryProvider>
    </Provider>
  );
};

export default App;
