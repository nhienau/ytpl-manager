import { getGoogleAuthUrl } from "../../utils/auth";

function GoogleSignIn() {
  const authUrl = getGoogleAuthUrl();
  window.location.replace(authUrl);
  return null;
}

export default GoogleSignIn;
