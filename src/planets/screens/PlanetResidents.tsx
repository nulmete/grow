import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../common/redux/hooks";
import getIdFromUrl from "../../common/utils/getIdFromUrl";
import { useResidentsQuery } from "../services/residents";

const PlanetResidents = (): JSX.Element => {
  const params = useParams();
  const { planetName } = params;

  // TODO: handle refreshing, in that case we won't have anything in Redux
  // A possible solution would be to fetch the single planet
  const currentPlanet = useAppSelector((state) =>
    state.planets.value.find((planet) => planet.name === planetName)
  );

  // TODO: declare constant in separate file!
  const residentIds = currentPlanet?.residents.map((resident) =>
    getIdFromUrl(resident, "https://swapi.dev/api/people/")
  );

  // TODO: wait for all of them to be: { success: true, status: 'idle' }
  // before rendering them and handle loading and error states
  const results = useResidentsQuery(residentIds);

  return (
    <>
      <div>List of residents for planet: {planetName}</div>
      <div>
        {results.map((result) => (
          <div key={result.data?.name}>Resident name: {result.data?.name}</div>
        ))}
      </div>
    </>
  );
};

export default PlanetResidents;
