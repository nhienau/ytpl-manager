import { GOOGLE_OAUTH_ROOT_URL, GOOGLE_OAUTH_SCOPE } from "./constants";
import { generateCryptoRandomState } from "./state";

interface AuthUrlParams {
  client_id: string;
  redirect_uri: string;
  response_type: string;
  access_type: string;
  prompt: string;
  scope: string;
  include_granted_scopes: boolean;
  state: string;
}

export function getGoogleAuthUrl(): string {
  const params: AuthUrlParams = {
    client_id: import.meta.env.VITE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
    scope: GOOGLE_OAUTH_SCOPE.join(" "),
    include_granted_scopes: true,
    state: generateCryptoRandomState(),
  };

  const queryString = new URLSearchParams(Object.entries(params));
  return `${GOOGLE_OAUTH_ROOT_URL}?${queryString}`;
}
