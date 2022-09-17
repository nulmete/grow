import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../common/redux/hooks";

const PlanetResident = (): JSX.Element => {
  const params = useParams();
  const { residentName } = params;

  // TODO: handle refreshing, in that case we won't have anything in Redux
  // A possible solution would be to fetch the single resident
  // SWAPI allows to search residents by name, so we could get it that way
  const currentResident = useAppSelector((state) =>
    state.residents.value.find((resident) => resident.name === residentName)
  );

  return (
    <>
      <div>Planet Resident: {residentName}</div>
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
