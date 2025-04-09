import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePlaylist } from "../../services/apiPlaylist";
import { UpdatePlaylistParams } from "../../utils/types";
import toast from "react-hot-toast";

export function useUpdatePlaylist() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      id,
      title,
      description,
      visibility,
    }: UpdatePlaylistParams) =>
      updatePlaylist({ id, title, description, visibility }),
    onSuccess: (data) => {
      const { id, title } = data.data;
      setTimeout(function () {
        queryClient.invalidateQueries({ queryKey: ["playlist", id] });
        queryClient.invalidateQueries({ queryKey: ["playlists"] });
      }, 4000);
      toast.success(`Edited playlist ${title} successfully`);
    },
    onError: (e) => {
      console.error(e);
      toast.error("Failed to edit playlist");
    },
  });

  return { mutate, isPending };
}
