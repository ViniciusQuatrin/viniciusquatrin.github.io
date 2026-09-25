import type { Metadata } from "next";
import { CtaGroup } from "@/components/CtaGroup";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title: "Sobre",
  description: about.meta.description,
};

export default function SobrePage() {
  return (
    <div className="container section">
      <header className="page-intro">
        <h1>Sobre</h1>
      </header>

      <div className="stack-sections prose-width">
        <section aria-labelledby="quem-title">
          <h2 id="quem-title" className="section__title">
            {about.who.title}
          </h2>
          <p className="section__lead">{about.who.body}</p>
        </section>

        <section aria-labelledby="como-title">
          <h2 id="como-title" className="section__title">
            {about.how.title}
          </h2>
          <p className="section__lead">{about.how.body}</p>
        </section>

        <section aria-labelledby="praquem-title">
          <h2 id="praquem-title" className="section__title">
            {about.forWhom.title}
          </h2>
          <p className="section__lead">{about.forWhom.body}</p>
        </section>

        <section aria-labelledby="sobre-cta-title">
          <h2 id="sobre-cta-title" className="section__title">
            {about.cta.title}
          </h2>
          <CtaGroup
            linkedInLabel={about.cta.primaryLinkedIn}
            emailLabel={about.cta.primaryEmail}
            secondaryHref={about.cta.secondaryHref}
            secondaryLabel={about.cta.secondary}
          />
        </section>
      </div>
    </div>
  );
}
