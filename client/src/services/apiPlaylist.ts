import { handleApiException } from "../utils/error";

export async function getPlaylists() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/youtube/playlist/list`,
      {
        credentials: "include",
      }
    );
    const data = await res.json();
    if (res.status === 403) {
      return null;
    }
    return data;
  } catch (e) {
    handleApiException(e);
  }
}
