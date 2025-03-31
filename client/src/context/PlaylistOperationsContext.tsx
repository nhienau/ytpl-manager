import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { PLAYLIST_SORT_CRITERIAS } from "../utils/constants";
import { SortCriteria } from "../utils/types";

interface PlaylistContextValue {
  sortCriteria: SortCriteria;
  setSortCriteria: Dispatch<SetStateAction<SortCriteria>>;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const PlaylistContext = createContext<PlaylistContextValue | null>(null);

function PlaylistProvider({ children }: { children: ReactNode }) {
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

function usePlaylistOperations() {
  const context = useContext(PlaylistContext);
  if (context === null || context === undefined)
    throw new Error("PlaylistContext was used outside of PlaylistProvider");
  return context;
}

export { PlaylistProvider, usePlaylistOperations };
