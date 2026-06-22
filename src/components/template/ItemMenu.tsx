import Link from "next/link";

interface ItemMenuProps {
  url: string;
  text: string;
  icon: React.ReactNode;
}

export default function ItemMenu({ url, text, icon }: ItemMenuProps) {
  return (
    <li className={`hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md p-2`}>
      <Link
        href={url}
        className="flex flex-col justify-center items-center w-full h-20 gap-2"
      >
        {icon}
        <span className="text-xs font-light text-gray-600 dark:text-gray-400">
          {text}
        </span>
      </Link>
    </li>
  );
}
