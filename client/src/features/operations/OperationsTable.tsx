import styled from "styled-components";
import { useVideoOperations } from "../../context/VideoOperationsContext";
import OperationRow from "./OperationRow";

const StyledOperationsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow: auto;

  & th,
  td {
    text-align: left;
    padding: 0.25rem 0;
  }

  & td span {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  & thead tr {
    border-bottom: 1px solid var(--color-neutral-700);
  }

  & tr:not(:last-child) {
    border-top: 1px solid var(--color-neutral-700);
    border-bottom: 1px solid var(--color-neutral-700);
  }

  & th:not(:last-child),
  td:not(:last-child) {
    margin-right: 0.5rem;
  }

  & tbody tr:hover {
    background-color: var(--color-neutral-300);
  }

  & .status {
    width: 8rem;
  }

  & .medium {
    max-width: 60rem;
  }

  & a:hover {
    text-decoration: underline;
  }
`;

const Box = styled.div`
  overflow: auto;
`;

function OperationsTable() {
  const { items } = useVideoOperations();

  return (
    <Box>
      <StyledOperationsTable>
        <thead>
          <tr>
            <th className="medium">Playlist</th>
            <th>Title</th>
            <th className="status">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <OperationRow operation={item} key={item.id} />
          ))}
        </tbody>
      </StyledOperationsTable>
    </Box>
  );
}

export default OperationsTable;
