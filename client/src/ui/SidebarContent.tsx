import PlaylistList from "../features/playlist/PlaylistList";
import ListOperation from "./ListOperation";
import Menus from "./Menus";
import AppNavigation from "./AppNavigation";
import PlaylistHeading from "./PlaylistHeading";

function SidebarContent() {
  return (
    <div>
      <Menus>
        <AppNavigation />
        <ListOperation dropdownId="playlist-sort" />
        <PlaylistHeading />
        <PlaylistList />
      </Menus>
    </div>
  );
}

export default SidebarContent;
