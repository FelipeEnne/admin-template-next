import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "@/components/ui/Card";

describe("Card", () => {
  it("renderiza o título e as ações no cabeçalho", () => {
    render(
      <Card title="Usuários" actions={<button>Novo</button>}>
        Conteúdo
      </Card>,
    );

    expect(
      screen.getByRole("heading", { name: "Usuários" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Novo" })).toBeInTheDocument();
    expect(screen.getByText("Conteúdo")).toBeInTheDocument();
  });

  it("omite o cabeçalho sem título e sem ações", () => {
    render(<Card>Conteúdo</Card>);

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});
