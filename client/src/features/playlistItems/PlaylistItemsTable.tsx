import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { CheckboxesProvider } from "../../context/CheckboxesContext";
import PlaylistHead from "./PlaylistHead";
import PlaylistItemsContainer from "./PlaylistItemsContainer";
import PlaylistItemsPagination from "./PlaylistItemsPagination";
import Spinner from "../../ui/Spinner";
import { usePlaylistItems } from "./usePlaylistItems";
import { isGoogleAPIErrorResponse, PlaylistItem } from "../../utils/types";
import Menus from "../../ui/Menus";

const Table = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  background-color: var(--color-neutral-100);
  border: 1px solid var(--color-neutral-300);
  border-radius: 0.625rem;
`;

const Box = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function PlaylistItemsTable() {
  const { isPending, data, isError, error } = usePlaylistItems();

  if (isPending) {
    return (
      <Table>
        <Box>
          <Spinner />
        </Box>
      </Table>
    );
  }

  if (isError && error) {
    const { status, data: errorData } = error;

    if (status === 401) {
      return <Navigate to="/login" />;
    } else if (
      status === 404 &&
      isGoogleAPIErrorResponse(errorData) &&
      errorData?.error.errors[0].reason === "playlistNotFound"
    ) {
      return (
        <Table>
          <Box>
            <span>Playlist not found</span>
          </Box>
        </Table>
      );
    } else {
      throw new Error(error.message);
    }
  }

  return (
    <Table data-dropdown-id="playlist-table">
      {!isPending && !isError && data && (
        <CheckboxesProvider<PlaylistItem>
          allElements={data?.data.filter((item) => item.videoOwnerChannelId)}
        >
          <Menus>
            <PlaylistHead />
            <PlaylistItemsContainer />
          </Menus>
        </CheckboxesProvider>
      )}
      <PlaylistItemsPagination />
    </Table>
  );
}

export default PlaylistItemsTable;
