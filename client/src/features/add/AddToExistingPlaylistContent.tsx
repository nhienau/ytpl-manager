import styled, { css } from "styled-components";
import { usePlaylists } from "../playlist/usePlaylists";
import SpinnerMini from "../../ui/SpinnerMini";
import PlaylistRow from "./PlaylistRow";
import { CheckboxesProvider } from "../../context/CheckboxesContext";
import ButtonSave from "./ButtonSave";

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

function AddToExistingPlaylistContent({ playlistItems }) {
  const { isPending, data } = usePlaylists();

  if (isPending) {
    return (
      <Box $center={true}>
        <SpinnerMini />
      </Box>
    );
  }
  if (data.length === 0) {
    return (
      <Box $center={true}>
        <span>No playlists found</span>
      </Box>
    );
  }

  return (
    <>
      <CheckboxesProvider allElements={data}>
        <Box>
          {data.map((playlist) => (
            <PlaylistRow key={playlist.id} playlist={playlist} />
          ))}
        </Box>
        <ButtonSave playlistItems={playlistItems} />
      </CheckboxesProvider>
    </>
  );
}

export default AddToExistingPlaylistContent;
