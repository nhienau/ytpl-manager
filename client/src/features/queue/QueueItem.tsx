import styled, { css } from "styled-components";
import { formatDate } from "../../utils/helper";
import {
  HiOutlineEyeSlash,
  HiOutlineGlobeAlt,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import { PlaylistItem } from "../../utils/types";
import { ChangeEvent } from "react";
import PlaylistItemOptions from "../playlistItems/PlaylistItemOptions";
import { useQueueCheckboxes } from "../../context/QueueCheckboxesContext";
import DragHandle from "../../ui/DragHandle";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface StyledQueueItemProps {
  $isDragging?: boolean;
}

const StyledQueueItem = styled.div<StyledQueueItemProps>`
  display: flex;
  gap: 0.625rem;
  padding: 0.75rem;
  transition: none;

  ${(props) =>
    props.$isDragging
      ? css`
          background-color: var(--color-neutral-300);
        `
      : css`
          background-color: var(--color-neutral-100);
          &:hover {
            background-color: var(--color-neutral-300);
          }
        `}
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

const PlaylistTitle = styled.span`
  font-size: 0.75rem;
  color: var(--color-neutral-600);
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  & a:hover {
    text-decoration: underline;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

interface QueueItemProps {
  playlistItem: PlaylistItem;
  index: number;
  $isDragging?: boolean;
}

function QueueItem({
  playlistItem,
  index,
  $isDragging = false,
}: QueueItemProps) {
  const {
    id,
    title,
    thumbnails,
    resourceId: { videoId },
    videoOwnerChannelTitle,
    videoOwnerChannelId,
    videoPublishedAt,
    status: { privacyStatus },
    playlist,
  } = playlistItem;
  const { checked, add, remove } = useQueueCheckboxes<PlaylistItem>();

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    isDragging,
    transform,
    transition,
  } = useSortable({
    id: index,
  });

  const style = {
    opacity: isDragging ? 0.4 : 1,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const statusIcon = {
    public: <HiOutlineGlobeAlt title="Public" />,
    unlisted: <HiOutlineEyeSlash title="Unlisted" />,
    private: <HiOutlineLockClosed title="Private" />,
    privacyStatusUnspecified: null,
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    checked ? add(playlistItem) : remove(playlistItem);
  }

  return (
    <StyledQueueItem style={style} ref={setNodeRef} $isDragging={$isDragging}>
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
        {playlist && (
          <PlaylistTitle>
            Added from{" "}
            <Link to={`/app/playlist/${playlist.id}`} title={playlist.title}>
              {playlist.title}
            </Link>
          </PlaylistTitle>
        )}
      </StyledInfo>
      <Actions>
        <PlaylistItemOptions
          playlistItem={playlistItem}
          isInQueue
          domNodeId="queue-table"
        />
      </Actions>
      <DragHandle
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
        $isDragging={$isDragging}
      />
    </StyledQueueItem>
  );
}

export default QueueItem;
