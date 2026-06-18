import SideMenu from "./SideMenu";

interface TitleProps {
  title: string;
  subtitle: string;
}

export default function Title({ title, subtitle }: TitleProps) {
  return (
    <div className={`flex flex-col gap-2`}>
      <h1 className={`flex flex-col gap-2`}>{title} </h1>
      <h2 className={`flex flex-col gap-2`}>{subtitle}</h2>
    </div>
  );
}
