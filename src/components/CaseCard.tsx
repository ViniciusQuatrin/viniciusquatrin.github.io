import type { CaseStudy } from "@/content/cases";

type CaseCardProps = {
  item: Pick<
    CaseStudy,
    "slug" | "title" | "listType" | "listResult" | "externalUrl"
  >;
};

export function CaseCard({ item }: CaseCardProps) {
  const href = `/cases/${item.slug}/`;
  const hasExternal = Boolean(item.externalUrl);
  return (
    <article className="case-card">
      <p className="case-card__type">{item.listType}</p>
      <h2 className="case-card__title">
        <a href={href}>{item.title}</a>
      </h2>
      <p className="case-card__result">{item.listResult}</p>
      <div className="case-card__links">
        <a href={href} className="case-card__link">
          {hasExternal ? "Ver case" : "Abrir case"}
          <span aria-hidden="true"> →</span>
        </a>
        {item.externalUrl ? (
          <a
            href={item.externalUrl}
            className="case-card__link case-card__link--external"
            target="_blank"
            rel="noopener noreferrer"
          >
            Abrir app
            <span aria-hidden="true"> ↗</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
