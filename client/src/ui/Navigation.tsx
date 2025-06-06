import { NavLink } from "react-router-dom";
import styled from "styled-components";
import ButtonLogin from "./ButtonLogin";
import NavThemeButton from "./NavThemeButton";

const StyledNav = styled.nav`
  padding: 0.75rem 1rem;
`;

const StyledList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

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

function Navigation() {
  return (
    <StyledNav data-dropdown-id="nav-theme">
      <StyledList>
        <StyledListItem>
          <StyledNavLink to="/">Home</StyledNavLink>
        </StyledListItem>
        <StyledButtonGroup>
          <StyledListItem>
            <NavThemeButton />
          </StyledListItem>
          <ButtonLogin />
        </StyledButtonGroup>
      </StyledList>
    </StyledNav>
  );
}

export default Navigation;
