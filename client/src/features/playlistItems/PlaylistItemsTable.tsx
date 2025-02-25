import { Navigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { usePlaylistItems } from "./usePlaylistItems";
import PlaylistItemRow from "./PlaylistItemRow";
import Button from "../../ui/Button";

const Table = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: var(--color-neutral-100);
`;

const PlaylistName = styled.div`
  padding: 1rem;
`;

const Items = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

const Buttons = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const PaginationButton = styled(Button)`
  background-color: var(--color-neutral-300);

  &:hover {
    background-color: var(--color-neutral-400);
  }

  &:disabled {
    background-color: var(--color-neutral-300);
  }
`;

function PlaylistItemsTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isPending, data, isError, error } = usePlaylistItems();

  function handleClick(pageToken) {
    searchParams.set("pageToken", pageToken);
    setSearchParams(searchParams);
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    if (error.status === 401) {
      return <Navigate to="/test" />;
    } else if (
      error.status === 404 &&
      error.data?.errors[0]?.reason === "playlistNotFound"
    ) {
      return <div>sai id</div>;
    } else {
      throw new Error(error);
    }
  }

  const { prevPageToken, nextPageToken } = data;

  return (
    <Table>
      <PlaylistName>
        <span>playlist name</span>
      </PlaylistName>
      <Items>
        {data?.data?.map((item) => (
          <PlaylistItemRow key={item.id} playlistItem={item} />
        ))}
      </Items>
      <Buttons>
        <PaginationButton
          disabled={isPending || !prevPageToken}
          onClick={() => handleClick(prevPageToken)}
        >
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          disabled={isPending || !nextPageToken}
          onClick={() => handleClick(nextPageToken)}
        >
          <span>Next</span>
        </PaginationButton>
      </Buttons>
    </Table>
  );
}

export default PlaylistItemsTable;
