import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../../common/redux/hooks";
import { usePlanetQuery } from "../services/planets";
import { useResidentQuery } from "../services/residents";
import { RouterParams } from "../types/routerParams";

const PlanetsWrapperStyles = styled.div`
  font-weight: 700;
  font-size: 1.7rem;

  a {
    position: relative;
    transition: color 0.2s;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      transform: scale(0, 1);
      height: 2px;
      bottom: -2px;
      left: 0;
      background-color: var(--color-yellow);
      transform-origin: bottom right;
      transition: transform 0.2s;
    }

    &:hover {
      color: var(--color-yellow);
    }

    &:hover::after {
      transform: scale(1, 1);
      transform-origin: bottom left;
    }
  }
`;

const PlanetsWrapper = (): JSX.Element => {
  const params = useParams<keyof RouterParams>() as RouterParams;
  const { planetId, residentId } = params;
  const planets = useAppSelector((state) => state.planets.value);
  const residents = useAppSelector((state) => state.residents.value);
  const currentPlanet = planets.find((p) => p.id === planetId);
  const currentResident = residents.find((r) => r.id === residentId);

  // Handles fetching the current planet if user refreshes the page
  // (we have no planets saved in redux).
  const enablePlanetQuery = currentPlanet === undefined && !!planetId;
  usePlanetQuery(planetId, enablePlanetQuery);

  // Handles fetching the current resident if user refreshes the page
  // (we have no residents saved in redux).
  const enableResidentQuery = currentResident === undefined && !!residentId;
  useResidentQuery(residentId, enableResidentQuery);

  return (
    <PlanetsWrapperStyles>
      <Link to="/planets">All Planets</Link>
      {currentPlanet && (
        <>
          {" / "}
          <Link to={`/planets/${currentPlanet.id}/residents`}>
            {currentPlanet.name}
          </Link>
        </>
      )}
      {currentPlanet && currentResident && (
        <>
          {" / "}
          <Link
            to={`/planets/${currentPlanet.id}/residents/${currentResident.id}`}
          >
            {currentResident.name}
          </Link>
        </>
      )}
    </PlanetsWrapperStyles>
  );
};

export default PlanetsWrapper;
