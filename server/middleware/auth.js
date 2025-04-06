const {
  refreshAccessToken,
  tokenCookieOptions,
  ACCESS_TOKEN_EXPIRE_TIME,
} = require("../services/token");

const pendingRefreshRequests = new Map();

async function refreshTokenMiddleware(req, res, next) {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      res.status(401).json({
        error: {
          message: "Unauthorized",
        },
      });
      return;
    }

    let refreshPromise = pendingRefreshRequests.get(refreshToken);
    const requested = refreshPromise !== undefined;

    if (!refreshPromise) {
      refreshPromise = refreshAccessToken(refreshToken);
      pendingRefreshRequests.set(refreshToken, refreshPromise);
    }

    try {
      const tokenData = await refreshPromise;
      req.accessToken = tokenData.access_token;

      if (!requested) {
        pendingRefreshRequests.delete(refreshToken);

        res.cookie("access_token", tokenData.access_token, {
          ...tokenCookieOptions,
          maxAge: ACCESS_TOKEN_EXPIRE_TIME,
        });
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      res.status(401).json({
        error: {
          message: "Failed to refresh token",
        },
      });
      return;
    }
  }
  next();
}

module.exports = { refreshTokenMiddleware };
