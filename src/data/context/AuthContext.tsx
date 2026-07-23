"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import Cookies from "js-cookie";
import User from "@/model/User";
import {
  GoogleAuthProvider,
  signInWithPopup,
  type User as FirebaseUser,
  onIdTokenChanged,
} from "firebase/auth";
import { createContext, useState, useEffect } from "react";

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

function cookieManager(logged: boolean) {
  if (logged) {
    Cookies.set("admin-template-auth", String(logged), { expires: 7 });
  } else {
    Cookies.remove("admin-template-auth");
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  async function configSession(userFirebase: FirebaseUser | null) {
    if (userFirebase?.emailVerified) {
      const user = await normalizeUser(userFirebase);
      setUser(user);
      cookieManager(true);
      setLoading(false);
      return user.email;
    } else {
      setUser(null);
      cookieManager(false);
      setLoading(false);
      return false;
    }
  }

  async function loginGoogle() {
    const provider = new GoogleAuthProvider();
    const resp = await signInWithPopup(auth, provider);
    await configSession(resp.user);
    router.push("/");
  }

  useEffect(() => {
    const cancel = onIdTokenChanged(auth, configSession);
    return () => cancel();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
