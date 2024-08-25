import styled from "styled-components";
import Navigation from "./Navigation";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
`;

function Header() {
  return (
    <StyledHeader>
      <Navigation />
    </StyledHeader>
  );
}

export default Header;
