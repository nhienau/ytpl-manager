// As playlist items will have some functionalities that interact with checkboxes of the playlist and the queue, temporarily a separate context is used for queue checkboxes.
import { createContext, ReactNode, useContext, useState } from "react";
import { PlaylistItem } from "../utils/types";

interface QueueCheckboxesContextValue<T> {
  checked: T[];
  add: (item: T) => void;
  clearAll: () => void;
  selectAll: () => void;
  remove: (item: T) => void;
  removeById: (items: T[]) => void;
  removeByPlaylistId: (id: string) => void;
  numElements: number;
}

interface QueueCheckboxesProviderProps<T> {
  children: ReactNode;
  allElements: T[];
}

const QueueCheckboxesContext =
  createContext<QueueCheckboxesContextValue<unknown> | null>(null);

function QueueCheckboxesProvider<T extends PlaylistItem>({
  children,
  allElements,
}: QueueCheckboxesProviderProps<T>) {
  const [checked, setChecked] = useState<T[]>([]);

  const numElements = allElements.length;

  function add(item: T) {
    setChecked((c) => [...c, item]);
  }

  function remove(item: T) {
    setChecked((c) => c.filter((i) => i !== item));
  }

  function removeById(items: T[]) {
    const ids = items.map((i) => i.id);
    setChecked((c) => c.filter((i) => !ids.includes(i.id)));
  }

  function removeByPlaylistId(id: string) {
    setChecked((c) => c.filter((i) => (i.playlist ? i.playlist.id !== id : i)));
  }

  function selectAll() {
    setChecked([...allElements]);
  }

  function clearAll() {
    setChecked([]);
  }

  const value = {
    checked,
    add,
    clearAll,
    selectAll,
    remove,
    removeById,
    removeByPlaylistId,
    numElements,
  } as QueueCheckboxesContextValue<unknown>;

  return (
    <QueueCheckboxesContext.Provider value={value}>
      {children}
    </QueueCheckboxesContext.Provider>
  );
}

function useQueueCheckboxes<T>() {
  const context = useContext(QueueCheckboxesContext);
  if (context === null || context === undefined)
    throw new Error(
      "QueueCheckboxesContext was used outside of QueueCheckboxesProvider"
    );
  return context as QueueCheckboxesContextValue<T>;
}

export { QueueCheckboxesProvider, useQueueCheckboxes };
