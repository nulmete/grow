import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../common/redux/hooks";
import { RouterParams } from "../types/routerParams";

const PlanetResident = (): JSX.Element => {
  const params = useParams<keyof RouterParams>() as RouterParams;
  const { residentId } = params;

  const currentResident = useAppSelector((state) =>
    state.residents.value.find((resident) => resident.id === residentId)
  );

  return (
    <>
      <div>Planet Resident: {currentResident?.name}</div>
      {/* TODO: show with nice styling */}
      {/* TODO: filter out:
       * 'starships'
       * 'homeworld'
       * 'species'
       * 'vehicles'
       * 'films'
       * 'created
       * 'edited'
       * 'url'
       */}
      <pre>{JSON.stringify(currentResident, null, 2)}</pre>
    </>
  );
};

export default PlanetResident;
