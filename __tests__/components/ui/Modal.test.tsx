import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "@/components/ui/Modal";

describe("Modal", () => {
  it("não renderiza nada quando fechado", () => {
    render(
      <Modal open={false} title="Confirmar" onClose={vi.fn()}>
        Conteúdo
      </Modal>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("é um dialog rotulado pelo título", () => {
    render(
      <Modal open title="Confirmar" onClose={vi.fn()}>
        Conteúdo
      </Modal>,
    );

    expect(screen.getByRole("dialog", { name: "Confirmar" })).toHaveAttribute(
      "aria-modal",
      "true",
    );
  });

  it("fecha ao pressionar Esc", async () => {
    const onClose = vi.fn();
    render(
      <Modal open title="Confirmar" onClose={onClose}>
        Conteúdo
      </Modal>,
    );

    await userEvent.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("fecha ao clicar no backdrop", async () => {
    const onClose = vi.fn();
    render(
      <Modal open title="Confirmar" onClose={onClose}>
        Conteúdo
      </Modal>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Close" }));

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("trava o scroll do body enquanto aberto", () => {
    const { unmount } = render(
      <Modal open title="Confirmar" onClose={vi.fn()}>
        Conteúdo
      </Modal>,
    );

    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).not.toBe("hidden");
  });
});
