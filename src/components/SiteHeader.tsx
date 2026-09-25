"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-header__brand">
          {site.name}
        </Link>
        <nav className="site-header__nav" aria-label="Principal">
          <ul className="site-header__list">
            {site.nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={
                      active
                        ? "site-header__link site-header__link--active"
                        : "site-header__link"
                    }
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
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
          <a
            href={site.email.href}
            className="btn btn--ghost btn--compact"
          >
            {site.email.label}
          </a>
        </div>
      </div>
    </header>
  );
}
