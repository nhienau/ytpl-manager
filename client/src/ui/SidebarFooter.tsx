import styled from "styled-components";
import {
  HiEllipsisVertical,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { useLogout } from "../features/authentication/useLogout";
import UserInfo from "./UserInfo";
import Menus from "./Menus";
import Divider from "./Divider";

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
  width: 17rem;
  padding: 0.375rem;
  background-color: #fff;
  box-shadow: var(--shadow-lg);
  border-radius: 0.5rem;
  border: 1px solid var(--color-neutral-300);
`;

const UserInfoContainer = styled.div`
  padding: 0.25rem;
`;

function SidebarFooter() {
  const { logout } = useLogout();

  return (
    <div>
      <Menus>
        <StyledMenu>
          <StyledToggle id="profile" variation="dropup" alignment="left">
            <UserInfo displayCustomUrl={false} />
            <HiEllipsisVertical />
          </StyledToggle>

          <StyledList id="profile" domNodeId="user">
            <UserInfoContainer>
              <UserInfo customUrlSize={0.875} />
            </UserInfoContainer>

            <Divider />

            <Menus.Button
              icon={<HiOutlineArrowRightOnRectangle />}
              onClick={logout}
            >
              Log out
            </Menus.Button>
          </StyledList>
        </StyledMenu>
      </Menus>
    </div>
  );
}

export default SidebarFooter;
