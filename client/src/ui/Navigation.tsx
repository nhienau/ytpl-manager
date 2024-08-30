import { NavLink } from "react-router-dom";
import styled from "styled-components";
import ButtonLogin from "./ButtonLogin";

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
    <StyledNav>
      <StyledList>
        <StyledListItem>
          <StyledNavLink to="/">Home</StyledNavLink>
        </StyledListItem>
        <StyledButtonGroup>
          <StyledListItem>
            <button>Dark mode</button>
          </StyledListItem>
          <ButtonLogin />
        </StyledButtonGroup>
      </StyledList>
    </StyledNav>
  );
}

export default Navigation;
