import styled from "styled-components";
import { useCheckboxes } from "../../context/CheckboxesContext";
import Button from "../../ui/Button";
import { useVideoOperations } from "../../context/VideoOperationsContext";
import { useTopLevel } from "../../ui/TopLevel";
import toast from "react-hot-toast";
import { useWorker } from "../../context/WorkerContext";
import { useQueue } from "../../context/QueueContext";
import { useAddVideosToPlaylist } from "./useAddVideosToPlaylist";
import { Playlist, PlaylistItem } from "../../utils/types";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface ButtonSaveProps {
  playlistItems: PlaylistItem[];
  deleteFromInitialPlaylist: boolean;
}

function ButtonSave({
  playlistItems,
  deleteFromInitialPlaylist,
}: ButtonSaveProps) {
  const { checked } = useCheckboxes<Playlist>();
  const { add, update } = useVideoOperations();
  const { close } = useTopLevel();
  const worker = useWorker();
  const { remove } = useQueue();

  const { addVideosToPlaylist } = useAddVideosToPlaylist({
    worker,
    playlistItems,
    onRemoveItems: remove,
    onAddItems: add,
    onUpdateItem: update,
  });

  function handleSave() {
    if (checked.length === 0) return;

    if (!worker) {
      toast.error("Failed to save");
      console.error("Worker not initialized");
      return;
    }

    addVideosToPlaylist(checked, deleteFromInitialPlaylist);

    toast.success(
      `Adding ${playlistItems.length} video${
        playlistItems.length !== 1 ? "s" : ""
      } to selected playlists. You can check them out at the Operations tab.`
    );
    close();
  }

  return (
    <Box>
      <Button disabled={checked.length === 0} onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
}

export default ButtonSave;
