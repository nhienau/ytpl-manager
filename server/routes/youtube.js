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

router.get("/playlist/list", async (req, res) => {
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
    const { id, snippet } = playlist;
    const { publishedAt, title, thumbnails } = snippet;
    return {
      id,
      publishedAt,
      title,
      thumbnails,
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
  const params = {
    part: "snippet",
    maxResults: 50,
    playlistId,
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
  const data = await response.json();
  const { items, prevPageToken, nextPageToken } = data;
  res.status(200).json({
    items,
    prevPageToken,
    nextPageToken,
  });
});

module.exports = router;
