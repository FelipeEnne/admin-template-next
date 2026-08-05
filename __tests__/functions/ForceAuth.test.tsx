import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import ForceAuth from "@/functions/ForceAuth";
import { fakeUser } from "../helpers/fakeUser";

vi.mock("@/data/hook/useAuth", () => import("../helpers/useAuthMock"));
vi.mock("next/navigation", () => import("../helpers/nextNavigationMock"));

import { resetAuthState, setAuthState } from "../helpers/useAuthMock";
import { push } from "../helpers/nextNavigationMock";

// `ForceAuth` recebe o JSX como argumento em vez de props, então precisa de um
// componente para chamá-lo dentro de um render do React.
function ProtectedProbe() {
  return ForceAuth(<span>conteúdo protegido</span>);
}

describe("ForceAuth", () => {
  beforeEach(() => {
    resetAuthState();
  });

  it("mostra o spinner e esconde o conteúdo enquanto carrega", () => {
    setAuthState({ loading: true });

    render(<ProtectedProbe />);

    expect(screen.queryByText("conteúdo protegido")).not.toBeInTheDocument();
    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("não redireciona enquanto ainda está carregando", () => {
    setAuthState({ loading: true });

    render(<ProtectedProbe />);

    expect(push).not.toHaveBeenCalled();
  });

  it("redireciona para /authentication quando não há usuário", async () => {
    render(<ProtectedProbe />);

    await waitFor(() => expect(push).toHaveBeenCalledWith("/authentication"));
    expect(screen.queryByText("conteúdo protegido")).not.toBeInTheDocument();
  });

  it("redireciona quando o usuário existe mas não tem email", async () => {
    setAuthState({ user: fakeUser({ email: "" }) });

    render(<ProtectedProbe />);

    await waitFor(() => expect(push).toHaveBeenCalledWith("/authentication"));
  });

  it("renderiza o conteúdo protegido para um usuário autenticado", () => {
    setAuthState({ user: fakeUser() });

    render(<ProtectedProbe />);

    expect(screen.getByText("conteúdo protegido")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });
});
