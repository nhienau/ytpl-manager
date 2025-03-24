import { HiOutlinePlus, HiXMark } from "react-icons/hi2";
import styled from "styled-components";

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

function OperationRow({ operation }) {
  const { playlist = {}, video, status, action } = operation;

  return (
    <tr>
      <Cell className="medium">
        {action === "add" && <HiOutlinePlus title="Add" className="add" />}
        {action === "delete" && <HiXMark title="Delete" className="delete" />}
        <span title={playlist.title}>{playlist.title}</span>
      </Cell>
      <td>
        <span title={video.title}>{video.title}</span>
      </td>
      <td className="status">
        <span>{status}</span>
      </td>
    </tr>
  );
}

export default OperationRow;
