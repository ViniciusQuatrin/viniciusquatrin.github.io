import Link from "next/link";

type ProofCardProps = {
  title: string;
  summary: string;
  href: string;
};

export function ProofCard({ title, summary, href }: ProofCardProps) {
  return (
    <article className="proof-card">
      <h3 className="proof-card__title">
        <Link href={href}>{title}</Link>
      </h3>
      <p className="proof-card__summary">{summary}</p>
      <Link href={href} className="proof-card__link">
        Ver case
        <span aria-hidden="true"> →</span>
      </Link>
    </article>
  );
}
