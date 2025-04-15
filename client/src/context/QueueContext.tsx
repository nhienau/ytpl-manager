import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { PlaylistItem } from "../utils/types";
import { arrayAdd } from "../utils/helper";

interface QueueContextValue {
  queue: PlaylistItem[];
  setQueue: Dispatch<SetStateAction<PlaylistItem[]>>;
  add: (items: PlaylistItem[]) => void;
  insert: (item: PlaylistItem, index: number) => void;
  remove: (items: PlaylistItem[]) => void;
  clearAll: () => void;
  sequence: number[];
}

interface QueueProviderProps {
  children: ReactNode;
}

const QueueContext = createContext<QueueContextValue | null>(null);

function QueueProvider({ children }: QueueProviderProps) {
  const [queue, setQueue] = useState<PlaylistItem[]>([]);

  const sequence = useMemo(() => {
    return Array.from({ length: queue.length }, (_, i) => i);
  }, [queue]);

  function add(items: PlaylistItem[]) {
    setQueue((q) => {
      const uniqueItems = items.filter(
        (item) => !q.some((qItem) => qItem.id === item.id)
      );

      return [...q, ...uniqueItems];
    });
  }

  function insert(item: PlaylistItem, index: number) {
    setQueue((q) => {
      const curIndex = q.findIndex((qItem) => qItem.id === item.id);
      return curIndex === -1 ? arrayAdd(q, item, index) : q;
    });
  }

  function remove(items: PlaylistItem[]) {
    const ids = items.map((i) => i.id);
    setQueue((q) => q.filter((item) => !ids.includes(item.id)));
  }

  function clearAll() {
    setQueue([]);
  }

  return (
    <QueueContext.Provider
      value={{ queue, setQueue, add, insert, remove, clearAll, sequence }}
    >
      {children}
    </QueueContext.Provider>
  );
}

function useQueue() {
  const context = useContext(QueueContext);
  if (context === null || context === undefined)
    throw new Error("QueueContext was used outside of QueueProvider");
  return context;
}

export { QueueProvider, useQueue };
