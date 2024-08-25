const router = require("express").Router();
const getGoogleOAuthToken = require("../services/getGoogleOAuthToken");

const accessTokenCookieOptions = {
  maxAge: 3600000, // 60 * 60 * 1000
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};

router.get("/callback", async (req, res) => {
  const code = req.query.code;
  try {
    const tokenResponse = await getGoogleOAuthToken(code);
    const { access_token, refresh_token } = tokenResponse;

    res.cookie("access_token", access_token, accessTokenCookieOptions);
    res.cookie("refresh_token", refresh_token, {
      ...accessTokenCookieOptions,
      maxAge: 15552000000, // 6 months
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

module.exports = router;
