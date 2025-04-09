import { HiOutlineArrowPath } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { usePlaylistItems } from "./usePlaylistItems";
import ButtonIcon from "../../ui/ButtonIcon";

function ButtonReloadPlaylist() {
  const { isPending } = usePlaylistItems();
  const { playlistId } = useParams();
  const queryClient = useQueryClient();

  function handleReload() {
    queryClient.invalidateQueries({
      queryKey: ["playlist", playlistId],
    });
  }

  return (
    <ButtonIcon onClick={handleReload} disabled={isPending}>
      <HiOutlineArrowPath />
    </ButtonIcon>
  );
}

export default ButtonReloadPlaylist;
