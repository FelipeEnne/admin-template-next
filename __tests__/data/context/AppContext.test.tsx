import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider, useAppContext } from "@/data/context/AppContext";

function ThemeProbe() {
  const { thema, changeTheme } = useAppContext();

  return (
    <div>
      <span data-testid="theme">{thema === "" ? "(vazio)" : thema}</span>
      <button onClick={changeTheme}>Trocar tema</button>
    </div>
  );
}

function renderProbe() {
  return render(
    <AppProvider>
      <ThemeProbe />
    </AppProvider>,
  );
}

describe("AppContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("usa o tema dark quando não há nada no localStorage", () => {
    renderProbe();

    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  });

  it("lê o tema salvo no localStorage", () => {
    localStorage.setItem("theme", "");

    renderProbe();

    expect(screen.getByTestId("theme")).toHaveTextContent("(vazio)");
  });

  it("alterna de dark para claro e persiste no localStorage", async () => {
    renderProbe();

    await userEvent.click(screen.getByRole("button", { name: "Trocar tema" }));

    expect(screen.getByTestId("theme")).toHaveTextContent("(vazio)");
    expect(localStorage.getItem("theme")).toBe("");
  });

  it("alterna de claro para dark e persiste no localStorage", async () => {
    localStorage.setItem("theme", "");

    renderProbe();

    await userEvent.click(screen.getByRole("button", { name: "Trocar tema" }));

    expect(screen.getByTestId("theme")).toHaveTextContent("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});
