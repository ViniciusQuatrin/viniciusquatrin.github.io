import { site } from "@/content/site";
import { withTrailingSlash } from "@/lib/href";

type CtaGroupProps = {
  linkedInLabel?: string;
  emailLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  /** Optional external primary action (e.g. Abrir FOCO). */
  externalHref?: string;
  externalLabel?: string;
  compact?: boolean;
};

export function CtaGroup({
  linkedInLabel = site.linkedIn.label,
  emailLabel = site.email.label,
  secondaryHref,
  secondaryLabel,
  externalHref,
  externalLabel,
  compact = false,
}: CtaGroupProps) {
  const hasExternal = Boolean(externalHref && externalLabel);
  const secondary =
    secondaryHref && secondaryLabel ? (
      <a
        href={withTrailingSlash(secondaryHref)}
        className="btn btn--secondary"
      >
        {secondaryLabel}
      </a>
    ) : null;

  return (
    <div
      className={`cta-group ${compact ? "cta-group--compact" : ""}`.trim()}
    >
      {hasExternal ? (
        <a
          href={externalHref}
          className="btn btn--primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          {externalLabel}
        </a>
      ) : null}
      {hasExternal ? secondary : null}
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
      {!hasExternal ? secondary : null}
    </div>
  );
}
