import styled from "styled-components";

export default styled.button`
  cursor: pointer;
  background: none;
  background-color: var(--color-gray);
  border: none;
  border: 1px solid var(--color-lightgray);
  border-radius: 5px;
  color: var(--color-lightgray);
  font: inherit;
  font-weight: 700;
  text-transform: uppercase;
  padding: 1.5rem;

  &:not(:disabled):hover {
    color: var(--color-yellow);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
