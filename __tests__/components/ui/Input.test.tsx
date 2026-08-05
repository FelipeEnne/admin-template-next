import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "@/components/ui/Input";

describe("Input", () => {
  it("liga o label ao input mesmo sem id explícito", () => {
    render(<Input label="Email" />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("gera ids distintos para inputs irmãos", () => {
    render(
      <>
        <Input label="Password" type="password" />
        <Input label="Confirm Password" type="password" />
      </>,
    );

    expect(screen.getByLabelText("Password")).not.toBe(
      screen.getByLabelText("Confirm Password"),
    );
  });

  it("avisa cada alteração de valor", async () => {
    const onValueChange = vi.fn();
    render(<Input label="Email" onValueChange={onValueChange} />);

    await userEvent.type(screen.getByLabelText("Email"), "a");

    expect(onValueChange).toHaveBeenCalledWith("a");
  });

  it("descreve o erro para leitores de tela", () => {
    render(<Input label="Email" error="Email inválido" />);

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Email inválido");
  });
});
