import styled from "styled-components";
import { HiOutlineArrowPath } from "react-icons/hi2";
import PlaylistItem from "./PlaylistItem";
import { usePlaylist } from "../../context/PlaylistContext";
import { usePlaylists } from "./usePlaylists";
import SpinnerMini from "../../ui/SpinnerMini";

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
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
`;

const Span = styled.span`
  padding-left: 0.5rem;
  font-weight: 500;
`;

const Button = styled.button`
  text-align: left;
  background: none;
  border: none;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem;
  border-radius: 0.5rem;

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

  return (
    <>
      <Box>
        <Span>Your playlists</Span>
        <Button>
          <HiOutlineArrowPath />
        </Button>
      </Box>
      <StyledNav>
        {isLoading ? (
          <SpinnerMini />
        ) : (
          <StyledList>
            {playlists.items.map((item) => (
              <StyledListItem key={item.id}>
                <PlaylistItem id={item.id} title={item.snippet.title} />
              </StyledListItem>
            ))}
          </StyledList>
        )}
      </StyledNav>
    </>
  );
}

export default PlaylistList;
