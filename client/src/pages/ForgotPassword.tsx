
import { useState } from "react";
import { useLocation } from "wouter";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";
import logoImage from "@/assets/WhatsApp_Image_2026-02-22_at_20.36.37_1771782478374.jpeg";

export default function ForgotPassword() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ message: "Something went wrong" }));
        throw new Error(data.message || "Failed to send reset link");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto grid min-h-screen w-full md:h-screen md:grid-cols-[40%_60%] md:overflow-hidden">
        <aside className="hidden bg-brand-primary md:flex md:items-center md:justify-center md:p-12">
          <img src={logoImage} alt="EduMeUp" className="h-auto w-[140px] rounded-md bg-white p-2" />
        </aside>
        <main className="flex justify-center px-6 md:h-full md:overflow-y-auto md:px-10 lg:px-12">
          <div className="flex min-h-full w-full max-w-[440px] flex-col py-12">
            <div className="my-auto w-full">
            <h1 className="text-3xl font-bold tracking-tight text-brand-primary">Forgot your password?</h1>

            {sent ? (
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold text-emerald-800 text-sm">Reset link sent!</p>
                    <p className="text-xs text-emerald-700 mt-1">
                      If an account exists for <strong>{email}</strong>, you will receive a password reset email shortly. Please check your inbox and spam folder.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <p className="mt-2 text-sm text-slate-500">Enter your email address and we will send you a reset link.</p>
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="forgot-email">Email Address</Label>
                    <Input id="forgot-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                  </div>
                  {error && (
                    <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      {error}
                    </div>
                  )}
                  <Button type="submit" disabled={loading} className="h-12 w-full bg-brand-primary text-white hover:bg-brand-primary-dark">
                    {loading ? <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Sending...</span> : "Send Reset Link"}
                  </Button>
                </form>
              </>
            )}

            <button type="button" onClick={() => navigate("/login")} className="mt-5 text-sm font-semibold text-brand-primary hover:text-brand-primary-dark">
              Back to login
            </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

