import { IconMoon, IconSun } from "../icons";

interface ButtonChangeThemeProps {
  theme?: string;
  changeTheme: () => void;
}

export default function ButtonChangeTheme({
  theme,
  changeTheme,
}: ButtonChangeThemeProps) {
  return theme === "dark" ? (
    <button
      onClick={changeTheme}
      className={`
        hidden sm:flex items-center justify-start
        bg-linear-to-r from-yellow-300 to-yellow-600
        w-14 lg:w-24 h-8 p-1 rounded-full
        shadow-md
        hover:opacity-80
        cursor-pointer
        `}
    >
      <div
        className={`
        flex items-center justify-center
        bg-white text-yellow-600 w-6 h-6 rounded-full
        font-bold
        shadow-md
        hover:opacity-80
        cursor-pointer
        `}
      >
        <IconSun className="size-4" />
      </div>
      <div
        className={`
        hidden lg:block items-center justify-center ml-3
      text-white font-bold text-sm
      `}
      >
        Light
      </div>
    </button>
  ) : (
    <button
      onClick={changeTheme}
      className={`
      bg-linear-to-r from-gray-500 to-gray-900
      w-14 lg:w-24 h-8 p-1 rounded-full
      flex items-center justify-end
      shadow-md
      hover:opacity-80
      cursor-pointer
      `}
    >
      <div
        className={`
        hidden lg:block items-center justify-center mr-3
      text-gray-300 font-bold text-sm
      `}
      >
        Dark
      </div>
      <div
        className={`
        flex items-center justify-center
        bg-gray-700 text-gray-300 w-6 h-6 rounded-full
        font-bold 
        shadow-md
        hover:opacity-80
        cursor-pointer
        `}
      >
        <IconMoon className="size-4" />
      </div>
    </button>
  );
}
