import styled, { css } from "styled-components";
import { HiOutlineXMark } from "react-icons/hi2";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { TopLevel, useTopLevel } from "../../ui/TopLevel";
import { usePlaylistItems } from "./usePlaylistItems";
import Spinner from "../../ui/Spinner";
import { useDeletePlaylist } from "./useDeletePlaylist";
import { useNavigate } from "react-router-dom";
import { useQueue } from "../../context/QueueContext";

interface BoxProps {
  $center?: boolean;
}

const Box = styled.div<BoxProps>`
  max-width: 30rem;

  ${(props) =>
    props.$center
      ? css`
          display: flex;
          justify-content: center;
          align-items: center;
        `
      : css`
          overflow: auto;
        `}
`;

const ButtonClose = styled(Button)`
  position: absolute;
  top: 0.375rem;
  right: 0.375rem;
  padding: 0.5rem;
  border-radius: 50%;
`;

const Heading = styled.h2`
  /* margin-bottom: 0.75rem; */
`;

const Text = styled.p`
  margin-bottom: 0.75rem;
`;

const Title = styled.span`
  font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
`;

const StyledButton = styled(Button)`
  padding: 0.375rem 1.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-neutral-200);
`;

const ButtonRemove = styled(StyledButton)`
  color: var(--color-neutral-50);
  background-color: var(--color-red-500);

  &:not(:disabled):hover {
    background-color: var(--color-red-700);
  }
`;

function DeletePlaylistModal() {
  const { isPending, data } = usePlaylistItems();
  const { isPending: isDeleting, mutate: deletePlaylist } = useDeletePlaylist();
  const { close } = useTopLevel();
  const navigate = useNavigate();
  const { queue, remove } = useQueue();

  function handleDelete(id: string) {
    // Check and remove playlist items from queue before deletion
    const playlistItemsInQueue = queue.filter(
      (item) => item.playlist?.id === id
    );
    remove(playlistItemsInQueue);

    deletePlaylist(id, {
      onSuccess: () => {
        navigate("/app");
      },
      onSettled: () => {
        close();
      },
    });
  }

  if (isPending) {
    <Modal>
      <Box $center>
        <Spinner />
      </Box>
    </Modal>;
  }

  if (!data) return null;

  const { id, title } = data;

  return (
    <Modal>
      <Box>
        <TopLevel.Close>
          <ButtonClose>
            <HiOutlineXMark />
          </ButtonClose>
        </TopLevel.Close>
        <Heading>Delete playlist</Heading>
        <Text>
          Are you sure you want to delete playlist <Title>{title}</Title>? This
          action cannot be undone.
        </Text>
        <ButtonContainer>
          <StyledButton onClick={close}>Cancel</StyledButton>
          <ButtonRemove onClick={() => handleDelete(id)} disabled={isDeleting}>
            Delete
          </ButtonRemove>
        </ButtonContainer>
      </Box>
    </Modal>
  );
}

export default DeletePlaylistModal;
