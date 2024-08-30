import PlaylistList from "../features/playlist/PlaylistList";
import ListOperation from "./ListOperation";
import Menus from "./Menus";

function SidebarContent() {
  return (
    <div>
      <Menus>
        <ListOperation />
        <PlaylistList />
      </Menus>
    </div>
  );
}

export default SidebarContent;
