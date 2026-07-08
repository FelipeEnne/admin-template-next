interface AuthInputProps {
  label: string;
  value: string;
  type?: "text" | "password" | "email";
  required?: boolean;
  notRender?: boolean;
  valueChange: (value: string) => void;
}

export default function AuthInput({
  label,
  value,
  type,
  required,
  notRender,
  valueChange,
}: AuthInputProps) {
  return notRender ? null : (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      <input
        type={type || "text"}
        value={value}
        onChange={(e) => valueChange?.(e.target.value)}
        required={required}
      />
    </div>
  );
}
