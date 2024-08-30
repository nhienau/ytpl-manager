import { MdOutlineSort } from "react-icons/md";
import styled from "styled-components";
import { usePlaylist } from "../context/PlaylistContext";
import { PLAYLIST_SORT_CRITERIAS } from "../utils/constants";
import Criteria from "./Criteria";
import Menus from "./Menus";

const SortToggle = styled(Menus.Toggle)`
  text-align: left;
  background: none;
  border: none;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.5rem;
  border-radius: 0.5rem;
  background-color: var(--color-neutral-200);

  & span {
    font-size: 0.875rem;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  & svg {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
  }

  &:hover {
    background-color: var(--color-neutral-300);
  }
`;

const StyledList = styled(Menus.List)`
  padding: 0.25rem;
  background-color: #fff;
  box-shadow: var(--shadow-md);
  border-radius: 0.5rem;
  border: 1px solid var(--color-neutral-300);
`;

const Span = styled.span`
  margin-left: 0.5rem;
  margin-bottom: 0.25rem;
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
`;

function PlaylistSort() {
  const { sortCriteria } = usePlaylist();

  return (
    <Menus.Menu>
      <SortToggle id="sort">
        <MdOutlineSort />
        <span>{sortCriteria.label}</span>
      </SortToggle>

      <StyledList id="sort" domNodeId="playlist-sort">
        <Span>Sort by</Span>
        {PLAYLIST_SORT_CRITERIAS.map((criteria) => (
          <Criteria criteria={criteria} key={criteria.value} />
        ))}
      </StyledList>
    </Menus.Menu>
  );
}

export default PlaylistSort;
