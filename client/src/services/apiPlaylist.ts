import { handleApiException } from "../utils/error";

export async function getPlaylists() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/youtube/playlist`,
      {
        credentials: "include",
      }
    );
    const data = await res.json();
    if (!res.ok) {
      const error = new Error(data.error.message || "API error");
      error.status = res.status;
      error.data = data;
      throw error;
    }
    return data;
  } catch (e) {
    handleApiException(e);
  }
}

export async function getPlaylistItems(playlistId, pageToken) {
  try {
    const res = await fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/youtube/playlist/${playlistId}?pageToken=${pageToken}`,
      {
        credentials: "include",
      }
    );
    const data = await res.json();
    if (!res.ok) {
      const error = new Error(
        data.error?.message || data.message || "API error"
      );
      error.status = res.status;
      error.data = data;
      throw error;
    }
    return data;
  } catch (e) {
    handleApiException(e);
  }
}

export async function createPlaylist({ title, visibility }) {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/youtube/playlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          snippet: {
            title,
          },
          status: {
            privacyStatus: visibility,
          },
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      const error = new Error(
        data.error?.message || data.message || "API error"
      );
      error.status = res.status;
      error.data = data;
      throw error;
    }
    return data;
  } catch (e) {
    handleApiException(e);
  }
}
