import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { PlaylistProvider } from "../context/PlaylistOperationsContext";
import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";
import { QueueProvider } from "../context/QueueContext";
import { VideoOperationsProvider } from "../context/VideoOperationsContext";
import { WorkerProvider } from "../context/WorkerContext";
import { DndItemProvider } from "../context/DndItemContext";

const StyledAppLayout = styled.div`
  height: 100vh;
  display: flex;
`;

const StyledMainContent = styled.div`
  width: 100%;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
`;

const StyledMain = styled.main`
  background-color: var(--color-neutral-100);
  padding: 0.5rem;
  overflow: auto;
  flex-grow: 1;

  @media (min-width: 100rem) {
    padding: 2.5rem 3rem 3rem;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
  max-height: 70rem;

  container-type: inline-size;
`;

function AppLayout() {
  return (
    <PlaylistProvider>
      <StyledAppLayout>
        <Sidebar />
        <StyledMainContent>
          <AppHeader />
          <StyledMain>
            <Container>
              <WorkerProvider>
                <VideoOperationsProvider>
                  <QueueProvider>
                    <DndItemProvider>
                      <Outlet />
                    </DndItemProvider>
                  </QueueProvider>
                </VideoOperationsProvider>
              </WorkerProvider>
            </Container>
          </StyledMain>
        </StyledMainContent>
      </StyledAppLayout>
    </PlaylistProvider>
  );
}

export default AppLayout;
