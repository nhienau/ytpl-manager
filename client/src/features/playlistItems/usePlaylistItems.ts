import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getPlaylistItems } from "../../services/apiPlaylist";

export function usePlaylistItems() {
  const { playlistId } = useParams();
  const [searchParams] = useSearchParams();
  const pageToken = searchParams.get("pageToken") || "";

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["playlist", playlistId, pageToken],
    queryFn: () => getPlaylistItems(playlistId, pageToken),
    retry: (failureCount: number, error: Error) => {
      if (error.status === 401) return false;
      // Retry other errors up to 3 times
      return failureCount < 2;
    },
    throwOnError: false,
  });
  return { isPending, isError, data, error };
}
