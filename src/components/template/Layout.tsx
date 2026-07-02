"use client";

import SideMenu from "./SideMenu";
import Header from "./Header";
import Content from "./Content";
import useAppData from "@/data/hook/useAppData";

interface LayoutProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

export default function Layout({ title, subtitle, children }: LayoutProps) {
  const { thema } = useAppData();

  return (
    <div className={`${thema} flex h-screen w-screen`}>
      <SideMenu />
      <div className={`flex flex-col p-7 w-full bg-gray-300 dark:bg-gray-800 `}>
        <Header title={title} subtitle={subtitle} />
        <Content>{children}</Content>
      </div>
    </div>
  );
}
