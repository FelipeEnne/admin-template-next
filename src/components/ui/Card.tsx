import cn from "@/lib/cn";

interface CardProps {
  title?: string;
  actions?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export default function Card({
  title,
  actions,
  className,
  children,
}: CardProps) {
  return (
    <section
      className={cn(
        "rounded-xl border border-border bg-surface-raised p-5",
        className,
      )}
    >
      {(title || actions) && (
        <header className="flex items-center justify-between mb-4">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {actions}
        </header>
      )}
      {children}
    </section>
  );
}
