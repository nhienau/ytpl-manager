import { useQuery } from "@tanstack/react-query";
import { getPlaylists } from "../../services/apiPlaylist";

export function usePlaylists() {
  const {
    isLoading,
    data: playlists,
    isFetching,
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
    throwOnError: true,
  });
  return { isLoading, playlists, isFetching };
}
