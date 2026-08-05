import { vi } from "vitest";

export const push = vi.fn();
export const replace = vi.fn();
export const back = vi.fn();
export const forward = vi.fn();
export const refresh = vi.fn();
export const prefetch = vi.fn();

const router = { push, replace, back, forward, refresh, prefetch };

export const useRouter = vi.fn(() => router);
export const usePathname = vi.fn(() => "/");
export const useSearchParams = vi.fn(() => new URLSearchParams());
