import { Navigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { usePlaylistItems } from "./usePlaylistItems";
import PlaylistItemRow from "./PlaylistItemRow";

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

const Button = styled.button`
  text-align: left;
  background: none;
  border: none;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.5rem;
  border-radius: 0.5rem;
  background-color: var(--color-neutral-300);
  color: var(--color-neutral-800);

  & span {
    font-size: 0.875rem;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  & svg {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }

  &:hover {
    background-color: var(--color-neutral-600);
    color: var(--color-neutral-200);
  }

  &:disabled {
    background-color: var(--color-neutral-300);
    color: var(--color-neutral-400);
    cursor: initial;
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
        <Button
          disabled={isPending || !prevPageToken}
          onClick={() => handleClick(prevPageToken)}
        >
          <span>Previous</span>
        </Button>
        <Button
          disabled={isPending || !nextPageToken}
          onClick={() => handleClick(nextPageToken)}
        >
          <span>Next</span>
        </Button>
      </Buttons>
    </Table>
  );
}

export default PlaylistItemsTable;
