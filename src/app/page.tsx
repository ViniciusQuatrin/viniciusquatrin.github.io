import type { Metadata } from "next";
import { CtaGroup } from "@/components/CtaGroup";
import { ProofCard } from "@/components/ProofCard";
import { home } from "@/content/home";

export const metadata: Metadata = {
  title: home.meta.title,
  description: home.meta.description,
};

export default function HomePage() {
  return (
    <>
      <section className="container hero" aria-labelledby="hero-name">
        <h1 id="hero-name" className="hero__name">
          {home.hero.name}
        </h1>
        <p className="hero__role">{home.hero.role}</p>
        <p className="hero__promise">{home.hero.promise}</p>
      </section>

      <section className="section" aria-labelledby="provas-title">
        <div className="container">
          <h2 id="provas-title" className="section__title">
            Provas
          </h2>
          <div className="proof-stack">
            {home.proofs.map((proof) => (
              <ProofCard
                key={proof.href}
                title={proof.title}
                summary={proof.summary}
                href={proof.href}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="entrega-title">
        <div className="container prose-width">
          <h2 id="entrega-title" className="section__title">
            {home.delivery.title}
          </h2>
          <p className="section__lead">{home.delivery.body}</p>
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
