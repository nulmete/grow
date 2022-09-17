import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../common/redux/hooks";

const PlanetResident = (): JSX.Element => {
  const params = useParams();
  const { residentId } = params;

  // TODO: handle refreshing, in that case we won't have anything in Redux
  // A possible solution would be to fetch the single resident by ID
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
