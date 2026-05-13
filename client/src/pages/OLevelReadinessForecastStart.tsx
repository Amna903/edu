import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { forecastPricing } from "@/config/forecastPricing";
import { forecastThresholds, calculateGradeForecast } from "@/config/forecastThresholds";
import { ArrowRight, CheckCircle2, CreditCard, ListChecks, ShieldCheck } from "lucide-react";

const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Business Studies",
  "English Language",
  "Urdu",
  "Islamiyat",
  "Pakistan Studies",
];

type SessionPayload = {
  subjects: string[];
  paymentMode: "single" | "bundle";
  createdAt: number;
};

function makeSessionId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `forecast-${Date.now()}`;
}

export default function OLevelReadinessForecastStart() {
  const [location, navigate] = useLocation();
  const search = useSearch();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [paymentMode, setPaymentMode] = useState<"single" | "bundle">("single");
  const [duration, setDuration] = useState<"60-90" | "180-270">("60-90");

  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "Start Your O-Level Readiness Forecast | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Choose your subjects and payment mode to start the EduMeUp O-Level Readiness Forecast. Subject selection and payment confirmation happen before the assessment begins.",
      );
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription) {
        metaDescription.setAttribute("content", previousDescription);
      }
    };
  }, []);

  useEffect(() => {
    const mode = params.get("mode");
    if (mode === "3") {
      setPaymentMode("bundle");
      setDuration("180-270");
      setSelectedSubjects(SUBJECTS.slice(0, 3));
    }
  }, [location, params]);

  const activeCount = selectedSubjects.length || (paymentMode === "bundle" ? 3 : 1);
  const forecastPreview = calculateGradeForecast(paymentMode === "bundle" ? 74 : 82);

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((current) => {
      if (current.includes(subject)) {
        return current.filter((item) => item !== subject);
      }

      if (current.length >= 3) {
        return current;
      }

      return [...current, subject];
    });
  };

  const beginForecast = () => {
    const sessionId = makeSessionId();
    const payload: SessionPayload = {
      subjects: selectedSubjects.length > 0 ? selectedSubjects : SUBJECTS.slice(0, paymentMode === "bundle" ? 3 : 1),
      paymentMode,
      createdAt: Date.now(),
    };

    sessionStorage.setItem(`olevel-forecast:${sessionId}`, JSON.stringify(payload));
    navigate(`/olevel-readiness-forecast/results/${sessionId}`);
  };

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
          <span className="font-semibold text-slate-500">Start</span>
        </div>
      </section>

      <section className="bg-brand-primary py-12 text-white relative overflow-hidden">
        <div className="container-custom grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center relative z-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/85">Start Flow</p>
            <h1 className="mt-3 text-3xl font-bold md:text-5xl tracking-tight leading-tight">Choose Your Subjects. Confirm Your Session. Launch the Forecast.</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 md:text-base">
              The Forecast is a certification assessment, not a course. Subject selection and payment processing happen before the assessment begins.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2">{forecastPricing.sessionMinutesPerSubjectMin}-{forecastPricing.sessionMinutesPerSubjectMax} minutes per subject</div>
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2">Academic Team review within {forecastPricing.reportWindowHours} hours</div>
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2">Result delivered to dashboard</div>
            </div>
          </div>
          <div className="rounded-2xl border-2 border-white/10 bg-white p-6 shadow-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">Forecast Preview</p>
            <div className={`mt-4 rounded-xl border p-4 ${forecastPreview.colorClass}`}>
              <p className="text-sm font-semibold">Readiness score preview</p>
              <p className="mt-1 text-3xl font-bold text-brand-navy">{forecastPreview.readinessScore}%</p>
              <p className="mt-2 text-sm font-medium">{forecastPreview.gradeBand}</p>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{forecastPreview.recommendedAction}</p>
            <div className="mt-5 grid gap-3 text-sm">
              <div className="flex items-start gap-2 rounded-lg bg-[#f8fbff] p-3 border border-slate-100"><ShieldCheck className="mt-0.5 h-4 w-4 text-brand-primary" />Your report is reviewed by the EduMeUp Academic Team.</div>
              <div className="flex items-start gap-2 rounded-lg bg-[#f8fbff] p-3 border border-slate-100"><CreditCard className="mt-0.5 h-4 w-4 text-brand-primary" />Pricing is confirmed before checkout.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-custom grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-primary">1. Choose Subjects</p>
            <h2 className="mt-3 text-2xl font-bold text-brand-navy">Select up to 3 subjects</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">Choose the subject or subjects you want forecasted. The system is designed for one subject or a 3-subject session.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {SUBJECTS.map((subject) => {
                const active = selectedSubjects.includes(subject);
                return (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => toggleSubject(subject)}
                    className={`rounded-xl border p-4 text-left transition shadow-sm ${active ? "border-brand-primary bg-[#f8fbff]" : "border-slate-200 hover:border-brand-primary"}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-brand-navy">{subject}</span>
                      {active && <CheckCircle2 className="h-4 w-4 text-brand-primary" />}
                    </div>
                    <p className="mt-2 text-xs text-slate-500">Predictive grade band issued on completion.</p>
                  </button>
                );
              })}
            </div>
            <div className="mt-5 rounded-xl bg-[#f8fbff] border border-slate-100 p-4 text-sm leading-7 text-slate-700">
              You have selected <span className="font-bold text-brand-primary">{activeCount}</span> subject{activeCount === 1 ? "" : "s"}. If you do not choose a subject, the first subject in the list is used as the default.
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-primary">2. Payment Mode</p>
              <div className="mt-4 grid gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMode("single");
                    setDuration("60-90");
                  }}
                  className={`rounded-xl border p-4 text-left transition shadow-sm ${paymentMode === "single" ? "border-brand-primary bg-[#f8fbff]" : "border-slate-200"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-brand-navy">Single Subject Forecast</span>
                    <span className="font-bold text-brand-primary">${forecastPricing.singleSubject}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">One subject. Complete grade forecast. Best for students who want a precise starting point.</p>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMode("bundle");
                    setDuration("180-270");
                    setSelectedSubjects((current) => (current.length > 0 ? current.slice(0, 3) : SUBJECTS.slice(0, 3)));
                  }}
                  className={`rounded-xl border p-4 text-left transition shadow-sm ${paymentMode === "bundle" ? "border-brand-primary bg-[#f8fbff]" : "border-slate-200"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-brand-navy">3-Subject Session</span>
                    <span className="font-bold text-brand-primary">${forecastPricing.threeSubjects}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">Best value. Three subjects in one session. Save ${forecastPricing.savings}.</p>
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 bg-[#f8fbff] shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-primary">3. Before You Start</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                <li className="flex items-start gap-2"><ListChecks className="mt-1 h-4 w-4 shrink-0 text-brand-primary" />The Forecast runs for 60-90 minutes per subject.</li>
                <li className="flex items-start gap-2"><ListChecks className="mt-1 h-4 w-4 shrink-0 text-brand-primary" />Results appear immediately after completion.</li>
                <li className="flex items-start gap-2"><ListChecks className="mt-1 h-4 w-4 shrink-0 text-brand-primary" />The Academic Team review follows within 24 hours.</li>
                <li className="flex items-start gap-2"><ListChecks className="mt-1 h-4 w-4 shrink-0 text-brand-primary" />A dashboard copy of the report stays available for 24 months.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fbff]/50 py-14">
        <div className="container-custom grid gap-6 md:grid-cols-5">
          {[
            ["1", "Choose", "Select 1 or 3 subjects."],
            ["2", "Pay", `Confirm ${paymentMode === "bundle" ? "bundle" : "single"} pricing.`],
            ["3", "Assess", `Complete ${duration === "60-90" ? "60-90" : "180-270"} minutes per subject.`],
            ["4", "Review", "Academic Team reviews your forecast."],
            ["5", "Report", "Receive your roadmap in dashboard and email."],
          ].map(([step, title, body]) => (
            <div key={step} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-white font-bold">{step}</div>
              <h3 className="mt-4 text-center font-semibold text-brand-navy">{title}</h3>
              <p className="mt-2 text-center text-sm leading-7 text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-custom grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50/50">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-primary">Forecast Thresholds</p>
            <div className="mt-4 space-y-3">
              {forecastThresholds.map((band) => (
                <div key={band.gradeBand} className={`rounded-xl border shadow-sm p-4 ${band.colorClass}`}>
                  <p className="text-sm font-semibold">{band.gradeBand}</p>
                  <p className="text-xs opacity-80">{band.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-primary">Start Now</p>
            <h2 className="mt-3 text-2xl font-bold text-brand-navy">You are one decision away from seeing your trajectory.</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">The Forecast is waiting. The next step is straightforward.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="button" onClick={beginForecast} className="bg-brand-primary px-6 py-3 text-white hover:bg-brand-navy">
                Begin Forecast <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/diagnostics" className="inline-flex items-center rounded-lg border border-brand-primary px-6 py-3 text-sm font-semibold text-brand-primary hover:bg-brand-primary hover:text-white transition-colors">
                Take Free Diagnostic First
              </Link>
            </div>
            <p className="mt-4 text-xs leading-6 text-slate-500">Pricing shown here is the recommended production configuration and can be updated centrally without changing the page layout.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

