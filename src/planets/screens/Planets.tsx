/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Card } from "../../common/components";
import { usePlanetsQuery } from "../services/planets";

const PlanetsList = styled.div`
  display: grid;
  grid-gap: 3rem;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
`;

const Planet = styled(Link)`
  min-height: 35vh;
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  text-align: center;
  text-transform: uppercase;

  & ${Card} {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

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
            <PlanetsList>
              {data.pages.map((page) => (
                <React.Fragment key={page.next}>
                  {page.results?.map((planet) => (
                    <Planet
                      key={planet.name + planet.id}
                      to={`${planet.id}/residents`}
                    >
                      <Card>{planet.name}</Card>
                    </Planet>
                  ))}
                </React.Fragment>
              ))}
            </PlanetsList>
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
