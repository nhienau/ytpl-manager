import { handleApiException } from "../utils/error";

export async function getLoggedInChannelInfo() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/youtube/info`,
      {
        credentials: "include",
      }
    );
    const data = await res.json();
    if (res.status === 401) {
      return null;
    } else if (res.status === 404) {
      await logout();
      if (data.error) {
        throw new Error(data.error.message);
      }
    }
    return data;
  } catch (e) {
    handleApiException(e);
  }
}

export async function logout() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
      {
        credentials: "include",
      }
    );
    const data = await res.json();
    if (data.error) {
      return null;
    }
    return data;
  } catch (e) {
    handleApiException(e);
  }
}
