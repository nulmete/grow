/* eslint-disable camelcase */
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../../common/redux/hooks";
import { Resident } from "../types/resident";
import { RouterParams } from "../types/routerParams";

const ResidentDetailsStyles = styled.div`
  background-color: var(--color-gray);
  padding: 1.5rem;

  & > p > span {
    font-weight: 700;
  }
`;

type ResidentDetails = Omit<
  Resident,
  | "homeworld"
  | "films"
  | "species"
  | "vehicles"
  | "starships"
  | "created"
  | "edited"
  | "url"
>;

const PlanetResident = (): JSX.Element => {
  const params = useParams<keyof RouterParams>() as RouterParams;
  const { residentId } = params;

  const currentResident = useAppSelector((state) =>
    state.residents.value.find((resident) => resident.id === residentId)
  ) as ResidentDetails;

  const {
    name,
    gender,
    birth_year,
    height,
    mass,
    skin_color,
    hair_color,
    eye_color,
  } = currentResident;

  return (
    <>
      <ResidentDetailsStyles>
        <p>
          <span>Name:</span> {name}
        </p>
        <p>
          <span>Gender:</span> {gender}
        </p>
        <p>
          <span>Birth year:</span> {birth_year}
        </p>
        <p>
          <span>Height:</span> {height}
        </p>
        <p>
          <span>Mass:</span> {mass}
        </p>
        <p>
          <span>Skin color:</span> {skin_color}
        </p>
        <p>
          <span>Hair color:</span> {hair_color}
        </p>
        <p>
          <span>Eye color:</span> {eye_color}
        </p>
      </ResidentDetailsStyles>
    </>
  );
};

export default PlanetResident;
