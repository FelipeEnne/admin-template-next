import type { ComponentType } from "react";
import { IconAdjustments, IconBell, IconHome } from "@/components/icons";

export const appConfig = {
  name: "Admin Template",
  description: "Next.js admin template starter",
  locale: "en",
  authCookieName: "admin-template-auth",
  authCookieDays: 7,
  themeStorageKey: "theme",
  defaultTheme: "dark",
  loginRoute: "/authentication",
  homeRoute: "/",
} as const;

export interface NavItem {
  label: string;
  url: string;
  icon: ComponentType;
}

export const navItems: NavItem[] = [
  { label: "Home", url: "/", icon: IconHome },
  { label: "Settings", url: "/settings", icon: IconAdjustments },
  { label: "Notifications", url: "/notifications", icon: IconBell },
];
