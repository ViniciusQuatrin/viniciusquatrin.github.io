import { CaseCard } from "@/components/CaseCard";
import { cases, externalCases } from "@/content/cases";

/** /cases grid: 4 internal cases (3 cover + FOCO), then external ones (xv). */
export function CaseList() {
  return (
    <div className="case-grid">
      {cases.map((item) => (
        <CaseCard
          key={item.slug}
          id={`case-${item.slug}`}
          title={item.title}
          eyebrow={item.listType}
          summary={item.listResult}
          link={{
            href: `/cases/${item.slug}`,
            label: item.externalUrl ? "Ver case" : "Abrir case",
          }}
          secondaryLinks={
            item.externalUrl
              ? [{ href: item.externalUrl, label: "Abrir app" }]
              : undefined
          }
        />
      ))}
      {externalCases.map((item) => (
        <CaseCard
          key={item.id}
          id={`case-${item.id}`}
          title={item.title}
          eyebrow={item.badge}
          badge
          summary={item.summary}
          meta={item.stack}
          link={{
            href: item.href,
            label: item.linkLabel,
            ariaLabel: item.ariaLabel,
            icon: item.icon,
          }}
        />
      ))}
    </div>
  );
}
