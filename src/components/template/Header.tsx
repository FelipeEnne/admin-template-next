"use client";

import useAppData from "@/data/hook/useAppData";
import Title from "./Title";
import ButtonChangeTheme from "./ButtonChangeTheme";
import UserAvatar from "./UserAvatar";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const { theme, changeTheme } = useAppData();

  return (
    <div>
      <main className="flex">
        <Title title={title} subtitle={subtitle} />
        <div className="flex grow justify-end items-center">
          <ButtonChangeTheme theme={theme} changeTheme={changeTheme} />
          <UserAvatar className="ml-3" />
        </div>
      </main>
    </div>
  );
}
