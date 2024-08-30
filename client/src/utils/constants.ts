export const GOOGLE_OAUTH_ROOT_URL =
  "https://accounts.google.com/o/oauth2/v2/auth";
export const GOOGLE_OAUTH_SCOPE = [
  "https://www.googleapis.com/auth/youtube",
  "https://www.googleapis.com/auth/youtube.force-ssl",
  "https://www.googleapis.com/auth/youtubepartner-channel-audit",
];
export const PLAYLIST_SORT_CRITERIAS = [
  {
    value: "name-asc",
    label: "Name (A-Z)",
  },
  {
    value: "name-desc",
    label: "Name (Z-A)",
  },
  {
    value: "date-latest",
    label: "Date published (latest first)",
  },
  {
    value: "date-earlier",
    label: "Date published (earlier first)",
  },
];
