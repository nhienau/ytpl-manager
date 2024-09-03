import styled from "styled-components";
import PlaylistSort from "./PlaylistSort";
import SearchPlaylist from "./SearchPlaylist";

const StyledListOperation = styled.div`
  margin-bottom: 1.5rem;
`;

const Box = styled.div`
  margin: 0 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function ListOperation() {
  return (
    <StyledListOperation>
      <SearchPlaylist />
      <Box data-dropdown-id="playlist-sort">
        <PlaylistSort />
      </Box>
    </StyledListOperation>
  );
}

export default ListOperation;
