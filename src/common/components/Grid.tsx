import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-gap: 3rem;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));
`;

export const GridItem = styled.div`
  min-height: 35vh;
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  text-align: center;
  text-transform: uppercase;
`;
