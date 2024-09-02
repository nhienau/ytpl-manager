import styled, { css } from "styled-components";
import PlaylistItem from "./PlaylistItem";
import { usePlaylistOperations } from "../../context/PlaylistOperationsContext";
import { usePlaylists } from "./usePlaylists";
import SpinnerMini from "../../ui/SpinnerMini";
import { filterAndSortPlaylists } from "../../utils/playlist";

// Sample data
const result = {
  kind: "youtube#playlistListResponse",
  etag: "",
  nextPageToken: "",
  pageInfo: {
    totalResults: 60,
    resultsPerPage: 5,
  },
  items: [
    {
      kind: "youtube#playlist",
      etag: "",
      id: "12345",
      snippet: {
        publishedAt: "2024-05-13T18:52:39Z",
        channelId: "",
        title: "Watch later 2",
        description: "",
        thumbnails: {},
        channelTitle: "",
        localized: {},
      },
    },
    {
      kind: "youtube#playlist",
      etag: "",
      id: "1234",
      snippet: {
        publishedAt: "2024-01-21T10:18:39Z",
        channelId: "",
        title: "linux",
        description: "",
        thumbnails: {},
        channelTitle: "",
        localized: {},
      },
    },
    {
      kind: "youtube#playlist",
      etag: "",
      id: "123",
      snippet: {
        publishedAt: "2023-12-16T02:59:52Z",
        channelId: "",
        title: "Vids to eat to",
        description: "",
        thumbnails: {},
        channelTitle: "",
        localized: {},
      },
    },
    {
      kind: "youtube#playlist",
      etag: "",
      id: "12",
      snippet: {
        publishedAt: "2023-09-09T07:54:28Z",
        channelId: "",
        title: "ssstest",
        description: "",
        thumbnails: {},
        channelTitle: "",
        localized: {},
      },
    },
    {
      kind: "youtube#playlist",
      etag: "",
      id: "1",
      snippet: {
        publishedAt: "2023-09-09T07:22:55Z",
        channelId: "",
        title: "atest",
        description: "",
        thumbnails: {},
        channelTitle: "",
        localized: {},
      },
    },
  ],
};

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

function PlaylistList() {
  const { isLoading, playlists } = usePlaylists();
  const { sortCriteria, query } = usePlaylistOperations();

  if (isLoading) {
    return (
      <StyledNav $isLoading={true}>
        <SpinnerMini />
      </StyledNav>
    );
  } else {
    const results = filterAndSortPlaylists(
      playlists.items,
      query,
      sortCriteria
    );
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
}

export default PlaylistList;
