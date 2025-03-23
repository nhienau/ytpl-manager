import { HiOutlineArrowsUpDown, HiOutlineHome } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledAppNavigation = styled.div`
  margin: 0.5rem;
  margin-bottom: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

const Link = styled(NavLink)`
  text-align: left;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;

  &:hover,
  &.active {
    background-color: var(--color-neutral-300);
  }

  & svg {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }
`;

function AppNavigation() {
  return (
    <StyledAppNavigation>
      <Link to="/app" title="Home" end>
        <HiOutlineHome />
        <span>Home</span>
      </Link>
      <Link to="/app/operations" title="Operations" end>
        <HiOutlineArrowsUpDown />
        <span>Operations</span>
      </Link>
    </StyledAppNavigation>
  );
}

export default AppNavigation;
