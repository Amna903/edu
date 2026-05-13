
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { CheckCircle2, CircleAlert, Lock, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useAuthUser } from "@/hooks/use-auth";

type DiagnosticType = 1 | 2 | 3 | 4 | 5 | 6;
type FlowStep = 1 | 2 | 3 | 4 | 5;

type BlockKind = "none" | "grade" | "guest-limit" | "account-limit" | "teacher-limit";

const O_LEVEL_SUBJECTS = [
  "English Language",
  "English Literature",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Business Studies",
  "Computer Science",
  "Islamiyat",
];

const ATP_SUBJECTS = ["Physics", "Chemistry", "Biology"];

const gradeOptions = [
  "Grade 5 or below",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11 (A-Level Year 1)",
  "Grade 12 (A-Level Year 2)",
  "Other",
];

const typeLabels: Record<DiagnosticType, string> = {
  1: "O-Level Bridge Diagnostic",
  2: "English Level Check",
  3: "O-Level Subject Diagnostic",
  4: "ATP Diagnostic",
  5: "Teacher Subject Knowledge Diagnostic",
  6: "School Class-Level Diagnostic",
};

function parseType(value: string | null): DiagnosticType {
  const numeric = Number(value);
  if (numeric >= 1 && numeric <= 6) {
    return numeric as DiagnosticType;
  }
  return 1;
}

function parseGradeNumber(grade: string): number | null {
  if (grade.startsWith("Grade 5")) return 5;
  const match = grade.match(/Grade\s+(\d+)/);
  if (!match) return null;
  const parsed = Number(match[1]);
  return Number.isFinite(parsed) ? parsed : null;
}

function getEnglishVariantLabel(grade: string): string {
  const gradeNumber = parseGradeNumber(grade);
  if (gradeNumber !== null && gradeNumber <= 7) {
    return "English Level Check - Reading & Vocabulary Assessment";
  }
  return "English Level Check - Language Proficiency Assessment";
}

