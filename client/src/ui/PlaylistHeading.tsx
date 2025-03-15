import styled from "styled-components";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { useQueryClient } from "@tanstack/react-query";
import { usePlaylists } from "../features/playlist/usePlaylists";
import Button from "./Button";

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

const ButtonReload = styled(Button)`
  gap: 0.5rem;
  padding: 0.375rem;
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
      <ButtonReload onClick={handleReload} disabled={isPending}>
        <HiOutlineArrowPath />
      </ButtonReload>
    </Box>
  );
}

export default PlaylistHeading;
