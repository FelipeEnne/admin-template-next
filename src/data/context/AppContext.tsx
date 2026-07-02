"use client";

import { createContext, useContext, useState } from "react";

type Theme = "" | "dark";

interface AppContextProps {
  thema: Theme;
  changeTheme: () => void;
}

interface AppProviderProps {
  children: React.ReactNode;
}

const appContext = createContext<AppContextProps>({
  thema: "dark",
  changeTheme: () => {},
});

export function AppProvider({ children }: AppProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>("dark");

  function changeTheme() {
    setCurrentTheme(currentTheme === "dark" ? "" : "dark");
  }

  return (
    <appContext.Provider
      value={{
        thema: currentTheme,
        changeTheme,
      }}
    >
      {children}
    </appContext.Provider>
  );
}

export function useAppContext() {
  return useContext(appContext);
}

export default appContext;
