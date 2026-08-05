import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/template/Header";
import Title from "@/components/template/Title";

vi.mock("@/data/hook/useAuth", () => import("../../helpers/useAuthMock"));
vi.mock("@/data/hook/useAppData", () => import("../../helpers/useAppDataMock"));

import {
  changeTheme,
  resetTheme,
  setTheme,
} from "../../helpers/useAppDataMock";
import { resetAuthState } from "../../helpers/useAuthMock";

describe("Title", () => {
  it("exibe título e subtítulo", () => {
    render(<Title title="Home" subtitle="Página inicial" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Home");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Página inicial",
    );
  });
});

describe("Header", () => {
  beforeEach(() => {
    resetTheme();
    resetAuthState();
  });

  it("mostra o título, o avatar e o botão de tema", () => {
    render(<Header title="Home" subtitle="Página inicial" />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Home");
    expect(screen.getByAltText("User Avatar")).toBeInTheDocument();
    expect(screen.getByText("Light")).toBeInTheDocument();
  });

  it("reflete o tema claro vindo do contexto", () => {
    setTheme("");

    render(<Header title="Home" subtitle="Página inicial" />);

    expect(screen.getByText("Dark")).toBeInTheDocument();
  });

  it("delega a troca de tema para o contexto", async () => {
    render(<Header title="Home" subtitle="Página inicial" />);

    await userEvent.click(screen.getByRole("button"));

    expect(changeTheme).toHaveBeenCalledOnce();
  });
});
