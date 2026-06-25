"use client";

import { createContext, useContext } from "react";

interface AppContextData {
  name: string;
}

interface AppProviderProps {
  children: React.ReactNode;
  name: string;
}

const appContext = createContext<AppContextData>({ name: "" });

export function AppProvider({ children, name }: AppProviderProps) {
  return (
    <appContext.Provider
      value={{
        name,
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
