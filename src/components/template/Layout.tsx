"use client";

import SideMenu from "./SideMenu";
import Header from "./Header";
import Content from "./Content";
import ForceAuth from "@/functions/ForceAuth";

interface LayoutProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export default function Layout({ title, subtitle, children }: LayoutProps) {
  return ForceAuth(
    <div className="flex h-screen w-screen">
      <SideMenu />
      <div className="flex flex-col p-7 w-full overflow-y-auto bg-background">
        <Header title={title} subtitle={subtitle} />
        <Content>{children}</Content>
      </div>
    </div>,
  );
}
