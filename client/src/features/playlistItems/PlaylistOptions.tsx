import {
  HiOutlineEllipsisVertical,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import Menus from "../../ui/Menus";
import { usePlaylistItems } from "./usePlaylistItems";
import { FaYoutube } from "react-icons/fa";
import { TopLevel } from "../../ui/TopLevel";
import EditPlaylistInfo from "./EditPlaylistInfo";
import DeletePlaylistModal from "./DeletePlaylistModal";

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
        <Menus.List id="playlist-table" domNodeId="playlist-table">
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
        </Menus.List>
      </Menus.Menu>
    </TopLevel>
  );
}

export default PlaylistOptions;
