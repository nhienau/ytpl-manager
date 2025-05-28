import styled from "styled-components";
import Button from "../../ui/Button";
import { TopLevel } from "../../ui/TopLevel";
import ConfirmRevoke from "./ConfirmRevoke";

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonRevoke = styled(Button)`
  padding: 0.375rem 1.5rem;
  background-color: var(--color-red-200);

  &:not(:disabled):hover {
    background-color: var(--color-red-300);
  }
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
