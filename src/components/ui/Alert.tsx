import { IconWarning } from "@/components/icons";
import cn from "@/lib/cn";

export type AlertVariant = "error" | "success" | "info";

const variantClasses: Record<AlertVariant, string> = {
  error: "bg-red-500 border-red-700 text-white",
  success: "bg-green-600 border-green-800 text-white",
  info: "bg-brand border-brand-strong text-white",
};

interface AlertProps {
  variant?: AlertVariant;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export default function Alert({
  variant = "info",
  icon,
  className,
  children,
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex items-center gap-3 rounded-lg border py-3 px-5",
        variantClasses[variant],
        className,
      )}
    >
      {icon ?? <IconWarning className="size-5" />}
      <span>{children}</span>
    </div>
  );
}
