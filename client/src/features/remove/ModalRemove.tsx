import styled from "styled-components";
import { useCheckboxes } from "../../context/CheckboxesContext";
import { useQueue } from "../../context/QueueContext";
import Modal from "../../ui/Modal";
import { Operation, PlaylistItem, WorkerRequest } from "../../utils/types";
import Button from "../../ui/Button";
import { TopLevel, useTopLevel } from "../../ui/TopLevel";
import { HiOutlineXMark } from "react-icons/hi2";
import { useWorker } from "../../context/WorkerContext";
import toast from "react-hot-toast";
import { useVideoOperations } from "../../context/VideoOperationsContext";
import { useQueryClient } from "@tanstack/react-query";

const Box = styled.div`
  max-width: 30rem;
`;

const ButtonClose = styled(Button)`
  position: absolute;
  top: 0.375rem;
  right: 0.375rem;
  padding: 0.5rem;
  border-radius: 50%;
`;

const Text = styled.p`
  margin-bottom: 0.75rem;
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

function ModalRemove() {
  const { checked } = useCheckboxes<PlaylistItem>();
  const { queue, remove: removeFromQueue } = useQueue();
  const { close } = useTopLevel();
  const playlistItems = checked.length > 0 ? checked : queue;
  const numVideosString = `${playlistItems.length} video${
    playlistItems.length !== 1 ? "s" : ""
  }`;

  const worker = useWorker();
  const { add: addOperations, update: updateOperation } = useVideoOperations();
  const queryClient = useQueryClient();

  function handleRemove() {
    if (!worker) {
      toast.error(`Failed to remove ${numVideosString}`);
      console.error("Worker not initialized");
      return;
    }

    const items: Operation[] = playlistItems.map((item) => ({
      id: crypto.randomUUID(),
      video: item,
      status: "pending",
      action: "delete",
    }));

    removeFromQueue(playlistItems);
    addOperations(items);

    worker.onmessage = (e) => {
      const { id, status, video } = e.data as Operation;
      updateOperation(id, { status });

      if (status === "loading") return;

      if (video?.playlist && status === "success") {
        const playlistId = video.playlist.id;
        queryClient.invalidateQueries({
          queryKey: ["playlist", playlistId],
        });
      }
    };

    worker.postMessage({
      config: {
        apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
      },
      items,
    } as WorkerRequest);

    toast.success(
      `Removing ${numVideosString} from its own playlist${
        playlistItems.length !== 1 ? "s" : ""
      }. You can check them out at the Operations tab.`
    );
    close();
  }

  return (
    <Modal>
      <Box>
        <TopLevel.Close>
          <ButtonClose>
            <HiOutlineXMark />
          </ButtonClose>
        </TopLevel.Close>
        <Text>
          {numVideosString} will be removed from its own playlist
          {playlistItems.length !== 1 ? "s" : ""}. This action cannot be undone.
        </Text>
        <ButtonContainer>
          <StyledButton onClick={close}>Cancel</StyledButton>
          <ButtonRemove onClick={handleRemove}>Remove</ButtonRemove>
        </ButtonContainer>
      </Box>
    </Modal>
  );
}

export default ModalRemove;
