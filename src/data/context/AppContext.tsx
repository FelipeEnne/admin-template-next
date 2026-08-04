"use client";

import { createContext, useContext, useState } from "react";

interface AppContextProps {
  thema?: string;
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
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") ?? "dark";
  });

  function changeTheme() {
    const newTheme = currentTheme === "dark" ? "" : "dark";
    setCurrentTheme(newTheme);
    localStorage.setItem("theme", newTheme);
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
