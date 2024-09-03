import styled, { css } from "styled-components";
import PlaylistItem from "./PlaylistItem";
import { usePlaylistOperations } from "../../context/PlaylistOperationsContext";
import { usePlaylists } from "./usePlaylists";
import SpinnerMini from "../../ui/SpinnerMini";
import { filterAndSortPlaylists } from "../../utils/playlist";

const StyledNav = styled.nav`
  padding: 0.25rem 0.5rem 0.5rem 0.5rem;

  ${(props) =>
    props.$isLoading &&
    css`
      display: flex;
      justify-content: center;
    `}
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

const StyledListItem = styled.li`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;

  &:hover,
  &:has(a.active) {
    background-color: var(--color-neutral-300);
  }
`;

const Span = styled.span`
  padding-left: 0.5rem;
`;

function PlaylistList() {
  const { isLoading, playlists } = usePlaylists();
  const { sortCriteria, query } = usePlaylistOperations();

  if (isLoading) {
    return (
      <StyledNav $isLoading={true}>
        <SpinnerMini />
      </StyledNav>
    );
  }

  const results = filterAndSortPlaylists(playlists.items, query, sortCriteria);
  if (results.length === 0) {
    return (
      <StyledNav>
        <Span>No playlists found</Span>
      </StyledNav>
    );
  }

  return (
    <StyledNav>
      <StyledList>
        {results.map((item) => (
          <StyledListItem key={item.id}>
            <PlaylistItem id={item.id} title={item.snippet.title} />
          </StyledListItem>
        ))}
      </StyledList>
    </StyledNav>
  );
}

export default PlaylistList;
