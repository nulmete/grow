import React from "react";
import { useParams } from "react-router-dom";

const PlanetResidents = (): JSX.Element => {
  const params = useParams();
  const { planetName } = params;
  return <div>List of residents for planet: {planetName}</div>;
};

export default PlanetResidents;
