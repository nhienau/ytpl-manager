async function getGoogleOAuthToken(code) {
  const url = "https://oauth2.googleapis.com/token";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    throw e;
  }
}

async function refreshAccessToken(refreshToken) {
  const url = "https://oauth2.googleapis.com/token";
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    throw e;
  }
}

const tokenCookieOptions = {
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
  encode: (v) => v,
};

const ACCESS_TOKEN_EXPIRE_TIME = 3300000; // 55 minutes (55 * 60 * 1000)
const REFRESH_TOKEN_EXPIRE_TIME = 601200000; // 7d - 1h

module.exports = {
  getGoogleOAuthToken,
  refreshAccessToken,
  tokenCookieOptions,
  ACCESS_TOKEN_EXPIRE_TIME,
  REFRESH_TOKEN_EXPIRE_TIME,
};
