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

  res.status(200).json(data);
});

module.exports = router;
