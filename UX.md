# IA — portfolio Vinícius Quatrin (Next.js)

## Sitemap
/ Home · /sobre · /cases · /cases/[slug]
Sem /contato. Contato = CTA global (LinkedIn + e-mail) no header e rodapé.

## Hierarquia de decisão
1. ~10s home: Android de produção + backend quando precisa?
2. ~1 min: 3 provas de capa
3. Mais: /cases ou /sobre
4. CTA sempre visível

## Home — ordem mobile
1. Hero — nome + promessa + papel
2. Provas (3) — stack vertical, sem carrossel
3. Como entrega
4. CTA — primário LinkedIn/e-mail; secundário /cases
5. Footer
Hero por conteúdo (sem 100vh); espaço até Provas 24–32px mobile / até ~48px desktop. CTA em fluxo após provas/como entrega — sem sticky que crie buracos.

## /sobre
Quem é → Como trabalha → Pra quem → CTA. Sem timeline longa.

## /cases
Intro curta → lista/grid cards (título, tipo problema, stack, 1 linha resultado). 3 de capa primeiro. Extensível por slug.

## /cases/[slug]
Cabeçalho → Problema → O que mudou → Stack → prev/next → CTA.
Slugs: ecofoods, ecoprontaentrega, ecoos-mobile.

## CTAs
Primário: LinkedIn e/ou e-mail. Secundário: /cases. Terciário: abrir case.
Um primário por viewport.

## Mobile-first
Base ~360px; desktop 1→2–3 col. Toque ≥44px; foco visível; headings em ordem.
Texto max-width ~640–720px; grid cases ~1100px.
Seções (ritmo entre blocos): 24–40px mobile / 48–64px desktop — gap ou padding de um lado só (evitar py simétrico que dobra o vão). Provas: stack vertical, gap 16–24px entre cards. Footer py 24–32px mobile.
Tom: limpo, sênior, sem marketing flashy. Contraste AA.
