import styled from "styled-components";
import ButtonSidebar from "./ButtonSidebar";
import SidebarHead from "./SidebarHead";
import SidebarMain from "./SidebarMain";
import SidebarFooter from "./SidebarFooter";
import { TopLevel } from "./TopLevel";

const StyledSidebarMobile = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--color-neutral-200);
  width: 256px;
  height: 100vh;
  display: flex;
  flex-direction: column;

  @media (min-width: 80rem) {
    display: none;
  }
`;

function SidebarMobile() {
  return (
    <StyledSidebarMobile data-dropdown-id="user">
      <SidebarHead>
        <TopLevel.Close>
          <ButtonSidebar />
        </TopLevel.Close>
      </SidebarHead>
      <SidebarMain />
      <SidebarFooter />
    </StyledSidebarMobile>
  );
}

export default SidebarMobile;
