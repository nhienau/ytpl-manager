import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import GetStarted from "../ui/GetStarted";
import PlaylistItemsTable from "../features/playlistItems/PlaylistItemsTable";
import QueueTable from "../features/queue/QueueTable";
import { useQueue } from "../context/QueueContext";
import { QueueCheckboxesProvider } from "../context/QueueCheckboxesContext";
import { PlaylistItem } from "../utils/types";
import { useDnd } from "../hooks/useDnd";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;

  @container (min-width: 50rem) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

function MainApp() {
  const { onDragStart, onDragEnd, onDragCancel } = useDnd();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const { pathname } = useLocation();
  const { queue } = useQueue();
  const hasPlaylist = pathname.toLowerCase().startsWith("/app/playlist");

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <Container>
        <QueueCheckboxesProvider<PlaylistItem> allElements={queue}>
          {hasPlaylist ? <PlaylistItemsTable /> : <GetStarted />}
          <QueueTable />
        </QueueCheckboxesProvider>
      </Container>
    </DndContext>
  );
}

export default MainApp;
