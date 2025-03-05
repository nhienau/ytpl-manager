import styled from "styled-components";
import { usePlaylistItems } from "./usePlaylistItems";
import SpinnerMini from "../../ui/SpinnerMini";

const StyledPlaylistTitle = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  font-weight: 700;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

function PlaylistTitle() {
  const { isPending, data, isError } = usePlaylistItems();

  return (
    <StyledPlaylistTitle>
      {isPending && <SpinnerMini $size={1.375} />}
      {isError && <Title>Playlist not found</Title>}
      {!isPending && !isError && <Title>{data?.title}</Title>}
    </StyledPlaylistTitle>
  );
}

export default PlaylistTitle;
