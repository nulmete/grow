/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { Grid, GridItem } from "../../common/components/Grid";
import { useAppSelector } from "../../common/redux/hooks";
import { GridItemCard } from "../components/GridItemCard";
import { usePlanetsQuery } from "../services/planets";

const Planets = (): JSX.Element => {
  const {
    data,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePlanetsQuery();

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  // Planet searching
  const [searchValue, setSearchValue] = useState<string>();
  const allPlanets = useAppSelector((state) => state.planets.value);
  const filteredPlanets = useMemo(
    () =>
      allPlanets.filter((planet, _, all) => {
        if (searchValue === undefined) return all;
        return planet.name.toLowerCase().includes(searchValue.toLowerCase());
      }),
    [searchValue, allPlanets]
  );
  const handleSearchPlanet = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: consider using debounce to improve performance
    setSearchValue(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search planet"
        onChange={handleSearchPlanet}
      />
      <div>
        {error && <div>Error</div>}
        {isLoading && <div>Loading...</div>}
        {data !== undefined && (
          <>
            <Grid>
              {filteredPlanets.map((planet) => (
                <GridItem
                  key={planet.name + planet.id}
                  as={Link}
                  to={`${planet.id}/residents`}
                >
                  <GridItemCard>{planet.name}</GridItemCard>
                </GridItem>
              ))}
            </Grid>
            <div>
              <button
                type="button"
                ref={ref}
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? "Loading more..."
                  : hasNextPage
                  ? "Load Newer"
                  : "Nothing more to load"}
              </button>
            </div>
            <div>
              {isFetching && !isFetchingNextPage
                ? "Background Updating..."
                : null}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Planets;
