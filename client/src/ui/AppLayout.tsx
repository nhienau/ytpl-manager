import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { PlaylistProvider } from "../context/PlaylistOperationsContext";
import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";

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
  background-color: var(--color-neutral-200);
  padding: 2.5rem 4rem 3rem;
  overflow: auto;
  flex-grow: 1;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
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
              <Outlet />
            </Container>
          </StyledMain>
        </StyledMainContent>
      </StyledAppLayout>
    </PlaylistProvider>
  );
}

export default AppLayout;
