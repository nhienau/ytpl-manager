import { useQuery } from "@tanstack/react-query";
import { getLoggedInChannelInfo } from "../../services/apiAuth";

export function useChannelInfo() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["channel"],
    queryFn: getLoggedInChannelInfo,
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false,
    throwOnError: true,
  });
  return {
    isPending,
    isError,
    data,
    error,
    isAuthenticated: data !== undefined && data !== null,
  };
}
