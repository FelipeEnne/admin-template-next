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
    <div className="flex flex-col gap-2 mt-4">
      <label>{label}</label>
      <input
        type={type || "text"}
        value={value}
        onChange={(e) => valueChange?.(e.target.value)}
        required={required}
        className={`
          w-full px-4 py-3 rounded-lg bg-gray-200 mt-2
          border focus:outline-none  text-black
          focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 focus:bg-white
         `}
      />
    </div>
  );
}
