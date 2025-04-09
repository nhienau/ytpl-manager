import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePlaylist } from "../../services/apiPlaylist";
import toast from "react-hot-toast";

export function useDeletePlaylist() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deletePlaylist(id),
    onSuccess: (data) => {
      const { id } = data.data;
      queryClient.removeQueries({ queryKey: ["playlist", id] });
      setTimeout(function () {
        queryClient.invalidateQueries({ queryKey: ["playlists"] });
      }, 3000);
      toast.success(`Deleted playlist successfully`);
    },
    onError: (e) => {
      console.error(e);
      toast.error("Failed to delete playlist");
    },
  });

  return { mutate, isPending };
}
