interface ContentProps {
  children?: React.ReactNode;
}

export default function Content({ children }: ContentProps) {
  return <div className="flex flex-col mt-7 text-foreground">{children}</div>;
}
