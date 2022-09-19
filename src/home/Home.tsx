import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../common/components";

const HomeStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Home = (): JSX.Element => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("planets");
  };
  return (
    <HomeStyles>
      <Button type="button" onClick={handleClick}>
        Get started
      </Button>
    </HomeStyles>
  );
};

export default Home;
