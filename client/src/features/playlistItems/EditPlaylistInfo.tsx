import styled, { css } from "styled-components";
import Modal from "../../ui/Modal";
import { usePlaylistItems } from "./usePlaylistItems";
import Spinner from "../../ui/Spinner";
import PlaylistInfoForm from "../../ui/PlaylistInfoForm";
import { PlaylistFormData } from "../../utils/types";
import Button from "../../ui/Button";
import { TopLevel, useTopLevel } from "../../ui/TopLevel";
import { HiOutlineXMark } from "react-icons/hi2";
import { useUpdatePlaylist } from "./useUpdatePlaylist";

const Heading = styled.h2`
  margin-bottom: 1rem;
`;

const Container = styled.div`
  min-width: 20rem;
  max-width: 30rem;
`;

const ButtonClose = styled(Button)`
  position: absolute;
  top: 0.375rem;
  right: 0.375rem;
  padding: 0.5rem;
  border-radius: 50%;
`;

interface BoxProps {
  $center?: boolean;
}

const Box = styled.div<BoxProps>`
  ${(props) =>
    props.$center
      ? css`
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        `
      : css`
          overflow: auto;
        `}
`;

Box.defaultProps = {
  $center: false,
};

function EditPlaylistInfo() {
  const { isPending, data } = usePlaylistItems();
  const { isPending: isUpdating, mutate: updatePlaylist } = useUpdatePlaylist();
  const { close } = useTopLevel();

  if (isPending) {
    <Modal>
      <Container>
        <Box $center>
          <Spinner />
        </Box>
      </Container>
    </Modal>;
  }

  if (!data) return null;

  const {
    id,
    title,
    description,
    status: { privacyStatus },
  } = data;
  const initialValues = {
    id,
    title,
    description,
    visibility: privacyStatus,
  };

  function onSubmit(data: PlaylistFormData) {
    if (!data.id) {
      throw new Error("Playlist ID not found when updating playlist");
    }
    const title = data.title.trim();
    const description = data.description?.trim() || "";
    if (
      title === initialValues.title &&
      description === initialValues.description &&
      data.visibility === initialValues.visibility
    )
      return;

    updatePlaylist(
      { id: data.id, title, description, visibility: data.visibility },
      {
        onSettled: () => {
          close();
        },
      }
    );
  }

  return (
    <Modal>
      <Container>
        <TopLevel.Close>
          <ButtonClose>
            <HiOutlineXMark />
          </ButtonClose>
        </TopLevel.Close>

        <Box>
          <Heading>Edit playlist</Heading>
          <PlaylistInfoForm
            defaultValues={initialValues}
            onSubmit={onSubmit}
            isPending={isUpdating}
          />
        </Box>
      </Container>
    </Modal>
  );
}

export default EditPlaylistInfo;
