import { site } from "@/content/site";

type CtaGroupProps = {
  linkedInLabel?: string;
  emailLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  compact?: boolean;
};

function withTrailingSlash(href: string) {
  if (href.startsWith("http") || href.startsWith("mailto:")) return href;
  if (href === "/") return href;
  return href.endsWith("/") ? href : `${href}/`;
}

export function CtaGroup({
  linkedInLabel = site.linkedIn.label,
  emailLabel = site.email.label,
  secondaryHref,
  secondaryLabel,
  compact = false,
}: CtaGroupProps) {
  return (
    <div
      className={`cta-group ${compact ? "cta-group--compact" : ""}`.trim()}
    >
      <a
        href={site.linkedIn.href}
        className="btn btn--primary"
        target="_blank"
        rel="noopener noreferrer"
      >
        {linkedInLabel}
      </a>
      <a href={site.email.href} className="btn btn--primary">
        {emailLabel}
      </a>
      {secondaryHref && secondaryLabel ? (
        <a
          href={withTrailingSlash(secondaryHref)}
          className="btn btn--secondary"
        >
          {secondaryLabel}
        </a>
      ) : null}
    </div>
  );
}
