import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, CheckCircle2, Copy, AlertCircle, Lock } from "lucide-react";
import { useScholarshipApply, useScholarshipEligibility } from "@/hooks/use-scholarship";
import { saveScholarshipToStorage } from "@/lib/scholarship-storage";
import { Link } from "wouter";
import { useAuthUser } from "@/hooks/use-auth";
import { SCHOLARSHIP_COUNTRY_OPTIONS } from "@shared/scholarship-concessions";

const GRADE_OPTIONS = [
  "Grade 8",
  "O-Level Year 1",
  "O-Level Year 2",
  "Other",
] as const;

export function ScholarshipApplicationForm() {
  const { data: user, isLoading: authLoading } = useAuthUser();
  const { data: eligibility, isLoading: eligibilityLoading } = useScholarshipEligibility(!!user);
  const apply = useScholarshipApply();
  const [country, setCountry] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const [copied, setCopied] = useState(false);

  const verifiedCountry = eligibility?.eligible ? eligibility.country : null;

  useEffect(() => {
    if (verifiedCountry) {
      setCountry(verifiedCountry);
    }
  }, [verifiedCountry]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!declarationAccepted || !user) return;

    try {
      const result = await apply.mutateAsync({
        gradeLevel,
        declarationAccepted: true,
      });

      saveScholarshipToStorage({
        code: result.code,
        country: result.country,
        concessionPercent: result.concessionPercent,
        region: result.region,
        email: user.email ?? "",
        expiresAt: result.expiresAt,
      });
    } catch {
      // Error shown via apply.isError
    }
  };

  const handleCopy = async () => {
    if (!apply.data?.code) return;
    await navigator.clipboard.writeText(apply.data.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (authLoading) {
    return (
      <div className="bg-white p-10 rounded-[32px] border border-slate-100 text-center text-slate-500">
        Loading your account…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white p-10 rounded-[32px] shadow-xl border border-slate-100 relative z-10 text-center">
        <Lock className="w-10 h-10 text-brand-primary mx-auto mb-4" />
        <h3 className="font-bold text-brand-navy text-xl mb-2">Log in to verify your country</h3>
        <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
          Scholarships are tied to the country on your EduMeUp account (set at registration). You
          cannot choose a different country on this form — this prevents sharing codes with people
          in other countries.
        </p>
        <Link href="/login?return=/pricing">
          <Button className="bg-brand-primary hover:bg-brand-navy text-white">
            Log in or register
          </Button>
        </Link>
      </div>
    );
  }

  if (eligibilityLoading) {
    return (
      <div className="bg-white p-10 rounded-[32px] border border-slate-100 text-center text-slate-500">
        Checking eligibility for your account country…
      </div>
    );
  }

  if (eligibility && !eligibility.eligible) {
    return (
      <div className="bg-white p-10 rounded-[32px] border border-amber-100 relative z-10">
        <div className="flex items-start gap-3 text-amber-800 mb-4">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <div>
            <h3 className="font-bold text-brand-navy text-lg">Not eligible on this account</h3>
            <p className="text-sm text-slate-600 mt-2">
              {eligibility.message ||
                "Your profile country is not on the scholarship list, or no country is saved."}
            </p>
            {eligibility.country && (
              <p className="text-sm text-slate-500 mt-2">
                Country on profile: <strong>{eligibility.country}</strong>
              </p>
            )}
            <p className="text-sm text-slate-500 mt-4">
              If you registered with the wrong country, update it in your{" "}
              <Link href="/dashboard" className="text-brand-primary underline font-medium">
                profile settings
              </Link>{" "}
              before applying. The concession only applies if your account country matches an
              eligible country.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (apply.isSuccess && apply.data) {
    const expiryLabel = new Date(apply.data.expiresAt).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <ScholarshipSuccessCard
        country={apply.data.country}
        percent={apply.data.concessionPercent}
        code={apply.data.code}
        expiryLabel={expiryLabel}
        copied={copied}
        onCopy={handleCopy}
      />
    );
  }

  const accountCountry = eligibility?.country ?? country ?? "your country";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-10 rounded-[32px] shadow-2xl shadow-slate-200/50 border border-slate-100 relative z-10"
    >
      <h3 className="font-bold text-brand-navy mb-2 text-xl flex items-center gap-3">
        <GraduationCap className="w-6 h-6 text-brand-primary" />
        Scholarship Application Form
      </h3>
      <p className="text-sm text-slate-500 mb-6">
        Concession is verified from the country on your EduMeUp account. It must match your
        registration/profile when you pay.
      </p>

      <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 grid gap-3 sm:grid-cols-2 text-sm">
        <div>
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Account</span>
          <p className="font-semibold text-brand-navy">{user.fullname || user.username}</p>
        </div>
        <div>
          <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Email</span>
          <p className="font-semibold text-brand-navy">{user.email || "—"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
            Country
          </label>
          <select
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            disabled={Boolean(verifiedCountry)}
            className="w-full h-14 px-6 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all text-brand-navy font-bold bg-white disabled:bg-slate-100 disabled:cursor-not-allowed"
          >
            <option value="">Select country...</option>
            {SCHOLARSHIP_COUNTRY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {verifiedCountry && (
            <p className="text-xs text-slate-500">
              Locked to your account country. Update your profile if this is incorrect.
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">
            Current Grade
          </label>
          <select
            required
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
            className="w-full h-14 px-6 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary outline-none transition-all text-brand-navy font-bold bg-white"
          >
            <option value="">Select class...</option>
            {GRADE_OPTIONS.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <label className="flex items-start gap-4 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={declarationAccepted}
            onChange={(e) => setDeclarationAccepted(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
          />
          <span className="text-sm text-slate-600 font-medium leading-relaxed">
            I confirm that I am genuinely unable to pay the full course price, that I live in{" "}
            {accountCountry}, and that I am applying in good faith.
          </span>
        </label>
      </div>

      {apply.isError && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{apply.error instanceof Error ? apply.error.message : "Application failed"}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={apply.isPending || !declarationAccepted}
        className="w-full h-16 text-lg font-bold bg-brand-primary hover:bg-brand-navy text-white rounded-2xl transition-all shadow-xl shadow-brand-primary/20 uppercase tracking-widest"
      >
        {apply.isPending ? "Verifying account…" : "Verify & get my code"}
      </Button>
    </form>
  );
}

function ScholarshipSuccessCard(props: {
  country: string;
  percent: number;
  code: string;
  expiryLabel: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="bg-white p-10 rounded-[32px] shadow-2xl shadow-slate-200/50 border border-emerald-100 relative z-10">
      <div className="flex items-center gap-3 text-emerald-700 mb-4">
        <CheckCircle2 className="w-8 h-8" />
        <h3 className="font-bold text-brand-navy text-xl">Verified for your account</h3>
      </div>
      <p className="text-slate-600 mb-6">
        <strong>{props.country}</strong> — <strong className="text-brand-primary">{props.percent}%</strong>{" "}
        concession. This code only works when you are logged in as this account with the same
        country on your profile (valid until {props.expiryLabel}).
      </p>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-2xl bg-slate-50 border border-slate-200 p-4 mb-6">
        <code className="flex-1 text-lg font-mono font-bold text-brand-navy tracking-wide">
          {props.code}
        </code>
        <Button type="button" variant="outline" onClick={props.onCopy} className="shrink-0">
          <Copy className="w-4 h-4 mr-2" />
          {props.copied ? "Copied" : "Copy code"}
        </Button>
      </div>
      <Link href="/cart">
        <Button className="w-full h-14 text-base font-bold bg-brand-primary hover:bg-brand-navy text-white rounded-2xl">
          Go to cart (must be logged in)
        </Button>
      </Link>
    </div>
  );
}
