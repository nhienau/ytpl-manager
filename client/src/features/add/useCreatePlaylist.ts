import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlaylist } from "../../services/apiPlaylist";
import { PlaylistInfoParams } from "../../utils/types";

export function useCreatePlaylist() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ title, visibility }: PlaylistInfoParams) =>
      createPlaylist({ title, visibility }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
  });

  return { mutate, isPending };
}
