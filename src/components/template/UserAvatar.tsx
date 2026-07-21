"use client";

import Image from "next/image";
import Link from "next/link";
import useAuth from "@/data/hook/useAuth";

interface UserAvatarProps {
  className?: string;
}

export default function UserAvatar({ className }: UserAvatarProps) {
  const { user } = useAuth();
  return (
    <Link href="/profile">
      <Image
        src={user?.imageUrl || "/images/avatar.svg"}
        alt="User Avatar"
        width={40}
        height={40}
        className={`h-10 w-10 rounded-full cursor-pointer ${className}`}
      />
    </Link>
  );
}
