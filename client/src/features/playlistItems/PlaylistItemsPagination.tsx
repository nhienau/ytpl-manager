import styled from "styled-components";
import Button from "../../ui/Button";
import { useSearchParams } from "react-router-dom";
import { usePlaylistItems } from "./usePlaylistItems";

const StyledPlaylistItemsPagination = styled.div`
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

function PlaylistItemsPagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isPending, data, isError } = usePlaylistItems();

  function handleClick(pageToken) {
    searchParams.set("pageToken", pageToken);
    setSearchParams(searchParams);
  }

  return (
    <StyledPlaylistItemsPagination>
      <PaginationButton
        disabled={isPending || isError || !data?.prevPageToken}
        onClick={() => handleClick(data?.prevPageToken)}
      >
        <span>Previous</span>
      </PaginationButton>
      <PaginationButton
        disabled={isPending || isError || !data?.nextPageToken}
        onClick={() => handleClick(data?.nextPageToken)}
      >
        <span>Next</span>
      </PaginationButton>
    </StyledPlaylistItemsPagination>
  );
}

export default PlaylistItemsPagination;
