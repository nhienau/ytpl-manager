import styled from "styled-components";
import PlaylistSort from "./PlaylistSort";
import { usePlaylistOperations } from "../context/PlaylistOperationsContext";

const StyledListOperation = styled.div`
  margin-bottom: 1.5rem;
`;

const Box = styled.div`
  margin: 0 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputBox = styled.div`
  width: 100%;
  padding: 0.5rem;
`;

const Input = styled.input`
  border: 1px solid var(--color-neutral-300);
  width: 100%;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;

function ListOperation() {
  const { query, setQuery } = usePlaylistOperations();

  return (
    <StyledListOperation>
      <InputBox>
        <Input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </InputBox>
      <Box data-dropdown-id="playlist-sort">
        <PlaylistSort />
      </Box>
    </StyledListOperation>
  );
}

export default ListOperation;
