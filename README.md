# viniciusquatrin.github.io

Portfolio de Vinícius Quatrin — Next.js (App Router) com export estático.

- **Live:** https://viniciusquatrin.github.io
- **Source:** `src/`, `package.json`, `next.config.ts`, etc. na branch `main`
- **Site publicado:** arquivos estáticos na raiz de `main` (`index.html`, `_next/`, `cases/`, `sobre/`) gerados por `npm run build` (`out/`)

## Desenvolvimento

```bash
npm ci
npm run dev
```

## Atualizar o site publicado

```bash
npm ci
npm run build
# copie o conteúdo de out/ para a raiz do repositório (mantenha .nojekyll)
git add -A && git commit -m "Update static export" && git push
```

## GitHub Actions (ainda não no remoto)

O token OAuth desta máquina não tem scope `workflow`, então `.github/workflows/pages.yml`
não pode ser enviado via `git push`. Para ativar deploy automático:

1. Reautorize `gh` com scope `workflow` (`gh auth refresh -s workflow`), **ou**
2. Em **Settings → Pages → Build and deployment → Source**, escolha **GitHub Actions**
   e crie o workflow pela UI (template ou cole o YAML abaixo).

Workflow sugerido: `.github/workflows/pages.yml` (npm ci → npm run build → upload `out/` → deploy-pages).

Enquanto isso, Pages serve a raiz de `main` (legado).

## Stack

Next.js (`output: "export"`), React, TypeScript, Tailwind CSS.
