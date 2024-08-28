import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useChannelInfo } from "../features/authentication/useChannelInfo";
import UserInfo from "./UserInfo";
import { useLogout } from "../features/authentication/useLogout";

const StyledNav = styled.nav`
  padding: 0.75rem;
`;

const StyledList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const StyledListItem = styled.li`
  padding: 0.5rem;
`;

const StyledNavLink = styled(NavLink)`
  color: var(--color-neutral-600);

  &:hover,
  &:active,
  &.active {
    color: var(--color-neutral-800);
  }
`;

function Navigation() {
  // isLoading
  const { channel, isAuthenticated } = useChannelInfo();
  const { logout, isPending } = useLogout();

  return (
    <StyledNav>
      <StyledList>
        <StyledListItem>
          <StyledNavLink to="/">Home</StyledNavLink>
        </StyledListItem>
        <StyledButtonGroup>
          {isAuthenticated ? (
            <>
              <UserInfo />
              <StyledListItem>
                <StyledNavLink to="/app">Go to app</StyledNavLink>
              </StyledListItem>
              <StyledListItem>
                <button onClick={logout}>Log out</button>
              </StyledListItem>
            </>
          ) : (
            <StyledListItem>
              <StyledNavLink to="/login">Login</StyledNavLink>
            </StyledListItem>
          )}
          <StyledListItem>
            <button>Dark mode</button>
          </StyledListItem>
        </StyledButtonGroup>
      </StyledList>
    </StyledNav>
  );
}

export default Navigation;
