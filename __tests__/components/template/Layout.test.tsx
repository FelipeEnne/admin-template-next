import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Layout from "@/components/template/Layout";
import { fakeUser } from "../../helpers/fakeUser";

vi.mock("@/data/hook/useAuth", () => import("../../helpers/useAuthMock"));
vi.mock("@/data/hook/useAppData", () => import("../../helpers/useAppDataMock"));
vi.mock("next/navigation", () => import("../../helpers/nextNavigationMock"));

import { resetAuthState, setAuthState } from "../../helpers/useAuthMock";
import { resetTheme } from "../../helpers/useAppDataMock";
import { push } from "../../helpers/nextNavigationMock";

function renderLayout() {
  return render(
    <Layout title="Home" subtitle="Página inicial">
      <p>conteúdo da página</p>
    </Layout>,
  );
}

describe("Layout", () => {
  beforeEach(() => {
    resetAuthState();
    resetTheme();
  });

  it("monta menu, header e conteúdo para usuário autenticado", () => {
    setAuthState({ user: fakeUser() });

    renderLayout();

    expect(screen.getByText("conteúdo da página")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Home");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("bloqueia o conteúdo e redireciona sem usuário", async () => {
    renderLayout();

    await waitFor(() => expect(push).toHaveBeenCalledWith("/authentication"));
    expect(screen.queryByText("conteúdo da página")).not.toBeInTheDocument();
  });
});
