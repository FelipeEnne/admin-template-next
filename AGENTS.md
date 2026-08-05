<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# admin-template-next

Template de painel administrativo (projeto de curso). App Router, autenticação Firebase só no client, Tailwind v4.

## Git: não commitar

- **Nunca** rode `git commit`, `git push`, `git reset` ou qualquer comando que altere o histórico por conta própria
- Ao terminar, descreva o que mudou e **sugira** a mensagem de commit — quem commita é o usuário
- Exceção única: o usuário pedir explicitamente "commite" naquela conversa

## Stack

| Item | Versão / observação |
|---|---|
| Next.js | 16.2.9 — App Router, Turbopack, pasta `src/` |
| React | 19.2.4 |
| Tailwind CSS | v4 via `@tailwindcss/postcss` (sem `tailwind.config`) |
| Firebase | 12.x, apenas `firebase/app` + `firebase/auth` |
| Outros | `js-cookie`, TypeScript 5, ESLint 9 (`eslint-config-next`) |

## Comandos

```bash
npm run dev     # apenas UM por projeto — Next 16 bloqueia o segundo com "Another next dev server is already running"
npm run build
npm run lint    # o script é só `eslint`, sem argumentos
```

Não há testes configurados. Verificação de uma mudança = `npm run lint` + `npm run build`.

Antes de subir um dev server, confira os terminais existentes. Para matar um travado: `taskkill /PID <pid> /F` (Windows/PowerShell).

## Mapa do projeto

```
src/
  app/                          # rotas (App Router)
    layout.tsx                  # Server Component: AuthProvider > AppProvider, metadata, fontes Geist
    page.tsx                    # /
    adjustments/page.tsx        # /adjustments  (menu mostra "Settings")
    notifications/page.tsx      # /notifications
    profile/page.tsx            # /profile      (sem item no menu)
    authentication/page.tsx     # /authentication (rota pública, não usa Layout)
  components/
    template/Layout.tsx         # ForceAuth + SideMenu + Header + Content; props: title, subtitle, children
    template/                   # Header, SideMenu, ItemMenu, Content, Title, Logo, UserAvatar, ButtonChangeTheme
    auth/ForceAuth.tsx          # guarda de rota no client; redireciona para /authentication
    auth/AuthInput.tsx          # input do formulário de login
    icons/index.tsx             # todos os ícones SVG, exportados nomeados
  data/
    context/AuthContext.tsx     # sessão Firebase, cookie, login/logout
    context/AppContext.tsx      # tema (localStorage "theme"), expõe `thema` e `changeTheme`
    hook/useAuth.ts             # useContext(AuthContext)
    hook/useAppData.ts          # useContext(appContext)
  firebase/config.js            # initializeApp + getAuth (único lugar que fala com o SDK)
  model/User.ts                 # tipo de domínio
  styles/globals.css            # Tailwind v4, tokens de tema, variante `dark`
```

Config na raiz: `next.config.ts` define `turbopack.root` (há `package-lock.json` na pasta pai, senão o Turbopack erra a raiz) e `images.remotePatterns` para `lh3.googleusercontent.com` e `picsum.photos`.

## Convenções que quebram se ignoradas

- Arquivo de rota é **`page.tsx`** (singular). `pages.tsx` não cria rota nenhuma
- **Não crie `src/pages/`** — mesmo vazia, o watcher tenta monitorá-la e falha com `ENOENT: scandir 'src/pages'`
- A URL é o nome da pasta em `app/`. Links no menu devem bater com a pasta real
- Alias `@/` aponta para `src/` — use no lugar de `../../..`
- `<Link href="..." className="...">` — **nunca** `<a>` dentro de `<Link>` (erro 500)
- `"use client"` só quando há hook, event handler ou browser API. O root `layout.tsx` permanece Server Component
- Páginas admin renderizam `<Layout title subtitle>` (que já inclui `ForceAuth`); `/authentication` **não** usa `Layout`
- Auth pela UI vem de `useAuth` (`@/data/hook/useAuth`), tema de `useAppData`. Nunca importe `firebase/*` num componente
- Estilo via `className` do Tailwind; prefira tokens (`bg-background`, `text-foreground`)
- Após criar, renomear ou remover pastas em `src/app/`, reinicie o dev server

## Auth em uma tela

- Login real: **só Google** (`signInWithPopup` em `AuthContext`). O formulário de email/senha em `/authentication` valida campos, mas ainda não está ligado ao Firebase
- O cookie `admin-template-auth` é apenas uma **flag booleana** (7 dias) — não guarda o JWT
- Restauração de sessão: se o cookie existe, `onIdTokenChanged` reativa o usuário; `configSession` exige `emailVerified`
- Proteção é **só no client** — não há proxy/middleware. `ForceAuth` mostra spinner enquanto `loading` e redireciona sem usuário
- Env: `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PORJECT_ID`. O typo `PORJECT_ID` é intencional em `src/firebase/config.js` — mantenha código e `.env` alinhados

## Antes de escrever código Next

Leia o guia correspondente em `node_modules/next/dist/docs/` — não confie na memória de versões anteriores. Atalhos úteis:

| Assunto | Caminho |
|---|---|
| Trabalhar neste repo como agente | `01-app/02-guides/ai-agents.md` |
| Layouts e páginas | `01-app/01-getting-started/03-layouts-and-pages.md` |
| Server vs Client Components | `01-app/01-getting-started/05-server-and-client-components.md` |
| CSS / Tailwind | `01-app/01-getting-started/11-css.md` |
| Fontes | `01-app/01-getting-started/13-fonts.md` |
| `Link` | `01-app/03-api-reference/02-components/link.md` |
| Autenticação | `01-app/02-guides/authentication.md` |
| Breaking changes da v16 | `01-app/02-guides/upgrading/version-16.md` |

## Onde buscar mais contexto

- `.cursor/rules/project-structure.mdc` — pastas, rotas e alias
- `.cursor/rules/react-next.mdc` — padrões de React/App Router com exemplos bom/ruim
- `.cursor/rules/auth.mdc` — detalhes de sessão e proteção de rotas
- `.cursor/rules/dev-workflow.mdc` — dev server, Turbopack e tabela de diagnóstico
- `.cursor/rules/styling.mdc` — Tailwind v4 e dark mode
- `docs/lessons-learned.md` — erros já enfrentados neste projeto e como foram resolvidos
