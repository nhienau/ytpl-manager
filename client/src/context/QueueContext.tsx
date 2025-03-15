import { createContext, useContext, useState } from "react";

const QueueContext = createContext(null);

function QueueProvider({ children }) {
  const [queue, setQueue] = useState([]);

  function add(items) {
    setQueue((q) => {
      const uniqueItems = items.filter(
        (item) => !q.some((qItem) => qItem.id === item.id)
      );

      return [...q, ...uniqueItems];
    });
  }

  function remove(items) {
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
  if (context === undefined)
    throw new Error("QueueContext was used outside of QueueProvider");
  return context;
}

export { QueueProvider, useQueue };
