import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Read synchronously so state matches what the inline script already applied
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("pog-theme");
      return saved === "dark" || saved === "light" ? saved : "dark";
    }
    return "dark";
  });

  // Keep the DOM class in sync whenever theme state changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (t: Theme) => {
    if (t === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("pog-theme", next);
      applyTheme(next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
