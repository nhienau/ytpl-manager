import styled from "styled-components";
import { useCheckboxes } from "../../context/CheckboxesContext";
import Button from "../../ui/Button";
import { useVideoOperations } from "../../context/VideoOperationsContext";
import { useTopLevel } from "../../ui/TopLevel";
import toast from "react-hot-toast";
import { useWorker } from "../../context/WorkerContext";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ButtonSave({ playlistItems }) {
  const { checked } = useCheckboxes();
  const { add, update } = useVideoOperations();
  const { close } = useTopLevel();
  const worker = useWorker();

  function handleSave() {
    if (checked.length === 0) return;

    if (!worker) {
      toast.error("Failed to save");
      console.error("Worker not initialized");
      return;
    }

    const items = checked.flatMap((playlist) =>
      playlistItems.map((item) => ({
        id: crypto.randomUUID(),
        playlist,
        video: item,
        status: "pending",
        action: "add",
      }))
    );
    add(items);

    worker.onmessage = (e) => {
      const { id, status } = e.data;
      update(id, { status });
    };

    worker.postMessage(items);
    toast.success("Start processing");
    close();
  }

  return (
    <Box>
      <Button disabled={checked.length === 0} onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
}

export default ButtonSave;
