import { useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
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
import { useState } from "react";
import Button from "../ui/Button";

const StyledMainApp = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.25rem;
  @container (min-width: 50rem) {
    display: none;
  }
`;

interface TabProps {
  $isCurrentTab: boolean;
}

const Tab = styled(Button)<TabProps>`
  width: 100%;
  justify-content: center;

  ${(props) =>
    props.$isCurrentTab &&
    css`
      background-color: var(--color-neutral-300);
    `}
`;

const Container = styled.div`
  height: 100%;
  overflow: auto;

  @container (min-width: 50rem) {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr 1fr;
  }
`;

const Box = styled.div<TabProps>`
  height: 100%;
  overflow: auto;

  ${(props) =>
    props.$isCurrentTab === false &&
    css`
      display: none;
    `}

  @container (min-width: 50rem) {
    display: inline;
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
  const [currentTab, setCurrentTab] = useState("playlist");

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <StyledMainApp>
        <Tabs>
          <Tab
            $isCurrentTab={currentTab === "playlist"}
            onClick={() => setCurrentTab("playlist")}
          >
            Playlist
          </Tab>
          <Tab
            $isCurrentTab={currentTab === "queue"}
            onClick={() => setCurrentTab("queue")}
          >
            Queue
          </Tab>
        </Tabs>
        <Container>
          <QueueCheckboxesProvider<PlaylistItem> allElements={queue}>
            <Box $isCurrentTab={currentTab === "playlist"}>
              {hasPlaylist ? <PlaylistItemsTable /> : <GetStarted />}
            </Box>
            <Box $isCurrentTab={currentTab === "queue"}>
              <QueueTable />
            </Box>
          </QueueCheckboxesProvider>
        </Container>
      </StyledMainApp>
    </DndContext>
  );
}

export default MainApp;
