import { IconAdjustments, IconBell, IconHome } from "../icons";
import ItemMenu from "./ItemMenu";

export default function SideMenu() {
  return (
    <aside>
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
