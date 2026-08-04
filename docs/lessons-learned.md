# Lições aprendidas — debugging deste template

Registro do que descobrimos ao corrigir erros no `admin-template-next` (Next.js 16, App Router).

## 1. App Router vs Pages Router

Este projeto usa **somente App Router** (`src/app/`).

| Pages Router (antigo) | App Router (este projeto) |
|-----------------------|---------------------------|
| `src/pages/index.tsx` | `src/app/page.tsx` |
| `src/pages/about.tsx` | `src/app/about/page.tsx` |
| `<Link><a>...</a></Link>` | `<Link className="...">...</Link>` |

**Não criar `src/pages/`** — mesmo vazia, o Next.js tenta monitorá-la como Pages Router. Se a pasta some com `next dev` rodando, o watcher falha com:

```
ENOENT: no such file or directory, scandir '...\src\pages'
```

## 2. Nome do arquivo de rota

No App Router, o arquivo **tem que** se chamar `page.tsx` (singular).

- `src/app/adjustments/pages.tsx` → **não cria rota**
- `src/app/adjustments/page.tsx` → rota `/adjustments`

## 3. URLs e menu lateral

A URL é o nome da pasta dentro de `app/`:

- Pasta `adjustments` → `/adjustments` (não `/settings`)
- Links em `SideMenu` e `ItemMenu` devem bater com a pasta real

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

## 8. Auth Firebase (client-only)

Não há `middleware.ts`. A proteção é só no client:

1. `AuthProvider` no root layout envolve o app
2. Login Google (`signInWithPopup`) em `AuthContext` grava o cookie `admin-template-auth` (flag booleana, 7 dias — **não** o JWT)
3. Páginas admin usam `Layout` → `ForceAuth`; sem usuário, redireciona para `/authentication`
4. `/authentication` **não** usa `Layout` (rota pública)
5. Restauração de sessão: se o cookie existir, `onIdTokenChanged` reativa o usuário

Consumir auth via `useAuth` (`@/data/hook/useAuth`). Firebase só em `AuthContext` e `src/firebase/config.js`.

Env: `NEXT_PUBLIC_FIREBASE_*`. O código usa a typo `NEXT_PUBLIC_FIREBASE_PORJECT_ID` — manter alinhado ao `.env`.

O formulário email/senha na tela de login ainda não está ligado ao Firebase; só o Google está wired.

## Referências no projeto

- Regras Cursor: `.cursor/rules/project-structure.mdc`, `react-next.mdc`, `dev-workflow.mdc`, `auth.mdc`, `styling.mdc`
- Docs Next.js 16: `node_modules/next/dist/docs/`
