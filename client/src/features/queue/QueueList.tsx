import styled from "styled-components";
import { useQueue } from "../../context/QueueContext";
import QueueItem from "./QueueItem";

const StyledQueueList = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

function QueueList() {
  const { queue } = useQueue();

  if (queue.length === 0) {
    return <div>no items</div>;
  }

  return (
    <StyledQueueList>
      {queue.map((item) => (
        <QueueItem key={item.id} playlistItem={item} />
      ))}
    </StyledQueueList>
  );
}

export default QueueList;
