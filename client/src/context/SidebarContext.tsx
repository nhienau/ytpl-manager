import { createContext, useContext, useState } from "react";

const SidebarContext = createContext(null);

function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  function toggleSidebar() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined)
    throw new Error("SidebarContext was used outside of SidebarProvider");
  return context;
}

export { SidebarProvider, useSidebar };
