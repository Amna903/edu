import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { GraduationCap, School, Users, CheckCircle2 } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/use-auth";
import type { AppRole } from "@shared/schema";
import logoImage from "@/assets/WhatsApp_Image_2026-02-22_at_20.36.37_1771782478374.jpeg";

const roleCards: Array<{
  role: AppRole;
  title: string;
  subtitle: string;
  icon: typeof GraduationCap;
}> = [
  {
    role: "student",
    title: "Student",
    subtitle: "Learn, track progress, and earn certificates.",
    icon: GraduationCap,
  },
  {
    role: "parent",
    title: "Parent",
    subtitle: "Monitor your child's progress and enrollments.",
    icon: Users,
  },
  {
    role: "school",
    title: "School",
    subtitle: "Manage seats, team access, and analytics.",
    icon: School,
  },
];

function validatePassword(password: string) {
  if (password.length < 8) return "Password must be at least 8 characters long.";
  if (!/[0-9]/.test(password)) return "Password must have at least 1 digit.";
  if (!/[a-z]/.test(password)) return "Password must have at least 1 lower case letter.";
  if (!/[A-Z]/.test(password)) return "Password must have at least 1 upper case letter.";
  if (!/[^a-zA-Z0-9]/.test(password)) return "Password must have at least 1 special character.";
  return null;
}

export default function Register() {
  const [, navigate] = useLocation();
  const register = useRegister();
  const [role, setRole] = useState<AppRole>("student");
  const [localError, setLocalError] = useState("");
  const [result, setResult] = useState<null | {
    requiresEmailConfirmation: boolean;
    message: string;
    dashboardPath: string | null;
  }>(null);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });

  const passwordError = useMemo(() => validatePassword(form.password), [form.password]);
  const successTarget = result?.requiresEmailConfirmation ? "/login" : result?.dashboardPath || "/dashboard";

  if (result) {
    return (
      <Layout>
        <div className="container-custom py-16 md:py-24">
          <div className="mx-auto max-w-xl rounded-[2rem] border border-emerald-100 bg-white p-10 text-center shadow-2xl shadow-emerald-100">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Registration Submitted</h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">{result.message}</p>
            <button
              type="button"
              onClick={() => navigate(successTarget)}
              className="mx-auto mt-8 block rounded-3xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <img src={logoImage} alt="EduMeUp" className="h-20 w-auto object-contain" />
            </button>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              {result.requiresEmailConfirmation ? "Open your email, confirm your account, then sign in" : "Tap the logo to continue to your dashboard"}
            </p>
            <div className="mt-8 space-y-3">
              <Button className="w-full bg-slate-300 text-white hover:bg-slate-300" disabled>
                Signup Completed
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate(result.requiresEmailConfirmation ? "/login" : successTarget)}>
                {result.requiresEmailConfirmation ? "Go To Sign In" : "Open Dashboard"}
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-16 md:py-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-blue-100">
          <div className="grid lg:grid-cols-[1.15fr_0.95fr]">
            <div className="bg-[radial-gradient(circle_at_top,_rgba(35,102,201,0.18),_transparent_52%),linear-gradient(135deg,#0f172a,#1e3a8a)] p-10 text-white md:p-12">
              <img src={logoImage} alt="EduMeUp" className="h-14 w-auto rounded-2xl bg-white/90 p-2" />
              <h1 className="mt-8 text-4xl font-black tracking-tight">Create your EduMeUp account</h1>
              <p className="mt-4 max-w-lg text-sm leading-7 text-blue-100">
                Choose how you want to join, create your account inside `edu`, and we will route you into the right dashboard experience.
              </p>

              <div className="mt-10 space-y-4">
                {roleCards.map((item) => {
                  const Icon = item.icon;
                  const active = role === item.role;
                  return (
                    <button
                      key={item.role}
                      type="button"
                      onClick={() => setRole(item.role)}
                      className={`flex w-full items-start gap-4 rounded-3xl border p-5 text-left transition ${
                        active
                          ? "border-white bg-white text-slate-900 shadow-lg"
                          : "border-white/15 bg-white/5 text-white hover:bg-white/10"
                      }`}
                    >
                      <div className={`rounded-2xl p-3 ${active ? "bg-blue-100 text-blue-700" : "bg-white/10 text-white"}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-lg font-bold">{item.title}</p>
                        <p className={`mt-1 text-sm ${active ? "text-slate-500" : "text-blue-100"}`}>{item.subtitle}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Sign Up</p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Start with the right role</h2>
                </div>
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
              </div>

              <form
                className="space-y-5"
                onSubmit={async (event) => {
                  event.preventDefault();
                  setLocalError("");

                  if (passwordError) {
                    setLocalError(passwordError);
                    return;
                  }

                  try {
                    const response = await register.mutateAsync({ ...form, role });
                    setResult({
                      requiresEmailConfirmation: response.requiresEmailConfirmation,
                      message: response.message,
                      dashboardPath: response.dashboardPath,
                    });
                  } catch (error) {
                    setLocalError(error instanceof Error ? error.message : "Registration failed");
                  }
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstname">First Name</Label>
                    <Input
                      id="firstname"
                      value={form.firstname}
                      onChange={(event) => setForm((current) => ({ ...current, firstname: event.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input
                      id="lastname"
                      value={form.lastname}
                      onChange={(event) => setForm((current) => ({ ...current, lastname: event.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={form.username}
                    onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  />
                  <p className="text-xs text-slate-500">
                    Use 8+ characters with uppercase, lowercase, a number, and a special character.
                  </p>
                </div>

                {(localError || register.error) && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {localError || register.error?.message}
                  </div>
                )}

                <Button type="submit" className="w-full bg-[#2366c9] text-white hover:bg-blue-700" disabled={register.isPending}>
                  {register.isPending ? "Creating Account..." : `Create ${role.charAt(0).toUpperCase() + role.slice(1)} Account`}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
