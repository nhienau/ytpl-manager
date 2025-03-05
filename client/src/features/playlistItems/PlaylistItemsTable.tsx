import styled from "styled-components";
import PlaylistItemsContainer from "./PlaylistItemsContainer";
import PlaylistItemsPagination from "./PlaylistItemsPagination";
import PlaylistTitle from "./PlaylistTitle";

const Table = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: var(--color-neutral-100);
`;

function PlaylistItemsTable() {
  return (
    <Table>
      <PlaylistTitle />
      <PlaylistItemsContainer />
      <PlaylistItemsPagination />
    </Table>
  );
}

export default PlaylistItemsTable;
