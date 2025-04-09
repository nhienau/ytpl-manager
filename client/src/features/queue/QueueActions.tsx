import styled from "styled-components";
import Button from "../../ui/Button";
import ModalAdd from "../add/ModalAdd";
import { TopLevel } from "../../ui/TopLevel";
import ModalRemove from "../remove/ModalRemove";
import { useQueueCheckboxes } from "../../context/QueueCheckboxesContext";

const StyledQueueActions = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const ActionButton = styled(Button)`
  background-color: var(--color-neutral-300);

  &:not(:disabled):hover {
    background-color: var(--color-neutral-400);
  }
`;

const ButtonRemove = styled(ActionButton)`
  background-color: var(--color-red-200);

  &:not(:disabled):hover {
    background-color: var(--color-red-300);
  }
`;

function QueueActions() {
  const { checked } = useQueueCheckboxes();

  return (
    <StyledQueueActions>
      <TopLevel>
        <TopLevel.Window name="remove">
          <ModalRemove />
        </TopLevel.Window>

        <TopLevel.Open opens="remove">
          {checked.length > 0 ? (
            <ButtonRemove>Remove selected</ButtonRemove>
          ) : (
            <ButtonRemove>Remove all</ButtonRemove>
          )}
        </TopLevel.Open>

        <TopLevel.Window name="form">
          <ModalAdd />
        </TopLevel.Window>
        <TopLevel.Open opens="form">
          {checked.length > 0 ? (
            <ActionButton>Add selected to...</ActionButton>
          ) : (
            <ActionButton>Add all to...</ActionButton>
          )}
        </TopLevel.Open>
      </TopLevel>
    </StyledQueueActions>
  );
}

export default QueueActions;
