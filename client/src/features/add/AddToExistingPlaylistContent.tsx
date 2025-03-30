import styled, { css } from "styled-components";
import { usePlaylists } from "../playlist/usePlaylists";
import SpinnerMini from "../../ui/SpinnerMini";
import PlaylistRow from "./PlaylistRow";
import { CheckboxesProvider } from "../../context/CheckboxesContext";
import ButtonSave from "./ButtonSave";
import { useState } from "react";
import { Playlist } from "../../utils/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow: auto;
`;

const Box = styled.div`
  ${(props) =>
    props.$center
      ? css`
          display: flex;
          justify-content: center;
        `
      : css`
          overflow: auto;
        `}
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function AddToExistingPlaylistContent({ playlistItems }) {
  const { isPending, data } = usePlaylists();
  const [deleteFromInitialPlaylist, setDeleteFromInitialPlaylist] =
    useState(false);

  if (isPending) {
    return (
      <Box $center={true}>
        <SpinnerMini />
      </Box>
    );
  }
  if (!data) return null;
  if (data.length === 0) {
    return (
      <Box $center={true}>
        <span>No playlists found</span>
      </Box>
    );
  }

  return (
    <Container>
      <CheckboxesProvider<Playlist> allElements={data}>
        <Box>
          {data.map((playlist) => (
            <PlaylistRow key={playlist.id} playlist={playlist} />
          ))}
        </Box>
        <Option>
          <input
            type="checkbox"
            value={deleteFromInitialPlaylist}
            onChange={(e) => setDeleteFromInitialPlaylist(e.target.checked)}
            id="delete"
            name="delete"
          />
          <label htmlFor="delete">Delete from initial playlist</label>
        </Option>
        <ButtonSave
          playlistItems={playlistItems}
          deleteFromInitialPlaylist={deleteFromInitialPlaylist}
        />
      </CheckboxesProvider>
    </Container>
  );
}

export default AddToExistingPlaylistContent;
