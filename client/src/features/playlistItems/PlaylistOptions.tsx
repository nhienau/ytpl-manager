import {
  HiOutlineEllipsisVertical,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import Menus from "../../ui/Menus";
import styled from "styled-components";
import { usePlaylistItems } from "./usePlaylistItems";
import { FaYoutube } from "react-icons/fa";
import { TopLevel } from "../../ui/TopLevel";
import EditPlaylistInfo from "./EditPlaylistInfo";
import DeletePlaylistModal from "./DeletePlaylistModal";

const StyledList = styled(Menus.List)`
  padding: 0.25rem;
  background-color: #fff;
  box-shadow: var(--shadow-lg);
  border-radius: 0.5rem;
  border: 1px solid var(--color-neutral-300);
`;

function PlaylistOptions() {
  const { data } = usePlaylistItems();

  return (
    <TopLevel>
      <TopLevel.Window name="edit-playlist">
        <EditPlaylistInfo />
      </TopLevel.Window>
      <TopLevel.Window name="delete-playlist">
        <DeletePlaylistModal />
      </TopLevel.Window>

      <Menus.Menu>
        <Menus.Toggle id="playlist-table" asChild>
          <ButtonIcon title="Show more">
            <HiOutlineEllipsisVertical />
          </ButtonIcon>
        </Menus.Toggle>
        <StyledList id="playlist-table" domNodeId="playlist-table">
          <Menus.Button
            icon={<FaYoutube />}
            as="a"
            href={`https://www.youtube.com/playlist?list=${data?.id}`}
            target="_blank"
          >
            View on YouTube
          </Menus.Button>
          <TopLevel.Open opens="edit-playlist">
            <Menus.Button icon={<HiOutlinePencil />}>
              Edit playlist
            </Menus.Button>
          </TopLevel.Open>
          <TopLevel.Open opens="delete-playlist">
            <Menus.Button icon={<HiOutlineTrash />}>
              Delete playlist
            </Menus.Button>
          </TopLevel.Open>
        </StyledList>
      </Menus.Menu>
    </TopLevel>
  );
}

export default PlaylistOptions;
