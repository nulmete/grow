import React, { useMemo } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useAppSelector } from "../common/redux/hooks";
import { RouterParams } from "../planets/types/routerParams";

const Home = (): JSX.Element => {
  const params = useParams<keyof RouterParams>() as RouterParams;
  const { planetId, residentId } = params;
  const planets = useAppSelector((state) => state.planets.value);
  const residents = useAppSelector((state) => state.residents.value);

  const breadcrumbs = useMemo(() => {
    let base = "All Planets";
    if (planetId) {
      const planet = planets.find((p) => p.id === planetId);
      base += ` / ${planet?.name ?? "Unknown Planet"}`;
    }
    if (residentId) {
      const resident = residents.find((r) => r.id === residentId);
      base += ` / ${resident?.name ?? "Unknown Resident"}`;
    }
    return base;
  }, [planetId, residentId, planets, residents]);

  return (
    <>
      {/* All Planets / <Planet Name> Residents / Resident Name */}
      <div>{breadcrumbs}</div>
      <Outlet />
    </>
  );
};

export default Home;
