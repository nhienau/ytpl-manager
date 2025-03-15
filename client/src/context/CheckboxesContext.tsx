import { createContext, useContext, useState } from "react";

const CheckboxesContext = createContext(null);

function CheckboxesProvider({ children, allElements }) {
  const [checked, setChecked] = useState([]);

  const numElements = allElements.length;

  function add(item) {
    setChecked((c) => [...c, item]);
  }

  function remove(item) {
    setChecked((c) => c.filter((i) => i !== item));
  }

  function selectAll() {
    setChecked([...allElements]);
  }

  function clearAll() {
    setChecked([]);
  }

  return (
    <CheckboxesContext.Provider
      value={{ checked, add, clearAll, selectAll, remove, numElements }}
    >
      {children}
    </CheckboxesContext.Provider>
  );
}

function useCheckboxes() {
  const context = useContext(CheckboxesContext);
  if (context === undefined)
    throw new Error("CheckboxesContext was used outside of CheckboxesProvider");
  return context;
}

export { CheckboxesProvider, useCheckboxes };
