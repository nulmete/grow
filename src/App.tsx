import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  background-color: #ccc;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 2rem;
  }
`;

const App = (): JSX.Element => {
  return (
    <StyledDiv>
      <p>app</p>
    </StyledDiv>
  );
};

export default App;
