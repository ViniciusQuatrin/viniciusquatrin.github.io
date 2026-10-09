import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaGroup } from "@/components/CtaGroup";
import { GlitchHeading } from "@/components/GlitchHeading";
import { getCase, getCaseSlugs } from "@/content/cases";
import { withTrailingSlash } from "@/lib/href";

type PageProps = {
  params: Promise<{ slug: string }>;
};


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
        <GlitchHeading level={1} className="case-header__title">
          {item.title}
        </GlitchHeading>
        <p className="case-header__role">{item.role}</p>
      </header>

      <section className="case-block" aria-labelledby="problema-title">
        <GlitchHeading level={2} id="problema-title">
          Problema
        </GlitchHeading>
        <p>{item.problem}</p>
      </section>

      {item.delivered ? (
        <section className="case-block" aria-labelledby="entregou-title">
          <GlitchHeading level={2} id="entregou-title">
          O que entregou
        </GlitchHeading>
          <p>{item.delivered}</p>
        </section>
      ) : null}

      <section className="case-block" aria-labelledby="mudou-title">
        <GlitchHeading level={2} id="mudou-title">
          O que mudou
        </GlitchHeading>
        <p>{item.changed}</p>
      </section>

      <section className="case-block" aria-labelledby="stack-title">
        <GlitchHeading level={2} id="stack-title">
          Stack
        </GlitchHeading>
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
          externalHref={item.externalUrl}
          externalLabel={item.externalLabel}
        />
      </section>
    </article>
  );
}
