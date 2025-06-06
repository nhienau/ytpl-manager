import styled from "styled-components";
import { TopLevel } from "../../ui/TopLevel";
import ConfirmRevoke from "./ConfirmRevoke";
import ButtonDanger from "../../ui/ButtonDanger";

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonRevoke = styled(ButtonDanger)`
  padding: 0.375rem 1.5rem;
`;

const Description = styled.p`
  margin-top: 0.375rem;
  font-size: 0.875rem;
`;

function RevokeAccess() {
  return (
    <div>
      <Box>
        <span>Revoke access</span>
        <TopLevel>
          <TopLevel.Window name="revoke">
            <ConfirmRevoke />
          </TopLevel.Window>
          <TopLevel.Open opens="revoke">
            <ButtonRevoke>Revoke</ButtonRevoke>
          </TopLevel.Open>
        </TopLevel>
      </Box>
      <Description>
        Remove access to this application. You'll be logged out but can
        re-authenticate anytime.
      </Description>
    </div>
  );
}

export default RevokeAccess;
