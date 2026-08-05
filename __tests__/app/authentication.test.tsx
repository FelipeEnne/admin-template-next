import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Authentication from "@/app/authentication/page";

vi.mock("@/data/hook/useAuth", () => import("../helpers/useAuthMock"));

import { login, loginGoogle, signUp } from "../helpers/useAuthMock";

// O `AuthInput` não liga `<label>` ao `<input>`, então as senhas são buscadas
// pelo atributo `type` em vez de `getByLabelText`.
const emailInput = () => screen.getByRole("textbox");
const passwordInputs = () =>
  Array.from(document.querySelectorAll<HTMLInputElement>('input[type="password"]'));

const submitButton = (name: "Login" | "Create Account") =>
  screen.getByRole("button", { name });

async function switchToSignUp(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: /Don.t have an account/ }));
}

describe("Página /authentication", () => {
  beforeEach(() => {
    render(<Authentication />);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("alternância entre login e cadastro", () => {
    it("começa no modo login com um único campo de senha", () => {
      expect(
        screen.getByRole("heading", { name: "Login to your account" }),
      ).toBeInTheDocument();
      expect(passwordInputs()).toHaveLength(1);
      expect(submitButton("Login")).toBeInTheDocument();
    });

    it("mostra o campo de confirmação ao ir para o cadastro", async () => {
      const user = userEvent.setup();

      await switchToSignUp(user);

      expect(
        screen.getByRole("heading", { name: "Create an account" }),
      ).toBeInTheDocument();
      expect(passwordInputs()).toHaveLength(2);
      expect(submitButton("Create Account")).toBeInTheDocument();
    });

    it("volta para o login pelo link de rodapé", async () => {
      const user = userEvent.setup();
      await switchToSignUp(user);

      await user.click(screen.getByText("Login"));

      expect(
        screen.getByRole("heading", { name: "Login to your account" }),
      ).toBeInTheDocument();
      expect(passwordInputs()).toHaveLength(1);
    });
  });

  describe("validações do formulário", () => {
    it("exige email no login", async () => {
      const user = userEvent.setup();

      await user.click(submitButton("Login"));

      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(login).not.toHaveBeenCalled();
    });

    it("exige senha no login", async () => {
      const user = userEvent.setup();
      await user.type(emailInput(), "ana@example.com");

      await user.click(submitButton("Login"));

      expect(screen.getByText("Password is required")).toBeInTheDocument();
      expect(login).not.toHaveBeenCalled();
    });

    it("exige a confirmação de senha no cadastro", async () => {
      const user = userEvent.setup();
      await switchToSignUp(user);
      await user.type(emailInput(), "ana@example.com");
      await user.type(passwordInputs()[0], "123456");

      await user.click(submitButton("Create Account"));

      expect(
        screen.getByText("Confirm password is required"),
      ).toBeInTheDocument();
      expect(signUp).not.toHaveBeenCalled();
    });

    it("recusa senhas diferentes no cadastro", async () => {
      const user = userEvent.setup();
      await switchToSignUp(user);
      await user.type(emailInput(), "ana@example.com");
      await user.type(passwordInputs()[0], "123456");
      await user.type(passwordInputs()[1], "654321");

      await user.click(submitButton("Create Account"));

      expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
      expect(signUp).not.toHaveBeenCalled();
    });
  });

  describe("envio do formulário", () => {
    it("chama login com email e senha", async () => {
      const user = userEvent.setup();
      await user.type(emailInput(), "ana@example.com");
      await user.type(passwordInputs()[0], "123456");

      await user.click(submitButton("Login"));

      expect(login).toHaveBeenCalledWith("ana@example.com", "123456");
    });

    it("chama signUp quando as senhas coincidem", async () => {
      const user = userEvent.setup();
      await switchToSignUp(user);
      await user.type(emailInput(), "ana@example.com");
      await user.type(passwordInputs()[0], "123456");
      await user.type(passwordInputs()[1], "123456");

      await user.click(submitButton("Create Account"));

      expect(signUp).toHaveBeenCalledWith("ana@example.com", "123456");
    });

    it("chama loginGoogle no botão do Google", async () => {
      const user = userEvent.setup();

      await user.click(screen.getByRole("button", { name: /Enter with Google/ }));

      expect(loginGoogle).toHaveBeenCalledOnce();
    });

    it("mostra mensagem genérica quando o login falha", async () => {
      const user = userEvent.setup();
      login.mockRejectedValueOnce(new Error("auth/wrong-password"));
      vi.spyOn(console, "error").mockImplementation(() => {});
      await user.type(emailInput(), "ana@example.com");
      await user.type(passwordInputs()[0], "123456");

      await user.click(submitButton("Login"));

      expect(
        await screen.findByText("An error occurred while trying to login"),
      ).toBeInTheDocument();
    });
  });

  // `fireEvent` em vez de `userEvent` porque este último precisa de timers reais.
  it("esconde a mensagem de erro depois de 5 segundos", async () => {
    vi.useFakeTimers();

    fireEvent.click(submitButton("Login"));
    expect(screen.getByText("Email is required")).toBeInTheDocument();

    await act(() => vi.advanceTimersByTimeAsync(4000));
    expect(screen.getByText("Email is required")).toBeInTheDocument();

    await act(() => vi.advanceTimersByTimeAsync(1000));
    expect(screen.queryByText("Email is required")).not.toBeInTheDocument();
  });
});
