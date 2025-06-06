import { HiOutlineXMark } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import { TopLevel, useTopLevel } from "../../ui/TopLevel";
import styled from "styled-components";
import Button from "../../ui/Button";
import { useRevoke } from "./useRevoke";
import ButtonDanger from "../../ui/ButtonDanger";

const Box = styled.div`
  max-width: 30rem;
`;

const ButtonClose = styled(Button)`
  position: absolute;
  top: 0.375rem;
  right: 0.375rem;
  padding: 0.5rem;
  border-radius: 50%;
`;

const Text = styled.p`
  margin-bottom: 0.75rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
`;

const StyledButton = styled(Button)`
  padding: 0.375rem 1.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-neutral-200);
`;

const Heading = styled.h2`
  font-size: 1.5rem;
`;

const ButtonRevoke = styled(ButtonDanger)`
  padding: 0.375rem 1.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ConfirmRevoke() {
  const { close } = useTopLevel();
  const { revoke, isPending } = useRevoke();

  return (
    <Modal>
      <Box>
        <TopLevel.Close>
          <ButtonClose>
            <HiOutlineXMark />
          </ButtonClose>
        </TopLevel.Close>
        <Heading>Revoke access</Heading>
        <Text>You'll be logged out but can re-authenticate anytime.</Text>
        <ButtonContainer>
          <StyledButton onClick={close} disabled={isPending}>
            Cancel
          </StyledButton>
          <ButtonRevoke
            onClick={() => {
              revoke();
            }}
            disabled={isPending}
          >
            Revoke
          </ButtonRevoke>
        </ButtonContainer>
      </Box>
    </Modal>
  );
}

export default ConfirmRevoke;
