import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Alert from "@/components/ui/Alert";

describe("Alert", () => {
  it("é anunciado como alerta", () => {
    render(<Alert>Algo deu errado</Alert>);

    expect(screen.getByRole("alert")).toHaveTextContent("Algo deu errado");
  });

  it("aplica a cor da variante", () => {
    render(<Alert variant="error">Algo deu errado</Alert>);

    expect(screen.getByRole("alert")).toHaveClass("bg-red-500");
  });
});
