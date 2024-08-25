import styled from "styled-components";
import SidebarContent from "./SidebarContent";
import Menus from "./Menus";
import {
  HiEllipsisVertical,
  HiOutlineCog8Tooth,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import UserAvatar from "./UserAvatar";
import { useLogout } from "../features/authentication/useLogout";
import TopLevel from "./TopLevel";
import ButtonSidebar from "./ButtonSidebar";
import SidebarHead from "./SidebarHead";

const StyledSidebarMobile = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--color-neutral-100);
  width: 240px;
  height: 100vh;

  @media (min-width: 50rem) {
    display: none;
  }
`;

const StyledSidebarLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const StyledSidebarFooter = styled.div``;

const StyledSidebarMain = styled.div`
  background-color: var(--color-neutral-500);
  flex-grow: 1;
  overflow-y: auto;
`;

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
  margin-bottom: 0.4rem;
  padding: 0.25rem;
  background-color: #fff;
  box-shadow: var(--shadow-lg);
  border-radius: 0.5rem;
  border: 1px solid var(--color-neutral-300);
`;

const StyledDropdownButton = styled(Menus.Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 100%;

  & span {
    font-size: 0.875rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }

  &:hover {
    background-color: var(--color-neutral-300);
  }
`;

function SidebarMobile({ onClose }) {
  const { logout, isPending: isLoggingOut } = useLogout();

  return (
    <StyledSidebarMobile id="dropdown-user">
      <StyledSidebarLayout>
        <SidebarHead>
          <ButtonSidebar onClick={onClose} />
        </SidebarHead>
        <StyledSidebarMain>
          <p>Main</p>
          <SidebarContent />
        </StyledSidebarMain>
        <StyledSidebarFooter>
          <Menus>
            <StyledMenu>
              <StyledToggle id="profile">
                <UserAvatar />
                <HiEllipsisVertical />
              </StyledToggle>

              <StyledList id="profile" domNodeId="dropdown-user">
                <TopLevel.Open opens="settings">
                  <StyledDropdownButton icon={<HiOutlineCog8Tooth />}>
                    Settings
                  </StyledDropdownButton>
                </TopLevel.Open>

                <StyledDropdownButton
                  icon={<HiOutlineArrowRightOnRectangle />}
                  onClick={logout}
                >
                  Log out
                </StyledDropdownButton>
              </StyledList>
            </StyledMenu>
          </Menus>
        </StyledSidebarFooter>
      </StyledSidebarLayout>
    </StyledSidebarMobile>
  );
}

export default SidebarMobile;
