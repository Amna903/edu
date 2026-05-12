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
      <section className="border-b border-[#dbe4ef] bg-white">
        <div className="container-custom flex flex-wrap items-center gap-3 py-3 text-sm">
          <Link href="/" className="font-semibold text-[#2366c9] hover:underline">
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <Link href="/olevel-readiness-forecast" className="font-semibold text-[#2366c9] hover:underline">
            Readiness Forecast
          </Link>
          <span className="text-slate-400">/</span>
          <span className="font-semibold text-slate-500">Start</span>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#2366c9] via-[#4f86e0] to-[#2366c9] py-12 text-white">
        <div className="container-custom grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/85">Start Flow</p>
            <h1 className="mt-3 text-3xl font-bold md:text-5xl">Choose Your Subjects. Confirm Your Session. Launch the Forecast.</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 md:text-base">
              The Forecast is a certification assessment, not a course. Subject selection and payment processing happen before the assessment begins.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2">{forecastPricing.sessionMinutesPerSubjectMin}-{forecastPricing.sessionMinutesPerSubjectMax} minutes per subject</div>
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2">Academic Team review within {forecastPricing.reportWindowHours} hours</div>
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2">Result delivered to dashboard</div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white p-6 text-[#2366c9] shadow-lg">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2366c9]">Forecast Preview</p>
            <div className={`mt-4 rounded-xl border p-4 ${forecastPreview.colorClass}`}>
              <p className="text-sm font-semibold">Readiness score preview</p>
              <p className="mt-1 text-3xl font-bold">{forecastPreview.readinessScore}%</p>
              <p className="mt-2 text-sm">{forecastPreview.gradeBand}</p>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">{forecastPreview.recommendedAction}</p>
            <div className="mt-5 grid gap-3 text-sm">
              <div className="flex items-start gap-2 rounded-lg bg-[#eef6ff] p-3"><ShieldCheck className="mt-0.5 h-4 w-4 text-[#2366c9]" />Your report is reviewed by the EduMeUp Academic Team.</div>
              <div className="flex items-start gap-2 rounded-lg bg-[#eef6ff] p-3"><CreditCard className="mt-0.5 h-4 w-4 text-[#2366c9]" />Pricing is confirmed before checkout.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-custom grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-[#dbe4ef] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2366c9]">1. Choose Subjects</p>
            <h2 className="mt-3 text-2xl font-bold text-[#2366c9]">Select up to 3 subjects</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">Choose the subject or subjects you want forecasted. The system is designed for one subject or a 3-subject session.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {SUBJECTS.map((subject) => {
                const active = selectedSubjects.includes(subject);
                return (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => toggleSubject(subject)}
                    className={`rounded-xl border p-4 text-left transition ${active ? "border-[#2366c9] bg-[#eef6ff]" : "border-slate-200 hover:border-[#2366c9]"}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-[#2366c9]">{subject}</span>
                      {active && <CheckCircle2 className="h-4 w-4 text-[#2366c9]" />}
                    </div>
                    <p className="mt-2 text-xs text-slate-500">Predictive grade band issued on completion.</p>
                  </button>
                );
              })}
            </div>
            <div className="mt-5 rounded-xl bg-[#eef6ff] p-4 text-sm leading-7 text-slate-700">
              You have selected {activeCount} subject{activeCount === 1 ? "" : "s"}. If you do not choose a subject, the first subject in the list is used as the default.
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-[#dbe4ef] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2366c9]">2. Payment Mode</p>
              <div className="mt-4 grid gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMode("single");
                    setDuration("60-90");
                  }}
                  className={`rounded-xl border p-4 text-left ${paymentMode === "single" ? "border-[#2366c9] bg-[#eef6ff]" : "border-slate-200"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#2366c9]">Single Subject Forecast</span>
                    <span className="font-bold text-[#2366c9]">${forecastPricing.singleSubject}</span>
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
                  className={`rounded-xl border p-4 text-left ${paymentMode === "bundle" ? "border-[#2366c9] bg-[#eef6ff]" : "border-slate-200"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#2366c9]">3-Subject Session</span>
                    <span className="font-bold text-[#2366c9]">${forecastPricing.threeSubjects}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">Best value. Three subjects in one session. Save ${forecastPricing.savings}.</p>
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-[#dbe4ef] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2366c9]">3. Before You Start</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                <li className="flex items-start gap-2"><ListChecks className="mt-1 h-4 w-4 shrink-0 text-[#2366c9]" />The Forecast runs for 60-90 minutes per subject.</li>
                <li className="flex items-start gap-2"><ListChecks className="mt-1 h-4 w-4 shrink-0 text-[#2366c9]" />Results appear immediately after completion.</li>
                <li className="flex items-start gap-2"><ListChecks className="mt-1 h-4 w-4 shrink-0 text-[#2366c9]" />The Academic Team review follows within 24 hours.</li>
                <li className="flex items-start gap-2"><ListChecks className="mt-1 h-4 w-4 shrink-0 text-[#2366c9]" />A dashboard copy of the report stays available for 24 months.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef6ff] py-14">
        <div className="container-custom grid gap-6 md:grid-cols-5">
          {[
            ["1", "Choose", "Select 1 or 3 subjects."],
            ["2", "Pay", `Confirm ${paymentMode === "bundle" ? "bundle" : "single"} pricing.`],
            ["3", "Assess", `Complete ${duration === "60-90" ? "60-90" : "180-270"} minutes per subject.`],
            ["4", "Review", "Academic Team reviews your forecast."],
            ["5", "Report", "Receive your roadmap in dashboard and email."],
          ].map(([step, title, body]) => (
            <div key={step} className="rounded-2xl border border-[#dbe4ef] bg-white p-5 shadow-sm">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#2366c9] text-white font-bold">{step}</div>
              <h3 className="mt-4 text-center font-semibold text-[#2366c9]">{title}</h3>
              <p className="mt-2 text-center text-sm leading-7 text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container-custom grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="rounded-2xl border border-[#dbe4ef] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2366c9]">Forecast Thresholds</p>
            <div className="mt-4 space-y-3">
              {forecastThresholds.map((band) => (
                <div key={band.gradeBand} className={`rounded-xl border p-4 ${band.colorClass}`}>
                  <p className="text-sm font-semibold">{band.gradeBand}</p>
                  <p className="text-xs opacity-80">{band.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#dbe4ef] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2366c9]">Start Now</p>
            <h2 className="mt-3 text-2xl font-bold text-[#2366c9]">You are one decision away from seeing your trajectory.</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">The Forecast is waiting. The next step is straightforward.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="button" onClick={beginForecast} className="bg-[#2366c9] px-6 py-3 text-white hover:bg-[#1a4fa0]">
                Begin Forecast <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/diagnostics" className="inline-flex items-center rounded-lg border border-[#2366c9] px-6 py-3 text-sm font-semibold text-[#2366c9]">
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
