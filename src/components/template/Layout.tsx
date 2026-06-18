import SideMenu from "./SideMenu";
import Header from "./Header";
import Content from "./Content";

interface LayoutProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export default function Layout({ title, subtitle, children }: LayoutProps) {
  return (
    <div>
      <SideMenu />
      <Header title={title} subtitle={subtitle} />
      <Content>{children}</Content>
    </div>
  );
}
