import styled from "styled-components";
import RevokeAccess from "../features/revoke/RevokeAccess";

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

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function Settings() {
  return (
    <StyledSettings>
      <Heading>Settings</Heading>
      <Main>
        <RevokeAccess />
      </Main>
    </StyledSettings>
  );
}

export default Settings;
