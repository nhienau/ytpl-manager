import styled from "styled-components";
import FormField from "./FormField";
import FormInput from "./FormInput";
import { PlaylistFormData } from "../utils/types";
import { useForm } from "react-hook-form";
import Button from "./Button";

const StyledPlaylistInfoForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow: auto;
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

const ErrorMessage = styled.span`
  color: var(--color-red-700);
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonSubmit = styled(Button)`
  padding: 0.375rem 3rem;
`;

interface PlaylistInfoFormProps {
  defaultValues?: PlaylistFormData;
  showDeleteFromInitialPlaylistField?: boolean;
  isPending: boolean;
  onSubmit: (data: PlaylistFormData) => void;
}

function PlaylistInfoForm({
  defaultValues,
  showDeleteFromInitialPlaylistField = false,
  isPending,
  onSubmit,
}: PlaylistInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlaylistFormData>({ defaultValues: defaultValues || {} });

  return (
    <StyledPlaylistInfoForm onSubmit={handleSubmit(onSubmit)}>
      {defaultValues?.id && (
        <input type="hidden" {...register("id")} value={defaultValues.id} />
      )}
      <FormField $vertical>
        <label htmlFor="title">Title (required)</label>
        <FormInput
          type="text"
          id="title"
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
      </FormField>
      <FormField $vertical>
        <label htmlFor="description">Description</label>
        <FormInput
          type="text"
          id="description"
          {...register("description", {
            maxLength: {
              value: 5000,
              message: "Description must be less than 5000 characters",
            },
            pattern: {
              value: /^(?!\s+$).+/g,
              message: "Invalid description",
            },
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </FormField>
      <FormField $vertical>
        <label htmlFor="visibility">Visibility</label>
        <Select id="visibility" {...register("visibility")}>
          <option value="public">Public</option>
          <option value="unlisted">Unlisted</option>
          <option value="private">Private</option>
        </Select>
        {errors.visibility && (
          <ErrorMessage>{errors.visibility.message}</ErrorMessage>
        )}
      </FormField>
      {showDeleteFromInitialPlaylistField && (
        <FormField>
          <FormInput
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
        </FormField>
      )}
      <Box>
        <ButtonSubmit disabled={isPending}>Save</ButtonSubmit>
      </Box>
    </StyledPlaylistInfoForm>
  );
}

export default PlaylistInfoForm;
