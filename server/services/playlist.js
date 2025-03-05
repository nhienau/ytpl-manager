async function getPlaylistInfo(playlistId, accessToken) {
  const params = {
    part: "snippet",
    id: playlistId,
  };
  const strParams = new URLSearchParams(params).toString();
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlists?${strParams}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await res.json();
  const { items } = data;

  if (items.length === 0) {
    return {
      success: false,
      code: 404,
      error: {
        message: "Playlist not found",
      },
    };
  }

  const { id, snippet, status } = items[0];
  const { publishedAt, title } = snippet;
  return {
    success: true,
    data: {
      id,
      publishedAt,
      title,
      status,
    },
  };
}

async function getPlaylistItems(playlistId, pageToken = "", accessToken) {
  const params = {
    part: "snippet,contentDetails",
    maxResults: 50,
    playlistId,
    ...(pageToken && { pageToken }),
  };

  const strParams = new URLSearchParams(params).toString();
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?${strParams}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  let data = await response.json();

  if (data?.error?.errors[0].reason === "invalidPageToken") {
    // If page token is invalid, refetch items without page token
    delete params.pageToken;
    const strParams = new URLSearchParams(params).toString();
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?${strParams}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    data = await response.json();
  }

  if (data?.error) {
    return { success: false, ...data.error };
  }

  const { items, prevPageToken, nextPageToken } = data;

  const results = items.map((playlist) => {
    const { id, snippet, contentDetails } = playlist;
    const {
      publishedAt,
      title,
      thumbnails,
      videoOwnerChannelTitle,
      videoOwnerChannelId,
      resourceId,
    } = snippet;

    return {
      id,
      publishedAt,
      title,
      thumbnails,
      videoOwnerChannelTitle,
      videoOwnerChannelId,
      resourceId,
      ...contentDetails,
    };
  });

  return {
    data: results,
    prevPageToken,
    nextPageToken,
    success: true,
  };
}

module.exports = {
  getPlaylistInfo,
  getPlaylistItems,
};
