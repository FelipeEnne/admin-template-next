"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import { appConfig } from "@/config/app";

interface AppContextProps {
  theme?: string;
  changeTheme: () => void;
}

interface AppProviderProps {
  children: React.ReactNode;
}

// O tema mora no localStorage, um sistema externo ao React. `useSyncExternalStore`
// resolve a hidratação sozinho: o servidor usa o padrão e o client troca para o
// valor salvo sem gerar mismatch nem render em cascata.
const listeners = new Set<() => void>();

function readStoredTheme() {
  return (
    localStorage.getItem(appConfig.themeStorageKey) ?? appConfig.defaultTheme
  );
}

function readDefaultTheme() {
  return appConfig.defaultTheme as string;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

const appContext = createContext<AppContextProps>({
  theme: appConfig.defaultTheme,
  changeTheme: () => {},
});

export function AppProvider({ children }: AppProviderProps) {
  const theme = useSyncExternalStore(
    subscribe,
    readStoredTheme,
    readDefaultTheme,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const changeTheme = useCallback(() => {
    const newTheme = readStoredTheme() === "dark" ? "" : "dark";
    localStorage.setItem(appConfig.themeStorageKey, newTheme);
    listeners.forEach((listener) => listener());
  }, []);

  const value = useMemo(() => ({ theme, changeTheme }), [theme, changeTheme]);

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
}

export function useAppContext() {
  return useContext(appContext);
}

export default appContext;
