import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { config, proxy } from "@/proxy";
import { appConfig } from "@/config/app";

function request(path: string, cookie = false) {
  const req = new NextRequest(new URL(path, "https://example.com"));
  if (cookie) req.cookies.set(appConfig.authCookieName, "true");
  return req;
}

// O matcher é uma string estática exigida pelo Next; aqui replicamos a regex
// para garantir que as exclusões continuem cobrindo assets e a rota pública.
const matcher = new RegExp(`^${config.matcher[0]}$`);

describe("proxy", () => {
  it("redireciona para o login quando não há cookie de sessão", () => {
    const response = proxy(request("/"));

    expect(response?.status).toBe(307);
    expect(response?.headers.get("location")).toBe(
      `https://example.com${appConfig.loginRoute}`,
    );
  });

  it("deixa passar quando o cookie de sessão existe", () => {
    expect(proxy(request("/", true))).toBeUndefined();
  });

  it.each([
    "/authentication",
    "/_next/static/chunk.js",
    "/images/avatar.svg",
    "/favicon.ico",
  ])("não intercepta %s", (path) => {
    expect(matcher.test(path)).toBe(false);
  });

  it.each(["/", "/settings", "/notifications", "/profile"])(
    "intercepta %s",
    (path) => {
      expect(matcher.test(path)).toBe(true);
    },
  );
});
