import styled from "styled-components";
import PlaylistItemRow from "./PlaylistItemRow";
import { usePlaylistItems } from "./usePlaylistItems";

const StyledPlaylistItemsContainer = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

function PlaylistItemsContainer() {
  const { data } = usePlaylistItems();

  return (
    <StyledPlaylistItemsContainer>
      {data?.data?.map((item) => (
        <PlaylistItemRow key={item.id} playlistItem={item} />
      ))}
    </StyledPlaylistItemsContainer>
  );
}

export default PlaylistItemsContainer;
