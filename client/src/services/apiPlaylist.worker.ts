import { Operation, Resource, WorkerRequest } from "../utils/types";

export default () => {
  async function addToPlaylist(
    apiBaseUrl: string,
    playlistId: string,
    resourceId: Resource
  ) {
    const res = await fetch(`${apiBaseUrl}/api/youtube/playlistItem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        snippet: {
          playlistId,
          resourceId,
        },
      }),
    });
    const data = await res.json();
    return data;
  }

  async function deletePlaylistItem(
    apiBaseUrl: string,
    playlistItemId: string
  ) {
    const params = {
      id: playlistItemId,
    };
    const queryString = new URLSearchParams(params).toString();
    const res = await fetch(
      `${apiBaseUrl}/api/youtube/playlistItem?${queryString}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (res.ok) {
      return {
        success: true,
      };
    } else {
      const data = await res.json();
      return data;
    }
  }

  self.addEventListener("message", async (e) => {
    const {
      config: { apiBaseUrl },
      items,
    } = e.data as WorkerRequest;
    for (const item of items) {
      const { id, playlist, video, action } = item;
      self.postMessage({
        id,
        status: "loading",
        playlist: item.playlist,
        video: item.video,
        action,
      } as Operation);
      let result;
      if (action === "add") {
        if (!playlist || !video) {
          self.postMessage({
            id,
            status: "failed",
            playlist,
            video,
            action,
          } as Operation);
          continue;
        }
        result = await addToPlaylist(apiBaseUrl, playlist.id, video.resourceId);
      } else if (action === "delete") {
        if (!video) {
          self.postMessage({
            id,
            status: "failed",
            playlist,
            video,
            action,
          } as Operation);
          continue;
        }
        result = await deletePlaylistItem(apiBaseUrl, video.id);
      }
      self.postMessage({
        id,
        status: result.success ? "success" : "failed",
        playlist: item.playlist,
        video: item.video,
        action,
      } as Operation);
    }
  });
};
