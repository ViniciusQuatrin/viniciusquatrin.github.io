import type { Metadata } from "next";
import { CtaGroup } from "@/components/CtaGroup";
import { MoreProjects } from "@/components/MoreProjects";
import { CaseCard } from "@/components/CaseCard";
import { GlitchHeading } from "@/components/GlitchHeading";
import { home } from "@/content/home";

export const metadata: Metadata = {
  title: home.meta.title,
  description: home.meta.description,
};

export default function HomePage() {
  return (
    <>
      <section className="container hero" aria-labelledby="hero-name">
        <GlitchHeading level={1} id="hero-name" className="hero__name" neon>
          {home.hero.name}
        </GlitchHeading>
        <p className="hero__role">{home.hero.role}</p>
        <p className="hero__promise">{home.hero.promise}</p>
      </section>

      <section className="section" aria-labelledby="provas-title">
        <div className="container">
          <GlitchHeading level={2} id="provas-title" className="section__title">
            Provas
          </GlitchHeading>
          <div className="proof-stack">
            {home.proofs.map((proof) => (
              <CaseCard
                key={proof.href}
                id={`proof-${proof.href.split("/").pop()}`}
                title={proof.title}
                headingLevel={3}
                summary={proof.summary}
                link={{ href: proof.href, label: "Ver case" }}
              />
            ))}
          </div>
        </div>
      </section>

      <MoreProjects />

      <section className="section" aria-labelledby="entrega-title">
        <div className="container">
          <div className="prose-width delivery">
            <GlitchHeading
              level={2}
              id="entrega-title"
              className="section__title"
            >
              {home.delivery.title}
            </GlitchHeading>
            <p className="section__lead">{home.delivery.body}</p>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Contato">
        <div className="container">
          <CtaGroup
            linkedInLabel={home.cta.primaryLinkedIn}
            emailLabel={home.cta.primaryEmail}
            secondaryHref={home.cta.secondaryHref}
            secondaryLabel={home.cta.secondary}
          />
        </div>
      </section>
    </>
  );
}
