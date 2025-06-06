import { handleApiException } from "../utils/error";
import { ChannelInfo } from "../utils/types";

export async function getLoggedInChannelInfo(): Promise<ChannelInfo | null> {
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
    handleApiException(e as Error);
    throw e;
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
    handleApiException(e as Error);
  }
}

export async function revokeAppAccess() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/revoke`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const data = await res.json();
    return data;
  } catch (e) {
    handleApiException(e as Error);
    throw e;
  }
}
