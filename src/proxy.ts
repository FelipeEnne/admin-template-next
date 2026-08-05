import { NextResponse, type NextRequest } from "next/server";
import { appConfig } from "@/config/app";

// Checagem otimista: o cookie é só uma flag booleana, não um token verificável.
// Ele evita servir o HTML das páginas admin para quem nunca logou; a validação
// real da sessão continua sendo do `ForceAuth`, contra o Firebase, no client.
export function proxy(request: NextRequest) {
  if (request.cookies.has(appConfig.authCookieName)) return;

  return NextResponse.redirect(new URL(appConfig.loginRoute, request.url));
}

export const config = {
  matcher: [
    "/((?!authentication|api|_next/static|_next/image|images|favicon.ico).*)",
  ],
};
