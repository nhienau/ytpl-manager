import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { DndItemType, PlaylistItem } from "../utils/types";

interface DndItemContextValue {
  activeItem: PlaylistItem | null;
  setActiveItem: Dispatch<SetStateAction<PlaylistItem | null>>;
  itemType: DndItemType;
  setItemType: Dispatch<SetStateAction<DndItemType>>;
  activeIndex: number | null;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
}

const DndItemContext = createContext<DndItemContextValue | null>(null);

function DndItemProvider({ children }: { children: ReactNode }) {
  const [activeItem, setActiveItem] = useState<PlaylistItem | null>(null);
  const [itemType, setItemType] = useState<DndItemType>("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <DndItemContext.Provider
      value={{
        activeItem,
        setActiveItem,
        itemType,
        setItemType,
        activeIndex,
        setActiveIndex,
      }}
    >
      {children}
    </DndItemContext.Provider>
  );
}

function useDndItem() {
  const context = useContext(DndItemContext);
  if (context === null || context === undefined)
    throw new Error("DndItemContext was used outside of DndItemProvider");
  return context;
}

export { DndItemProvider, useDndItem };
