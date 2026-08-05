"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/firebase/config";
import Cookies from "js-cookie";
import User from "@/model/User";
import { appConfig } from "@/config/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  type User as FirebaseUser,
  onIdTokenChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useState, useEffect } from "react";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: false,
  signUp: async () => {},
  login: async () => {},
  loginGoogle: async () => {},
  logout: async () => {},
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
    Cookies.set(appConfig.authCookieName, String(logged), {
      expires: appConfig.authCookieDays,
    });
  } else {
    Cookies.remove(appConfig.authCookieName);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  async function configSession(userFirebase: FirebaseUser | null) {
    if (userFirebase?.email) {
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

  async function signUp(email: string, password: string) {
    try {
      setLoading(true);
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      await configSession(resp.user as FirebaseUser);
      router.push(appConfig.homeRoute);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      const resp = await signInWithEmailAndPassword(auth, email, password);
      await configSession(resp.user as FirebaseUser);
      router.push(appConfig.homeRoute);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function loginGoogle() {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const resp = await signInWithPopup(auth, provider);
      await configSession(resp.user);
      router.push(appConfig.homeRoute);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      await signOut(auth);
      await configSession(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (Cookies.get(appConfig.authCookieName)) {
      const cancel = onIdTokenChanged(auth, configSession);
      return () => cancel();
    } else {
      setTimeout(() => setLoading(false), 0);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, signUp, loginGoogle, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
