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
import { useLocalStorageState } from "../hooks/useLocalStorageState";

interface PlaylistContextValue {
  sortCriteria: SortCriteria;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  handleChangeSortCriteria: (criteria: SortCriteria) => void;
}

const PlaylistContext = createContext<PlaylistContextValue | null>(null);

function PlaylistProvider({ children }: { children: ReactNode }) {
  const [storedCriteria, setStoredCriteria] = useLocalStorageState(
    PLAYLIST_SORT_CRITERIAS[0].value,
    "ytpl-sortCriteria"
  );

  const criteria =
    PLAYLIST_SORT_CRITERIAS.find((c) => c.value === storedCriteria) ??
    PLAYLIST_SORT_CRITERIAS[0];

  const [sortCriteria, setSortCriteria] = useState(criteria);
  const [query, setQuery] = useState("");

  function handleChangeSortCriteria(criteria: SortCriteria) {
    setSortCriteria(criteria);
    setStoredCriteria(criteria.value);
  }

  return (
    <PlaylistContext.Provider
      value={{
        sortCriteria,
        handleChangeSortCriteria,
        query,
        setQuery,
      }}
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
