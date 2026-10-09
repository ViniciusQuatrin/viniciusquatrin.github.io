import { home } from "@/content/home";

function withTrailingSlash(href: string) {
  if (href === "/") return href;
  return href.endsWith("/") ? href : `${href}/`;
}

/** Home strip: FOCO (never a home proof) + link to the full case list. */
export function MoreProjects() {
  const { title, item, allHref, allLabel } = home.moreProjects;
  const href = withTrailingSlash(item.href);
  return (
    <section className="section" aria-labelledby="mais-title">
      <div className="container">
        <h2 id="mais-title" className="section__title">
          {title}
        </h2>
        <div className="more-strip">
          <article className="more-card fx-card">
            <h3 className="more-card__title">
              <a href={href} className="card-link">
                {item.title}
              </a>
            </h3>
            <p className="more-card__summary">{item.summary}</p>
            <a href={href} className="proof-card__link card-sublink">
              {item.linkLabel}
              <span aria-hidden="true"> →</span>
            </a>
          </article>
          <a href={withTrailingSlash(allHref)} className="btn btn--secondary">
            {allLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
