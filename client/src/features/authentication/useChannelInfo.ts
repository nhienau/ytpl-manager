import { useQuery } from "@tanstack/react-query";
import { getLoggedInChannelInfo } from "../../services/apiAuth";

export function useChannelInfo() {
  const {
    isLoading,
    data: channel,
    isFetching,
  } = useQuery({
    queryKey: ["channel"],
    queryFn: getLoggedInChannelInfo,
    staleTime: Infinity,
    retry: false,
    refetchOnMount: false,
    throwOnError: true,
  });
  return {
    isLoading,
    channel,
    isFetching,
    isAuthenticated: channel !== undefined && channel !== null,
  };
}
