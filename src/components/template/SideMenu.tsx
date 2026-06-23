import { IconAdjustments, IconBell, IconHome } from "../icons";
import ItemMenu from "./ItemMenu";
import Logo from "./Logo";

export default function SideMenu() {
  return (
    <aside>
      <div
        className={`h-20 w-20 bg-linear-to-r from-indigo-500 to-purple-500 flex flex-col items-center justify-center`}
      >
        <Logo />
      </div>
      <ul>
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
    </aside>
  );
}
