const { getPlaylistItems, getPlaylistInfo } = require("../services/playlist");

const router = require("express").Router();

router.get("/info", async (req, res) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    res.status(401).json({
      error: {
        message: "Unauthorized",
      },
    });
    return;
  }
  const params = {
    part: "snippet",
    mine: true,
  };
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await response.json();

  if (!data.items) {
    res.status(404).json({
      error: {
        message:
          "No channels found in this account. You can try logging in with a different account.",
      },
    });
    return;
  }
  const { id, snippet: channel } = data.items[0];
  res.status(200).json({ id, ...channel });
});

router.get("/playlist", async (req, res) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    res.status(401).json({
      error: {
        message: "Unauthorized",
      },
    });
    return;
  }
  const params = {
    part: "snippet,status",
    mine: true,
    maxResults: 50,
  };
  let results = [];
  let pageToken = "";
  do {
    const strParams = new URLSearchParams(params).toString();
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlists?${strParams}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    const { items, nextPageToken } = data;
    results = results.concat(items);
    if (nextPageToken) {
      pageToken = nextPageToken;
      params.pageToken = nextPageToken;
    } else {
      pageToken = "";
    }
  } while (pageToken !== "");

  results = results.map((playlist) => {
    const { id, snippet, status } = playlist;
    const { publishedAt, title } = snippet;
    return {
      id,
      publishedAt,
      status,
      title,
    };
  });

  res.status(200).json(results);
});

router.get("/playlist/:id", async (req, res) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    res.status(401).json({
      error: {
        message: "Unauthorized",
      },
    });
    return;
  }
  const playlistId = req.params.id;
  const { pageToken } = req.query;

  const [infoResponse, itemsResponse] = await Promise.allSettled([
    getPlaylistInfo(playlistId, accessToken),
    getPlaylistItems(playlistId, pageToken, accessToken),
  ]);

  if (!itemsResponse.value.success) {
    res.status(itemsResponse.value.error.code).json(itemsResponse.value);
    return;
  }

  // Include playlist info in all items
  const items = itemsResponse.value.data.map((item) => ({
    ...item,
    playlist: infoResponse.value.data,
  }));

  res
    .status(200)
    .json({ ...infoResponse.value.data, ...itemsResponse.value, data: items });
});

router.post("/playlistItem", async (req, res) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    res.status(401).json({
      error: {
        message: "Unauthorized",
      },
    });
    return;
  }

  const params = {
    part: "snippet",
  };

  const requestBody = req.body;

  if (!requestBody.snippet?.playlistId || !requestBody.snippet?.resourceId) {
    res.status(400).json({
      success: false,
      error: {
        message: "Missing paramaters: snippet.playlistId or snippet.resourceId",
      },
    });
    return;
  }

  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?${queryString}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    }
  );
  const data = await response.json();

  if (data?.error) {
    res.status(data?.error?.code).json({
      success: false,
      error: data?.error,
    });
  } else {
    res.status(200).json({
      success: true,
    });
  }
});

router.delete("/playlistItem", async (req, res) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    res.status(401).json({
      error: {
        message: "Unauthorized",
      },
    });
    return;
  }

  if (!req.query.id) {
    res.status(400).json({
      error: {
        message: "Missing parameter: id",
      },
    });
    return;
  }

  const params = {
    id: req.query.id,
  };

  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?${queryString}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const data = await response.json();
    res.status(data?.error?.code).json({
      success: false,
      error: data?.error,
    });
  } else {
    res.status(204).send();
  }
});

router.post("/playlist", async (req, res) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    res.status(401).json({
      error: {
        message: "Unauthorized",
      },
    });
    return;
  }

  const requestBody = req.body;

  if (!requestBody.snippet?.title) {
    res.status(400).json({
      success: false,
      error: {
        message: "Missing paramaters: snippet.title",
      },
    });
    return;
  }

  if (!requestBody.status?.privacyStatus) {
    res.status(400).json({
      success: false,
      error: {
        message: "Missing paramaters: status.privacyStatus",
      },
    });
    return;
  }

  const playlistTitle = requestBody.snippet.title;

  if (!/^(?!\s+$).+/.test(playlistTitle)) {
    res.status(400).json({
      success: false,
      error: {
        message: "Invalid title",
      },
    });
    return;
  }

  if (playlistTitle.trim().length > 150) {
    res.status(400).json({
      success: false,
      error: {
        message: "Title must be less than 150 characters",
      },
    });
    return;
  }

  const params = {
    part: "snippet,status",
  };
  const body = {
    snippet: {
      title: playlistTitle.trim(),
    },
    status: {
      privacyStatus: requestBody.status.privacyStatus,
    },
  };

  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlists?${queryString}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const data = await response.json();

  if (data?.error) {
    res.status(data?.error?.code).json({
      success: false,
      error: data?.error,
    });
  } else {
    const { id, snippet, status } = data;
    const { publishedAt, title } = snippet;

    res.status(200).json({
      data: {
        id,
        publishedAt,
        title,
        status,
      },
      success: true,
    });
  }
});

module.exports = router;
