import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import AuthContext, { AuthProvider } from "@/data/context/AuthContext";
import { fakeFirebaseUser } from "../../helpers/fakeFirebaseUser";

vi.mock("@/firebase/config", () => import("../../helpers/firebaseConfigMock"));
vi.mock("firebase/auth", () => import("../../helpers/firebaseAuthMock"));
vi.mock("js-cookie", () => import("../../helpers/jsCookieMock"));
vi.mock("next/navigation", () => import("../../helpers/nextNavigationMock"));

import * as cookies from "../../helpers/jsCookieMock";
import * as firebaseAuth from "../../helpers/firebaseAuthMock";
import { push } from "../../helpers/nextNavigationMock";

const COOKIE = "admin-template-auth";

function AuthProbe() {
  const { user, loading, login, signUp, loginGoogle, logout } =
    useContext(AuthContext);

  return (
    <div>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="user">
        {user ? JSON.stringify(user) : "sem usuário"}
      </span>
      <button
        onClick={() => login("ana@example.com", "123456").catch(() => {})}
      >
        login
      </button>
      <button
        onClick={() => signUp("ana@example.com", "123456").catch(() => {})}
      >
        signUp
      </button>
      <button onClick={() => loginGoogle()}>loginGoogle</button>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
}

function renderProvider() {
  return render(
    <AuthProvider>
      <AuthProbe />
    </AuthProvider>,
  );
}

/** Espera o `loading` inicial terminar para não misturar com o loading das ações. */
async function renderReadyProvider() {
  const result = renderProvider();
  await waitFor(() =>
    expect(screen.getByTestId("loading")).toHaveTextContent("false"),
  );
  return result;
}

function currentUser() {
  const content = screen.getByTestId("user").textContent;
  return content === "sem usuário" ? null : JSON.parse(content ?? "");
}

describe("AuthContext", () => {
  beforeEach(() => {
    firebaseAuth.clearIdTokenListeners();
    cookies.get.mockReturnValue(undefined);
  });

  it("sai do loading sem assinar o Firebase quando não há cookie", async () => {
    await renderReadyProvider();

    expect(currentUser()).toBeNull();
    expect(firebaseAuth.onIdTokenChanged).not.toHaveBeenCalled();
  });

  describe("login com email e senha", () => {
    it("normaliza o usuário, grava o cookie e redireciona para a home", async () => {
      firebaseAuth.signInWithEmailAndPassword.mockResolvedValue({
        user: fakeFirebaseUser(),
      });
      await renderReadyProvider();

      await userEvent.click(screen.getByRole("button", { name: "login" }));

      await waitFor(() => expect(currentUser()).not.toBeNull());
      expect(firebaseAuth.signInWithEmailAndPassword).toHaveBeenCalledWith(
        { name: "test-auth" },
        "ana@example.com",
        "123456",
      );
      expect(currentUser()).toEqual({
        uid: "uid-123",
        name: "Ana",
        email: "ana@example.com",
        token: "token-abc",
        provider: "google.com",
        imageUrl: "https://lh3.googleusercontent.com/ana.png",
      });
      expect(cookies.set).toHaveBeenCalledWith(COOKIE, "true", { expires: 7 });
      expect(push).toHaveBeenCalledWith("/");
    });

    it("mantém a sessão vazia e não redireciona quando o Firebase falha", async () => {
      firebaseAuth.signInWithEmailAndPassword.mockRejectedValue(
        new Error("auth/wrong-password"),
      );
      vi.spyOn(console, "error").mockImplementation(() => {});
      await renderReadyProvider();

      await userEvent.click(screen.getByRole("button", { name: "login" }));

      await waitFor(() =>
        expect(screen.getByTestId("loading")).toHaveTextContent("false"),
      );
      expect(currentUser()).toBeNull();
      expect(cookies.set).not.toHaveBeenCalled();
      expect(push).not.toHaveBeenCalled();
    });
  });

  it("cria a conta com createUserWithEmailAndPassword no signUp", async () => {
    firebaseAuth.createUserWithEmailAndPassword.mockResolvedValue({
      user: fakeFirebaseUser({ providerId: "password" }),
    });
    await renderReadyProvider();

    await userEvent.click(screen.getByRole("button", { name: "signUp" }));

    await waitFor(() => expect(currentUser()).not.toBeNull());
    expect(firebaseAuth.createUserWithEmailAndPassword).toHaveBeenCalledWith(
      { name: "test-auth" },
      "ana@example.com",
      "123456",
    );
    expect(currentUser().provider).toBe("password");
    expect(push).toHaveBeenCalledWith("/");
  });

  it("faz login com Google via signInWithPopup", async () => {
    firebaseAuth.signInWithPopup.mockResolvedValue({
      user: fakeFirebaseUser(),
    });
    await renderReadyProvider();

    await userEvent.click(screen.getByRole("button", { name: "loginGoogle" }));

    await waitFor(() => expect(currentUser()).not.toBeNull());
    expect(firebaseAuth.signInWithPopup).toHaveBeenCalledOnce();
    expect(cookies.set).toHaveBeenCalledWith(COOKIE, "true", { expires: 7 });
    expect(push).toHaveBeenCalledWith("/");
  });

  it("usa strings vazias quando o Firebase não informa nome, foto ou provider", async () => {
    firebaseAuth.signInWithPopup.mockResolvedValue({
      user: fakeFirebaseUser({
        displayName: null,
        photoURL: null,
        providerId: null,
      }),
    });
    await renderReadyProvider();

    await userEvent.click(screen.getByRole("button", { name: "loginGoogle" }));

    await waitFor(() => expect(currentUser()).not.toBeNull());
    expect(currentUser()).toMatchObject({
      name: "",
      imageUrl: "",
      provider: "",
    });
  });

  it("ignora usuário sem email e não grava cookie", async () => {
    firebaseAuth.signInWithPopup.mockResolvedValue({
      user: fakeFirebaseUser({ email: null }),
    });
    await renderReadyProvider();

    await userEvent.click(screen.getByRole("button", { name: "loginGoogle" }));

    await waitFor(() => expect(cookies.remove).toHaveBeenCalledWith(COOKIE));
    expect(currentUser()).toBeNull();
    expect(cookies.set).not.toHaveBeenCalled();
  });

  it("limpa usuário e cookie no logout", async () => {
    firebaseAuth.signInWithPopup.mockResolvedValue({
      user: fakeFirebaseUser(),
    });
    firebaseAuth.signOut.mockResolvedValue(undefined);
    await renderReadyProvider();
    await userEvent.click(screen.getByRole("button", { name: "loginGoogle" }));
    await waitFor(() => expect(currentUser()).not.toBeNull());

    await userEvent.click(screen.getByRole("button", { name: "logout" }));

    await waitFor(() => expect(currentUser()).toBeNull());
    expect(firebaseAuth.signOut).toHaveBeenCalledOnce();
    expect(cookies.remove).toHaveBeenCalledWith(COOKIE);
  });

  describe("com o cookie de sessão presente", () => {
    beforeEach(() => {
      cookies.get.mockReturnValue("true");
    });

    it("restaura a sessão pelo onIdTokenChanged", async () => {
      renderProvider();

      expect(screen.getByTestId("loading")).toHaveTextContent("true");
      expect(firebaseAuth.onIdTokenChanged).toHaveBeenCalledOnce();

      await act(() => firebaseAuth.emitIdTokenChanged(fakeFirebaseUser()));

      expect(screen.getByTestId("loading")).toHaveTextContent("false");
      expect(currentUser()).toMatchObject({ email: "ana@example.com" });
    });

    it("cancela a assinatura ao desmontar", () => {
      const { unmount } = renderProvider();

      unmount();

      expect(firebaseAuth.unsubscribe).toHaveBeenCalledOnce();
    });
  });
});
