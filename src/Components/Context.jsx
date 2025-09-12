import { createContext, useState } from "react";
import { useContext } from "react";

export const ThemeContext = createContext();

//wrapper to wrap our store and pass necessary props.
// This component is a operator of ThemeContext store
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
// Custom hook to use context
export const useTheme = () => {
  return useContext(ThemeContext);
};
