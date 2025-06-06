import styled from "styled-components";
import QueueHead from "./QueueHead";
import QueueList from "./QueueList";
import { useQueue } from "../../context/QueueContext";
import QueueActions from "./QueueActions";
import Menus from "../../ui/Menus";
import { useDroppable } from "@dnd-kit/core";

const StyledQueueTable = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: var(--color-neutral-100);
  border: 1px solid var(--color-neutral-300);
  border-radius: 0.625rem;
  height: 100%;
  overflow: auto;
`;

const StyledEmptyQueue = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: var(--color-neutral-200);
  border: 1px solid var(--color-neutral-300);
  border-radius: 0.625rem;
  height: 100%;
  overflow: auto;
`;

function QueueTable() {
  const { setNodeRef } = useDroppable({
    id: "queue",
  });
  const { queue } = useQueue();

  if (queue.length === 0) {
    return (
      <StyledEmptyQueue ref={setNodeRef}>
        <p>The queue is empty</p>
      </StyledEmptyQueue>
    );
  }

  return (
    <StyledQueueTable data-dropdown-id="queue-table">
      <QueueHead />
      <Menus>
        <QueueList ref={setNodeRef} />
      </Menus>
      <QueueActions />
    </StyledQueueTable>
  );
}

export default QueueTable;
