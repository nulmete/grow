import React, { useState } from "react";
import { usePlanetsQuery } from "./services/planets";

const Planets = (): JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const { data, error, isLoading } = usePlanetsQuery(page);

  return (
    <>
      <div>Search input</div>
      <div>
        {error && <div>Error</div>}
        {isLoading && <div>Loading...</div>}
        {!!data && !!data.results && data.results.length > 0 && (
          <div>
            {data.results.map((planet, index) => (
              <div>Planet: {planet.name}</div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Planets;
