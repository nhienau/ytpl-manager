import styled from "styled-components";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { usePlaylistItems } from "./usePlaylistItems";
import Button from "../../ui/Button";

const StyledButtonReloadPlaylist = styled(Button)`
  gap: 0.5rem;
  padding: 0.375rem;
`;

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
    <StyledButtonReloadPlaylist onClick={handleReload} disabled={isPending}>
      <HiOutlineArrowPath />
    </StyledButtonReloadPlaylist>
  );
}

export default ButtonReloadPlaylist;
