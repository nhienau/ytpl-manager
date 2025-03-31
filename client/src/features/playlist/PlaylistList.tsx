import styled, { css } from "styled-components";
import { usePlaylistOperations } from "../../context/PlaylistOperationsContext";
import { usePlaylists } from "./usePlaylists";
import SpinnerMini from "../../ui/SpinnerMini";
import { filterAndSortPlaylists } from "../../utils/playlist";
import { Navigate } from "react-router-dom";
import PlaylistRow from "./PlaylistRow";

interface StyledNavProps {
  $isLoading?: boolean;
}

const StyledNav = styled.nav<StyledNavProps>`
  padding: 0.25rem 0.5rem 0.5rem 0.5rem;

  ${(props) =>
    props.$isLoading &&
    css`
      display: flex;
      justify-content: center;
    `}
`;

StyledNav.defaultProps = {
  $isLoading: false,
};

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
  const { isPending, data, isError, error } = usePlaylists();
  const { sortCriteria, query } = usePlaylistOperations();

  if (isPending) {
    return (
      <StyledNav $isLoading={true}>
        <SpinnerMini />
      </StyledNav>
    );
  }

  if (isError && error?.status === 401) {
    return <Navigate to="/test" />;
  }

  if (!data) return null;

  if (data.length === 0) {
    return (
      <StyledNav>
        <Span>No playlists found</Span>
      </StyledNav>
    );
  }
  const results = filterAndSortPlaylists(data, query, sortCriteria);

  return (
    <StyledNav>
      <StyledList>
        {results.map((item) => (
          <StyledListItem key={item.id}>
            <PlaylistRow playlist={item} />
          </StyledListItem>
        ))}
      </StyledList>
    </StyledNav>
  );
}

export default PlaylistList;
