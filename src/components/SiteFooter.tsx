import { site } from "@/content/site";

function withTrailingSlash(href: string) {
  if (href === "/") return href;
  return href.endsWith("/") ? href : `${href}/`;
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__cta">{site.footerCta}</p>
        <nav aria-label="Rodapé">
          <ul className="site-footer__list">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={withTrailingSlash(item.href)}>{item.label}</a>
              </li>
            ))}
            <li>
              <a
                href={site.linkedIn.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.linkedIn.label}
              </a>
            </li>
            <li>
              <a href={site.email.href}>{site.email.label}</a>
            </li>
          </ul>
        </nav>
        <p className="site-footer__copy">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
