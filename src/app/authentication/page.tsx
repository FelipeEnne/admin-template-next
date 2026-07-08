"use client";

import AuthInput from "@/components/auth/AuthInput";
import { IconGoogle, IconWarning } from "@/components/icons";
import Image from "next/image";
import { useState } from "react";

export default function Authentication() {
  const [mode, setMode] = useState<"login" | "register">("login");
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

  const handleSubmit = () => {
    if (mode === "login") {
      if (email === "") {
        showError("Email is required");
        return;
      }
      if (password === "") {
        showError("Password is required");
        return;
      }
    } else {
      console.log("Register");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="hidden md:block md:w-1/2 lg:w-2/3">
        <Image
          className="h-screen w-full object-cover"
          src="https://picsum.photos/800/600"
          alt="random image"
          width={800}
          height={600}
          unoptimized
        />
      </div>

      <div className={`w-full md:w-1/2 lg:w-1/3 m-10 relative`}>
        <h1 className="text-3xl font-bold mb-5 ">
          {mode === "login" ? "Login to your account" : "Create an account"}
        </h1>

        {error && (
          <div
            className={`
          flex items-center
          bg-red-500 text-white py-3 px-5 rounded-lg mb-2
          border border-red-700
          `}
          >
            {" "}
            <IconWarning className="size-5" />{" "}
            <span className="ml-3">{error}</span>
          </div>
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

        <button
          onClick={handleSubmit}
          className={`
        w-full px-4 py-3 rounded-lg mt-6 cursor-pointer
        hover:bg-indigo-600 transition-all duration-300
        bg-indigo-500 text-white 
        `}
        >
          {mode === "login" ? "Login" : "Create Account"}
        </button>
        <hr className="my-6 border-gray-300 w-full" />

        <button
          onClick={() => {}}
          className={`
            w-full px-4 py-3 rounded-lg mb-6 cursor-pointer 
            inline-flex items-center justify-center gap-2
            text-base font-semibold
            hover:bg-slate-700 transition-all duration-300
            bg-slate-800 text-white 
          `}
        >
          Enter with Google <IconGoogle className="size-5" />
        </button>

        <button
          onClick={() => setMode(mode === "login" ? "register" : "login")}
          className="text-sm text-gray-500"
        >
          {mode === "login" ? (
            <p className="mt-4">
              Don&apos;t have an account?{" "}
              <a
                className="text-indigo-500 hover:text-indigo-600 font-semibold cursor-pointer"
                onClick={() => setMode("register")}
              >
                Register
              </a>
            </p>
          ) : (
            <p className="mt-4">
              Already have an account?{" "}
              <a
                className="text-indigo-500 hover:text-indigo-600 font-semibold cursor-pointer"
                onClick={() => setMode("login")}
              >
                Login
              </a>
            </p>
          )}
        </button>
      </div>
    </div>
  );
}
