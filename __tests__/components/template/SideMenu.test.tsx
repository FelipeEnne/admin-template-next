import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SideMenu from "@/components/template/SideMenu";

vi.mock("@/data/hook/useAuth", () => import("../../helpers/useAuthMock"));

import { logout } from "../../helpers/useAuthMock";

describe("SideMenu", () => {
  // Regressão: os hrefs precisam bater com as pastas reais de src/app.
  it.each([
    ["Home", "/"],
    ["Settings", "/adjustments"],
    ["Notifications", "/notifications"],
  ])("aponta o item %s para %s", (text, href) => {
    render(<SideMenu />);

    expect(screen.getByRole("link", { name: text })).toHaveAttribute(
      "href",
      href,
    );
  });

  it("o item de logout não é um link", () => {
    render(<SideMenu />);

    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("chama logout ao clicar em Logout", async () => {
    render(<SideMenu />);

    await userEvent.click(screen.getByText("Logout"));

    expect(logout).toHaveBeenCalledOnce();
  });
});
