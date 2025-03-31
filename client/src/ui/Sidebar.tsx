import styled, { css } from "styled-components";
import { useSidebar } from "../context/SidebarContext";
import ButtonSidebar from "./ButtonSidebar";
import SidebarHead from "./SidebarHead";
import SidebarMain from "./SidebarMain";

const sidebar = css`
  visibility: visible;
  width: 256px;
  border-right: 1px solid var(--color-neutral-300);

  display: flex;
  flex-direction: column;
`;

const sidebarHidden = css`
  width: 0;
  visibility: hidden;
  overflow: hidden;
`;

interface StyledSidebarProps {
  $isOpen: boolean;
}

const StyledSidebar = styled.aside<StyledSidebarProps>`
  background-color: var(--color-neutral-100);
  flex-shrink: 0;

  ${sidebarHidden}

  @media (min-width: 50rem) {
    ${(props) => (props.$isOpen ? sidebar : sidebarHidden)}
  }
`;

function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <StyledSidebar $isOpen={isOpen}>
      <SidebarHead>
        <ButtonSidebar onClick={toggleSidebar} />
      </SidebarHead>
      <SidebarMain />
    </StyledSidebar>
  );
}

export default Sidebar;
