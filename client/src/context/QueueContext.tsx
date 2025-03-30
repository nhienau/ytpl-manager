import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { QueueItem } from "../utils/types";

interface QueueContextValue {
  queue: QueueItem[];
  setQueue: Dispatch<SetStateAction<QueueItem[]>>;
  add: (items: QueueItem[]) => void;
  remove: (items: QueueItem[]) => void;
  clearAll: () => void;
}

interface QueueProviderProps {
  children: ReactNode;
}

const QueueContext = createContext<QueueContextValue | null>(null);

function QueueProvider({ children }: QueueProviderProps) {
  const [queue, setQueue] = useState<QueueItem[]>([]);

  function add(items: QueueItem[]) {
    setQueue((q) => {
      const uniqueItems = items.filter(
        (item) => !q.some((qItem) => qItem.id === item.id)
      );

      return [...q, ...uniqueItems];
    });
  }

  function remove(items: QueueItem[]) {
    const ids = items.map((i) => i.id);
    setQueue((q) => q.filter((item) => !ids.includes(item.id)));
  }

  function clearAll() {
    setQueue([]);
  }

  return (
    <QueueContext.Provider value={{ queue, setQueue, add, remove, clearAll }}>
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
