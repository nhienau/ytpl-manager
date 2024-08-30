import { createContext, useContext, useState } from "react";
import { PLAYLIST_SORT_CRITERIAS } from "../utils/constants";

const PlaylistContext = createContext(null);

function PlaylistProvider({ children }) {
  const [sortCriteria, setSortCriteria] = useState(PLAYLIST_SORT_CRITERIAS[0]);
  const [query, setQuery] = useState("");

  return (
    <PlaylistContext.Provider
      value={{ sortCriteria, setSortCriteria, query, setQuery }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

function usePlaylist() {
  const context = useContext(PlaylistContext);
  if (context === undefined)
    throw new Error("PlaylistContext was used outside of PlaylistProvider");
  return context;
}

export { PlaylistProvider, usePlaylist };
