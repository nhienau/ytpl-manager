import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useQueue } from "../context/QueueContext";
import { useDndItem } from "../context/DndItemContext";
import { DraggableData } from "../utils/types";

export function useDnd() {
  const { setActiveItem, setItemType, setActiveIndex } = useDndItem();
  const { add, insert, setQueue, queue } = useQueue();

  function reset() {
    setActiveItem(null);
    setItemType("");
    setActiveIndex(null);
  }

  function onDragStart(e: DragStartEvent) {
    const {
      active: { data },
    } = e;
    if (data.current?.type === "playlist-item") {
      setActiveItem(data.current?.item);
      setItemType("playlist-item");
      setActiveIndex(null);
    } else {
      const index = e.active.id as number;
      setActiveItem(queue[index]);
      setItemType("queue-item");
      setActiveIndex(index);
    }
  }

  function onDragEnd(e: DragEndEvent) {
    const {
      active: {
        data: { current },
      },
      over,
    } = e;
    const { item, type } = current as DraggableData;

    if (type === "playlist-item") {
      if (over?.id === "queue") {
        add([item]);
      } else if (Number.isInteger(over?.id)) {
        const overIndex = over?.id as number;
        insert(item, overIndex);
      }
    } else if (over?.id !== "queue") {
      const activeIndex = e.active.id as number;
      const overIndex = over?.id as number;
      if (!Number.isInteger(overIndex)) {
        reset();
        return;
      }
      if (activeIndex !== overIndex) {
        setQueue((prev) => arrayMove(prev, activeIndex, overIndex));
      }
    }

    reset();
  }

  function onDragCancel() {
    reset();
  }

  return { onDragStart, onDragEnd, onDragCancel };
}
