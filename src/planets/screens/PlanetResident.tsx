import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../common/redux/hooks";
import { useResidentQuery } from "../services/residents";

type Params = {
  residentId: string;
};

const PlanetResident = (): JSX.Element => {
  const params = useParams<keyof Params>() as Params;
  const { residentId } = params;

  const currentResident = useAppSelector((state) =>
    state.residents.value.find((resident) => resident.id === residentId)
  );

  // Handles fetching the current resident if user refreshes the page
  // (we have no residents saved in redux).
  const enableResidentQuery = currentResident === undefined;
  useResidentQuery(residentId, enableResidentQuery);

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
