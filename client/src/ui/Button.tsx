import styled from "styled-components";

const Button = styled.button`
  text-align: left;
  background: none;
  border: none;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.5rem;
  border-radius: 0.5rem;

  & span {
    font-size: 0.875rem;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  & svg {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }

  &:not(:disabled):hover {
    background-color: var(--color-neutral-300);
  }

  &:disabled {
    color: var(--color-neutral-400);
    cursor: initial;
  }
`;

export default Button;
