import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getPlaylistItems } from "../../services/apiPlaylist";
import { APIError, PlaylistDetail } from "../../utils/types";

export function usePlaylistItems() {
  const { playlistId } = useParams();
  const [searchParams] = useSearchParams();
  const pageToken = searchParams.get("pageToken") || "";

  if (!playlistId) {
    throw new Error(
      "usePlaylistItems was used outside /app/playlist/:playlistId route"
    );
  }

  const { isPending, isError, data, error } = useQuery<PlaylistDetail, APIError>({
    queryKey: ["playlist", playlistId, pageToken],
    queryFn: () => getPlaylistItems(playlistId, pageToken),
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError: false,
  });
  return { isPending, isError, data, error };
}
