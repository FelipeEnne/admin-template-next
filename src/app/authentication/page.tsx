import AuthInput from "@/components/auth/AuthInput";
import { useState } from "react";

export default function Authentication() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="flex flex-col gap-4">
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
        notRender={confirmPassword !== password}
      />
    </div>
  );
}
