import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthInput from "@/components/auth/AuthInput";

describe("AuthInput", () => {
  it("renderiza o label e usa type text por padrão", () => {
    render(<AuthInput label="Email" value="" valueChange={vi.fn()} />);

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
  });

  it("respeita o type e o required informados", () => {
    render(
      <AuthInput
        label="Password"
        type="password"
        value=""
        valueChange={vi.fn()}
        required
      />,
    );

    const input = document.querySelector('input[type="password"]');
    expect(input).toBeRequired();
  });

  it("mostra o valor recebido e avisa cada alteração", async () => {
    const valueChange = vi.fn();
    render(<AuthInput label="Email" value="ana" valueChange={valueChange} />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("ana");
    await userEvent.type(input, "!");

    expect(valueChange).toHaveBeenCalledWith("ana!");
  });

  it("não renderiza nada quando notRender é true", () => {
    render(
      <AuthInput
        label="Confirm Password"
        value=""
        valueChange={vi.fn()}
        notRender
      />,
    );

    expect(screen.queryByText("Confirm Password")).not.toBeInTheDocument();
    expect(document.querySelector("input")).toBeNull();
  });
});
