import styled from "styled-components";
import { useCheckboxes } from "../../context/CheckboxesContext";
import Button from "../../ui/Button";
import { useQueue } from "../../context/QueueContext";

const StyledQueueHead = styled.div`
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

function QueueHead() {
  const { remove } = useQueue();
  const { selectAll, clearAll, checked } = useCheckboxes();

  function handleChange(e) {
    const checked = e.target.checked;
    checked ? selectAll() : clearAll();
  }

  function handleRemove() {
    remove(checked);
    clearAll();
  }

  return (
    <StyledQueueHead>
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
            <Button onClick={handleRemove}>Remove from queue</Button>
          </>
        ) : (
          <span>Your queue</span>
        )}
      </Box>
      <Box>
        <Button onClick={selectAll}>Select all</Button>
        <Button onClick={clearAll} disabled={checked.length === 0}>
          Deselect all
        </Button>
      </Box>
    </StyledQueueHead>
  );
}

export default QueueHead;
