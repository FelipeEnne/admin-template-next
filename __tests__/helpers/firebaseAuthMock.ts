import { vi } from "vitest";
import type { User as FirebaseUser } from "firebase/auth";

export const signInWithEmailAndPassword = vi.fn();
export const createUserWithEmailAndPassword = vi.fn();
export const signInWithPopup = vi.fn();
export const signOut = vi.fn();

export const unsubscribe = vi.fn();

type Listener = (user: FirebaseUser | null) => void;

const listeners: Listener[] = [];

export const onIdTokenChanged = vi.fn((_auth: unknown, listener: Listener) => {
  listeners.push(listener);
  return unsubscribe;
});

/** Dispara o listener registrado por `onIdTokenChanged`, simulando o Firebase. */
export async function emitIdTokenChanged(user: FirebaseUser | null) {
  await Promise.all(listeners.map((listener) => listener(user)));
}

export function clearIdTokenListeners() {
  listeners.length = 0;
}

export class GoogleAuthProvider {}
