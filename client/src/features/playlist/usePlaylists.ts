import { Query, useQuery } from "@tanstack/react-query";
import { getPlaylists } from "../../services/apiPlaylist";

export function usePlaylists() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
    retry: (failureCount: number, error: Error) => {
      if (error.status === 401) return false;
      // Retry other errors up to 3 times
      return failureCount < 3;
    },
    throwOnError: (error: Error, query: Query) => error.status !== 401,
  });
  return { isPending, isError, data, error };
}
