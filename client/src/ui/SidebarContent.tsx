import PlaylistList from "../features/playlist/PlaylistList";
import ListOperation from "./ListOperation";
import Menus from "./Menus";
import PlaylistHeading from "./PlaylistHeading";

function SidebarContent() {
  return (
    <div>
      <Menus>
        <ListOperation />
        <PlaylistHeading />
        <PlaylistList />
      </Menus>
    </div>
  );
}

export default SidebarContent;
