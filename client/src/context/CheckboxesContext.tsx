import { createContext, ReactNode, useContext, useState } from "react";

interface CheckboxesContextValue<T> {
  checked: T[];
  add: (item: T) => void;
  clearAll: () => void;
  selectAll: () => void;
  remove: (item: T) => void;
  numElements: number;
}

interface CheckboxesProviderProps<T> {
  children: ReactNode;
  allElements: T[];
}

const CheckboxesContext = createContext<CheckboxesContextValue<unknown> | null>(
  null
);

function CheckboxesProvider<T>({
  children,
  allElements,
}: CheckboxesProviderProps<T>) {
  const [checked, setChecked] = useState<T[]>([]);

  const numElements = allElements.length;

  function add(item: T) {
    setChecked((c) => [...c, item]);
  }

  function remove(item: T) {
    setChecked((c) => c.filter((i) => i !== item));
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
    numElements,
  } as CheckboxesContextValue<unknown>;

  return (
    <CheckboxesContext.Provider value={value}>
      {children}
    </CheckboxesContext.Provider>
  );
}

function useCheckboxes<T>() {
  const context = useContext(CheckboxesContext);
  if (context === null || context === undefined)
    throw new Error("CheckboxesContext was used outside of CheckboxesProvider");
  return context as CheckboxesContextValue<T>;
}

export { CheckboxesProvider, useCheckboxes };
