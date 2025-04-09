import { useCreatePlaylist } from "./useCreatePlaylist";
import toast from "react-hot-toast";
import { useTopLevel } from "../../ui/TopLevel";
import { useWorker } from "../../context/WorkerContext";
import { useVideoOperations } from "../../context/VideoOperationsContext";
import { useQueue } from "../../context/QueueContext";
import { useAddVideosToPlaylist } from "./useAddVideosToPlaylist";
import { PlaylistFormData, PlaylistItem } from "../../utils/types";
import PlaylistInfoForm from "../../ui/PlaylistInfoForm";

function AddToNewPlaylistContent({
  playlistItems,
}: {
  playlistItems: PlaylistItem[];
}) {
  const { mutate: createPlaylist, isPending } = useCreatePlaylist();
  const { close } = useTopLevel();
  const worker = useWorker();
  const { add, update } = useVideoOperations();
  const { remove } = useQueue();

  const { addVideosToPlaylist } = useAddVideosToPlaylist({
    worker,
    playlistItems,
    onRemoveItems: remove,
    onAddItems: add,
    onUpdateItem: update,
  });

  function onSubmit(data: PlaylistFormData) {
    if (!worker) {
      toast.error("Failed to save");
      return;
    }

    const { title, visibility, deleteFromInitialPlaylist } = data;

    if (!deleteFromInitialPlaylist) {
      toast.error("Failed to save");
      return;
    }

    const playlistTitle = title.trim();

    createPlaylist(
      { title: playlistTitle, visibility },
      {
        onSuccess: (res) => {
          const { data: playlist } = res;
          addVideosToPlaylist([playlist], deleteFromInitialPlaylist);

          toast.success(
            `Successfully created playlist "${playlistTitle}". Adding ${
              playlistItems.length
            } video${
              playlistItems.length !== 1 ? "s" : ""
            } to "${playlistTitle}". You can check them out at the Operations tab.`
          );
        },
        onError: (err) => {
          toast.error(
            `Failed to create playlist "${playlistTitle}". Please try again.`
          );
          console.error(err);
        },
        onSettled: () => {
          close();
        },
      }
    );
  }

  return (
    <PlaylistInfoForm
      showDeleteFromInitialPlaylistField
      isPending={isPending}
      onSubmit={onSubmit}
    />
  );
}

export default AddToNewPlaylistContent;
