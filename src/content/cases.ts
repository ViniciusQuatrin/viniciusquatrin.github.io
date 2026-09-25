export type CaseSlug = "ecofoods" | "ecoprontaentrega" | "ecoos-mobile";

export type CaseStudy = {
  slug: CaseSlug;
  title: string;
  eyebrow: string;
  listType: string;
  listResult: string;
  role: string;
  problem: string;
  changed: string;
  stack: string;
  metaDescription: string;
  prev: { href: string; label: string } | null;
  next: { href: string; label: string } | null;
};

export const casesIntro = {
  meta: {
    title: "Cases — Vinícius Quatrin",
    description:
      "Cases públicos do que dá para contar sem dados de cliente. A lista cresce conforme novos projetos puderem ser descritos.",
  },
  title: "Cases",
  body: "Cases públicos do que dá para contar sem dados de cliente. A lista cresce conforme novos projetos puderem ser descritos.",
} as const;

export const cases: CaseStudy[] = [
  {
    slug: "ecofoods",
    title: "EcoFoods",
    eyebrow: "Android · SmartPOS",
    listType: "Android · SmartPOS",
    listResult:
      "Revitalização do app com integração Cielo, Getnet e Gertec.",
    role: "Revitalização do app Android e integração com terminais SmartPOS.",
    problem:
      "App Android em produção que precisava de revitalização e de pagamento em terminais de diferentes fabricantes (Cielo, Getnet, Gertec).",
    changed:
      "O app foi revitalizado e passou a operar com SmartPOS nessas três redes, no mesmo produto que já estava na rua.",
    stack: "Android · SmartPOS (Cielo, Getnet, Gertec)",
    metaDescription:
      "EcoFoods — revitalização Android com SmartPOS (Cielo, Getnet, Gertec).",
    prev: { href: "/cases", label: "Cases" },
    next: { href: "/cases/ecoprontaentrega", label: "EcoProntaEntrega" },
  },
  {
    slug: "ecoprontaentrega",
    title: "EcoProntaEntrega",
    eyebrow: "legado Java → Kotlin",
    listType: "legado → Kotlin",
    listResult:
      "Java de 11 anos para Kotlin, com automação Python no processo.",
    role: "Refatoração de base Java longa para Kotlin, com automação do processo.",
    problem:
      "Código Java acumulado por 11 anos: manutenção cara e modernização difícil sem parar a entrega.",
    changed:
      "A base foi migrada para Kotlin. Parte do trabalho repetitivo da refatoração foi automatizada com Python, para acelerar a troca sem depender só de edição manual.",
    stack: "Android · Java → Kotlin · Python (automação)",
    metaDescription:
      "EcoProntaEntrega — Java de 11 anos migrado para Kotlin, com automação em Python.",
    prev: { href: "/cases/ecofoods", label: "EcoFoods" },
    next: { href: "/cases/ecoos-mobile", label: "EcoOS Mobile" },
  },
  {
    slug: "ecoos-mobile",
    title: "EcoOS Mobile",
    eyebrow: "APIs · performance",
    listType: "APIs · performance",
    listResult:
      "Integração de APIs externas e lazy loading de documentos.",
    role: "Integração com APIs externas e otimização de carregamento de documentos.",
    problem:
      "App mobile que consome APIs externas e precisa carregar documentos sem travar a experiência.",
    changed:
      "As integrações foram amarradas ao fluxo do app e o carregamento de documentos passou a lazy loading, para não puxar tudo de uma vez.",
    stack: "Android · APIs externas · lazy loading de documentos",
    metaDescription:
      "EcoOS Mobile — APIs externas e lazy loading de documentos.",
    prev: { href: "/cases/ecoprontaentrega", label: "EcoProntaEntrega" },
    next: { href: "/cases", label: "Voltar aos cases" },
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((c) => c.slug === slug);
}

export function getCaseSlugs(): CaseSlug[] {
  return cases.map((c) => c.slug);
}
