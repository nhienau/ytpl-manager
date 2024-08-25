import styled from "styled-components";
import { useSidebar } from "../context/SidebarContext";
import TopLevel from "./TopLevel";
import SidebarMobile from "./SidebarMobile";
import { useLogout } from "../features/authentication/useLogout";
import Modal from "./Modal";
import ButtonSidebar from "./ButtonSidebar";

const StyledHeader = styled.header`
  background-color: var(--color-neutral-100);
  height: 4rem;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;

  @media (min-width: 50rem) {
    justify-content: ${(props) =>
      props.$isOpen ? "flex-end" : "space-between"};
  }
`;

const StyledButtonSidebar = styled(ButtonSidebar)`
  display: none;

  @media (min-width: 50rem) {
    display: ${(props) => (props.$isOpen ? "none" : "flex")};
  }
`;

const StyledButtonSidebarMobile = styled(ButtonSidebar)`
  @media (min-width: 50rem) {
    display: none;
  }
`;

function AppHeader() {
  const { isOpen, toggleSidebar } = useSidebar();
  const { logout, isPending: isLoggingOut } = useLogout();

  return (
    <StyledHeader $isOpen={isOpen}>
      <TopLevel>
        <StyledButtonSidebar onClick={toggleSidebar} $isOpen={isOpen} />

        <TopLevel.Open opens="sidebar">
          <StyledButtonSidebarMobile />
        </TopLevel.Open>

        <TopLevel.Window name="sidebar">
          <SidebarMobile />
        </TopLevel.Window>

        <TopLevel.Window name="settings">
          <Modal />
        </TopLevel.Window>
      </TopLevel>
      <button onClick={logout}>Log out</button>
    </StyledHeader>
  );
}

export default AppHeader;
