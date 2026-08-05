import type User from "@/model/User";

export function fakeUser(overrides: Partial<User> = {}): User {
  return {
    uid: "uid-123",
    name: "Ana",
    email: "ana@example.com",
    token: "token-abc",
    provider: "google.com",
    imageUrl: "https://lh3.googleusercontent.com/ana.png",
    ...overrides,
  };
}
