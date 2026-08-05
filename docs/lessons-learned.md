# Lições aprendidas — debugging deste template

Registro do que descobrimos ao corrigir erros no `admin-template-next` (Next.js 16, App Router).

## 1. App Router vs Pages Router

Este projeto usa **somente App Router** (`src/app/`).

| Pages Router (antigo)     | App Router (este projeto)          |
| ------------------------- | ---------------------------------- |
| `src/pages/index.tsx`     | `src/app/page.tsx`                 |
| `src/pages/about.tsx`     | `src/app/about/page.tsx`           |
| `<Link><a>...</a></Link>` | `<Link className="...">...</Link>` |

**Não criar `src/pages/`** — mesmo vazia, o Next.js tenta monitorá-la como Pages Router. Se a pasta some com `next dev` rodando, o watcher falha com:

```
ENOENT: no such file or directory, scandir '...\src\pages'
```

## 2. Nome do arquivo de rota

No App Router, o arquivo **tem que** se chamar `page.tsx` (singular).

- `src/app/settings/pages.tsx` → **não cria rota**
- `src/app/settings/page.tsx` → rota `/settings`

## 3. URLs e menu lateral

A URL é o nome da pasta dentro de `app/`. O menu não repete essas urls na mão: elas vêm de `navItems` em `src/config/app.ts`, e o teste de `SideMenu` falha se alguma url não tiver `page.tsx` correspondente.

Esse foi um erro real: a pasta era `adjustments` e o menu dizia "Settings", apontando para uma rota que não existia. Hoje a pasta é `settings` e label e url saem da mesma fonte.

## 4. Componente Link no Next.js 16

Padrão antigo (Pages Router) quebra no App Router:

```tsx
// ❌ Erro 500: Invalid <Link> with <a> child
<Link href="/">
  <a className="flex">Home</a>
</Link>

// ✅ Correto
<Link href="/" className="flex">
  Home
</Link>
```

## 5. Múltiplos servidores de desenvolvimento

O Next.js 16 **bloqueia** dois `next dev` no mesmo projeto:

```
⨯ Another next dev server is already running.
- Local: http://localhost:3000
- PID: 31176
```

**Solução:** `Ctrl+C` no terminal antigo ou `taskkill /PID 31176 /F`.

## 6. Turbopack e lockfiles duplicados

Existe `package-lock.json` em `curso-nextjs/` e em `admin-template-next/`. O Turbopack pode escolher a pasta pai como raiz e não achar rotas.

Configuração em `next.config.ts`:

```ts
turbopack: {
  root: import.meta.dirname,
},
```

## 7. Fluxo de diagnóstico

1. Ler o erro no terminal (mensagem e PID)
2. Listar `src/app/` e confirmar `page.tsx` em cada rota
3. Verificar se `src/pages/` existe sem necessidade
4. Testar rotas no browser ou com `Invoke-WebRequest`
5. Reiniciar `npm run dev` após mudanças em pastas de rota

## 8. Auth Firebase

1. `AuthProvider` no root layout envolve o app
2. Google (`signInWithPopup`), login e cadastro por email/senha em `AuthContext` gravam o cookie de sessão (flag booleana, 7 dias — **não** o JWT)
3. `src/proxy.ts` barra no edge quem não tem o cookie; `Layout` → `ForceAuth` valida a sessão no client
4. `/authentication` **não** usa `Layout` e está fora do matcher do proxy (rota pública)
5. Restauração de sessão: se o cookie existir, `onIdTokenChanged` reativa o usuário

Consumir auth via `useAuth` (`@/data/hook/useAuth`). Firebase só em `AuthContext` e `src/firebase/config.js`.

Env: `NEXT_PUBLIC_FIREBASE_*` (veja `.env.example`). O código usa a typo `NEXT_PUBLIC_FIREBASE_PORJECT_ID` — manter alinhado ao `.env`.

Como o cookie é forjável, o proxy é conveniência e não autorização. Proteger dados exige session cookie assinado verificado com o Firebase Admin SDK.

## 9. Middleware virou Proxy no Next 16

Escrever `middleware.ts` neste projeto não faz nada: o Next 16 renomeou a convenção para `proxy.ts`, e a função exportada se chama `proxy`. O arquivo fica em `src/`, no mesmo nível de `app/`.

```ts
// src/proxy.ts
export function proxy(request: NextRequest) { ... }
export const config = { matcher: ["/((?!authentication|api|_next/static|_next/image|images|favicon.ico).*)"] };
```

Sem `matcher`, o proxy roda em **toda** request, incluindo CSS, JS e imagens — o redirect de auth acabaria bloqueando os próprios assets. Confirme no `build`: a saída lista `ƒ Proxy (Middleware)`.

Fonte: `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`.

## 10. Tipos de rota velhos travam o build

Depois de renomear uma pasta em `src/app/`, o `next build` pode falhar com:

```
.next/dev/types/validator.ts:42:39
Type error: Cannot find module '../../../src/app/adjustments/page.js'
```

O compilador está lendo tipos gerados antes do rename. Apague o cache e rode de novo:

```powershell
Remove-Item -Recurse -Force .next
npm run build
```

## Referências no projeto

- Regras Cursor: `.cursor/rules/project-structure.mdc`, `react-next.mdc`, `dev-workflow.mdc`, `auth.mdc`, `styling.mdc`
- Docs Next.js 16: `node_modules/next/dist/docs/`
