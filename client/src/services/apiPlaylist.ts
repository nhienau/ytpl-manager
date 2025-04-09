import { handleApiException } from "../utils/error";
import {
  APIError,
  PlaylistInfoParams,
  Playlist,
  PlaylistDetail,
  UpdatePlaylistParams,
} from "../utils/types";

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

export async function getPlaylistItems(
  playlistId: string,
  pageToken: string
): Promise<PlaylistDetail> {
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
}: PlaylistInfoParams) {
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

export async function updatePlaylist(formData: UpdatePlaylistParams) {
  try {
    const { id, title, visibility } = formData;
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/youtube/playlist`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id,
          snippet: {
            title,
            description: formData.description || "",
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

export async function deletePlaylist(id: string) {
  try {
    const params = {
      id,
    };
    const queryString = new URLSearchParams(params).toString();
    const res = await fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/youtube/playlist?${queryString}`,
      {
        method: "DELETE",
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
