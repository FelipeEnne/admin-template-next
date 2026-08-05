import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonChangeTheme from "@/components/template/ButtonChangeTheme";

describe("ButtonChangeTheme", () => {
  it("no tema dark oferece a troca para o claro", () => {
    render(<ButtonChangeTheme theme="dark" changeTheme={vi.fn()} />);

    expect(screen.getByText("Light")).toBeInTheDocument();
    expect(screen.queryByText("Dark")).not.toBeInTheDocument();
  });

  it("no tema claro oferece a troca para o dark", () => {
    render(<ButtonChangeTheme theme="" changeTheme={vi.fn()} />);

    expect(screen.getByText("Dark")).toBeInTheDocument();
    expect(screen.queryByText("Light")).not.toBeInTheDocument();
  });

  it("sem tema definido cai no botão de troca para o dark", () => {
    render(<ButtonChangeTheme changeTheme={vi.fn()} />);

    expect(screen.getByText("Dark")).toBeInTheDocument();
  });

  it("chama changeTheme no clique", async () => {
    const changeTheme = vi.fn();
    render(<ButtonChangeTheme theme="dark" changeTheme={changeTheme} />);

    await userEvent.click(screen.getByRole("button"));

    expect(changeTheme).toHaveBeenCalledOnce();
  });
});
