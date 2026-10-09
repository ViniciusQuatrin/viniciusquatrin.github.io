import { GlitchHeading } from "@/components/GlitchHeading";
import { isExternal, withTrailingSlash } from "@/lib/href";

export type TextPart = { text: string; code?: boolean };

export type CardLink = {
  href: string;
  label: string;
  /** Required for external links: accessible name from copy (new tab). */
  ariaLabel?: string;
  icon?: "github";
};

export type CaseCardProps = {
  /** Unique, stable id prefix (used for heading/label ids). */
  id: string;
  title: string;
  headingLevel?: 2 | 3;
  /** Small line above the title (case type) — or a pill when `badge`. */
  eyebrow?: string;
  badge?: boolean;
  summary: string | ReadonlyArray<TextPart>;
  /** Optional extra line (e.g. stack). */
  meta?: string;
  /** Primary action: stretched over the whole card (one tab stop). */
  link: CardLink;
  /** Optional extra actions, layered above the stretched link. */
  secondaryLinks?: ReadonlyArray<CardLink>;
  variant?: "default" | "compact";
};

function GitHubIcon() {
  return (
    <svg
      className="case-card__icon"
      viewBox="0 0 16 16"
      width="18"
      height="18"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  );
}

function CardAnchor({
  link,
  className,
  labelledBy,
  labelId,
}: {
  link: CardLink;
  className: string;
  /** Internal links: name = card title + visible label (no new copy). */
  labelledBy?: string;
  labelId?: string;
}) {
  const external = isExternal(link.href);
  return (
    <a
      href={withTrailingSlash(link.href)}
      className={className}
      {...(external
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": link.ariaLabel,
          }
        : { "aria-labelledby": labelledBy })}
    >
      {link.icon === "github" ? <GitHubIcon /> : null}
      <span id={labelId}>{link.label}</span>
      <span aria-hidden="true">{external ? "↗" : "→"}</span>
    </a>
  );
}

/**
 * The single case card used everywhere (home proofs, Mais projetos, /cases).
 * Internal vs external is decided by `link.href`. Shared behavior:
 * glitch title (GlitchHeading), tilt + neon border (`fx-card`/`data-fx-card`),
 * reveal on enter (main.js), reduced-motion handled in CSS/JS.
 */
export function CaseCard({
  id,
  title,
  headingLevel = 2,
  eyebrow,
  badge = false,
  summary,
  meta,
  link,
  secondaryLinks,
  variant = "default",
}: CaseCardProps) {
  const titleId = `${id}-title`;
  const ctaId = `${id}-cta`;
  const cls = ["case-card", "fx-card", variant === "compact" ? "case-card--compact" : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <article className={cls} data-fx-card="" aria-labelledby={titleId}>
      {eyebrow ? (
        <p className="case-card__type">
          {badge ? <span className="case-card__badge">{eyebrow}</span> : eyebrow}
        </p>
      ) : null}
      <GlitchHeading level={headingLevel} id={titleId} className="case-card__title">
        {title}
      </GlitchHeading>
      <p className="case-card__result">
        {typeof summary === "string"
          ? summary
          : summary.map((part, i) =>
              part.code ? <code key={i}>{part.text}</code> : part.text,
            )}
      </p>
      {meta ? <p className="case-card__meta">{meta}</p> : null}
      <div className="case-card__links">
        <CardAnchor
          link={link}
          className="case-card__link card-link"
          labelledBy={`${titleId} ${ctaId}`}
          labelId={ctaId}
        />
        {secondaryLinks?.map((s) => (
          <CardAnchor
            key={s.href}
            link={s}
            className="case-card__link case-card__link--secondary card-sublink"
          />
        ))}
      </div>
    </article>
  );
}
