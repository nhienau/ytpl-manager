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
  });
  return {
    isLoading,
    channel,
    isFetching,
    isAuthenticated: channel !== undefined && channel !== null,
  };
}
