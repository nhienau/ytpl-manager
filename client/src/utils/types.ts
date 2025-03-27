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

export type PrivacyStatus = "public" | "unlisted" | "private";

export interface Playlist {
  id: string;
  publishedAt: string;
  status: {
    privacyStatus: PrivacyStatus;
  };
  title: string;
}

export interface CreatePlaylistParams {
  title: string;
  visibility: PrivacyStatus;
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
