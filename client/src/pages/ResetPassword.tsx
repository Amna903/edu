import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/WhatsApp_Image_2026-02-22_at_20.36.37_1771782478374.jpeg";

function getResetToken() {
  const params = new URLSearchParams(window.location.search);
  return params.get("token");
}

export default function ResetPassword() {
  const [, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = useMemo(() => getResetToken(), []);
  const hasValidToken = Boolean(token && token.trim().length > 10);
  const passwordStrength =
    password.length >= 10 && /[A-Za-z]/.test(password) && /\d/.test(password)
      ? "Strong"
      : password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password)
        ? "Fair"
        : password.length > 0
          ? "Weak"
          : "";
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto grid min-h-screen w-full md:h-screen md:grid-cols-[40%_60%] md:overflow-hidden">
        <aside className="hidden bg-brand-primary md:flex md:items-center md:justify-center md:p-12">
          <img src={logoImage} alt="EduMeUp" className="h-auto w-[140px] rounded-md bg-white p-2" />
        </aside>
        <main className="flex justify-center px-6 md:h-full md:overflow-y-auto md:px-10 lg:px-12">
          <div className="flex min-h-full w-full max-w-[440px] flex-col py-12">
            <div className="my-auto w-full">
            <h1 className="text-3xl font-bold tracking-tight text-brand-primary">Reset password</h1>
            <p className="mt-2 text-sm text-slate-500">Set a new password for your EduMeUp account.</p>
            {!hasValidToken ? (
              <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                This link has expired or is invalid. Please request a new password reset.
              </div>
            ) : submitted ? (
              <div className="mt-6 rounded-md border border-[#17A589]/30 bg-[#17A589]/10 p-4 text-sm text-[#0f766e]">
                <div className="mb-2 inline-flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="h-4 w-4" />
                  Your password has been updated.
                </div>
                <p>Sign in with your new password.</p>
              </div>
            ) : (
              <form
                className="mt-6 space-y-4"
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (!passwordsMatch) return;
                  setLoading(true);
                  await new Promise((resolve) => setTimeout(resolve, 500));
                  setLoading(false);
                  setSubmitted(true);
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="reset-password">New Password</Label>
                  <div className="relative">
                    <Input id="reset-password" type={showPassword ? "text" : "password"} autoComplete="new-password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} className="pr-10" required />
                    <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label={showPassword ? "Hide password" : "Show password"}>
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {passwordStrength && <p className="text-xs text-slate-500">Strength: {passwordStrength}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reset-confirm-password">Confirm New Password</Label>
                  <div className="relative">
                    <Input id="reset-confirm-password" type={showConfirmPassword ? "text" : "password"} autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="pr-10" required />
                    <button type="button" onClick={() => setShowConfirmPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label={showConfirmPassword ? "Hide password" : "Show password"}>
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {confirmPassword && <p className={`text-xs ${passwordsMatch ? "text-[#17A589]" : "text-red-600"}`}>{passwordsMatch ? "Passwords match" : "Passwords do not match"}</p>}
                </div>
                <Button type="submit" disabled={loading || !passwordsMatch} className="h-12 w-full bg-[#17A589] text-white hover:bg-[#139577]">
                  {loading ? <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Updating...</span> : "Update Password"}
                </Button>
              </form>
            )}
            <button type="button" onClick={() => navigate(submitted ? "/login" : "/forgot-password")} className="mt-5 text-sm font-semibold text-[#2E75B6] hover:text-[#17A589]">
              {submitted ? "Sign In" : "Request a new reset link"}
            </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

