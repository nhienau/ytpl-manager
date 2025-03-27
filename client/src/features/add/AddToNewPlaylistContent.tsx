import styled from "styled-components";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useCreatePlaylist } from "./useCreatePlaylist";
import toast from "react-hot-toast";
import { useTopLevel } from "../../ui/TopLevel";
import { useWorker } from "../../context/WorkerContext";
import { useVideoOperations } from "../../context/VideoOperationsContext";
import { useQueue } from "../../context/QueueContext";
import { useQueryClient } from "@tanstack/react-query";

const StyledAddToNewPlaylistContent = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow: auto;
`;

const Input = styled.input`
  background: none;
  border: none;
  border-radius: 0.375rem;
  border: 1px solid var(--color-neutral-400);
  padding: 0.25rem 0.375rem;
  transition: none;

  &:focus {
    outline: none;
    border: 1px solid var(--color-neutral-800);
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.$vertical ? "column" : "row")};
  gap: 0.25rem;
`;

const Select = styled.select`
  background: none;
  border: none;
  border: 1px solid var(--color-neutral-400);
  border-radius: 0.375rem;
  padding: 0.25rem 0.375rem;
  transition: none;
  background-color: var(--color-neutral-100);

  &:focus {
    outline: none;
    border: 1px solid var(--color-neutral-800);
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonSubmit = styled(Button)`
  padding: 0.375rem 0.875rem;
`;

const ErrorMessage = styled.span`
  color: red;
`;

type Inputs = {
  title: string;
  visibility: string;
  deleteFromInitialPlaylist: boolean;
};

function AddToNewPlaylistContent({ playlistItems }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { mutate: createPlaylist, isPending } = useCreatePlaylist();
  const { close } = useTopLevel();
  const worker = useWorker();
  const { add, update } = useVideoOperations();
  const { remove } = useQueue();
  const queryClient = useQueryClient();

  function onSubmit(data) {
    if (!worker) {
      toast.error("Failed to save");
      console.error("Worker not initialized");
      return;
    }

    const { title, visibility, deleteFromInitialPlaylist } = data;
    const playlistTitle = title.trim();

    createPlaylist(
      { title: playlistTitle, visibility },
      {
        onSuccess: (res) => {
          const { data: playlist } = res;
          const items = playlistItems.map((item) => ({
            id: crypto.randomUUID(),
            playlist,
            video: item,
            status: "pending",
            action: "add",
          }));
          let itemsToDelete = [];
          if (deleteFromInitialPlaylist) {
            itemsToDelete = playlistItems.map((item) => ({
              id: crypto.randomUUID(),
              video: item,
              status: "pending",
              action: "delete",
            }));

            remove(playlistItems);
          }

          add([...items, ...itemsToDelete]);

          worker.onmessage = (e) => {
            const { id, status, action, playlist, video } = e.data;
            update(id, { status });

            if (action === "loading") return;

            if (action === "add" && status === "success") {
              const playlistId = playlist.id;
              queryClient.invalidateQueries({
                queryKey: ["playlist", playlistId],
              });
            }

            if (action === "delete" && status === "success") {
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
            items: [...items, ...itemsToDelete],
          });

          toast.success(
            `Successfully created playlist "${playlistTitle}". Adding ${
              playlistItems.length
            } video${
              playlistItems.length !== 1 ? "s" : ""
            } to "${playlistTitle}". You can check them out at the Operations tab.`
          );
        },
        onError: (err) => {
          toast.error(
            `Failed to create playlist "${playlistTitle}". Please try again.`
          );
          console.error(err);
        },
        onSettled: () => {
          close();
        },
      }
    );
  }

  return (
    <StyledAddToNewPlaylistContent onSubmit={handleSubmit(onSubmit)}>
      <Field $vertical={true}>
        <label htmlFor="title">Title</label>
        <Input
          type="text"
          id="title"
          placeholder="New playlist title"
          {...register("title", {
            required: "Title must not be empty",
            maxLength: {
              value: 150,
              message: "Title must be less than 150 characters",
            },
            pattern: {
              value: /^(?!\s+$).+/g,
              message: "Title must not be empty",
            },
          })}
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </Field>
      <Field $vertical={true}>
        <label htmlFor="visibility">Visibility</label>
        <Select id="visibility" {...register("visibility")}>
          <option value="public">Public</option>
          <option value="unlisted">Unlisted</option>
          <option value="private">Private</option>
        </Select>
        {errors.visibility && (
          <ErrorMessage>{errors.visibility.message}</ErrorMessage>
        )}
      </Field>
      <Field $vertical={false}>
        <Input
          type="checkbox"
          id="deleteFromInitialPlaylist"
          {...register("deleteFromInitialPlaylist")}
        />
        <label htmlFor="deleteFromInitialPlaylist">
          Delete from initial playlist
        </label>
        {errors.deleteFromInitialPlaylist && (
          <ErrorMessage>
            {errors.deleteFromInitialPlaylist.message}
          </ErrorMessage>
        )}
      </Field>
      <Box>
        <ButtonSubmit disabled={isPending}>Save</ButtonSubmit>
      </Box>
    </StyledAddToNewPlaylistContent>
  );
}

export default AddToNewPlaylistContent;
