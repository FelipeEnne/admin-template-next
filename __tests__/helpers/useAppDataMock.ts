import { vi } from "vitest";

export const changeTheme = vi.fn();

export const appState: { theme?: string } = { theme: "dark" };

export function setTheme(theme?: string) {
  appState.theme = theme;
}

export function resetTheme() {
  appState.theme = "dark";
}

const useAppData = vi.fn(() => ({ theme: appState.theme, changeTheme }));

export default useAppData;
