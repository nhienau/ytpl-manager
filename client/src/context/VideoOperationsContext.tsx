import { createContext, useContext, useState } from "react";

const VideoOperationsContext = createContext(null);

function VideoOperationsProvider({ children }) {
  const [items, setItems] = useState([]);

  function add(newItems) {
    setItems((i) => [...i, ...newItems]);
  }

  function update(id, newInfo) {
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
  if (context === undefined)
    throw new Error(
      "VideoOperationsContext was used outside of VideoOperationsProvider"
    );
  return context;
}

export { VideoOperationsProvider, useVideoOperations };
