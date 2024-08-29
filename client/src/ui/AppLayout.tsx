import { Outlet } from "react-router-dom";
import styled from "styled-components";
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
  overflow: auto;
  flex-grow: 1;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Sidebar />
      <StyledMainContent>
        <AppHeader />
        <StyledMain>
          <Outlet />
        </StyledMain>
      </StyledMainContent>
    </StyledAppLayout>
  );
}

export default AppLayout;