export default function DiagnosticsStart() {
  const [location, navigate] = useLocation();
  const search = useSearch();
  const { data: user } = useAuthUser();

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const [step, setStep] = useState<FlowStep>(1);
  const [selectedType, setSelectedType] = useState<DiagnosticType>(parseType(searchParams.get("type")));
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [blockKind, setBlockKind] = useState<BlockKind>("none");

  const [showPaidUpsell, setShowPaidUpsell] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    let robotsTag = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const hadRobots = Boolean(robotsTag);
    const previousRobots = robotsTag?.getAttribute("content") || "";

    if (!robotsTag) {
      robotsTag = document.createElement("meta");
      robotsTag.setAttribute("name", "robots");
      document.head.appendChild(robotsTag);
    }

    document.title = "Start Your Free Diagnostic | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Begin your free EduMeUp Cambridge diagnostic. Full detailed report in 40-60 minutes. Grade 6 minimum. Available for O-Level, English Level Check, and ATP subjects.",
      );
    }
    robotsTag.setAttribute("content", "noindex");

    return () => {
      document.title = previousTitle;
      if (metaDescription) {
        metaDescription.setAttribute("content", previousDescription);
      }

      if (robotsTag) {
        if (hadRobots) {
          robotsTag.setAttribute("content", previousRobots);
        } else {
          robotsTag.remove();
        }
      }
    };
  }, []);

  useEffect(() => {
    setSelectedType(parseType(searchParams.get("type")));
  }, [location, searchParams]);

  const isLoggedIn = Boolean(user?.id);
  const isTeacher = user?.role === "teacher";

  const subjectOptions = useMemo(() => {
    if (selectedType === 4) return ATP_SUBJECTS;
    if (selectedType === 2) return [];
    if (selectedType === 1 || selectedType === 3 || selectedType === 5) return O_LEVEL_SUBJECTS;
    return [];
  }, [selectedType]);

  const profileGrade = null as string | null;

  const canProceedStep2 = selectedType >= 1 && selectedType <= 6;
  const canProceedStep3 = selectedType === 2 || selectedType === 6 || subject.trim().length > 0;
  const canProceedStep4 = grade.trim().length > 0 || Boolean(profileGrade);

  const accountKey = user?.id ? `diag_account_free_used_${user.id}` : "";
  const teacherAttemptKey = user?.id ? `diag_teacher_t1_attempts_${user.id}` : "";
  const guestKey = "diag_guest_free_used";

  const checkEligibility = () => {
    setBlockKind("none");
    setShowPaidUpsell(false);

    const gradeValue = profileGrade || grade;
    const gradeNumber = parseGradeNumber(gradeValue);

    if (selectedType !== 5) {
      if (gradeValue === "Other" || gradeNumber === null || gradeNumber < 6) {
        setBlockKind("grade");
        return;
      }
    }

    if (selectedType === 5) {
      const attempts = teacherAttemptKey ? Number(localStorage.getItem(teacherAttemptKey) || "0") : 0;
      if (attempts >= 2) {
        setBlockKind("teacher-limit");
        return;
      }
      return;
    }

    if (isLoggedIn && accountKey) {
      const used = localStorage.getItem(accountKey) === "1";
      if (used) {
        setBlockKind("account-limit");
        setShowPaidUpsell(true);
      }
      return;
    }

    const guestUsed = localStorage.getItem(guestKey) === "1";
    if (guestUsed) {
      setBlockKind("guest-limit");
      setShowPaidUpsell(true);
    }
  };

  const handleContinueFromType = () => {
    if (selectedType === 6) {
      navigate("/contact");
      return;
    }
    setStep(2);
  };

  const handleContinueFromSubject = () => {
    if (selectedType === 2) {
      setStep(3);
      return;
    }
    setStep(3);
  };

  const handleContinueFromGrade = () => {
    checkEligibility();
    setStep(4);
  };

  const handleBegin = () => {
    if (selectedType === 5 && teacherAttemptKey) {
      const attempts = Number(localStorage.getItem(teacherAttemptKey) || "0");
      localStorage.setItem(teacherAttemptKey, String(attempts + 1));
    }

    navigate("/diagnostics/results");
  };

  return (
    <Layout>
     
      <section className="bg-gradient-to-r from-brand-primary-dark via-brand-primary to-brand-primary-dark py-6">
        <div className="container-custom flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">Diagnostic Start Flow</h1>
          <p className="text-sm text-white/80">Step {step} of 5</p>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-custom max-w-4xl">
          <div className="mb-8 h-2 w-full rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-brand-primary transition-all" style={{ width: `${(step / 5) * 100}%` }} />
          </div>

          {step === 1 && (
            <div className="rounded-xl border border-blue-100 p-6">
              <h2 className="text-2xl font-bold text-brand-primary">Select Diagnostic Type</h2>
              <p className="mt-2 text-sm text-slate-600">Choose one of the six diagnostic types.</p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {([1, 2, 3, 4, 5, 6] as const).map((numericId) => {
                  const active = selectedType === numericId;
                  return (
                    <button
                      key={numericId}
                      type="button"
                      onClick={() => setSelectedType(numericId)}
                      className={`rounded-lg border p-4 text-left transition ${
                        active ? "border-brand-primary bg-blue-50/40" : "border-slate-200 hover:border-brand-primary"
                      }`}
                    >
                      <p className="text-xs font-semibold text-brand-primary">TYPE {numericId}</p>
                      <p className="mt-1 text-sm font-semibold text-brand-primary">{typeLabels[numericId]}</p>
                    </button>
                  );
                })}
              </div>
              {selectedType === 5 && (
                <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/30 p-4 text-sm text-slate-700">
                  Teacher Subject Knowledge Diagnostic - For teachers joining the EduMeUp teaching network. This is the T1 Teacher Diagnostic.
                </div>
              )}
              {selectedType === 6 && (
                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                  School Class-Level Diagnostic is arranged via EduMeUp team. You will be redirected to contact.
                </div>
              )}
              <button
                type="button"
                disabled={!canProceedStep2}
                onClick={handleContinueFromType}
                className="mt-6 rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary-dark disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="rounded-xl border border-blue-100 p-6">
              <h2 className="text-2xl font-bold text-brand-primary">Select Subject</h2>
              <p className="mt-2 text-sm text-slate-600">Subject options are based on your selected diagnostic type.</p>

              {selectedType === 2 ? (
                <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50/30 p-4 text-sm text-slate-700">
                  English Level Check does not need subject selection. Continue to grade confirmation.
                </div>
              ) : (
                <div className="mt-5 space-y-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-slate-700">
                    Subject
                  </label>
                  <select
                    id="subject"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm"
                  >
                    <option value="">Select subject</option>
                    {subjectOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700">
                  Back
                </button>
                <button
                  type="button"
                  disabled={!canProceedStep3}
                  onClick={handleContinueFromSubject}
                  className="rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary-dark disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="rounded-xl border border-blue-100 p-6">
              <h2 className="text-2xl font-bold text-brand-primary">Confirm Grade</h2>
              <p className="mt-2 text-sm text-slate-600">Please tell us your current grade or year.</p>

              {isLoggedIn && profileGrade ? (
                <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/30 p-4 text-sm text-slate-700">
                  We will assess you at Grade {profileGrade} level. If this is incorrect, update your profile first.
                </div>
              ) : (
                <div className="mt-5 space-y-2">
                  <label htmlFor="grade" className="text-sm font-semibold text-slate-700">
                    Grade / Year
                  </label>
                  <select
                    id="grade"
                    value={grade}
                    onChange={(event) => setGrade(event.target.value)}
                    className="h-11 w-full rounded-md border border-slate-300 px-3 text-sm"
                  >
                    <option value="">Select grade</option>
                    {gradeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedType === 2 && (grade || profileGrade) && (
                <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50/30 p-4 text-sm text-slate-700">
                  Variant: <strong>{getEnglishVariantLabel(profileGrade || grade)}</strong>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700">
                  Back
                </button>
                <button
                  type="button"
                  disabled={!canProceedStep4}
                  onClick={handleContinueFromGrade}
                  className="rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary-dark disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="rounded-xl border border-blue-100 p-6">
              <h2 className="text-2xl font-bold text-brand-primary">Free Limit Check</h2>
              <p className="mt-2 text-sm text-slate-600">Access eligibility is checked before any diagnostic content is served.</p>

              {blockKind === "none" && (
                <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                  <p className="font-semibold">You are about to start your free full diagnostic.</p>
                  <p className="mt-1">Full detailed report included. Estimated duration: 40-60 minutes.</p>
                </div>
              )}

              {blockKind === "guest-limit" && (
                <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  <p>
                    You have already used your free EduMeUp diagnostic. Sign in or register to access additional subject diagnostics. Each additional subject diagnostic costs $18, or take up to 3 subjects in one session for $30.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href="/register" className="rounded-md bg-brand-primary px-4 py-2 text-xs font-semibold text-white">Register Free</Link>
                    <Link href="/login" className="rounded-md border border-brand-primary px-4 py-2 text-xs font-semibold text-brand-primary">Sign In</Link>
                    <button type="button" onClick={() => setShowPaidUpsell(true)} className="rounded-md border border-brand-primary px-4 py-2 text-xs font-semibold text-brand-primary">View Paid Diagnostic</button>
                  </div>
                  <p className="mt-3 text-xs text-amber-800">
                    We detected you may have already used your free diagnostic on this device. Sign in to confirm your access.
                  </p>
                </div>
              )}

              {blockKind === "account-limit" && (
                <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  <p>
                    You have already used your one free EduMeUp diagnostic. Additional subject diagnostics are available at $18 per subject, or take up to 3 subjects in a single paid session for $30.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button type="button" onClick={() => setShowPaidUpsell(true)} className="rounded-md bg-brand-primary px-4 py-2 text-xs font-semibold text-white">Take Paid Diagnostic -&gt;</button>
                    <Link href="/dashboard/diagnostics" className="rounded-md border border-brand-primary px-4 py-2 text-xs font-semibold text-brand-primary">View Results from Free Diagnostic -&gt;</Link>
                  </div>
                </div>
              )}

              {blockKind === "grade" && (
                <div className="mt-5 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
                  <p>
                    This diagnostic is designed for students from Grade 6 onwards. It sounds like you are in an earlier stage - and that is great! EduMeUp's Lower Secondary courses are built for your level.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href="/programs/bridge-courses" className="rounded-md bg-brand-primary px-4 py-2 text-xs font-semibold text-white">Explore Lower Secondary Courses -&gt;</Link>
                    <Link href="/contact" className="rounded-md border border-brand-primary px-4 py-2 text-xs font-semibold text-brand-primary">Talk to Us -&gt;</Link>
                  </div>
                </div>
              )}

              {blockKind === "teacher-limit" && (
                <div className="mt-5 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
                  <p>
                    You have used both free and resit attempts for the Teacher Subject Knowledge Diagnostic. The EduMeUp Tutor Certification Pathway (T5) will fully prepare you to meet the required standard and qualify as a certified EduMeUp tutor.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link href="/teacher-courses#t5" className="rounded-md bg-brand-primary px-4 py-2 text-xs font-semibold text-white">Learn About T5 Pathway -&gt;</Link>
                    <Link href="/contact" className="rounded-md border border-brand-primary px-4 py-2 text-xs font-semibold text-brand-primary">Talk to Our Team -&gt;</Link>
                  </div>
                </div>
              )}

              {showPaidUpsell && (
                <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/30 p-5">
                  <h3 className="text-lg font-semibold text-brand-primary">You have already used your free EduMeUp diagnostic.</h3>
                  <p className="mt-2 text-sm text-slate-700">
                    Ready to go deeper? Additional subject diagnostics give you the same full detailed report - for any subject you choose.
                  </p>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-slate-200 bg-white p-4">
                      <p className="font-semibold text-brand-primary">Single Subject Diagnostic</p>
                      <p className="mt-2 text-sm text-slate-700">$18 per subject diagnostic. 40-60 minutes. Full detailed report. Topic-by-topic gap analysis. Remedial actions and resource links.</p>
                      <button type="button" className="mt-3 rounded-md bg-brand-primary px-4 py-2 text-xs font-semibold text-white">Choose Subject and Pay $18</button>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-4">
                      <p className="font-semibold text-brand-primary">3-Subject Session - Best Value</p>
                      <p className="mt-2 text-sm text-slate-700">$30 for up to 3 subjects. Reports generated one after another. Full detailed report for each subject.</p>
                      <button type="button" className="mt-3 rounded-md bg-brand-primary px-4 py-2 text-xs font-semibold text-white">Choose 3 Subjects and Pay $30</button>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button type="button" onClick={() => setStep(3)} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700">
                  Back
                </button>
                {blockKind === "none" && (
                  <button type="button" onClick={() => setStep(5)} className="rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary-dark">
                    Continue
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="rounded-xl border border-blue-100 p-6">
              <h2 className="text-2xl font-bold text-brand-primary">Start Confirmation</h2>
              <div className="mt-5 space-y-3 rounded-lg border border-blue-100 bg-blue-50/30 p-4 text-sm text-slate-700">
                <p>
                  <strong>Diagnostic Type:</strong> {typeLabels[selectedType]}
                </p>
                {selectedType !== 2 && selectedType !== 6 && (
                  <p>
                    <strong>Subject:</strong> {subject}
                  </p>
                )}
                <p>
                  <strong>Estimated Duration:</strong> 40-60 minutes
                </p>
                <p>
                  <strong>Report Includes:</strong> score, topic-by-topic gap analysis, recommended next steps, and remedial actions.
                </p>
                {selectedType === 2 && (
                  <p>
                    <strong>English Variant:</strong> {getEnglishVariantLabel(profileGrade || grade)}
                  </p>
                )}
              </div>

              <div className="mt-4 rounded-lg border border-slate-200 p-4 text-sm text-slate-700">
                <p>Find a quiet place and allow the full time.</p>
                <p className="mt-1">Your results will appear immediately on completion.</p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button type="button" onClick={() => setStep(4)} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700">
                  Back
                </button>
                <button type="button" onClick={handleBegin} className="rounded-lg bg-brand-primary px-7 py-3 text-sm font-semibold text-white hover:bg-brand-primary-dark">
                  Begin Diagnostic
                </button>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-slate-200 p-4 text-sm text-slate-700">
                  <div className="mb-2 flex items-center gap-2 font-semibold text-brand-primary">
                    <ShieldCheck className="h-4 w-4" />
                    During the Diagnostic
                  </div>
                  <ul className="space-y-1">
                    <li>Progress bar with percentage completion.</li>
                    <li>Timer with 30-minute soft reminder.</li>
                    <li>Forward-only flow. Answers saved immediately.</li>
                    <li>Auto-save to support resume on interruption.</li>
                    <li>Mobile-friendly controls and readable text.</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-slate-200 p-4 text-sm text-slate-700">
                  <div className="mb-2 flex items-center gap-2 font-semibold text-brand-primary">
                    <Lock className="h-4 w-4" />
                    Access Rules Applied
                  </div>
                  <ul className="space-y-1">
                    <li>One free diagnostic per guest IP or registered account.</li>
                    <li>Grade 6 minimum enforced before entry.</li>
                    <li>English Level Check routes by grade automatically.</li>
                    <li>School class-level diagnostic is contact-arranged.</li>
                    <li>Teacher T1 first attempt free, resit applies when needed.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {selectedType === 5 && !isTeacher && isLoggedIn && (
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <div className="flex items-start gap-2">
                <CircleAlert className="mt-0.5 h-4 w-4" />
                <p>
                  You are signed in with role <strong>{user?.role}</strong>. Teacher diagnostic is intended for teachers applying to the EduMeUp tutor network.
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 rounded-lg border border-blue-100 bg-white p-4 text-sm text-slate-600">
            <div className="flex items-center gap-2 text-brand-primary">
              <CheckCircle2 className="h-4 w-4 text-brand-primary" />
              This start flow enforces the Grade 6 minimum, free-limit policy, and English grade-based routing before diagnostic content begins.
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

