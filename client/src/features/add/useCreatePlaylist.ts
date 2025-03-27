import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlaylist } from "../../services/apiPlaylist";

export function useCreatePlaylist() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ title, visibility }) =>
      createPlaylist({ title, visibility }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
  });

  return { mutate, isPending };
}
