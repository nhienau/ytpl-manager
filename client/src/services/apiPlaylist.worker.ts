export default () => {
  async function fakeTask(data) {
    await new Promise((res) => setTimeout(res, 5000));
    return { ...data, success: true };
  }

  async function addToPlaylist(apiBaseUrl, playlistId, resourceId) {
    const res = await fetch(`${apiBaseUrl}/api/youtube/playlist/add`, {
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
      `${apiBaseUrl}/api/youtube/playlist/delete?${queryString}`,
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
