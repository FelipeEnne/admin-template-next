"use client";

import { IconLogout } from "../icons";
import ItemMenu from "./ItemMenu";
import Logo from "./Logo";
import useAuth from "@/data/hook/useAuth";
import { navItems } from "@/config/app";

export default function SideMenu() {
  const { logout } = useAuth();

  return (
    <aside className="flex flex-col bg-surface text-foreground">
      <div
        className={`h-20 bg-linear-to-r from-brand to-brand-accent flex flex-col items-center justify-center`}
      >
        <Logo />
      </div>
      <ul className={`grow`}>
        {navItems.map(({ label, url, icon: Icon }) => (
          <ItemMenu key={url} url={url} text={label} icon={<Icon />} />
        ))}
      </ul>
      <ul>
        <ItemMenu
          onClick={() => logout()}
          className={`text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300`}
          text="Logout"
          icon={<IconLogout />}
        />
      </ul>
    </aside>
  );
}
