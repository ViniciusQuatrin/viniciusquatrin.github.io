type ProofCardProps = {
  title: string;
  summary: string;
  href: string;
};

function withTrailingSlash(href: string) {
  if (href === "/") return href;
  return href.endsWith("/") ? href : `${href}/`;
}

export function ProofCard({ title, summary, href }: ProofCardProps) {
  const link = withTrailingSlash(href);
  return (
    <article className="proof-card">
      <h3 className="proof-card__title">
        <a href={link}>{title}</a>
      </h3>
      <p className="proof-card__summary">{summary}</p>
      <a href={link} className="proof-card__link">
        Ver case
        <span aria-hidden="true"> →</span>
      </a>
    </article>
  );
}
