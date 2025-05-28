import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";

const StyledLoginLink = styled(Link)`
  padding: 0.5rem 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--color-neutral-300);
  border-radius: 0.5rem;

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:not(:disabled):hover {
    background-color: var(--color-neutral-300);
  }
`;

function LoginForm() {
  return (
    <StyledLoginLink to="/login/google">
      <FcGoogle />
      <span>Continue with Google</span>
    </StyledLoginLink>
  );
}

export default LoginForm;
