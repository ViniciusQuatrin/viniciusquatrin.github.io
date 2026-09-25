import Link from "next/link";
import type { CaseStudy } from "@/content/cases";

type CaseCardProps = {
  item: Pick<CaseStudy, "slug" | "title" | "listType" | "listResult">;
};

export function CaseCard({ item }: CaseCardProps) {
  const href = `/cases/${item.slug}`;
  return (
    <article className="case-card">
      <p className="case-card__type">{item.listType}</p>
      <h2 className="case-card__title">
        <Link href={href}>{item.title}</Link>
      </h2>
      <p className="case-card__result">{item.listResult}</p>
      <Link href={href} className="case-card__link">
        Abrir case
        <span aria-hidden="true"> →</span>
      </Link>
    </article>
  );
}
