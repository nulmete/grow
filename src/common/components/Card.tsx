import React from "react";
import styled from "styled-components";

const Card = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <div {...props}>{children}</div>;
};

const StyledCard = styled(Card)`
  border: 1px solid var(--color-lightgray);
  border-radius: 5px;
  padding: 5rem;
  background-color: var(--color-gray);
`;

export default StyledCard;
