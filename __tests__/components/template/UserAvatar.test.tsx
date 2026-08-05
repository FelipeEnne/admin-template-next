import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import UserAvatar from "@/components/template/UserAvatar";
import { fakeUser } from "../../helpers/fakeUser";

vi.mock("@/data/hook/useAuth", () => import("../../helpers/useAuthMock"));

import { resetAuthState, setAuthState } from "../../helpers/useAuthMock";

describe("UserAvatar", () => {
  beforeEach(() => {
    resetAuthState();
  });

  it("aponta para o perfil", () => {
    render(<UserAvatar />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/profile");
  });

  it("usa a foto do usuário autenticado", () => {
    setAuthState({
      user: fakeUser({ imageUrl: "https://exemplo.com/ana.png" }),
    });

    render(<UserAvatar />);

    expect(screen.getByAltText("User Avatar")).toHaveAttribute(
      "src",
      expect.stringContaining("ana.png"),
    );
  });

  it("cai no avatar padrão sem usuário", () => {
    render(<UserAvatar />);

    expect(screen.getByAltText("User Avatar")).toHaveAttribute(
      "src",
      expect.stringContaining("/images/avatar.svg"),
    );
  });
});
