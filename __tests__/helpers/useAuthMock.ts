import { vi } from "vitest";
import type User from "@/model/User";

export const login = vi.fn();
export const signUp = vi.fn();
export const loginGoogle = vi.fn();
export const logout = vi.fn();

interface AuthState {
  user: User | null;
  loading: boolean;
}

export const authState: AuthState = { user: null, loading: false };

export function setAuthState(state: Partial<AuthState>) {
  Object.assign(authState, state);
}

export function resetAuthState() {
  authState.user = null;
  authState.loading = false;
}

const useAuth = vi.fn(() => ({
  user: authState.user,
  loading: authState.loading,
  login,
  signUp,
  loginGoogle,
  logout,
}));

export default useAuth;
