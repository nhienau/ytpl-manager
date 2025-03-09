import styled from "styled-components";
import { formatDate } from "../../utils/helper";
import { useCheckboxes } from "../../context/CheckboxesContext";

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

const Title = styled.a`
  font-weight: 700;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  &:hover {
    text-decoration: underline;
  }
`;

const Channel = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;

const Metadata = styled.span`
  font-size: 0.75rem;
  display: flex;
  gap: 0.25rem;
  color: var(--color-neutral-600);
`;

function PlaylistItemRow({ playlistItem }) {
  const { id } = playlistItem;
  const { checked, add, remove } = useCheckboxes();

  function handleChange(e) {
    const checked = e.target.checked;
    checked ? add(playlistItem) : remove(playlistItem);
  }

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
      <input
        type="checkbox"
        checked={checked.findIndex((el) => el.id === id) !== -1}
        onChange={handleChange}
      />
      <StyledThumbnail
        src={thumbnails?.medium?.url || thumbnails?.default?.url}
        alt={title}
      />
      <StyledInfo>
        <Title
          href={`https://youtu.be/${videoId}`}
          target="_blank"
          title={title}
        >
          {title}
        </Title>
        <Metadata>
          <Channel
            href={`https://www.youtube.com/channel/${videoOwnerChannelId}`}
            target="_blank"
            title={videoOwnerChannelTitle}
          >
            {videoOwnerChannelTitle}
          </Channel>
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
