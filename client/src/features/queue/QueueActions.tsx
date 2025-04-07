import styled from "styled-components";
import Button from "../../ui/Button";
import ModalAdd from "../add/ModalAdd";
import { TopLevel } from "../../ui/TopLevel";
import { useCheckboxes } from "../../context/CheckboxesContext";
import ModalRemove from "../remove/ModalRemove";

const StyledQueueActions = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const ActionButton = styled(Button)`
  background-color: var(--color-neutral-300);

  &:hover {
    background-color: var(--color-neutral-400);
  }

  &:disabled {
    background-color: var(--color-neutral-300);
  }
`;

function QueueActions() {
  const { checked } = useCheckboxes();

  return (
    <StyledQueueActions>
      <TopLevel>
        <TopLevel.Window name="remove">
          <ModalRemove />
        </TopLevel.Window>

        <TopLevel.Open opens="remove">
          {checked.length > 0 ? (
            <ActionButton>Remove selected</ActionButton>
          ) : (
            <ActionButton>Remove all</ActionButton>
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
