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
  description?: string;
}

export interface PlaylistInfoParams {
  id?: string;
  title: string;
  description?: string;
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
  obj: unknown
): obj is GoogleAPIErrorResponse {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "error" in obj &&
    obj.error !== null &&
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

export type OperationStatus = "pending" | "loading" | "success" | "failed";
export type OperationAction = "add" | "delete";

export interface Operation {
  id: string;
  status: OperationStatus;
  action: OperationAction;
  playlist?: Playlist;
  video?: PlaylistItem;
}

export interface SortCriteria {
  value: string;
  label: string;
}

export interface WorkerConfig {
  apiBaseUrl: string;
}

export interface WorkerRequest {
  items: Operation[];
  config: WorkerConfig;
}

export interface PlaylistFormData extends PlaylistInfoParams {
  deleteFromInitialPlaylist?: boolean;
}

export interface UpdatePlaylistParams extends PlaylistInfoParams {
  id: string;
}

export type DropdownVariation = "dropup" | "dropdown";
export type DropdownAlignment = "left" | "right";

export interface DropdownPosition {
  x: number;
  y: number;
  variation: DropdownVariation;
  alignment: DropdownAlignment;
}

export type TopLevelWindowViewport = "small" | "large" | "all";
