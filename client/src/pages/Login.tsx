import { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/use-auth";
import { Eye, EyeOff } from "lucide-react";
import logoImage from "@/assets/WhatsApp_Image_2026-02-22_at_20.36.37_1771782478374.jpeg";

function getDashboardPath(role?: string | null) {
  if (role === "admin") return "/dashboard/admin";
  if (role === "parent") return "/dashboard/parent";
  if (role === "school") return "/dashboard/school";
  return "/dashboard/student";
}

export default function Login() {
  const [, navigate] = useLocation();
  const login = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  return (
    <Layout>
      <div className="container-custom py-16 md:py-24">
        <div className="mx-auto grid max-w-4xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-blue-100 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-slate-950 p-10 text-white md:p-12">
            <img src={logoImage} alt="EduMeUp" className="h-14 w-auto rounded-2xl bg-white/95 p-2" />
            <h1 className="mt-8 text-4xl font-black tracking-tight">Welcome back</h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Sign in with your Moodle-connected account. Once you are in, `edu` will route you to the matching student, parent, school, or admin dashboard.
            </p>
            <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold text-white">Need a new account?</p>
              <p className="mt-2 text-sm text-slate-300">Choose your role first, complete signup, then confirm your email if your Moodle signup flow requires it.</p>
              <Button variant="outline" className="mt-5 border-white/20 bg-transparent text-white hover:bg-white hover:text-slate-950" onClick={() => navigate("/register")}>
                Create Account
              </Button>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="mb-8 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Sign In</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Access your dashboard</h2>
              </div>
              <Button variant="outline" onClick={() => navigate("/register")}>
                Sign Up
              </Button>
            </div>

            <form
              className="space-y-5"
              onSubmit={async (event) => {
                event.preventDefault();
                try {
                  const user = await login.mutateAsync(form);
                  navigate(getDashboardPath(user.role));
                } catch {
                  return;
                }
              }}
            >
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
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              {login.error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {login.error.message}
                </div>
              )}
              <Button type="submit" className="w-full bg-[#2366c9] text-white hover:bg-blue-700">
                {login.isPending ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
