export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
}

export interface ChannelInfo {
  id: string;
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: Thumbnails;
  localized: {
    title: string;
    description: string;
  };
}

export type PrivacyStatus =
  | "public"
  | "unlisted"
  | "private"
  | "privacyStatusUnspecified";

export interface Status {
  privacyStatus: PrivacyStatus;
}

export interface Resource {
  kind: string;
  videoId: string;
}

export interface Playlist {
  id: string;
  publishedAt: string;
  status: Status;
  title: string;
}

export interface CreatePlaylistParams {
  title: string;
  visibility: PrivacyStatus;
}

export interface PlaylistDetail extends Playlist {
  data: PlaylistItem[];
  prevPageToken?: string;
  nextPageToken?: string;
}

export interface PlaylistItem {
  id: string;
  publishedAt: string;
  status: Status;
  title: string;
  thumbnails: Thumbnails;
  videoOwnerChannelTitle?: string;
  videoOwnerChannelId?: string;
  resourceId: Resource;
  videoId: string;
  videoPublishedAt?: string;
  playlist?: Playlist;
}

export interface GoogleAPIError {
  domain: string;
  reason: string;
  message: string;
  locationType: string;
  location: string;
}

export interface GoogleAPIErrorResponse {
  error: {
    code: number;
    message: string;
    errors: GoogleAPIError[];
    status?: string;
  };
}

export function isGoogleAPIErrorResponse(
  obj: any
): obj is GoogleAPIErrorResponse {
  return (
    obj &&
    typeof obj === "object" &&
    "error" in obj &&
    typeof obj.error === "object" &&
    "code" in obj.error &&
    "message" in obj.error &&
    "errors" in obj.error &&
    Array.isArray(obj.error.errors)
  );
}

export interface CustomError {
  error: {
    message: string;
  };
}

export class APIError extends Error {
  status?: number;
  data?: GoogleAPIErrorResponse | CustomError;

  constructor(message: string) {
    super(message);
    this.name = "APIError";
  }
}
