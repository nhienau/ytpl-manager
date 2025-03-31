import { HiOutlinePlus, HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { Operation } from "../../utils/types";

const Cell = styled.td`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  & svg {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }

  & svg.add {
    color: green;
  }

  & svg.delete {
    color: red;
  }
`;

function OperationRow({ operation }: { operation: Operation }) {
  const { video, status, action } = operation;

  const playlist = action === "add" ? operation.playlist : video?.playlist;

  const icon = {
    add: <HiOutlinePlus title="Add" className="add" />,
    delete: <HiXMark title="Delete" className="delete" />,
  };

  const statusDisplay = {
    loading: "In progress",
    success: "Completed",
    failed: "Failed",
    pending: "Pending",
  };

  return (
    <tr>
      <td>
        {playlist && (
          <a
            href={`https://www.youtube.com/playlist?list=${playlist.id}`}
            target="_blank"
            title={playlist.title}
          >
            {playlist.title}
          </a>
        )}
      </td>
      <Cell className="medium">
        {video && (
          <>
            {icon[action]}
            <a
              href={`https://youtu.be/${video.videoId}`}
              target="_blank"
              title={video.title}
            >
              {video.title}
            </a>
          </>
        )}
      </Cell>
      <td className="status">
        <span>{statusDisplay[status]}</span>
      </td>
    </tr>
  );
}

export default OperationRow;
