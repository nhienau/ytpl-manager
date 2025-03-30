import styled from "styled-components";
import { formatDate } from "../../utils/helper";
import { useCheckboxes } from "../../context/CheckboxesContext";
import {
  HiOutlineCheck,
  HiOutlineEyeSlash,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";
import { useQueue } from "../../context/QueueContext";
import { PlaylistItem } from "../../utils/types";

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
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  &:hover {
    text-decoration: underline;
  }
`;

const Metadata = styled.span`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  color: var(--color-neutral-600);

  & svg {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

function PlaylistItemRow({ playlistItem }: { playlistItem: PlaylistItem }) {
  const {
    id,
    title,
    thumbnails,
    resourceId: { videoId },
    videoOwnerChannelTitle,
    videoOwnerChannelId,
    videoPublishedAt,
    status: { privacyStatus },
  } = playlistItem;
  const { checked, add, remove } = useCheckboxes();
  const { queue } = useQueue();
  const isInQueue = queue.some((item) => item.id === id);

  const isWatchableVideo =
    privacyStatus === "public" || privacyStatus === "unlisted";

  const statusIcon = {
    public: <HiOutlineGlobeAlt title="Public" />,
    unlisted: <HiOutlineEyeSlash title="Unlisted" />,
    private: null,
    privacyStatusUnspecified: null,
  };

  function handleChange(e) {
    const checked = e.target.checked;
    checked ? add(playlistItem) : remove(playlistItem);
  }

  return (
    <StyledPlaylistItemRow>
      <input
        type="checkbox"
        checked={checked.findIndex((el) => el.id === id) !== -1}
        onChange={handleChange}
        disabled={!isWatchableVideo || isInQueue}
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
          {videoOwnerChannelId && (
            <Channel
              href={`https://www.youtube.com/channel/${videoOwnerChannelId}`}
              target="_blank"
              title={videoOwnerChannelTitle}
            >
              {videoOwnerChannelTitle}
            </Channel>
          )}
          {videoPublishedAt && (
            <>
              <span aria-hidden={true}>&nbsp;•&nbsp;</span>
              <span>{formatDate(videoPublishedAt)}</span>
            </>
          )}
          {statusIcon[privacyStatus] && (
            <>
              <span aria-hidden={true}>&nbsp;•&nbsp;</span>
              {statusIcon[privacyStatus]}
            </>
          )}
        </Metadata>
      </StyledInfo>
      <Actions>
        {isInQueue && <HiOutlineCheck title="Added to queue" />}
      </Actions>
    </StyledPlaylistItemRow>
  );
}

export default PlaylistItemRow;
