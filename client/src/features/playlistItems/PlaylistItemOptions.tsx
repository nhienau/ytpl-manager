import { HiOutlineEllipsisVertical, HiOutlineLink } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import Menus from "../../ui/Menus";
import styled from "styled-components";
import { FaYoutube } from "react-icons/fa";
import { PlaylistItem } from "../../utils/types";
import { MdOutlinePlaylistAdd, MdOutlinePlaylistRemove } from "react-icons/md";
import toast from "react-hot-toast";
import { useQueue } from "../../context/QueueContext";
import { useQueueCheckboxes } from "../../context/QueueCheckboxesContext";

const StyledList = styled(Menus.List)`
  padding: 0.25rem;
  background-color: #fff;
  box-shadow: var(--shadow-lg);
  border-radius: 0.5rem;
  border: 1px solid var(--color-neutral-300);
`;

interface PlaylistItemOptionsProps {
  playlistItem: PlaylistItem;
  isInQueue: boolean;
  domNodeId: string;
}

function PlaylistItemOptions({
  playlistItem,
  isInQueue,
  domNodeId,
}: PlaylistItemOptionsProps) {
  const { id, videoId } = playlistItem;
  const { add, remove: removeFromQueue } = useQueue();
  const { remove: removeFromQueueCheckboxes } =
    useQueueCheckboxes<PlaylistItem>();

  function handleCopyLink() {
    navigator.clipboard.writeText(`https://youtu.be/${videoId}`).then(
      function () {
        toast.success("Link copied to clipboard");
      },
      function (e) {
        console.error(e);
        toast.error("Cannot copy link");
      }
    );
  }

  function handleRemoveFromQueue() {
    removeFromQueue([playlistItem]);
    removeFromQueueCheckboxes(playlistItem);
  }

  return (
    <Menus.Menu>
      <Menus.Toggle id={id} alignment="right" asChild>
        <ButtonIcon title="Show more">
          <HiOutlineEllipsisVertical />
        </ButtonIcon>
      </Menus.Toggle>
      <StyledList id={id} domNodeId={domNodeId}>
        <Menus.Button
          icon={<FaYoutube />}
          as="a"
          href={`https://youtu.be/${videoId}`}
          target="_blank"
          title="View on YouTube"
        >
          View on YouTube
        </Menus.Button>
        <Menus.Button
          icon={<HiOutlineLink />}
          onClick={handleCopyLink}
          title="Copy link"
        >
          Copy link
        </Menus.Button>
        {isInQueue ? (
          <Menus.Button
            icon={<MdOutlinePlaylistRemove />}
            onClick={handleRemoveFromQueue}
            title="Remove from queue"
          >
            Remove from queue
          </Menus.Button>
        ) : (
          <Menus.Button
            icon={<MdOutlinePlaylistAdd />}
            onClick={() => add([playlistItem])}
            title="Add to queue"
          >
            Add to queue
          </Menus.Button>
        )}
      </StyledList>
    </Menus.Menu>
  );
}

export default PlaylistItemOptions;
