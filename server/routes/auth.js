const router = require("express").Router();
const {
  getGoogleOAuthToken,
  tokenCookieOptions,
  ACCESS_TOKEN_EXPIRE_TIME,
  REFRESH_TOKEN_EXPIRE_TIME,
} = require("../services/token");

router.get("/callback", async (req, res) => {
  const code = req.query.code;
  try {
    const tokenResponse = await getGoogleOAuthToken(code);
    const { access_token, refresh_token } = tokenResponse;

    res.cookie("access_token", access_token, {
      ...tokenCookieOptions,
      maxAge: ACCESS_TOKEN_EXPIRE_TIME,
    });
    res.cookie("refresh_token", refresh_token, {
      ...tokenCookieOptions,
      maxAge: REFRESH_TOKEN_EXPIRE_TIME,
    });
    res.redirect(`${process.env.CLIENT_URL}/login/redirect`);
  } catch (e) {
    console.error(e);
    res.redirect(`${process.env.CLIENT_URL}/error`);
  }
});

router.get("/logout", async (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.status(200).json({
    ok: true,
  });
});

router.post("/revoke", async (req, res) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    res.status(401).json({
      error: {
        message: "Unauthorized",
      },
    });
    return;
  }

  const params = { token: accessToken };
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(
    `https://oauth2.googleapis.com/revoke?${queryString}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  const data = await response.json();

  if (response.status === 200) {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(400).json({
      error: data?.error || "Error revoking access",
    });
  }
});

module.exports = router;
