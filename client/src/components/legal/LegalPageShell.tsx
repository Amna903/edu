import { useEffect, type ReactNode } from "react";
import { Layout } from "@/components/Layout";

type LegalPageShellProps = {
  title: string;
  documentTitle: string;
  description: string;
  children: ReactNode;
};

export function LegalPageShell({ title, documentTitle, description, children }: LegalPageShellProps) {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = `${title} | EduMeUp`;
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription) {
        metaDescription.setAttribute("content", previousDescription);
      }
    };
  }, [description, title]);

  return (
    <Layout>
      <section className="bg-brand-primary py-16 text-white md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        <div className="container-custom max-w-5xl relative z-10">
          <p className="text-xs font-bold uppercase tracking-widest text-white/70">EduMeUp.com</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl tracking-tight">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/80">{documentTitle}</p>
        </div>
      </section>

      <section className="bg-white pb-16 md:pb-24 pt-12">
        <div className="container-custom max-w-5xl space-y-8">{children}</div>
      </section>
    </Layout>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-2xl font-bold text-brand-navy">{title}</h2>
      <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">{children}</div>
    </section>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex gap-4">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" />
          <span className="text-slate-600">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LegalTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
      <table className="w-full min-w-[720px]">
        <thead>
          <tr className="bg-brand-primary text-left text-white">
            {headers.map((header) => (
              <th key={header} className="px-6 py-4 text-xs font-bold uppercase tracking-widest">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={`border-t border-slate-200 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-6 py-4 align-top text-sm text-slate-600 leading-relaxed">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
