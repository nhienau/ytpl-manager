import styled from "styled-components";
import { useQueue } from "../../context/QueueContext";
import Modal from "../../ui/Modal";
import Tabs from "../../ui/Tabs";
import AddToExistingPlaylistContent from "./AddToExistingPlaylistContent";
import { TopLevel } from "../../ui/TopLevel";
import Button from "../../ui/Button";
import { HiOutlineXMark } from "react-icons/hi2";
import AddToNewPlaylistContent from "./AddToNewPlaylistContent";
import { PlaylistItem } from "../../utils/types";
import { useQueueCheckboxes } from "../../context/QueueCheckboxesContext";

const Box = styled.div`
  max-width: 30rem;
  max-height: 25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ButtonClose = styled(Button)`
  position: absolute;
  top: 0.375rem;
  right: 0.375rem;
  padding: 0.5rem;
  border-radius: 50%;
`;

function ModalAdd() {
  const { checked } = useQueueCheckboxes<PlaylistItem>();
  const { queue } = useQueue();
  const playlistItems = checked.length > 0 ? checked : queue;
  const numVideos = playlistItems.length;

  return (
    <Modal>
      <Box>
        <Tabs defaultValue="existing">
          <Tabs.List>
            <Tabs.Trigger value="existing">
              Add to an existing playlist
            </Tabs.Trigger>
            <Tabs.Trigger value="new">Create a new playlist</Tabs.Trigger>
          </Tabs.List>

          <TopLevel.Close>
            <ButtonClose>
              <HiOutlineXMark />
            </ButtonClose>
          </TopLevel.Close>

          <div>
            <span>
              Add {numVideos} video{numVideos > 1 ? "s" : ""} to...
            </span>
          </div>

          <Tabs.Content value="existing">
            <AddToExistingPlaylistContent playlistItems={playlistItems} />
          </Tabs.Content>
          <Tabs.Content value="new">
            <AddToNewPlaylistContent playlistItems={playlistItems} />
          </Tabs.Content>
        </Tabs>
      </Box>
    </Modal>
  );
}

export default ModalAdd;
