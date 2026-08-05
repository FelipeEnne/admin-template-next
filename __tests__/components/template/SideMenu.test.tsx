import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SideMenu from "@/components/template/SideMenu";
import { navItems } from "@/config/app";

vi.mock("@/data/hook/useAuth", () => import("../../helpers/useAuthMock"));

import { logout } from "../../helpers/useAuthMock";

describe("SideMenu", () => {
  it.each(navItems.map(({ label, url }) => [label, url]))(
    "aponta o item %s para %s",
    (text, href) => {
      render(<SideMenu />);

      expect(screen.getByRole("link", { name: text })).toHaveAttribute(
        "href",
        href,
      );
    },
  );

  // Regressão: as urls do menu precisam bater com as pastas reais de src/app.
  it.each(navItems.map(({ url }) => url))(
    "a rota %s existe em src/app",
    (url) => {
      const route = resolve(process.cwd(), "src/app", `.${url}`, "page.tsx");

      expect(existsSync(route)).toBe(true);
    },
  );

  it("o item de logout não é um link", () => {
    render(<SideMenu />);

    expect(screen.getAllByRole("link")).toHaveLength(navItems.length);
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("chama logout ao clicar em Logout", async () => {
    render(<SideMenu />);

    await userEvent.click(screen.getByText("Logout"));

    expect(logout).toHaveBeenCalledOnce();
  });
});
