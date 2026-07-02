import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function DashboardHero(props: {
  eyebrow: string;
  title: string;
  description: string;
  right?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <Card className="overflow-hidden rounded-3xl border-0 bg-[radial-gradient(circle_at_top,_rgba(35,102,201,0.16),_transparent_50%),linear-gradient(135deg,#ffffff,#f8fbff)] shadow-xl">
      <CardContent className="grid gap-4 p-5 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">{props.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">{props.title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{props.description}</p>
          {props.actions ? <div className="mt-4">{props.actions}</div> : null}
        </div>
        {props.right ? <div className="grid grid-cols-2 gap-3">{props.right}</div> : null}
      </CardContent>
    </Card>
  );
}

export function KpiCard(props: {
  label: string;
  value: ReactNode;
  tone?: "blue" | "emerald" | "amber" | "violet" | "slate";
  helper?: string;
}) {
  const toneClass =
    props.tone === "emerald"
      ? "border-emerald-100 bg-emerald-50/60"
      : props.tone === "amber"
        ? "border-amber-100 bg-amber-50/60"
        : props.tone === "violet"
          ? "border-violet-100 bg-violet-50/60"
          : props.tone === "slate"
            ? "border-slate-200 bg-white"
            : "border-blue-100 bg-blue-50/60";

  return (
    <Card className={`shadow-sm ${toneClass}`}>
      <CardContent className="p-5">
        <p className="text-sm font-semibold text-slate-600">{props.label}</p>
        <p className="mt-2 text-3xl font-black text-slate-900">{props.value}</p>
        {props.helper ? <p className="mt-1 text-xs text-slate-500">{props.helper}</p> : null}
      </CardContent>
    </Card>
  );
}

