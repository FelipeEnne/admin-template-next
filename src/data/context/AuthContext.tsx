"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import User from "@/model/User";
import {
  GoogleAuthProvider,
  signInWithPopup,
  type User as FirebaseUser,
} from "firebase/auth";
import { createContext, useState } from "react";

interface AuthContextProps {
  user: User | null;
  loginGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loginGoogle: async () => {},
});

async function normalizeUser(userFirebase: FirebaseUser): Promise<User> {
  const token = await userFirebase.getIdToken();
  return {
    uid: userFirebase.uid,
    name: userFirebase.displayName || "",
    email: userFirebase.email || "",
    token,
    provider: userFirebase.providerData[0]?.providerId || "",
    imageUrl: userFirebase.photoURL || "",
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  async function loginGoogle() {
    const provider = new GoogleAuthProvider();
    const resp = await signInWithPopup(auth, provider);
    if (resp.user?.emailVerified) {
      const user = await normalizeUser(resp.user);
      setUser(user);
      await auth.currentUser?.getIdToken(true);
      router.push("/");
    } else {
      throw new Error("Google login failed");
    }
  }

  return (
    <AuthContext.Provider value={{ user, loginGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
