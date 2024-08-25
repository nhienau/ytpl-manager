import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";

const StyledLayout = styled.div`
  display: flex;
  justify-content: center;
`;

function Login() {
  return (
    <StyledLayout>
      <LoginForm />
    </StyledLayout>
  );
}

export default Login;
