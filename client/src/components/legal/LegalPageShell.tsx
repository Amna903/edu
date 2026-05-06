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
      <section className="bg-[#2366c9] py-16 text-white md:py-24">
        <div className="container-custom max-w-5xl">
          <p className="text-sm font-semibold uppercase text-blue-100">EduMeUp.com</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-white md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-blue-50">{documentTitle}</p>
        </div>
      </section>

      <section className="bg-white pb-16 md:pb-24">
        <div className="container-custom max-w-5xl space-y-6">{children}</div>
      </section>
    </Layout>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-blue-100 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700">{children}</div>
    </section>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2366c9]" />
          <span>{item}</span>
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
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full min-w-[720px]">
        <thead>
          <tr className="bg-[#2366c9] text-left text-white">
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 text-xs font-semibold uppercase">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-t border-slate-200">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 align-top text-sm text-slate-700">
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
