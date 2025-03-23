import styled from "styled-components";
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineCog8Tooth,
} from "react-icons/hi2";
import { useChannelInfo } from "../features/authentication/useChannelInfo";
import { useLogout } from "../features/authentication/useLogout";
import { useSidebar } from "../context/SidebarContext";
import Avatar from "./Avatar";
import ButtonSidebar from "./ButtonSidebar";
import Menus from "./Menus";
import Modal from "./Modal";
import SidebarMobile from "./SidebarMobile";
import { TopLevel } from "./TopLevel";
import UserInfo from "./UserInfo";
import Divider from "./Divider";

const StyledHeader = styled.header`
  background-color: var(--color-neutral-100);
  height: 4rem;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  flex-shrink: 0;

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

const StyledButtonUserContainer = styled(Menus.Menu)`
  display: flex;
  align-items: center;
`;

const StyledButtonUser = styled(Menus.Toggle)`
  background: none;
  border: none;
  display: none;

  @media (min-width: 50rem) {
    display: inline-block;
  }
`;

const UserInfoContainer = styled.div`
  padding: 0.25rem;
`;

const StyledList = styled(Menus.List)`
  width: 17rem;
  padding: 0.375rem;
  background-color: #fff;
  box-shadow: var(--shadow-lg);
  border-radius: 0.5rem;
  border: 1px solid var(--color-neutral-300);
`;

function AppHeader() {
  const { isOpen, toggleSidebar } = useSidebar();
  const { logout, isPending: isLoggingOut } = useLogout();

  const { data: channel } = useChannelInfo();
  const avatarUrl = channel.thumbnails.default.url;

  return (
    <StyledHeader $isOpen={isOpen}>
      <StyledButtonSidebar onClick={toggleSidebar} $isOpen={isOpen} />
      <TopLevel>
        <TopLevel.Open opens="sidebar">
          <StyledButtonSidebarMobile />
        </TopLevel.Open>

        <TopLevel.Window name="sidebar" $viewport="small">
          <SidebarMobile />
        </TopLevel.Window>

        <TopLevel.Window name="settings">
          <Modal />
        </TopLevel.Window>
        <Menus>
          <StyledButtonUserContainer data-dropdown-id="profile">
            <StyledButtonUser id="profile" alignment="right">
              <Avatar src={avatarUrl} alt={`Avatar of ${name}`} />
            </StyledButtonUser>

            <StyledList id="profile" domNodeId="profile">
              <UserInfoContainer>
                <UserInfo avatarSize={2.625} />
              </UserInfoContainer>

              <Divider />

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
          </StyledButtonUserContainer>
        </Menus>
      </TopLevel>
    </StyledHeader>
  );
}

export default AppHeader;
