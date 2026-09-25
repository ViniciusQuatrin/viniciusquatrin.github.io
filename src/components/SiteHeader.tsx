import { site } from "@/content/site";

function withTrailingSlash(href: string) {
  if (href === "/") return href;
  return href.endsWith("/") ? href : `${href}/`;
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="/" className="site-header__brand">
          {site.name}
        </a>
        <nav className="site-header__nav" aria-label="Principal">
          <ul className="site-header__list">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={withTrailingSlash(item.href)} className="site-header__link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="site-header__cta">
          <a
            href={site.linkedIn.href}
            className="btn btn--primary btn--compact"
            target="_blank"
            rel="noopener noreferrer"
          >
            {site.linkedIn.label}
          </a>
          <a href={site.email.href} className="btn btn--ghost btn--compact">
            {site.email.label}
          </a>
        </div>
      </div>
    </header>
  );
}
