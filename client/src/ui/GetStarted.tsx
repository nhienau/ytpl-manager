import styled from "styled-components";

const StyledGetStarted = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: var(--color-neutral-200);
  border: 1px solid var(--color-neutral-300);
  border-radius: 0.625rem;
  height: 100%;
`;

function GetStarted() {
  return (
    <StyledGetStarted>
      <p>No playlists selected. Start by selecting a playlist.</p>
    </StyledGetStarted>
  );
}

export default GetStarted;
