import styled from "styled-components";
import Button from "../../ui/Button";
import { useCheckboxes } from "../../context/CheckboxesContext";
import { usePlaylistItems } from "./usePlaylistItems";
import ButtonReloadPlaylist from "./ButtonReloadPlaylist";

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
  const { selectAll, clearAll, checked } = useCheckboxes();

  function handleChange(e) {
    const checked = e.target.checked;
    checked ? selectAll() : clearAll();
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
            <Button>Add to queue</Button>
            <Button>Delete</Button>
          </>
        ) : (
          <>
            <Title>{data?.title}</Title>
            <ButtonReloadPlaylist />
            <Button>Show more</Button>
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
