import { useLocation } from "react-router-dom";
import styled from "styled-components";
import GetStarted from "../ui/GetStarted";
import PlaylistItemsTable from "../features/playlistItems/PlaylistItemsTable";
import QueueTable from "../features/queue/QueueTable";

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
  const { pathname } = useLocation();
  const hasPlaylist = pathname.toLowerCase().startsWith("/app/playlist");

  return (
    <Container>
      {hasPlaylist ? <PlaylistItemsTable /> : <GetStarted />}
      <QueueTable />
    </Container>
  );
}

export default MainApp;
