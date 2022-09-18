import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useAppSelector } from "../common/redux/hooks";
import { RouterParams } from "../planets/types/routerParams";

const Home = (): JSX.Element => {
  const params = useParams<keyof RouterParams>() as RouterParams;
  const { planetId, residentId } = params;
  const planets = useAppSelector((state) => state.planets.value);
  const residents = useAppSelector((state) => state.residents.value);
  const currentPlanet = planets.find((p) => p.id === planetId);
  const currentResident = residents.find((r) => r.id === residentId);

  return (
    <>
      <div>
        <Link to="/planets">All Planets</Link>
        {currentPlanet && (
          <>
            {" / "}
            <Link to={`/planets/${currentPlanet.id}/residents`}>
              {currentPlanet.name}
            </Link>
          </>
        )}
        {currentPlanet && currentResident && (
          <>
            {" / "}
            <Link
              to={`/planets/${currentPlanet.id}/residents/${currentResident.id}`}
            >
              {currentResident.name}
            </Link>
          </>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Home;
