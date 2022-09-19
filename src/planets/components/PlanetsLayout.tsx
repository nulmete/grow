import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledPlanetsLayout = styled.div`
  max-width: 90vw;
  margin: 0 auto;
  width: 100%;
  padding: 2rem;
`;

const PlanetsLayout = (): JSX.Element => {
  return (
    <StyledPlanetsLayout>
      <Outlet />
    </StyledPlanetsLayout>
  );
};

export default PlanetsLayout;
