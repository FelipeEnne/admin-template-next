"use client";

import { useId } from "react";
import cn from "@/lib/cn";

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  label: string;
  error?: string;
  onValueChange?: (value: string) => void;
}

export default function Input({
  label,
  error,
  id,
  className,
  onValueChange,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className="flex flex-col gap-2 mt-4">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onValueChange?.(event.target.value)}
        className={cn(
          "w-full px-4 py-3 rounded-lg text-foreground",
          "border border-border bg-surface-sunken focus:bg-surface-raised",
          "focus:outline-none focus:border-brand focus:ring-brand focus:ring-1",
          error && "border-red-500",
          className,
        )}
        {...props}
      />
      {error && (
        <span id={errorId} className="text-sm text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}
