import type { Metadata } from "next";
import { CaseCard } from "@/components/CaseCard";
import { cases, casesIntro } from "@/content/cases";

export const metadata: Metadata = {
  title: "Cases",
  description: casesIntro.meta.description,
};

export default function CasesPage() {
  return (
    <div className="container section">
      <header className="page-intro">
        <h1>{casesIntro.title}</h1>
        <p>{casesIntro.body}</p>
      </header>

      <div className="case-grid">
        {cases.map((item) => (
          <CaseCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
