import styled from "styled-components";
import Button from "../../ui/Button";
import { useCheckboxes } from "../../context/CheckboxesContext";
import { usePlaylistItems } from "./usePlaylistItems";
import ButtonReloadPlaylist from "./ButtonReloadPlaylist";
import { useQueue } from "../../context/QueueContext";
import { PlaylistItem } from "../../utils/types";
import { ChangeEvent } from "react";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";

const StyledPlaylistHead = styled.div`
  padding: 1rem 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Title = styled.span`
  font-weight: 700;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

function PlaylistHead() {
  const { data } = usePlaylistItems();
  const { add } = useQueue();
  const { selectAll, clearAll, checked } = useCheckboxes<PlaylistItem>();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    checked ? selectAll() : clearAll();
  }

  function handleAddToQueue() {
    add(checked);
    clearAll();
  }

  return (
    <StyledPlaylistHead>
      <Box>
        <input
          type="checkbox"
          onChange={handleChange}
          checked={checked.length !== 0}
        />
        {checked.length > 0 ? (
          <>
            <span>
              {checked.length} video{checked.length === 1 ? "" : "s"} selected
            </span>
            <ButtonIcon onClick={handleAddToQueue} title="Add to queue">
              <MdOutlinePlaylistAdd />
            </ButtonIcon>
          </>
        ) : (
          <>
            <Title>{data?.title}</Title>
            <ButtonReloadPlaylist />
            <ButtonIcon title="Show more">
              <HiOutlineEllipsisVertical />
            </ButtonIcon>
          </>
        )}
      </Box>
      <Box>
        <Button onClick={selectAll}>Select all</Button>
        <Button onClick={clearAll} disabled={checked.length === 0}>
          Deselect all
        </Button>
      </Box>
    </StyledPlaylistHead>
  );
}

export default PlaylistHead;
