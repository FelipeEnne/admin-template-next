"use client";

import AuthInput from "@/components/auth/AuthInput";
import { IconGoogle } from "@/components/icons";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import useAuth from "@/data/hook/useAuth";
import Image from "next/image";
import { useState } from "react";

export default function Authentication() {
  const { signUp, login, loginGoogle } = useAuth();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  const handleSubmit = async () => {
    try {
      if (mode === "login") {
        if (email === "") {
          showError("Email is required");
          return;
        }
        if (password === "") {
          showError("Password is required");
          return;
        }
        await login(email, password);
      } else {
        if (email === "") {
          showError("Email is required");
          return;
        }
        if (password === "") {
          showError("Password is required");
          return;
        }
        if (confirmPassword === "") {
          showError("Confirm password is required");
          return;
        }
        if (password !== confirmPassword) {
          showError("Passwords do not match");
          return;
        }
        await signUp(email, password);
      }
    } catch (error) {
      console.error(error);
      showError(
        "An error occurred while trying to " +
          (mode === "login" ? "login" : "sign up"),
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-background text-foreground">
      <div className="hidden md:block md:w-1/2 lg:w-2/3">
        <Image
          className="h-screen w-full object-cover"
          src="/images/auth-hero.svg"
          alt=""
          width={800}
          height={1000}
          priority
        />
      </div>

      <div className={`w-full md:w-1/2 lg:w-1/3 m-10 relative`}>
        <h1 className="text-3xl font-bold mb-5 ">
          {mode === "login" ? "Login to your account" : "Create an account"}
        </h1>

        {error && (
          <Alert variant="error" className="mb-2">
            {error}
          </Alert>
        )}

        <AuthInput
          label="Email"
          type="email"
          value={email}
          valueChange={setEmail}
          required
        />
        <AuthInput
          label="Password"
          type="password"
          value={password}
          valueChange={setPassword}
          required
        />
        <AuthInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          valueChange={setConfirmPassword}
          required
          notRender={mode === "login"}
        />

        <Button onClick={handleSubmit} fullWidth className="mt-6">
          {mode === "login" ? "Login" : "Create Account"}
        </Button>
        <hr className="my-6 border-border w-full" />

        <Button variant="secondary" onClick={loginGoogle} fullWidth>
          Sign in with Google <IconGoogle className="size-5" />
        </Button>

        <p className="mt-4 text-sm text-muted">
          {mode === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-brand hover:text-brand-strong font-semibold cursor-pointer"
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
