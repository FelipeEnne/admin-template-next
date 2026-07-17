"use client";

import { useRouter } from "next/navigation";
import firebase from "@/firebase/config";
import User from "@/model/User";
import { createContext, useState } from "react";

interface AuthContextProps {
  user: User | null;
  loginGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loginGoogle: async () => {},
});

async function normalizeUser(userFirebase: firebase.User): Promise<User> {
  const token = await userFirebase.getIdToken();
  return {
    uid: userFirebase.uid,
    name: userFirebase.displayName || "",
    email: userFirebase.email || "",
    token,
    provider: userFirebase.providerData[0].providerId || "",
    imageUrl: userFirebase.photoURL || "",
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  async function loginGoogle() {
    console.log("loginGoogle");
    router.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, loginGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
