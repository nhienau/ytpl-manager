export async function getLoggedInChannelInfo() {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/youtube/info`,
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
    return null;
  }
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
