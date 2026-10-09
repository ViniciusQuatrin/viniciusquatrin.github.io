import { CaseCard } from "@/components/CaseCard";
import { GlitchHeading } from "@/components/GlitchHeading";
import { home } from "@/content/home";
import { withTrailingSlash } from "@/lib/href";

/** Home strip: FOCO (never a home proof) + link to the full case list. */
export function MoreProjects() {
  const { title, item, allHref, allLabel } = home.moreProjects;
  return (
    <section className="section" aria-labelledby="mais-title">
      <div className="container">
        <GlitchHeading level={2} id="mais-title" className="section__title">
          {title}
        </GlitchHeading>
        <div className="more-strip">
          <CaseCard
            id="more-foco"
            title={item.title}
            headingLevel={3}
            summary={item.summary}
            link={{ href: item.href, label: item.linkLabel }}
            variant="compact"
          />
          <a href={withTrailingSlash(allHref)} className="btn btn--secondary">
            {allLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
