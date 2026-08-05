"use client";

import Link from "next/link";

interface ItemMenuProps {
  text: string;
  icon: React.ReactNode;
  url?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLLIElement>) => void;
}

export default function ItemMenu({
  url,
  text,
  icon,
  className,
  onClick,
}: ItemMenuProps) {
  function renderLink() {
    return (
      <div
        className={`flex flex-col items-center justify-center text-muted ${className}`}
      >
        {icon}
        <span className="text-xs font-light ">{text}</span>
      </div>
    );
  }

  return (
    <li
      onClick={onClick}
      className={`hover:bg-surface-sunken p-2 cursor-pointer`}
    >
      {url ? <Link href={url}>{renderLink()}</Link> : renderLink()}
    </li>
  );
}
