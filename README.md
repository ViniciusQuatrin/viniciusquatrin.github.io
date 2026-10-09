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

`npm run build` roda um pós-processamento (`scripts/strip-client-js.mjs`) que remove o JS de runtime do Next do export (sem hidratação; todo conteúdo é HTML server-rendered com âncoras plain) e injeta só a camada de efeitos v2: `/fx/main.js` (módulo vanilla, sem deps).

### Efeitos v2 (`public/fx/`)

- `main.js` — reveal de seções (só abaixo da dobra, uma vez, ~300ms), glitch ~150ms em H1/H2 (entrada/hover), tilt de cards (desktop), carrega o globo após `load` + idle.
- `globe.js` + `geo.js` — globo WebGL de pontos/linhas neon (cyan/magenta), sem libs. Mobile: menos pontos, 30fps, só renderiza no scroll. Pausa com aba oculta.
- `globe.svg` — imagem estática do globo (sem JS, `prefers-reduced-motion`, device fraco ou WebGL indisponível). Regenerar: `node scripts/gen-globe-svg.mjs`.
- Transição de página: View Transitions cross-document em CSS (~250ms, sem loader).
- `prefers-reduced-motion: reduce` ⇒ nada se move (globo estático, neon estático).

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
