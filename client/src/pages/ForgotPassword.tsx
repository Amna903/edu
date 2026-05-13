
import { useState } from "react";
import { useLocation } from "wouter";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import logoImage from "@/assets/WhatsApp_Image_2026-02-22_at_20.36.37_1771782478374.jpeg";

export default function ForgotPassword() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
            <p className="mt-2 text-sm text-slate-500">Enter your email address and we will send you a reset link.</p>
            {submitted ? (
              <div className="mt-6 rounded-md border border-brand-primary/30 bg-brand-primary/10 p-4 text-sm text-brand-primary">
                If an account exists for that email address, a password reset link has been sent. Check your inbox. The link expires in 1 hour.
              </div>
            ) : (
              <form
                className="mt-6 space-y-4"
                onSubmit={async (event) => {
                  event.preventDefault();
                  setLoading(true);
                  await new Promise((resolve) => setTimeout(resolve, 500));
                  setLoading(false);
                  setSubmitted(true);
                }}
              >
                <div className="space-y-2">
                  <Label htmlFor="forgot-email">Email Address</Label>
                  <Input id="forgot-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
                </div>
                <Button type="submit" disabled={loading} className="h-12 w-full bg-brand-primary text-white hover:bg-brand-primary-dark">
                  {loading ? <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Sending...</span> : "Send Reset Link"}
                </Button>
              </form>
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

