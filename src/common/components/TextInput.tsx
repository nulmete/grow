import React from "react";
import styled from "styled-components";

const TextInput = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
): JSX.Element => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <input {...props} />;
};

const TextInputStyles = styled(TextInput)`
  color: var(--color-black);
  font: inherit;
  border: 1px solid var(--color-lightgray);
  border-radius: 5px;
  padding: 1rem;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export default TextInputStyles;
