import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const StyledMainLayout = styled.div`
  max-width: 90rem;
  margin: 0 auto;
`;

const StyledMain = styled.main`
  padding: 1.25rem 1rem;
`;

function MainLayout() {
  return (
    <StyledMainLayout>
      <Header />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledMainLayout>
  );
}

export default MainLayout;
