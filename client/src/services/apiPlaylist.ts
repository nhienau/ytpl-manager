import { handleApiException } from "../utils/error";
import { APIError, CreatePlaylistParams, Playlist } from "../utils/types";

export async function getPlaylists(): Promise<Playlist[]> {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/youtube/playlist`,
      {
        credentials: "include",
      }
    );
    const data = await res.json();
    if (!res.ok) {
      const error = new APIError(data.error?.message || "API error");
      error.status = res.status;
      error.data = data;
      throw error;
    }
    return data;
  } catch (e) {
    handleApiException(e as Error);
    throw e;
  }
}

export async function getPlaylistItems(playlistId: string, pageToken: string) {
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
      const error = new APIError(
        data.error?.message || data.message || "API error"
      );
      error.status = res.status;
      error.data = data;
      throw error;
    }
    return data;
  } catch (e) {
    handleApiException(e as Error);
    throw e;
  }
}

export async function createPlaylist({
  title,
  visibility,
}: CreatePlaylistParams) {
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
      const error = new APIError(
        data.error?.message || data.message || "API error"
      );
      error.status = res.status;
      error.data = data;
      throw error;
    }
    return data;
  } catch (e) {
    handleApiException(e as Error);
    throw e;
  }
}
