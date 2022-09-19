import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ElementWithTextHover } from "../../common/components";
import { Grid, GridItem } from "../../common/components/Grid";
import { useAppDispatch, useAppSelector } from "../../common/redux/hooks";
import getIdFromUrl from "../../common/utils/getIdFromUrl";
import { GridItemCard } from "../components/GridItemCard";
import { SWAPI_RESIDENTS_URL } from "../lib/strings";
import { useResidentsQuery } from "../services/residents";
import { set } from "../slices/residentsSlice";
import { Resident } from "../types/resident";
import { RouterParams } from "../types/routerParams";

const PlanetResidents = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const params = useParams<keyof RouterParams>() as RouterParams;
  const { planetId } = params;

  const currentPlanet = useAppSelector((state) =>
    state.planets.value.find((planet) => planet.id === planetId)
  );

  const residentIds = currentPlanet?.residents.map((resident) =>
    getIdFromUrl(resident, SWAPI_RESIDENTS_URL)
  );

  const results = useResidentsQuery(residentIds);

  const areLoading = results.some((result) => !!result.isLoading);

  useEffect(() => {
    if (!areLoading) {
      const residents = results
        .map(({ data }) => {
          if (data === undefined) return undefined;
          return data;
        })
        // Using a type-guard here so that the return type of `residents`
        // is not (Resident | undefined)[], but Resident[]
        .filter((resident): resident is Resident => resident !== undefined);
      dispatch(set(residents));
    }
  }, [areLoading]);

  return (
    <>
      <div>
        {!!areLoading && <div>Loading...</div>}
        {!areLoading && (
          <Grid>
            {results.map((result, index) => (
              <React.Fragment
                // not really a problem using key={index} here since
                // we won't be updating/deleting the list
                // eslint-disable-next-line react/no-array-index-key
                key={index}
              >
                {result.data === undefined ? (
                  <GridItem>
                    <GridItemCard>
                      Could not load data for Resident ID:{" "}
                      {residentIds?.[index] ?? "Unknown ID"}
                    </GridItemCard>
                  </GridItem>
                ) : (
                  <GridItem as={Link} to={result.data.id}>
                    <GridItemCard>
                      <ElementWithTextHover>
                        {result.data.name}
                      </ElementWithTextHover>
                    </GridItemCard>
                  </GridItem>
                )}
              </React.Fragment>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
};

export default PlanetResidents;
