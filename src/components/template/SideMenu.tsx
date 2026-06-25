"use client";

import { IconAdjustments, IconBell, IconHome, IconLogout } from "../icons";
import ItemMenu from "./ItemMenu";
import Logo from "./Logo";

export default function SideMenu() {
  return (
    <aside
      className={`flex flex-col bg-gray-200 text-gray-700 dark:bg-gray-950 dark:text-gray-200`}
    >
      <div
        className={`h-20 bg-linear-to-r from-indigo-500 to-purple-500 flex flex-col items-center justify-center`}
      >
        <Logo />
      </div>
      <ul className={`grow`}>
        <ItemMenu url="/" text="Home" icon={<IconHome />} />
        <ItemMenu
          url="/adjustments"
          text="Settings"
          icon={<IconAdjustments />}
        />
        <ItemMenu
          url="/notifications"
          text="Notifications"
          icon={<IconBell />}
        />
      </ul>
      <ul>
        <ItemMenu
          onClick={() => console.log("Logout")}
          className={`text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300`}
          text="Logout"
          icon={<IconLogout />}
        />
      </ul>
    </aside>
  );
}
