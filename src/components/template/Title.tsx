interface TitleProps {
  title: string;
  subtitle: string;
}

export default function Title({ title, subtitle }: TitleProps) {
  return (
    <div className={`flex flex-col gap-2`}>
      <h1 className={`flex flex-col gap-2 font-black text-3xl text-foreground`}>
        {title}
      </h1>
      <h2 className={`flex flex-col gap-2 font-light text-sm text-muted`}>
        {subtitle}
      </h2>
    </div>
  );
}
