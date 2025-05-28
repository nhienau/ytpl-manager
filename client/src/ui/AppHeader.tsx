import styled from "styled-components";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { useChannelInfo } from "../features/authentication/useChannelInfo";
import { useLogout } from "../features/authentication/useLogout";
import { useSidebar } from "../context/SidebarContext";
import Avatar from "./Avatar";
import ButtonSidebar from "./ButtonSidebar";
import Menus from "./Menus";
import SidebarMobile from "./SidebarMobile";
import { TopLevel } from "./TopLevel";
import UserInfo from "./UserInfo";
import Divider from "./Divider";

interface StyledHeaderProps {
  $isOpen?: boolean;
}

const StyledHeader = styled.header<StyledHeaderProps>`
  background-color: var(--color-neutral-100);
  height: 4rem;
  position: sticky;
  top: 0;
  z-index: 1;
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

StyledHeader.defaultProps = {
  $isOpen: false,
};

interface StyledButtonSidebarProps {
  $isOpen?: boolean;
}

const StyledButtonSidebar = styled(ButtonSidebar)<StyledButtonSidebarProps>`
  display: none;

  @media (min-width: 50rem) {
    display: ${(props) => (props.$isOpen ? "none" : "flex")};
  }
`;

StyledButtonSidebar.defaultProps = {
  $isOpen: false,
};

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
  const { logout } = useLogout();

  const { data: channel } = useChannelInfo();
  if (!channel) return null;
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
