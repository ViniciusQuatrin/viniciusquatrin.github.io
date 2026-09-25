import Link from "next/link";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__cta">{site.footerCta}</p>
        <nav aria-label="Rodapé">
          <ul className="site-footer__list">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
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
