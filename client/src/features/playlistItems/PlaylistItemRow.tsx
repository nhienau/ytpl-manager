import { ChangeEvent } from "react";
import styled, { css } from "styled-components";
import { useDraggable } from "@dnd-kit/core";
import { formatDate } from "../../utils/helper";
import { useCheckboxes } from "../../context/CheckboxesContext";
import {
  HiOutlineCheck,
  HiOutlineEyeSlash,
  HiOutlineGlobeAlt,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import { useQueue } from "../../context/QueueContext";
import { DraggableData, PlaylistItem } from "../../utils/types";
import PlaylistItemOptions from "./PlaylistItemOptions";
import DragHandle from "../../ui/DragHandle";

interface StyledPlaylistItemRowProps {
  $isDragging?: boolean;
}

const StyledPlaylistItemRow = styled.div<StyledPlaylistItemRowProps>`
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

const ThumbnailContainer = styled.a`
  width: 12rem;
  aspect-ratio: 16 / 9;
  flex-shrink: 0;
`;

const StyledThumbnail = styled.img`
  width: 12rem;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  flex-shrink: 0;
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
  word-break: break-word;

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

const PlaylistItemDragHandle = styled(DragHandle)`
  display: none;

  @container (min-width: 50rem) {
    display: flex;
  }
`;

interface PlaylistItemRowProps {
  playlistItem: PlaylistItem;
  $isDragging?: boolean;
}

function PlaylistItemRow({
  playlistItem,
  $isDragging = false,
}: PlaylistItemRowProps) {
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
  const { checked, add, remove } = useCheckboxes<PlaylistItem>();
  const { queue } = useQueue();
  const isInQueue = queue.some((item) => item.id === id);

  const isWatchableVideo = Object.hasOwn(playlistItem, "videoOwnerChannelId");

  const statusIcon = {
    public: <HiOutlineGlobeAlt title="Public" />,
    unlisted: <HiOutlineEyeSlash title="Unlisted" />,
    private: <HiOutlineLockClosed title="Private" />,
    privacyStatusUnspecified: null,
  };

  const { attributes, listeners, setNodeRef, setActivatorNodeRef, isDragging } =
    useDraggable({
      id,
      data: {
        type: "playlist-item",
        item: playlistItem,
      } as DraggableData,
    });

  const style = {
    opacity: isDragging ? 0.4 : 1,
  };

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    checked ? add(playlistItem) : remove(playlistItem);
  }

  return (
    <StyledPlaylistItemRow
      ref={setNodeRef}
      style={style}
      $isDragging={$isDragging}
    >
      <input
        type="checkbox"
        checked={checked.findIndex((el: PlaylistItem) => el.id === id) !== -1}
        onChange={handleChange}
        disabled={!isWatchableVideo || isInQueue}
      />
      {isWatchableVideo ? (
        <ThumbnailContainer
          href={`https://youtu.be/${videoId}`}
          target="_blank"
          title={title}
        >
          <StyledThumbnail
            src={thumbnails?.medium?.url || thumbnails?.default?.url}
            alt={title}
          />
        </ThumbnailContainer>
      ) : (
        <StyledThumbnail
          src={thumbnails?.medium?.url || thumbnails?.default?.url}
          alt={title}
        />
      )}
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
      {isWatchableVideo && (
        <Actions>
          <PlaylistItemOptions
            playlistItem={playlistItem}
            isInQueue={isInQueue}
            domNodeId="playlist-table"
          />
          {isInQueue && <HiOutlineCheck title="Added to queue" />}
        </Actions>
      )}

      <PlaylistItemDragHandle
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
        $isDragging={$isDragging}
        disabled={!isWatchableVideo}
      />
    </StyledPlaylistItemRow>
  );
}

export default PlaylistItemRow;
