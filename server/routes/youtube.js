const router = require("express").Router();

router.get("/info", async (req, res) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    res.status(403).json({
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
  const strParams = new URLSearchParams(params).toString();
  const channelInfo = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?${strParams}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const data = await channelInfo.json();

  if (!data.items) {
    res.status(404).json({
      error: {
        message:
          "No channels found in this account. You can try logging in with a different account.",
      },
    });
    return;
  }

  res.status(200).json(data);
});

router.get("/playlist/list", async (req, res) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    res.status(403).json({
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

  res.status(200).json({
    items: results,
  });
});

module.exports = router;
