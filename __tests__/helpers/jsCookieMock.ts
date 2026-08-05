import { vi } from "vitest";

export const get = vi.fn<(name?: string) => string | undefined>();
export const set = vi.fn();
export const remove = vi.fn();

const Cookies = { get, set, remove };

export default Cookies;
