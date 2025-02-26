import styled, { css } from "styled-components";
import PlaylistItemRow from "./PlaylistItemRow";
import { usePlaylistItems } from "./usePlaylistItems";
import Spinner from "../../ui/Spinner";
import { Navigate } from "react-router-dom";

const StyledPlaylistItemsContainer = styled.div`
  flex-grow: 1;
  overflow: auto;

  ${(props) =>
    (props.$isPending || props.$isError) &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;

function PlaylistItemsContainer() {
  const { isPending, data, isError, error } = usePlaylistItems();

  if (isPending) {
    return (
      <StyledPlaylistItemsContainer $isPending={isPending}>
        <Spinner />
      </StyledPlaylistItemsContainer>
    );
  }

  if (isError) {
    if (error.status === 401) {
      return <Navigate to="/test" />;
    } else if (
      error.status === 404 &&
      error.data?.errors[0]?.reason === "playlistNotFound"
    ) {
      return (
        <StyledPlaylistItemsContainer $isError={isError}>
          Playlist not found
        </StyledPlaylistItemsContainer>
      );
    } else {
      throw new Error(error);
    }
  }

  return (
    <StyledPlaylistItemsContainer>
      {data?.data?.map((item) => (
        <PlaylistItemRow key={item.id} playlistItem={item} />
      ))}
    </StyledPlaylistItemsContainer>
  );
}

export default PlaylistItemsContainer;
