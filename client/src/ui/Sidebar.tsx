import styled, { css } from "styled-components";
import { useSidebar } from "../context/SidebarContext";
import SidebarContent from "./SidebarContent";
import SidebarHead from "./SidebarHead";
import ButtonSidebar from "./ButtonSidebar";

const sidebar = css`
  visibility: visible;
  width: 240px;
  border-right: 1px solid var(--color-neutral-300);
`;

const sidebarHidden = css`
  width: 0;
  visibility: hidden;
`;

const StyledSidebar = styled.aside`
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
      <SidebarContent />
    </StyledSidebar>
  );
}

export default Sidebar;
