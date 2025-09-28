import { createContext, useContext, useState, type ReactNode } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export enum THEME {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export type TTHEME = THEME.LIGHT | THEME.DARK;

interface IThemeContext {
  theme: TTHEME;
  toggleTheme: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<TTHEME>(THEME.LIGHT);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
