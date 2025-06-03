import styled from "styled-components";

const FormInput = styled.input`
  background: none;
  border: none;
  border-radius: 0.375rem;
  border: 1px solid var(--color-neutral-400);
  padding: 0.375rem;
  transition: none;
  color: var(--color-neutral-800);

  &:focus {
    outline: none;
    border: 1px solid var(--color-neutral-800);
  }
`;

export default FormInput;
