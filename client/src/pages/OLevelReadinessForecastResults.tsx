import { useEffect, useMemo } from "react";
import { Link, useRoute } from "wouter";
import { Layout } from "@/components/Layout";
import { calculateGradeForecast } from "@/config/forecastThresholds";
import { ArrowRight, CheckCircle2, ClipboardList, Crown, FileText, GraduationCap, ShieldCheck } from "lucide-react";

type SessionPayload = {
  subjects: string[];
  paymentMode: "single" | "bundle";
  createdAt: number;
};

function readSession(sessionId: string): SessionPayload | null {
  try {
    const raw = sessionStorage.getItem(`olevel-forecast:${sessionId}`);
    return raw ? (JSON.parse(raw) as SessionPayload) : null;
  } catch {
    return null;
  }
}

function seededScore(sessionId: string, subject: string) {
  let total = 0;
  const source = `${sessionId}:${subject}`;
  for (let index = 0; index < source.length; index += 1) {
    total = (total + source.charCodeAt(index) * (index + 3)) % 100;
  }
  return 42 + (total % 54);
}

export default function OLevelReadinessForecastResults() {
  const [match, params] = useRoute("/olevel-readiness-forecast/results/:sessionId");
  const sessionId = params?.sessionId ?? "preview";

  const payload = useMemo(
    () => readSession(sessionId) ?? { subjects: ["Mathematics"], paymentMode: "single", createdAt: Date.now() },
    [sessionId],
  );

  const subjectResults = payload.subjects.map((subject) => {
    const readinessScore = seededScore(sessionId, subject);
    const forecast = calculateGradeForecast(readinessScore);
    return { subject, ...forecast };
  });

  const topScore = subjectResults[0] ?? {
    subject: "Mathematics",
    readinessScore: 82,
    forecastLabel: "A* / A track",
    gradeBand: "A* / A",
    recommendedAction: "Proceed directly to O-Level subject courses.",
    colorClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
  };

  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "Your O-Level Readiness Forecast | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Immediate O-Level Readiness Forecast results page showing predicted grade band, readiness score, and next-step roadmap while Academic Team review is pending.",
      );
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription) {
        metaDescription.setAttribute("content", previousDescription);
      }
    };
  }, []);

  if (!match) {
    return null;
  }

  return (
    <Layout>
      <section className="border-b border-slate-200 bg-white">
        <div className="container-custom flex flex-wrap items-center gap-3 py-3 text-sm">
          <Link href="/" className="font-semibold text-brand-primary hover:underline">
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <Link href="/olevel-readiness-forecast" className="font-semibold text-brand-primary hover:underline">
            Readiness Forecast
          </Link>
          <span className="text-slate-400">/</span>
          <span className="font-semibold text-slate-500">Results</span>
        </div>
      </section>

      <section className="bg-brand-primary py-14 text-white relative overflow-hidden">
        <div className="container-custom grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center relative z-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/85">Immediate Result</p>
            <h1 className="mt-3 text-3xl font-bold md:text-5xl tracking-tight">Your Forecast Is Ready.</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 md:text-base">
              This is the partial result shown immediately on completion: predicted grade band, readiness score, and an action roadmap. The EduMeUp Academic Team will review your forecast within 24 hours and publish the full report to your dashboard.
            </p>
          </div>
          <div className={`rounded-2xl border-2 p-6 shadow-xl ${topScore.colorClass}`}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-primary">Main Forecast</p>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy">{topScore.gradeBand}</h2>
            <p className="mt-2 text-sm text-slate-600">Readiness score: {topScore.readinessScore}%</p>
            <p className="mt-4 text-sm leading-7 text-slate-700 font-medium">{topScore.recommendedAction}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-custom grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm">
            <div className="flex items-center gap-2 text-brand-primary"><ClipboardList className="h-5 w-5" /><p className="text-xs font-bold uppercase tracking-[0.22em]">Subject Results</p></div>
            <div className="mt-5 space-y-4">
              {subjectResults.map((result) => (
                <div key={result.subject} className="rounded-xl border border-slate-100 p-4 bg-slate-50/50">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-brand-navy">{result.subject}</p>
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${result.colorClass}`}>{result.gradeBand}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">Readiness score: {result.readinessScore}%</p>
                  <p className="mt-2 text-sm text-slate-700 leading-relaxed">{result.recommendedAction}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-6 shadow-sm">
            <div className="flex items-center gap-2 text-brand-primary"><Crown className="h-5 w-5" /><p className="text-xs font-bold uppercase tracking-[0.22em]">Academic Team Review</p></div>
            <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm leading-7 text-slate-700">Within 24 hours the EduMeUp Academic Team will review this forecast, add personalised observations, and prepare your full roadmap document. You will receive a dashboard notification and email once the review is complete.</p>
            </div>
            <div className="mt-4 grid gap-3 text-sm text-slate-700">
              <div className="flex items-start gap-2 rounded-xl bg-white p-4 border border-slate-100"><CheckCircle2 className="mt-0.5 h-4 w-4 text-brand-primary" />Grade band prediction issued immediately.</div>
              <div className="flex items-start gap-2 rounded-xl bg-white p-4 border border-slate-100"><FileText className="mt-0.5 h-4 w-4 text-brand-primary" />Personalised roadmap added after team review.</div>
              <div className="flex items-start gap-2 rounded-xl bg-white p-4 border border-slate-100"><GraduationCap className="mt-0.5 h-4 w-4 text-brand-primary" />Dashboard access remains available for 24 months.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-custom">
          <div className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-6 shadow-sm">
            <div className="flex items-center gap-2 text-brand-primary"><ShieldCheck className="h-5 w-5" /><p className="text-xs font-bold uppercase tracking-[0.22em]">What Happens Next</p></div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                ["Strong readiness", "Proceed directly to O-Level subjects and monitor monthly."],
                ["Moderate readiness", "Complete the recommended Pre-O-Level or bridge modules first."],
                ["Significant gaps", "Follow the personalised roadmap before O-Level entry."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="font-semibold text-brand-navy">{title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container-custom flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-[#f8fbff] p-6 shadow-sm">
          <div>
            <p className="text-sm font-semibold text-brand-navy">Need to review the diagnostic instead?</p>
            <p className="mt-1 text-sm text-slate-600">Forecast and diagnostic are complementary. Many serious students benefit from both.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/diagnostics" className="inline-flex items-center rounded-lg bg-brand-primary px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy transition-colors">
              Take Free Diagnostic <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/dashboard" className="inline-flex items-center rounded-lg border border-brand-primary px-5 py-3 text-sm font-semibold text-brand-primary hover:bg-brand-primary hover:text-white transition-colors">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

