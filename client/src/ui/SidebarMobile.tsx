import styled from "styled-components";
import ButtonSidebar from "./ButtonSidebar";
import SidebarHead from "./SidebarHead";
import SidebarMain from "./SidebarMain";
import SidebarFooter from "./SidebarFooter";

const StyledSidebarMobile = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--color-neutral-100);
  width: 240px;
  height: 100vh;
  display: flex;
  flex-direction: column;

  @media (min-width: 50rem) {
    display: none;
  }
`;

function SidebarMobile({ onClose }) {
  return (
    <StyledSidebarMobile data-dropdown-id="user">
      <SidebarHead>
        <ButtonSidebar onClick={onClose} />
      </SidebarHead>
      <SidebarMain />
      <SidebarFooter />
    </StyledSidebarMobile>
  );
}

export default SidebarMobile;
