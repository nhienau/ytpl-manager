import styled from "styled-components";
import { formatDate } from "../../utils/helper";

const StyledPlaylistItemRow = styled.div`
  display: flex;
  gap: 0.625rem;
  padding: 0.75rem;

  &:hover {
    background-color: var(--color-neutral-300);
  }
`;

const StyledThumbnail = styled.img`
  width: 12rem;
  aspect-ratio: 16 / 9;
  object-fit: cover;
`;

const StyledInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Title = styled.span`
  font-weight: 700;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const Metadata = styled.span`
  font-size: 0.75rem;
  display: flex;
  gap: 0.25rem;
  color: var(--color-neutral-600);
`;

function PlaylistItemRow({ playlistItem }) {
  const {
    title,
    thumbnails,
    resourceId: { videoId },
    videoOwnerChannelTitle,
    videoOwnerChannelId,
    videoPublishedAt,
  } = playlistItem;
  return (
    <StyledPlaylistItemRow>
      <StyledThumbnail
        src={thumbnails?.medium?.url || thumbnails?.default?.url}
        alt={title}
      />
      <StyledInfo>
        <Title>{title}</Title>
        <Metadata>
          <span>{videoOwnerChannelTitle}</span>
          {videoPublishedAt && (
            <>
              <span>•</span>
              <span>{formatDate(videoPublishedAt)}</span>
            </>
          )}
        </Metadata>
      </StyledInfo>
    </StyledPlaylistItemRow>
  );
}

export default PlaylistItemRow;
