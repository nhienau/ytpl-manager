import { useQueryClient } from "@tanstack/react-query";
import {
  Operation,
  Playlist,
  PlaylistItem,
  WorkerRequest,
} from "../../utils/types";

interface UseAddVideosToPlaylistProps {
  worker: Worker | null;
  playlistItems: PlaylistItem[];
  onRemoveItems: (items: PlaylistItem[]) => void;
  onAddItems: (newItems: Operation[]) => void;
  onUpdateItem: (id: string | number, newInfo: object) => void;
}

function useAddVideosToPlaylist({
  worker,
  playlistItems,
  onRemoveItems,
  onAddItems,
  onUpdateItem,
}: UseAddVideosToPlaylistProps) {
  const queryClient = useQueryClient();

  function addVideosToPlaylist(
    playlists: Playlist[],
    deleteFromInitialPlaylist: boolean
  ) {
    if (!worker) {
      console.error("Worker not initialized");
      return false;
    }

    const items: Operation[] = playlists.flatMap((playlist) =>
      playlistItems.map((item) => ({
        id: crypto.randomUUID(),
        playlist,
        video: item,
        status: "pending",
        action: "add",
      }))
    );

    let itemsToDelete: Operation[] = [];
    if (deleteFromInitialPlaylist) {
      itemsToDelete = playlistItems.map((item) => ({
        id: crypto.randomUUID(),
        video: item,
        status: "pending",
        action: "delete",
      }));

      onRemoveItems?.(playlistItems);
    }

    const allItems = [...items, ...itemsToDelete];
    onAddItems?.(allItems);

    worker.onmessage = (e) => {
      const { id, status, action, playlist, video } = e.data as Operation;
      onUpdateItem?.(id, { status });

      if (status === "loading") return;

      if (playlist && action === "add" && status === "success") {
        const playlistId = playlist.id;
        queryClient.invalidateQueries({
          queryKey: ["playlist", playlistId],
        });
      }

      if (video?.playlist && action === "delete" && status === "success") {
        const playlistId = video.playlist.id;
        queryClient.invalidateQueries({
          queryKey: ["playlist", playlistId],
        });
      }
    };

    worker.postMessage({
      config: {
        apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
      },
      items: allItems,
    } as WorkerRequest);

    return true;
  }

  return { addVideosToPlaylist };
}

export { useAddVideosToPlaylist };
