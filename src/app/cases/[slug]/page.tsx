import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaGroup } from "@/components/CtaGroup";
import { getCase, getCaseSlugs } from "@/content/cases";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function withTrailingSlash(href: string) {
  if (href === "/") return href;
  return href.endsWith("/") ? href : `${href}/`;
}

export function generateStaticParams() {
  return getCaseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) {
    return { title: "Case" };
  }
  return {
    title: item.title,
    description: item.metaDescription,
  };
}

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) {
    notFound();
  }

  return (
    <article className="container section">
      <header className="case-header">
        <p className="case-header__eyebrow">{item.eyebrow}</p>
        <h1 className="case-header__title">{item.title}</h1>
        <p className="case-header__role">{item.role}</p>
      </header>

      <section className="case-block" aria-labelledby="problema-title">
        <h2 id="problema-title">Problema</h2>
        <p>{item.problem}</p>
      </section>

      <section className="case-block" aria-labelledby="mudou-title">
        <h2 id="mudou-title">O que mudou</h2>
        <p>{item.changed}</p>
      </section>

      <section className="case-block" aria-labelledby="stack-title">
        <h2 id="stack-title">Stack</h2>
        <p>{item.stack}</p>
      </section>

      <nav className="case-nav" aria-label="Navegação entre cases">
        {item.prev ? (
          <a href={withTrailingSlash(item.prev.href)}>
            <span aria-hidden="true">← </span>
            {item.prev.label}
          </a>
        ) : (
          <span />
        )}
        {item.next ? (
          <a href={withTrailingSlash(item.next.href)}>
            {item.next.label === "Voltar aos cases"
              ? item.next.label
              : `Próximo: ${item.next.label}`}
            {item.next.label !== "Voltar aos cases" ? (
              <span aria-hidden="true"> →</span>
            ) : null}
          </a>
        ) : null}
      </nav>

      <section aria-label="Contato">
        <CtaGroup
          linkedInLabel="LinkedIn"
          emailLabel="E-mail"
          secondaryHref="/cases/"
          secondaryLabel="Ver outros cases"
        />
      </section>
    </article>
  );
}
