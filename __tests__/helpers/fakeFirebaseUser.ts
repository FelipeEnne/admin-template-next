import { vi } from "vitest";
import type { User as FirebaseUser } from "firebase/auth";

interface FakeUserOptions {
  uid?: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  providerId?: string | null;
  token?: string;
}

export function fakeFirebaseUser({
  uid = "uid-123",
  email = "ana@example.com",
  displayName = "Ana",
  photoURL = "https://lh3.googleusercontent.com/ana.png",
  providerId = "google.com",
  token = "token-abc",
}: FakeUserOptions = {}) {
  return {
    uid,
    email,
    displayName,
    photoURL,
    emailVerified: true,
    providerData: providerId ? [{ providerId }] : [],
    getIdToken: vi.fn(async () => token),
  } as unknown as FirebaseUser;
}
