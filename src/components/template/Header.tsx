"use client";

import useAppData from "@/data/hook/useAppData";
import Title from "./Title";
import ButtonChangeTheme from "./ButtonChangeTheme";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const { thema, changeTheme } = useAppData();

  return (
    <div>
      <main className="flex">
        <Title title={title} subtitle={subtitle} />
        <div className="flex grow justify-end">
          <ButtonChangeTheme theme={thema} changeTheme={changeTheme} />
        </div>
      </main>
    </div>
  );
}
