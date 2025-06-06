import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { isValidThemeStr, Theme } from "../utils/types";

interface ThemeContextValue {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [storedTheme, setStoredTheme] = useLocalStorageState(
    "system",
    "ytpl-theme"
  );
  const themeValue = isValidThemeStr(storedTheme) ? storedTheme : "system";
  const [theme, setTheme] = useState<Theme>(themeValue);

  function changeTheme(theme: Theme) {
    setTheme(theme);
    setStoredTheme(theme);
  }

  useEffect(
    function () {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else if (theme === "light") {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.remove("light");
      }
    },
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null || context === undefined)
    throw new Error("ThemeContext was used outside of ThemeProvider");
  return context;
}

export { ThemeProvider, useTheme };
