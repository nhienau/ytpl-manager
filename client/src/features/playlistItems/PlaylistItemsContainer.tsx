import { DragOverlay } from "@dnd-kit/core";
import styled from "styled-components";
import PlaylistItemRow from "./PlaylistItemRow";
import { useDndItem } from "../../context/DndItemContext";
import { usePlaylistItems } from "./usePlaylistItems";

const StyledPlaylistItemsContainer = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

function PlaylistItemsContainer() {
  const { activeItem, itemType } = useDndItem();
  const { data } = usePlaylistItems();

  return (
    <StyledPlaylistItemsContainer>
      {data?.data?.map((item) => (
        <PlaylistItemRow key={item.id} playlistItem={item} />
      ))}

      <DragOverlay dropAnimation={null}>
        {activeItem && itemType === "playlist-item" ? (
          <PlaylistItemRow playlistItem={activeItem} $isDragging />
        ) : null}
      </DragOverlay>
    </StyledPlaylistItemsContainer>
  );
}

export default PlaylistItemsContainer;
