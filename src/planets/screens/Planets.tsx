/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { Grid, GridItem } from "../../common/components/Grid";
import { GridItemCard } from "../components/GridItemCard";
import { usePlanetsQuery } from "../services/planets";

const Planets = (): JSX.Element => {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePlanetsQuery();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div>Search input</div>
      <div>
        {error && <div>Error</div>}
        {isLoading && <div>Loading...</div>}
        {data !== undefined && (
          <>
            <Grid>
              {data.pages.map((page) => (
                <React.Fragment key={page.next}>
                  {page.results?.map((planet) => (
                    <GridItem
                      key={planet.name + planet.id}
                      as={Link}
                      to={`${planet.id}/residents`}
                    >
                      <GridItemCard>{planet.name}</GridItemCard>
                    </GridItem>
                  ))}
                </React.Fragment>
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
