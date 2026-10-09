import type { Metadata } from "next";
import { CaseList } from "@/components/CaseList";
import { GlitchHeading } from "@/components/GlitchHeading";
import { casesIntro } from "@/content/cases";

export const metadata: Metadata = {
  title: "Cases",
  description: casesIntro.meta.description,
};

export default function CasesPage() {
  return (
    <div className="container section">
      <header className="page-intro">
        <GlitchHeading level={1}>{casesIntro.title}</GlitchHeading>
        <p>{casesIntro.body}</p>
      </header>

      <CaseList />
    </div>
  );
}
