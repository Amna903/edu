import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { useLogin, useRegister } from "@/hooks/use-auth";
import { CheckCircle2, Eye, EyeOff, GraduationCap, Loader2, Presentation, School, ShieldCheck } from "lucide-react";
import logoImage from "@/assets/WhatsApp_Image_2026-02-22_at_20.36.37_1771782478374.jpeg";

type AuthTab = "login" | "register";
type RegisterRole = "student" | "parent" | "teacher" | "school";
type EmailCheckStatus = "idle" | "checking" | "duplicate" | "available";
type PartnerCodeStatus = "idle" | "checking" | "invalid" | "valid";

const TRUST_POINTS = [
  "Interactive Cambridge O-Level mastery learning - not passive video",
  "80% mastery gate on every topic - understanding confirmed before advancing",
  "Free diagnostic included - know exactly where you stand before spending anything",
];

const GRADE_OPTIONS = ["Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "A-Level Year 1", "A-Level Year 2", "Other"];
const COUNTRY_OPTIONS = ["Pakistan", "United Arab Emirates", "Saudi Arabia", "United Kingdom", "United States", "Canada", "Malaysia", "Qatar", "Oman", "Other"];
const HEAR_OPTIONS = ["Google search", "Social media", "Friend / family", "School", "Teacher", "Other"];
const TEACHING_ROLE_OPTIONS = ["School/Institution Teacher", "Independent Tutor", "Coaching Centre Teacher", "Other"];
const SUBJECT_OPTIONS = ["English Language", "English Literature", "Mathematics", "Physics", "Chemistry", "Biology", "Economics", "Business Studies", "Computer Science", "Islamiyat"];

const ROLE_CARDS = [
  { value: "student" as const, title: "I am a Student", description: "Enrolling in courses, taking diagnostics, or using EduMeUp for my own learning.", Icon: GraduationCap },
  { value: "parent" as const, title: "I am a Parent / Guardian", description: "Monitoring my child's progress, managing their learning, and receiving their performance reports.", Icon: ShieldCheck },
  { value: "teacher" as const, title: "I am a Teacher", description: "Training for Cambridge teaching, joining the EduMeUp certified tutor network, or using AI tools.", Icon: Presentation },
  { value: "school" as const, title: "I represent a School", description: "Enrolling students through a partner school account. Requires a school partner code.", Icon: School },
];

function getQueryParam(name: string) {
  return new URLSearchParams(window.location.search).get(name);
}

function getSafeReturnUrl() {
  const value = getQueryParam("returnUrl");
  if (!value) return null;
  try {
    const decoded = decodeURIComponent(value);
    if (decoded.startsWith("/") && !decoded.startsWith("//")) return decoded;
  } catch {
    return null;
  }
  return null;
}

export default function Login() {
  const [location, navigate] = useLocation();
  const search = useSearch();
  const login = useLogin();
  const register = useRegister();

  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [selectedRole, setSelectedRole] = useState<RegisterRole | null>(null);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [emailCheck, setEmailCheck] = useState<EmailCheckStatus>("idle");
  const [countryScholarshipHint, setCountryScholarshipHint] = useState(false);
  const [partnerCodeStatus, setPartnerCodeStatus] = useState<PartnerCodeStatus>("idle");
  const [schoolNameFromCode, setSchoolNameFromCode] = useState("");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [baseRegisterForm, setBaseRegisterForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    termsAccepted: false,
  });
  const [studentForm, setStudentForm] = useState({ grade: "", heardAbout: "" });
  const [parentForm, setParentForm] = useState({ childName: "", childGrade: "" });
  const [teacherForm, setTeacherForm] = useState({ subjects: [] as string[], teachingRole: "", city: "", tutorInterest: "No" as "Yes" | "No" });
  const [schoolForm, setSchoolForm] = useState({ partnerCode: "", schoolAdminRole: "" });

  useEffect(() => {
    const tab = new URLSearchParams(search).get("tab");
    const shouldShowRegister = location === "/register" || tab === "register";
    setActiveTab(shouldShowRegister ? "register" : "login");
  }, [location, search]);

  const loginInputHasError = Boolean(loginError);
  const loginButtonLabel = rememberMe ? "Sign In (30 days)" : "Sign In";

  const registerUsername = useMemo(() => {
    const emailPrefix = baseRegisterForm.email.trim().toLowerCase().split("@")[0] || "";
    return emailPrefix.slice(0, 30) || `user${Date.now().toString().slice(-6)}`;
  }, [baseRegisterForm.email]);

  const passwordStrength = useMemo(() => {
    const value = baseRegisterForm.password;
    if (!value) return "";
    const hasLetter = /[A-Za-z]/.test(value);
    const hasNumber = /\d/.test(value);
    if (value.length >= 10 && hasLetter && hasNumber) return "Strong";
    if (value.length >= 8 && hasLetter && hasNumber) return "Fair";
    return "Weak";
  }, [baseRegisterForm.password]);

  const namesValid = /^[A-Za-z-]{2,50}$/.test(baseRegisterForm.firstname.trim()) && /^[A-Za-z-]{2,50}$/.test(baseRegisterForm.lastname.trim());
  const passwordValid = baseRegisterForm.password.length >= 8 && /[A-Za-z]/.test(baseRegisterForm.password) && /\d/.test(baseRegisterForm.password);
  const confirmMatches = baseRegisterForm.confirmPassword.length > 0 && baseRegisterForm.password === baseRegisterForm.confirmPassword;

  const canSubmitRegister =
    Boolean(selectedRole) &&
    showRoleForm &&
    namesValid &&
    passwordValid &&
    confirmMatches &&
    baseRegisterForm.termsAccepted &&
    baseRegisterForm.country &&
    baseRegisterForm.email.includes("@") &&
    emailCheck !== "duplicate" &&
    emailCheck !== "checking" &&
    ((selectedRole === "student" && Boolean(studentForm.grade)) ||
      (selectedRole === "parent" && Boolean(parentForm.childName.trim()) && Boolean(parentForm.childGrade)) ||
      (selectedRole === "teacher" && teacherForm.subjects.length > 0 && Boolean(teacherForm.teachingRole) && Boolean(teacherForm.city.trim())) ||
      (selectedRole === "school" && partnerCodeStatus === "valid"));

  const checkEmailDuplicate = async () => {
    const email = baseRegisterForm.email.trim().toLowerCase();
    if (!email || !email.includes("@")) return;
    setEmailCheck("checking");
    await new Promise((resolve) => setTimeout(resolve, 500));
    // TODO: replace with dedicated API endpoint when available.
    if (email.endsWith("@taken.edumeup")) setEmailCheck("duplicate");
    else setEmailCheck("available");
  };

  const checkPartnerCode = async () => {
    const code = schoolForm.partnerCode.trim();
    if (!code) return;
    setPartnerCodeStatus("checking");
    try {
      const response = await fetch(`/api/auth/verify-partner-code?code=${encodeURIComponent(code)}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Verification failed");
      const data = (await response.json()) as { valid: boolean; schoolName?: string };
      if (data.valid) {
        setPartnerCodeStatus("valid");
        setSchoolNameFromCode(data.schoolName || "");
      } else {
        setPartnerCodeStatus("invalid");
        setSchoolNameFromCode("");
      }
    } catch {
      setPartnerCodeStatus("invalid");
      setSchoolNameFromCode("");
    }
  };

  const resolveRegisterRole = () => {
    if (selectedRole === "student") return "student" as const;
    if (selectedRole === "parent") return "parent" as const;
    if (selectedRole === "school") return "school" as const;
    // Teacher pipeline placeholder: backend enum currently supports admin/student/parent/school only.
    return "student" as const;
  };

  return (
    <div className="min-h-screen bg-white font-[Arial]">
      <Navbar />
      <div className="mx-auto grid min-h-[calc(100vh-3.5rem)] w-full md:min-h-[calc(100vh-4rem)] md:grid-cols-[40%_60%]">
        <aside className="hidden bg-[#1E3A5F] md:flex md:flex-col md:justify-between md:p-10 lg:p-12">
          <div />
          <div className="mx-auto max-w-sm text-center">
            <img src={logoImage} alt="EduMeUp" className="mx-auto h-auto w-[120px] rounded-md bg-white p-2" />
            <p className="mt-6 text-[16px] italic text-white">From content delivery to learning mastery.</p>
            <ul className="mt-8 space-y-4 text-left">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-white/90">
                  <span className="mt-0.5 text-[#17A589]">✦</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center">
            <button type="button" onClick={() => navigate("/register")} className="text-sm text-[#17A589] underline-offset-4 hover:underline">
              New to EduMeUp? Register -&gt;
            </button>
          </div>
        </aside>

        <header className="flex h-20 items-center justify-between bg-[#1E3A5F] px-5 md:hidden">
          <img src={logoImage} alt="EduMeUp" className="h-11 w-auto rounded bg-white p-1.5" />
          <button type="button" onClick={() => navigate("/register")} className="text-xs font-semibold text-[#17A589] underline-offset-4 hover:underline">
            New here? Register -&gt;
          </button>
        </header>

        <main className="flex items-center px-6 py-10 md:px-10 lg:px-12">
          <div className="mx-auto w-full max-w-[560px]">
            <div className="mb-7 flex rounded-lg border border-slate-200 p-1">
              <button type="button" onClick={() => navigate("/login")} className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition ${activeTab === "login" ? "bg-[#1E3A5F] text-white" : "text-slate-600 hover:bg-slate-50"}`}>
                Login
              </button>
              <button type="button" onClick={() => navigate("/register")} className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition ${activeTab === "register" ? "bg-[#1E3A5F] text-white" : "text-slate-600 hover:bg-slate-50"}`}>
                Register
              </button>
            </div>

            {activeTab === "login" ? (
              <>
                <h1 className="text-[28px] font-bold text-[#1E3A5F]">Welcome back.</h1>
                <p className="mt-2 text-[15px] text-slate-500">Sign in to your EduMeUp account.</p>
                <form
                  className="mt-7 space-y-5"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    setLoginError("");
                    const username = loginForm.email.trim().toLowerCase();
                    try {
                      await login.mutateAsync({ username, password: loginForm.password });
                      navigate(getSafeReturnUrl() || "/dashboard");
                    } catch (error) {
                      const message = error instanceof Error ? error.message.toLowerCase() : "";
                      if (message.includes("invalid")) setLoginError("The email or password is incorrect. Please try again.");
                      else setLoginError("Unable to connect. Please check your internet connection and try again.");
                    }
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email Address</Label>
                    <Input id="login-email" type="email" autoFocus autoComplete="email" value={loginForm.email} onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))} className={loginInputHasError ? "border-red-400 focus-visible:ring-red-400" : ""} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input id="login-password" type={showLoginPassword ? "text" : "password"} autoComplete="current-password" minLength={8} value={loginForm.password} onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))} className={`pr-10 ${loginInputHasError ? "border-red-400 focus-visible:ring-red-400" : ""}`} required />
                      <button type="button" onClick={() => setShowLoginPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label={showLoginPassword ? "Hide password" : "Show password"}>
                        {showLoginPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center gap-2 text-sm text-slate-600">
                        <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
                        Remember Me
                      </label>
                      <button type="button" onClick={() => navigate("/forgot-password")} className="text-[13px] text-slate-500 transition hover:text-[#17A589]">
                        Forgot your password?
                      </button>
                    </div>
                  </div>
                  {loginError && <p className="text-sm text-red-600">{loginError}</p>}
                  <Button type="submit" disabled={login.isPending} className="h-12 w-full rounded-lg bg-[#17A589] text-base font-bold text-white hover:bg-[#139577]">
                    {login.isPending ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Signing in...
                      </span>
                    ) : (
                      loginButtonLabel
                    )}
                  </Button>
                  <p className="text-sm text-slate-600">
                    Don&apos;t have an account?{" "}
                    <button type="button" onClick={() => navigate("/register")} className="font-semibold text-[#17A589] hover:underline">
                      Register here -&gt;
                    </button>
                  </p>
                </form>
              </>
            ) : (
              <>
                <h1 className="text-[24px] font-bold text-[#1E3A5F]">Who are you registering as?</h1>
                <p className="mt-2 text-[15px] text-slate-500">Choose the option that best describes you. You can only have one account per email address.</p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {ROLE_CARDS.map(({ value, title, description, Icon }) => {
                    const isActive = selectedRole === value;
                    return (
                      <button key={value} type="button" onClick={() => { setSelectedRole(value); setRegisterError(""); setRegisterSuccess(""); }} className={`relative min-h-[120px] rounded-xl border p-3 text-left transition ${isActive ? "border-[#1E3A5F] bg-[#1E3A5F] text-white" : "border-[#1E3A5F]/35 bg-white text-slate-800 hover:border-[#1E3A5F]"}`}>
                        <Icon className={`h-8 w-8 ${isActive ? "text-white" : "text-[#1E3A5F]"}`} />
                        <p className="mt-2 text-sm font-bold">{title}</p>
                        <p className={`mt-1 text-xs leading-4 ${isActive ? "text-white/90" : "text-slate-500"}`}>{description}</p>
                        {isActive && <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 text-[#17A589]" />}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4">
                  {!showRoleForm ? (
                    <Button type="button" onClick={() => setShowRoleForm(true)} disabled={!selectedRole} className="h-11 w-full rounded-lg bg-[#17A589] text-white hover:bg-[#139577]">
                      Continue -&gt;
                    </Button>
                  ) : (
                    <button type="button" onClick={() => setShowRoleForm(false)} className="text-sm font-semibold text-slate-500 underline-offset-4 hover:underline">
                      Change Role
                    </button>
                  )}
                </div>

                <form
                  className={`space-y-5 ${showRoleForm ? "mt-6" : "mt-4 opacity-60 pointer-events-none"}`}
                  onSubmit={async (event) => {
                    event.preventDefault();
                    setRegisterError("");
                    setRegisterSuccess("");
                    try {
                      const result = await register.mutateAsync({
                        firstname: baseRegisterForm.firstname.trim(),
                        lastname: baseRegisterForm.lastname.trim(),
                        email: baseRegisterForm.email.trim().toLowerCase(),
                        username: registerUsername,
                        password: baseRegisterForm.password,
                        role: resolveRegisterRole(),
                      });
                      if (result.requiresEmailConfirmation) {
                        navigate(`/register/verify-pending?email=${encodeURIComponent(baseRegisterForm.email.trim().toLowerCase())}`);
                      } else {
                        navigate("/dashboard");
                      }
                    } catch (error) {
                      setRegisterError(error instanceof Error ? error.message : "Registration failed");
                    }
                  }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="register-firstname">{selectedRole === "parent" ? "Your First Name" : "First Name"}</Label>
                      <Input id="register-firstname" value={baseRegisterForm.firstname} onChange={(event) => setBaseRegisterForm((current) => ({ ...current, firstname: event.target.value }))} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-lastname">{selectedRole === "parent" ? "Your Last Name" : "Last Name"}</Label>
                      <Input id="register-lastname" value={baseRegisterForm.lastname} onChange={(event) => setBaseRegisterForm((current) => ({ ...current, lastname: event.target.value }))} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">{selectedRole === "parent" ? "Your Email Address" : selectedRole === "school" ? "Your School Email" : "Email Address"}</Label>
                    <Input id="register-email" type="email" autoComplete="email" value={baseRegisterForm.email} onBlur={checkEmailDuplicate} onChange={(event) => setBaseRegisterForm((current) => ({ ...current, email: event.target.value }))} required />
                    {emailCheck === "checking" && <p className="text-xs text-slate-500">Checking email availability...</p>}
                    {emailCheck === "duplicate" && (
                      <p className="text-xs text-red-600">
                        This email is already registered.{" "}
                        <button type="button" onClick={() => navigate("/login")} className="font-semibold underline">
                          Sign in -&gt;
                        </button>
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Input id="register-password" type={showRegisterPassword ? "text" : "password"} autoComplete="new-password" minLength={8} value={baseRegisterForm.password} onChange={(event) => setBaseRegisterForm((current) => ({ ...current, password: event.target.value }))} className="pr-10" required />
                      <button type="button" onClick={() => setShowRegisterPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label={showRegisterPassword ? "Hide password" : "Show password"}>
                        {showRegisterPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {passwordStrength && <p className="text-xs text-slate-500">Strength: {passwordStrength}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Confirm Password</Label>
                    <Input id="register-confirm-password" type="password" autoComplete="new-password" value={baseRegisterForm.confirmPassword} onChange={(event) => setBaseRegisterForm((current) => ({ ...current, confirmPassword: event.target.value }))} required />
                    {baseRegisterForm.confirmPassword && <p className={`text-xs ${confirmMatches ? "text-[#17A589]" : "text-red-600"}`}>{confirmMatches ? "Passwords match" : "Passwords do not match"}</p>}
                  </div>

                  {selectedRole === "student" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="student-grade">Current Grade / Year</Label>
                        <select id="student-grade" value={studentForm.grade} onChange={(event) => setStudentForm((current) => ({ ...current, grade: event.target.value }))} className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm" required>
                          <option value="">Select grade</option>
                          {GRADE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-country">Country</Label>
                        <select id="student-country" value={baseRegisterForm.country} onChange={(event) => { const value = event.target.value; setBaseRegisterForm((current) => ({ ...current, country: value })); setCountryScholarshipHint(["Pakistan", "United Arab Emirates", "Saudi Arabia", "Malaysia"].includes(value)); }} className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm" required>
                          <option value="">Select country</option>
                          {COUNTRY_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {countryScholarshipHint && <p className="rounded-md bg-[#17A589]/10 px-3 py-2 text-xs text-[#0f766e]">You may be eligible for a scholarship - see /pricing#scholarship after registration.</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="student-hear">How did you hear about EduMeUp</Label>
                        <select id="student-hear" value={studentForm.heardAbout} onChange={(event) => setStudentForm((current) => ({ ...current, heardAbout: event.target.value }))} className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                          <option value="">Select</option>
                          {HEAR_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {selectedRole === "parent" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="parent-child-name">Your Child&apos;s Full Name</Label>
                        <Input id="parent-child-name" value={parentForm.childName} onChange={(event) => setParentForm((current) => ({ ...current, childName: event.target.value }))} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="parent-child-grade">Your Child&apos;s Current Grade</Label>
                        <select id="parent-child-grade" value={parentForm.childGrade} onChange={(event) => setParentForm((current) => ({ ...current, childGrade: event.target.value }))} className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm" required>
                          <option value="">Select grade</option>
                          {GRADE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="parent-country">Country</Label>
                        <select id="parent-country" value={baseRegisterForm.country} onChange={(event) => setBaseRegisterForm((current) => ({ ...current, country: event.target.value }))} className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm" required>
                          <option value="">Select country</option>
                          {COUNTRY_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {selectedRole === "teacher" && (
                    <>
                      <div className="space-y-2">
                        <Label>Subject(s) You Teach</Label>
                        <div className="grid grid-cols-2 gap-2 rounded-md border border-slate-200 p-3">
                          {SUBJECT_OPTIONS.map((subject) => (
                            <label key={subject} className="flex items-center gap-2 text-xs text-slate-700">
                              <input type="checkbox" checked={teacherForm.subjects.includes(subject)} onChange={(event) => setTeacherForm((current) => ({ ...current, subjects: event.target.checked ? [...current.subjects, subject] : current.subjects.filter((item) => item !== subject) }))} />
                              {subject}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Teaching Role</Label>
                        <div className="space-y-2 rounded-md border border-slate-200 p-3">
                          {TEACHING_ROLE_OPTIONS.map((option) => (
                            <label key={option} className="flex items-center gap-2 text-sm text-slate-700">
                              <input type="radio" name="teaching-role" checked={teacherForm.teachingRole === option} onChange={() => setTeacherForm((current) => ({ ...current, teachingRole: option }))} />
                              {option}
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="teacher-city">City</Label>
                          <Input id="teacher-city" value={teacherForm.city} onChange={(event) => setTeacherForm((current) => ({ ...current, city: event.target.value }))} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="teacher-country">Country</Label>
                          <select id="teacher-country" value={baseRegisterForm.country} onChange={(event) => setBaseRegisterForm((current) => ({ ...current, country: event.target.value }))} className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm" required>
                            <option value="">Select country</option>
                            {COUNTRY_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Are you interested in joining the EduMeUp certified tutor network?</Label>
                        <div className="flex gap-4 rounded-md border border-slate-200 p-3">
                          {(["Yes", "No"] as const).map((choice) => (
                            <label key={choice} className="flex items-center gap-2 text-sm text-slate-700">
                              <input type="radio" name="tutor-interest" checked={teacherForm.tutorInterest === choice} onChange={() => setTeacherForm((current) => ({ ...current, tutorInterest: choice }))} />
                              {choice}
                            </label>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {selectedRole === "school" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="school-partner-code">School Partner Code</Label>
                        <Input id="school-partner-code" value={schoolForm.partnerCode} onBlur={checkPartnerCode} onChange={(event) => setSchoolForm((current) => ({ ...current, partnerCode: event.target.value }))} required />
                        {partnerCodeStatus === "checking" && <p className="text-xs text-slate-500">Checking partner code...</p>}
                        {partnerCodeStatus === "invalid" && <p className="text-xs text-red-600">This partner code is not recognised. Please contact EduMeUp.</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="school-name">School Name (auto-filled)</Label>
                        <Input id="school-name" value={schoolNameFromCode} readOnly className="bg-slate-50" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="school-admin-role">Your Role at the School</Label>
                        <Input id="school-admin-role" value={schoolForm.schoolAdminRole} onChange={(event) => setSchoolForm((current) => ({ ...current, schoolAdminRole: event.target.value }))} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="school-country">Country</Label>
                        <select id="school-country" value={baseRegisterForm.country} onChange={(event) => setBaseRegisterForm((current) => ({ ...current, country: event.target.value }))} className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm" required>
                          <option value="">Select country</option>
                          {COUNTRY_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  <label className="flex items-start gap-2 text-xs text-slate-600">
                    <input type="checkbox" checked={baseRegisterForm.termsAccepted} onChange={(event) => setBaseRegisterForm((current) => ({ ...current, termsAccepted: event.target.checked }))} className="mt-0.5" />
                    <span>
                      I agree to the{" "}
                      <a href="/terms" target="_blank" rel="noreferrer" className="font-semibold text-[#17A589] hover:underline">
                        Terms of Use
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" target="_blank" rel="noreferrer" className="font-semibold text-[#17A589] hover:underline">
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </label>

                  {registerError && <p className="text-sm text-red-600">{registerError}</p>}
                  {registerSuccess && <p className="text-sm text-[#17A589]">{registerSuccess}</p>}
                  {selectedRole === "teacher" && <p className="text-xs text-slate-500">Teacher role is currently mapped through existing backend role support; dashboard specialization can be extended server-side.</p>}

                  <Button type="submit" disabled={register.isPending || !canSubmitRegister} className="h-12 w-full rounded-lg bg-[#17A589] text-base font-bold text-white hover:bg-[#139577]">
                    {register.isPending ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating account...
                      </span>
                    ) : (
                      "Register"
                    )}
                  </Button>

                  <p className="text-sm text-slate-600">
                    Already have an account?{" "}
                    <button type="button" onClick={() => navigate("/login")} className="font-semibold text-[#17A589] hover:underline">
                      Login here -&gt;
                    </button>
                  </p>
                </form>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
