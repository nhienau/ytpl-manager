import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";

const StyledLoginLink = styled(Link)`
  padding: 0.5rem 1.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  max-width: 15rem;
  border: 1px solid var(--color-neutral-400);
  border-radius: 0.375rem;

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

function LoginForm() {
  return (
    <StyledLoginLink to="/login/google">
      <FcGoogle />
      <span>Sign in with Google</span>
    </StyledLoginLink>
  );
}

export default LoginForm;
