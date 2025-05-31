import { Navigate, NavLink } from "react-router-dom";
import styled from "styled-components";
import { useChannelInfo } from "../features/authentication/useChannelInfo";
import SpinnerMini from "./SpinnerMini";

const StyledListItem = styled.li`
  display: flex;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  color: var(--color-neutral-600);

  &:hover,
  &:active,
  &.active {
    color: var(--color-neutral-800);
  }
`;

function ButtonLogin() {
  const { isPending, isAuthenticated } = useChannelInfo();

  if (isPending)
    return (
      <StyledListItem>
        <SpinnerMini $size={1.75} />
      </StyledListItem>
    );
  else if (isAuthenticated) {
    return <Navigate to="/app" replace={true} />;
  } else {
    return (
      <StyledListItem>
        <StyledNavLink to="/login">Login</StyledNavLink>
      </StyledListItem>
    );
  }
}

export default ButtonLogin;
