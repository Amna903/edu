import { useEffect } from "react";
import { useLocation } from "wouter";
import { KeyRound } from "lucide-react";
import logoImage from "@/assets/WhatsApp_Image_2026-02-22_at_20.36.37_1771782478374.jpeg";

// OPENCODE: Password reset now happens entirely on Moodle (built-in forgot-password flow,
// Moodle's own SMTP sends the reset email). This page simply redirects there.
export default function ResetPassword() {
  const [, navigate] = useLocation();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.location.assign("/api/auth/forgot");
    }, 3000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto grid min-h-screen w-full md:h-screen md:grid-cols-[40%_60%] md:overflow-hidden">
        <aside className="hidden bg-brand-primary md:flex md:items-center md:justify-center md:p-12">
          <img src={logoImage} alt="EduMeUp" className="h-auto w-[140px] rounded-md bg-white p-2" />
        </aside>
        <main className="flex justify-center px-6 md:h-full md:overflow-y-auto md:px-10 lg:px-12">
          <div className="flex min-h-full w-full max-w-[440px] flex-col py-12">
            <div className="my-auto w-full">
              <div className="inline-flex items-center gap-2 text-brand-primary">
                <KeyRound className="h-6 w-6" />
                <h1 className="text-2xl font-bold tracking-tight">Password reset</h1>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Password reset is handled by our Moodle platform. You are being redirected to
                the Moodle password reset page — enter your account email there and Moodle will
                send you a reset link.
              </p>
              <div className="mt-6 rounded-md border border-brand-primary/30 bg-brand-primary/10 p-4 text-sm text-brand-primary">
                Redirecting you now...
              </div>
              <button
                type="button"
                onClick={() => window.location.assign("/api/auth/forgot")}
                className="mt-5 text-sm font-semibold text-brand-primary hover:text-brand-primary-dark underline"
              >
                Go to Moodle password reset
              </button>
            </div>
            <button type="button" onClick={() => navigate("/login")} className="mt-8 text-sm font-semibold text-slate-500 hover:text-slate-700">
              Back to login
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}