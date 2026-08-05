import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ItemMenu from "@/components/template/ItemMenu";

describe("ItemMenu", () => {
  it("renderiza um link para a url informada", () => {
    render(<ItemMenu url="/adjustments" text="Settings" icon={<svg />} />);

    expect(screen.getByRole("link", { name: "Settings" })).toHaveAttribute(
      "href",
      "/adjustments",
    );
  });

  it("sem url renderiza apenas o texto, sem link", () => {
    render(<ItemMenu text="Logout" icon={<svg />} />);

    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("dispara onClick no item", async () => {
    const onClick = vi.fn();
    render(<ItemMenu text="Logout" icon={<svg />} onClick={onClick} />);

    await userEvent.click(screen.getByText("Logout"));

    expect(onClick).toHaveBeenCalledOnce();
  });
});
