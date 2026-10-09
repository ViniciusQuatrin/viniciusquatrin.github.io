import type { ReactNode } from "react";

type Level = 1 | 2 | 3;

type GlitchHeadingProps = {
  level: Level;
  id?: string;
  className?: string;
  /** Stronger cyan/magenta glow (hero H1). */
  neon?: boolean;
  children: ReactNode;
};

/**
 * The one glitch/glow hook. Renders a real heading with the low neon glow
 * (`fx-heading`) and `data-fx-glitch`, which /fx/main.js uses to play the
 * ~150ms glitch on enter/hover (never looping; off with reduced motion).
 * Inside a `[data-fx-card]`, hovering/focusing anywhere on the card triggers it.
 */
export function GlitchHeading({
  level,
  id,
  className,
  neon = false,
  children,
}: GlitchHeadingProps) {
  const Tag = `h${level}` as const;
  const cls = ["fx-heading", neon ? "neon-title" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag id={id} className={cls} data-fx-glitch="">
      {children}
    </Tag>
  );
}
