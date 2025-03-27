export default () => {
  async function addToPlaylist(apiBaseUrl, playlistId, resourceId) {
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

  async function deletePlaylistItem(apiBaseUrl, playlistItemId) {
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
    } = e.data;
    for (const item of items) {
      const {
        id,
        playlist: { id: playlistId } = {},
        video: { id: playlistItemId, resourceId },
        action,
      } = item;
      self.postMessage({
        id,
        status: "loading",
        playlist: item.playlist,
        video: item.video,
        action,
      });
      let result;
      if (action === "add") {
        result = await addToPlaylist(apiBaseUrl, playlistId, resourceId);
      } else if (action === "delete") {
        result = await deletePlaylistItem(apiBaseUrl, playlistItemId);
      }
      self.postMessage({
        id,
        status: result.success ? "success" : "failed",
        playlist: item.playlist,
        video: item.video,
        action,
      });
    }
  });
};
