import styled from "styled-components";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { useQueryClient } from "@tanstack/react-query";
import { usePlaylists } from "../features/playlist/usePlaylists";
import ButtonIcon from "./ButtonIcon";

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
`;

const Span = styled.span`
  padding-left: 0.5rem;
  font-weight: 500;
`;

function PlaylistHeading() {
  const { isPending } = usePlaylists();
  const queryClient = useQueryClient();

  function handleReload() {
    queryClient.invalidateQueries({ queryKey: ["playlists"] });
  }

  return (
    <Box>
      <Span>Your playlists</Span>
      <ButtonIcon onClick={handleReload} disabled={isPending}>
        <HiOutlineArrowPath />
      </ButtonIcon>
    </Box>
  );
}

export default PlaylistHeading;
