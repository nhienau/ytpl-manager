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
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError: false,
  });
  return { isPending, isError, data, error };
}
