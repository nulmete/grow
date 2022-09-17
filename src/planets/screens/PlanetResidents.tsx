import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../common/redux/hooks";
import getIdFromUrl from "../../common/utils/getIdFromUrl";
import { useResidentsQuery } from "../services/residents";
import { set } from "../slices/residentsSlice";
import { Resident } from "../types/resident";

const PlanetResidents = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { planetName } = params;

  // TODO: handle refreshing, in that case we won't have anything in Redux
  // A possible solution would be to fetch the single planet
  // SWAPI allows to search planets by name, so we could get it that way
  const currentPlanet = useAppSelector((state) =>
    state.planets.value.find((planet) => planet.name === planetName)
  );

  // TODO: declare constant in separate file!
  const residentIds = currentPlanet?.residents.map((resident) =>
    getIdFromUrl(resident, "https://swapi.dev/api/people/")
  );

  const results = useResidentsQuery(residentIds);

  const areLoading = results.some((result) => !!result.isLoading);

  useEffect(() => {
    if (!areLoading) {
      const residents = results
        .map((result) => result.data)
        // Using a type-guard here so that the return type of `residents`
        // is not (Resident | undefined)[], but Resident[]
        .filter((resident): resident is Resident => resident !== undefined);
      dispatch(set(residents));
    }
  }, [areLoading]);

  const handleResidentClick = (resident: Resident) => {
    navigate(`${resident.name}`);
  };

  return (
    <>
      <div>List of residents for planet: {planetName}</div>
      <div>
        {!!areLoading && <div>Loading...</div>}
        {!areLoading &&
          results.map((result, index) => (
            <div
              // not really a problem using key={index} here since
              // we won't be updating/deleting the list
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              style={{
                border: "1px solid gray",
                borderRadius: "5px",
                padding: "10rem 1rem",
                margin: "1rem",
                background: "#ccc",
              }}
            >
              {result.data === undefined ? (
                <p>
                  Could not load data for Resident ID:{" "}
                  {residentIds?.[index] ?? "Unknown ID"}
                </p>
              ) : (
                <div>
                  Resident name: {result.data.name}
                  <button
                    type="button"
                    onClick={() => handleResidentClick(result.data)}
                  >
                    Go
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default PlanetResidents;
