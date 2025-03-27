import { useQueryClient } from "@tanstack/react-query";

function useAddVideosToPlaylist({
  worker,
  playlistItems,
  onRemoveItems,
  onAddItems,
  onUpdateItem,
}) {
  const queryClient = useQueryClient();

  function addVideosToPlaylist(playlists, deleteFromInitialPlaylist: boolean) {
    if (!worker) {
      console.error("Worker not initialized");
      return false;
    }

    const items = playlists.flatMap((playlist) =>
      playlistItems.map((item) => ({
        id: crypto.randomUUID(),
        playlist,
        video: item,
        status: "pending",
        action: "add",
      }))
    );

    let itemsToDelete = [];
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
      const { id, status, action, playlist, video } = e.data;
      onUpdateItem?.(id, { status });

      if (action === "loading") return;

      if (action === "add" && status === "success") {
        const playlistId = playlist.id;
        queryClient.invalidateQueries({
          queryKey: ["playlist", playlistId],
        });
      }

      if (action === "delete" && status === "success") {
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
    });

    return true;
  }

  return { addVideosToPlaylist };
}

export { useAddVideosToPlaylist };
