export async function getLoggedInChannelInfo() {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/youtube/info`,
    {
      credentials: "include",
    }
  );
  const data = await res.json();
  if (res.status === 403) {
    return null;
  } else if (res.status === 404) {
    await logout();
    if (data.error) {
      throw new Error(data.error.message);
    }
  }
  return data;
}

export async function logout() {
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
}
