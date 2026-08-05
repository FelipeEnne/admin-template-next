import Input from "@/components/ui/Input";

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
    <Input
      label={label}
      type={type || "text"}
      value={value}
      required={required}
      onValueChange={valueChange}
    />
  );
}
