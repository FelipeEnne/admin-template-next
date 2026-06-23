interface TitleProps {
  title: string;
  subtitle: string;
}

export default function Title({ title, subtitle }: TitleProps) {
  return (
    <div className={`flex flex-col gap-2`}>
      <h1
        className={`flex flex-col gap-2 font-black text-3xl text-gray-900 dark:text-gray-100`}
      >
        {title}{" "}
      </h1>
      <h2
        className={`flex flex-col gap-2 font-light text-sm text-gray-600 dark:text-gray-400`}
      >
        {subtitle}
      </h2>
    </div>
  );
}
