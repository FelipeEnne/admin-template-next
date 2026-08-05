import { vi } from "vitest";

export const changeTheme = vi.fn();

export const appState: { thema?: string } = { thema: "dark" };

export function setTheme(thema?: string) {
  appState.thema = thema;
}

export function resetTheme() {
  appState.thema = "dark";
}

const useAppData = vi.fn(() => ({ thema: appState.thema, changeTheme }));

export default useAppData;
