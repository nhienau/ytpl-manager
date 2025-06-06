import styled from "styled-components";
import RevokeAccess from "../features/revoke/RevokeAccess";
import Menus from "../ui/Menus";
import ThemeSettings from "../ui/ThemeSettings";

const StyledSettings = styled.div`
  max-width: 45rem;
  margin: 0 auto;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Heading = styled.h2`
  font-size: 2rem;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function Settings() {
  return (
    <StyledSettings data-dropdown-id="settings">
      <Heading>Settings</Heading>
      <Menus>
        <Group>
          <ThemeSettings />
        </Group>
        <Group>
          <RevokeAccess />
        </Group>
      </Menus>
    </StyledSettings>
  );
}

export default Settings;
