import styled from "styled-components";
import QueueHead from "./QueueHead";
import QueueList from "./QueueList";
import { CheckboxesProvider } from "../../context/CheckboxesContext";
import { useQueue } from "../../context/QueueContext";
import QueueActions from "./QueueActions";
import { PlaylistItem } from "../../utils/types";

const StyledQueueTable = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: var(--color-neutral-100);
`;

const StyledEmptyQueue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: var(--color-neutral-200);
  border: 1px solid var(--color-neutral-400);
  border-radius: 0.625rem;
  height: 100%;
`;

function QueueTable() {
  const { queue } = useQueue();

  if (queue.length === 0) {
    return (
      <StyledEmptyQueue>
        <p>The queue is empty</p>
      </StyledEmptyQueue>
    );
  }

  return (
    <StyledQueueTable>
      <CheckboxesProvider<PlaylistItem> allElements={queue}>
        <QueueHead />
        <QueueList />
        <QueueActions />
      </CheckboxesProvider>
    </StyledQueueTable>
  );
}

export default QueueTable;
