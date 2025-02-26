import styled from "styled-components";
import PlaylistItemsContainer from "./PlaylistItemsContainer";
import PlaylistItemsPagination from "./PlaylistItemsPagination";

const Table = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: var(--color-neutral-100);
`;

const PlaylistName = styled.div`
  padding: 1rem;
`;

function PlaylistItemsTable() {
  return (
    <Table>
      <PlaylistName>
        <span>playlist name</span>
      </PlaylistName>
      <PlaylistItemsContainer />
      <PlaylistItemsPagination />
    </Table>
  );
}

export default PlaylistItemsTable;
