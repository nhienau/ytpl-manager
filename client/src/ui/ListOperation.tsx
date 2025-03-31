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

function ListOperation({ dropdownId }: { dropdownId: string }) {
  return (
    <StyledListOperation>
      <SearchPlaylist />
      <Box data-dropdown-id={dropdownId}>
        <PlaylistSort nodeId={dropdownId} />
      </Box>
    </StyledListOperation>
  );
}

export default ListOperation;
