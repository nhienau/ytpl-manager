import { MdOutlineSort } from "react-icons/md";
import styled from "styled-components";
import { usePlaylistOperations } from "../context/PlaylistOperationsContext";
import { PLAYLIST_SORT_CRITERIAS } from "../utils/constants";
import Button from "./Button";
import Criteria from "./Criteria";
import Menus from "./Menus";

const SortToggle = styled(Button)`
  background-color: var(--color-neutral-200);
`;

const Span = styled.span`
  margin-left: 0.5rem;
  margin-bottom: 0.25rem;
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
`;

function PlaylistSort({ nodeId }: { nodeId: string }) {
  const { sortCriteria } = usePlaylistOperations();

  return (
    <Menus.Menu>
      <Menus.Toggle id="sort" asChild>
        <SortToggle>
          <MdOutlineSort />
          <span>{sortCriteria.label}</span>
        </SortToggle>
      </Menus.Toggle>

      <Menus.List id="sort" domNodeId={nodeId}>
        <Span>Sort by</Span>
        {PLAYLIST_SORT_CRITERIAS.map((criteria) => (
          <Criteria criteria={criteria} key={criteria.value} />
        ))}
      </Menus.List>
    </Menus.Menu>
  );
}

export default PlaylistSort;
