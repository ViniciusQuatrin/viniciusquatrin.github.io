# viniciusquatrin.github.io

Portfolio de Vinícius Quatrin — site Next.js (App Router) com export estático.

- **Live:** https://viniciusquatrin.github.io
- **Source:** branch `main` (projeto Next.js)
- **Published site:** branch `gh-pages` (conteúdo de `out/` após `npm run build`)

## Desenvolvimento local

```bash
npm ci
npm run dev
```

## Publicar atualização do site

```bash
npm ci
npm run build
# copie o conteúdo de out/ para a branch gh-pages (com .nojekyll na raiz)
```

## Deploy via GitHub Actions (opcional)

O token OAuth atual não tem scope `workflow`, então o arquivo
`.github/workflows/pages.yml` ainda não está no remoto. Para ativar:

1. Autorize o GitHub CLI/app com scope `workflow`, **ou**
2. Em Settings → Pages, escolha Source: **GitHub Actions**, e adicione o workflow via UI.

Enquanto isso, Pages está configurado para servir a branch `gh-pages`.

## Stack

Next.js (`output: "export"`), React, TypeScript, Tailwind CSS.
