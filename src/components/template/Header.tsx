import SideMenu from "./SideMenu";
import Title from "./Title";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <div>
      <main>
        <Title title={title} subtitle={subtitle} />
      </main>
    </div>
  );
}
