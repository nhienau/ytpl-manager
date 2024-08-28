import styled from "styled-components";
import SidebarContent from "./SidebarContent";

const StyledSidebarMain = styled.div`
  background-color: var(--color-neutral-500);
  flex-grow: 1;
  overflow-y: auto;
`;

function SidebarMain() {
  return (
    <StyledSidebarMain>
      <SidebarContent />
    </StyledSidebarMain>
  );
}

export default SidebarMain;
