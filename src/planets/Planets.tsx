/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { usePlanetsQuery } from "./services/planets";
import { Planet } from "./types/planet";

const Planets = (): JSX.Element => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const {
    data,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = usePlanetsQuery();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const handlePlanetClick = (planet: Planet) => {
    navigate(`${planet.name}/residents`);
  };

  return (
    <>
      <div>Search input</div>
      <div>
        {error && <div>Error</div>}
        {isLoading && <div>Loading...</div>}
        {!!data && (
          <>
            <div>
              <button
                type="button"
                onClick={() => fetchPreviousPage()}
                disabled={!hasPreviousPage || isFetchingPreviousPage}
              >
                {isFetchingPreviousPage
                  ? "Loading more..."
                  : hasPreviousPage
                  ? "Load Older"
                  : "Nothing more to load"}
              </button>
            </div>
            <div>
              {data.pages.map((page) => (
                <React.Fragment key={page.next}>
                  {page.results?.map((planet, index) => (
                    <div
                      style={{
                        border: "1px solid gray",
                        borderRadius: "5px",
                        padding: "10rem 1rem",
                        margin: "1rem",
                        background: "#ccc",
                      }}
                      key={planet.name}
                    >
                      Planet name: {planet.name}
                      <button
                        type="button"
                        onClick={() => handlePlanetClick(planet)}
                      >
                        Go
                      </button>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
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
