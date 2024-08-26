import styled from "styled-components";
import {
  HiEllipsisVertical,
  HiOutlineCog8Tooth,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { useLogout } from "../features/authentication/useLogout";
import ButtonSidebar from "./ButtonSidebar";
import Menus from "./Menus";
import SidebarHead from "./SidebarHead";
import SidebarMain from "./SidebarMain";
import TopLevel from "./TopLevel";
import UserAvatar from "./UserAvatar";

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

const SidebarFooter = styled.div``;

const StyledMenu = styled(Menus.Menu)`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;
`;

const StyledToggle = styled(Menus.Toggle)`
  background: none;
  border: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.75rem;

  &:hover {
    background-color: var(--color-neutral-300);
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
  }
`;

const StyledList = styled(Menus.List)`
  width: calc(240px - 1rem);
  padding: 0.25rem;
  background-color: #fff;
  box-shadow: var(--shadow-lg);
  border-radius: 0.5rem;
  border: 1px solid var(--color-neutral-300);
`;

function SidebarMobile({ onClose }) {
  const { logout, isPending: isLoggingOut } = useLogout();

  return (
    <StyledSidebarMobile id="dropdown-user">
      <SidebarHead>
        <ButtonSidebar onClick={onClose} />
      </SidebarHead>
      <SidebarMain />
      <SidebarFooter>
        <Menus>
          <StyledMenu>
            <StyledToggle id="profile" variation="dropup" alignment="left">
              <UserAvatar />
              <HiEllipsisVertical />
            </StyledToggle>

            <StyledList id="profile" domNodeId="dropdown-user">
              <TopLevel.Open opens="settings">
                <Menus.Button icon={<HiOutlineCog8Tooth />}>
                  Settings
                </Menus.Button>
              </TopLevel.Open>

              <Menus.Button
                icon={<HiOutlineArrowRightOnRectangle />}
                onClick={logout}
              >
                Log out
              </Menus.Button>
            </StyledList>
          </StyledMenu>
        </Menus>
      </SidebarFooter>
    </StyledSidebarMobile>
  );
}

export default SidebarMobile;
