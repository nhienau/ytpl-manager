import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Operation } from "../utils/types";

interface VideoOperationsContextValue {
  items: Operation[];
  setItems: Dispatch<SetStateAction<Operation[]>>;
  add: (newItems: Operation[]) => void;
  update: (id: string | number, newInfo: object) => void;
}

const VideoOperationsContext =
  createContext<VideoOperationsContextValue | null>(null);

function VideoOperationsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Operation[]>([]);

  function add(newItems: Operation[]) {
    setItems((i) => [...i, ...newItems]);
  }

  function update(id: string | number, newInfo: object) {
    setItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, ...newInfo };
        }
        return item;
      });
    });
  }

  return (
    <VideoOperationsContext.Provider value={{ items, setItems, add, update }}>
      {children}
    </VideoOperationsContext.Provider>
  );
}

function useVideoOperations() {
  const context = useContext(VideoOperationsContext);
  if (context === null || context === undefined)
    throw new Error(
      "VideoOperationsContext was used outside of VideoOperationsProvider"
    );
  return context;
}

export { VideoOperationsProvider, useVideoOperations };
