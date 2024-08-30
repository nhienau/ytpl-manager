import styled from "styled-components";
import SidebarContent from "./SidebarContent";

const StyledSidebarMain = styled.div`
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
