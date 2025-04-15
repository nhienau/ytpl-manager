import styled from "styled-components";
import { useQueue } from "../../context/QueueContext";
import QueueItem from "./QueueItem";
import { DragOverlay } from "@dnd-kit/core";
import { useDndItem } from "../../context/DndItemContext";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ForwardedRef, forwardRef } from "react";

const StyledQueueList = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

const QueueList = forwardRef(function QueueList(
  _,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { activeItem, itemType, activeIndex } = useDndItem();
  const { queue, sequence } = useQueue();

  return (
    <StyledQueueList ref={ref}>
      <SortableContext items={sequence} strategy={verticalListSortingStrategy}>
        {queue.map((item, index) => (
          <QueueItem key={item.id} playlistItem={item} index={index} />
        ))}
      </SortableContext>

      <DragOverlay dropAnimation={null}>
        {activeItem && itemType === "queue-item" && activeIndex !== null ? (
          <QueueItem playlistItem={activeItem} index={activeIndex} />
        ) : null}
      </DragOverlay>
    </StyledQueueList>
  );
});

export default QueueList;
