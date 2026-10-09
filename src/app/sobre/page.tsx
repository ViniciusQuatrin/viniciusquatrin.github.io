import type { Metadata } from "next";
import { CtaGroup } from "@/components/CtaGroup";
import { GlitchHeading } from "@/components/GlitchHeading";
import { about } from "@/content/about";

export const metadata: Metadata = {
  title: "Sobre",
  description: about.meta.description,
};

export default function SobrePage() {
  return (
    <div className="container section">
      <header className="page-intro">
        <GlitchHeading level={1}>Sobre</GlitchHeading>
      </header>

      <div className="stack-sections prose-width">
        <section aria-labelledby="quem-title">
          <GlitchHeading level={2} id="quem-title" className="section__title">
            {about.who.title}
          </GlitchHeading>
          <p className="section__lead">{about.who.body}</p>
        </section>

        <section aria-labelledby="como-title">
          <GlitchHeading level={2} id="como-title" className="section__title">
            {about.how.title}
          </GlitchHeading>
          <p className="section__lead">{about.how.body}</p>
        </section>

        <section aria-labelledby="praquem-title">
          <GlitchHeading level={2} id="praquem-title" className="section__title">
            {about.forWhom.title}
          </GlitchHeading>
          <p className="section__lead">{about.forWhom.body}</p>
        </section>

        <section aria-label="Contato">
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
