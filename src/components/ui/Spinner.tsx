import cn from "@/lib/cn";

interface SpinnerProps {
  className?: string;
  label?: string;
}

export default function Spinner({
  className,
  label = "Loading",
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        "inline-block animate-spin rounded-full border-t-2 border-b-2 border-current",
        className ?? "h-12 w-12",
      )}
    />
  );
}
