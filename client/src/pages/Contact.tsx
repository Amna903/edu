import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Building2, Gift, GraduationCap, MessageSquare, Wrench } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useAuthUser } from "@/hooks/use-auth";
import { ui } from "@/theme";

type RouteType = "school_consultation" | "c360_session" | "general" | "support";

const COUNTRY_OPTIONS = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Cote d'Ivoire","Croatia","Cuba","Cyprus","Czechia","Democratic Republic of the Congo","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
];

const CALENDLY_URLS = {
  navigator: "https://calendly.com/edumeup/navigator-session-15",
  accelerator: "https://calendly.com/edumeup/accelerator-session-30",
  excellenceSchool: "https://calendly.com/edumeup/excellence-school-session-45",
};

export default function Contact() {
  const [location, setLocation] = useLocation();
  const { data: user } = useAuthUser();
  const [activeRoute, setActiveRoute] = useState<RouteType | null>(null);
  const [c360Plan, setC360Plan] = useState<"navigator" | "accelerator" | "excellenceSchool">("accelerator");
  const [schoolSubmittedName, setSchoolSubmittedName] = useState("");
  const [schoolMessage, setSchoolMessage] = useState<string | null>(null);
  const [generalMessage, setGeneralMessage] = useState<string | null>(null);
  const [supportMessage, setSupportMessage] = useState<string | null>(null);
  const [generalSubject, setGeneralSubject] = useState("");
  const [supportProblemType, setSupportProblemType] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [loading, setLoading] = useState<"school" | "general" | "support" | null>(null);

  useEffect(() => {
    document.title = "Contact EduMeUp | Get Help, Book a Session, or Start a School Partnership";
    const upsertMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    upsertMeta("description", "Contact EduMeUp for school partnership enquiries, Cambridge 360° Hub sessions, student and parent support, or technical help. Five contact routes — we route you to the right team instantly.");
    upsertMeta("robots", "index, follow");
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://edumeup.com/contact";
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.split("?")[1] || "");
    const typeParam = params.get("type");
    if (!typeParam) return;
    const valid = ["school_consultation", "c360_session", "general", "support"] as const;
    if (valid.includes(typeParam as RouteType)) {
      setActiveRoute(typeParam as RouteType);
      const sectionMap: Record<RouteType, string> = {
        school_consultation: "school-form",
        c360_session: "c360-session",
        general: "general-form",
        support: "support-form",
      };
      setTimeout(() => {
        document.getElementById(sectionMap[typeParam as RouteType])?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }, [location]);

  const c360Url = useMemo(() => CALENDLY_URLS[c360Plan], [c360Plan]);

  const openRoute = (route: RouteType) => {
    setActiveRoute(route);
    setLocation(`/contact?type=${route}`);
    const sectionMap: Record<RouteType, string> = {
      school_consultation: "school-form",
      c360_session: "c360-session",
      general: "general-form",
      support: "support-form",
    };
    setTimeout(() => {
      document.getElementById(sectionMap[route])?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  };

  const submitContact = async (payload: Record<string, unknown>) => {
    const res = await fetch("/api/contact-submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error((body as { message?: string }).message || "Failed to submit.");
  };

  const handleSchoolSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading("school");
    setSchoolMessage(null);
    try {
      const fullName = String(formData.get("fullName") || "").trim();
      await submitContact({
        route: "school_partnership",
        fullName,
        firstName: fullName.split(" ")[0] || "there",
        role: String(formData.get("role") || ""),
        schoolName: String(formData.get("schoolName") || ""),
        country: String(formData.get("country") || ""),
        email: String(formData.get("email") || ""),
        studentCount: String(formData.get("studentCount") || ""),
        message: String(formData.get("message") || ""),
        consultation_type: "school_partnership",
        honeypot: String(formData.get("companyWebsite") || ""),
      });
      setSchoolSubmittedName(fullName.split(" ")[0] || "there");
      setSchoolMessage("success");
      event.currentTarget.reset();
    } catch (error) {
      setSchoolMessage(error instanceof Error ? error.message : "Unable to submit.");
    } finally {
      setLoading(null);
    }
  };

  const handleGeneralSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading("general");
    setGeneralMessage(null);
    try {
      await submitContact({
        route: "general_enquiry",
        fullName: String(formData.get("fullName") || ""),
        userType: String(formData.get("userType") || ""),
        email: String(formData.get("email") || ""),
        subject: String(formData.get("subject") || ""),
        message: String(formData.get("message") || ""),
        consultation_type: "general_enquiry",
        honeypot: String(formData.get("companyWebsite") || ""),
      });
      setGeneralMessage("success");
      event.currentTarget.reset();
      setGeneralSubject("");
    } catch (error) {
      setGeneralMessage(error instanceof Error ? error.message : "Unable to submit.");
    } finally {
      setLoading(null);
    }
  };

  const handleSupportSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setLoading("support");
    setSupportMessage(null);
    try {
      await submitContact({
        route: "technical_support",
        fullName: String(formData.get("fullName") || ""),
        email: String(formData.get("email") || ""),
        userType: String(formData.get("userType") || ""),
        problemType: String(formData.get("problemType") || ""),
        accountEmail: String(formData.get("accountEmail") || ""),
        message: String(formData.get("message") || ""),
        device: String(formData.get("device") || ""),
        browser: String(formData.get("browser") || ""),
        attachmentName: attachment?.name || "",
        consultation_type: "technical_support",
        honeypot: String(formData.get("companyWebsite") || ""),
      });
      setSupportMessage("success");
      event.currentTarget.reset();
      setSupportProblemType("");
      setAttachment(null);
    } catch (error) {
      setSupportMessage(error instanceof Error ? error.message : "Unable to submit.");
    } finally {
      setLoading(null);
    }
  };

  const sectionClass = `${ui.cards.standard} p-6 md:p-8`;

  return (
    <Layout>
      <section className="bg-white py-12 md:py-16">
        <div className="container-custom max-w-6xl space-y-4 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#2366c9]">Contact EduMeUp</p>
          <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">How Can We Help You?</h1>
          <p className="mx-auto max-w-2xl text-base text-slate-700 md:text-lg">
            Select the option that best describes what you need — you will be routed to the right team or form immediately.
          </p>
        </div>
      </section>

      <section className="bg-white pb-12">
        <div className="container-custom max-w-6xl space-y-6">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => openRoute("school_consultation")} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-[#0d2f4f]">Open School Route</button>
            <button onClick={() => openRoute("c360_session")} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-[#0d2f4f]">Open C360 Route</button>
            <button onClick={() => openRoute("general")} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-[#0d2f4f]">Open General Route</button>
            <button onClick={() => openRoute("support")} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-[#0d2f4f]">Open Support Route</button>
            <a href="/pricing#scholarship" className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-[#0d2f4f]">Open Scholarship Route</a>
          </div>

          <button onClick={() => openRoute("school_consultation")} className={`${ui.sections.brand} w-full rounded-[2rem] p-8 text-left`}>
            <span className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-amber-300"><Building2 className="h-4 w-4" />Featured Route</span>
            <h2 className="text-2xl font-bold md:text-3xl">Book a Free School Strategy Session</h2>
            <p className="mt-3 text-sm text-slate-100">Who this is for: School principals, academic directors, and heads of department considering an EduMeUp school partnership.</p>
            <p className="mt-3 text-sm text-amber-100">Response: Personal response from EduMeUp&apos;s Chief Adviser within 1 working day. Session scheduled within 5 working days.</p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-[#2366c9] font-semibold">Book a 30-Minute Strategy Session <ArrowRight className="h-4 w-4" /></span>
          </button>

          <div className="grid gap-5 md:grid-cols-2">
            <button onClick={() => openRoute("c360_session")} className={`${ui.cards.standard} p-6 text-left hover:border-[#2366c9]`}>
              <h3 className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900"><GraduationCap className="h-5 w-5 text-[#2366c9]" />Book a Cambridge 360° Hub Session</h3>
              <p className="mt-2 text-sm text-slate-600">For: Existing or prospective Cambridge 360° Hub subscribers wanting to book a live expert session (Plans 2, 3, or 4).</p>
              <p className="mt-3 text-sm font-medium text-slate-800">Response: Instant — Calendly booking opens immediately.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-[#2366c9]">Book Session via Calendly <ArrowRight className="h-4 w-4" /></span>
            </button>

            <button onClick={() => openRoute("general")} className={`${ui.cards.standard} p-6 text-left hover:border-[#2366c9]`}>
              <h3 className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900"><MessageSquare className="h-5 w-5 text-[#2366c9]" />General Enquiry — Students and Parents</h3>
              <p className="mt-2 text-sm text-slate-600">For: Students or parents with questions about courses, pricing, the diagnostic, tutoring, workbooks, or anything else on the platform.</p>
              <p className="mt-3 text-sm font-medium text-slate-800">Response: Within 1–2 working days.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-[#2366c9]">Send a Message <ArrowRight className="h-4 w-4" /></span>
            </button>

            <button onClick={() => openRoute("support")} className={`${ui.cards.standard} p-6 text-left hover:border-[#2366c9]`}>
              <h3 className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900"><Wrench className="h-5 w-5 text-[#2366c9]" />Technical Support</h3>
              <p className="mt-2 text-sm text-slate-600">For: Enrolled students, parents, or teachers with a technical problem — login issues, course access, workbook download, payment, or platform errors.</p>
              <p className="mt-3 text-sm font-medium text-slate-800">Response: Within 1 working day.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-[#2366c9]">Report a Problem <ArrowRight className="h-4 w-4" /></span>
            </button>

            <a href="/pricing#scholarship" className={`${ui.cards.standard} p-6 text-left hover:border-[#2366c9]`}>
              <h3 className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900"><Gift className="h-5 w-5 text-[#2366c9]" />Global Access Scholarship</h3>
              <p className="mt-2 text-sm text-slate-600">For: Students from qualifying countries who may be eligible for the EduMeUp Global Access Scholarship — 30–40% off for qualifying African countries and 15–20% off for qualifying Asian countries.</p>
              <p className="mt-3 text-sm font-medium text-slate-800">Response: Automatic — eligibility checked instantly.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-[#2366c9]">Check My Eligibility <ArrowRight className="h-4 w-4" /></span>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-10">
        <div className="container-custom max-w-4xl space-y-6">
          {activeRoute === "school_consultation" && (
            <div id="school-form" className={sectionClass}>
              <h2 className="text-2xl font-semibold text-slate-900">School Strategy Session</h2>
              <p className="mt-2 text-sm text-slate-600">Routes directly to the Chief Adviser inbox with the `school_partnership` tag.</p>
              {schoolMessage === "success" && <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">Thank you, {schoolSubmittedName}. Your request has been received. EduMeUp&apos;s Chief Adviser will contact you personally within 1 working day to schedule your 30-minute strategy session. Please check your inbox, including spam.</p>}
              {schoolMessage && schoolMessage !== "success" && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{schoolMessage}</p>}
              <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSchoolSubmit}>
                <input type="text" name="companyWebsite" autoComplete="off" tabIndex={-1} className="hidden" />
                <label className="text-sm font-medium text-slate-700">Full Name<input name="fullName" required maxLength={100} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" /></label>
                <label className="text-sm font-medium text-slate-700">Role / Title<select name="role" required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"><option value="">Select</option><option>Principal</option><option>Academic Director</option><option>Head of Department</option><option>School Owner</option><option>Other</option></select></label>
                <label className="text-sm font-medium text-slate-700">School Name<input name="schoolName" required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" /></label>
                <label className="text-sm font-medium text-slate-700">Country<select name="country" required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"><option value="">Select country</option>{COUNTRY_OPTIONS.map((country) => <option key={country}>{country}</option>)}</select></label>
                <label className="text-sm font-medium text-slate-700">Email Address<input name="email" type="email" required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" /></label>
                <label className="text-sm font-medium text-slate-700">Number of Cambridge students<select name="studentCount" required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"><option value="">Select</option><option>Under 50</option><option>50-100</option><option>100-250</option><option>250-500</option><option>Over 500</option><option>Not yet Cambridge students</option></select></label>
                <label className="text-sm font-medium text-slate-700 md:col-span-2">What prompted you to contact EduMeUp today?<textarea name="message" maxLength={300} placeholder="e.g. We are considering transitioning to Cambridge / We want to improve our O-Level results / A colleague recommended EduMeUp" className="mt-1 min-h-28 w-full rounded-md border border-slate-300 px-3 py-2" /></label>
                <input type="hidden" name="consultation_type" value="school_partnership" />
                <button disabled={loading === "school"} className="rounded-md bg-[#2366c9] px-5 py-2.5 text-[14px] font-semibold text-white disabled:opacity-60">{loading === "school" ? "Submitting..." : "Submit School Session Request"}</button>
              </form>
            </div>
          )}

          {activeRoute === "c360_session" && (
            <div id="c360-session" className={sectionClass}>
              <h2 className="text-2xl font-semibold text-slate-900">Cambridge 360° Hub Session Booking</h2>
              {!user ? (
                <div className="mt-4 rounded-xl border border-teal-200 bg-teal-50 p-4">
                  <p className="text-sm text-teal-900">Live expert sessions are included in Cambridge 360° Hub Plans 2, 3, and 4. View plans and subscribe at `/cambridge-consultancy`.</p>
                  <a href="/cambridge-consultancy" className="mt-3 inline-block rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white">View Cambridge Consultancy Plans</a>
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  <label className="block text-sm font-medium text-slate-700">Select Plan Tier
                    <select value={c360Plan} onChange={(e) => setC360Plan(e.target.value as "navigator" | "accelerator" | "excellenceSchool")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 md:max-w-md">
                      <option value="navigator">Plan 2 — Navigator Session (15 min)</option>
                      <option value="accelerator">Plan 3/4 Individual — Accelerator Session (30 min)</option>
                      <option value="excellenceSchool">Plan 4 School — Excellence School Session (45 min)</option>
                    </select>
                  </label>
                  <iframe src={c360Url} title="Calendly Booking" className="h-[760px] w-full rounded-xl border border-slate-200" />
                </div>
              )}
            </div>
          )}

          {activeRoute === "general" && (
            <div id="general-form" className={sectionClass}>
              <h2 className="text-2xl font-semibold text-slate-900">General Enquiry Form — Students & Parents</h2>
              {generalMessage === "success" && <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">Thank you for your message. Our team will respond within 1–2 working days. For faster answers, check `/for-students`, `/for-parents`, or `/pricing`.</p>}
              {generalMessage && generalMessage !== "success" && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{generalMessage}</p>}
              <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleGeneralSubmit}>
                <input type="text" name="companyWebsite" autoComplete="off" tabIndex={-1} className="hidden" />
                <label className="text-sm font-medium text-slate-700">Full Name<input name="fullName" required maxLength={100} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" /></label>
                <label className="text-sm font-medium text-slate-700">I am a...<select name="userType" required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"><option value="">Select</option><option>Student</option><option>Parent</option><option>Teacher</option><option>School Administrator</option><option>Other</option></select></label>
                <label className="text-sm font-medium text-slate-700">Email Address<input name="email" type="email" required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" /></label>
                <label className="text-sm font-medium text-slate-700">Subject / Topic
                  <select name="subject" required value={generalSubject} onChange={(e) => setGeneralSubject(e.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2">
                    <option value="">Select</option><option>Courses and Content</option><option>Pricing and Payments</option><option>Diagnostic and Results</option><option>Tutoring</option><option>Exam Prep Workbooks and Past Papers</option><option>O-Level Readiness Forecast</option><option>Cambridge 360° Hub</option><option>Technical Problem</option><option>Other</option>
                  </select>
                </label>
                {generalSubject === "Pricing and Payments" && <p className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 md:col-span-2">Many pricing questions are answered instantly on our Pricing page: <a href="/pricing" className="font-semibold underline">/pricing</a>.</p>}
                {generalSubject === "O-Level Readiness Forecast" && <p className="rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900 md:col-span-2">Full details about the Forecast are at <a href="/olevel-readiness-forecast" className="font-semibold underline">/olevel-readiness-forecast</a>.</p>}
                {generalSubject === "Technical Problem" && <p className="rounded-md border border-slate-300 bg-slate-50 p-3 text-sm text-slate-800 md:col-span-2">For technical issues, the Technical Support form gives us more context to resolve your problem faster. <button type="button" onClick={() => openRoute("support")} className="font-semibold underline">Open Technical Support Form</button></p>}
                <label className="text-sm font-medium text-slate-700 md:col-span-2">Your Message<textarea name="message" required minLength={20} maxLength={1000} placeholder="Please describe your question or issue as clearly as possible — include any relevant subject names, course names, or error messages." className="mt-1 min-h-28 w-full rounded-md border border-slate-300 px-3 py-2" /></label>
                <input type="hidden" name="consultation_type" value="general_enquiry" />
                <button disabled={loading === "general"} className="rounded-md bg-[#2366c9] px-5 py-2.5 text-[14px] font-semibold text-white disabled:opacity-60">{loading === "general" ? "Submitting..." : "Send Message"}</button>
              </form>
            </div>
          )}

          {activeRoute === "support" && (
            <div id="support-form" className={sectionClass}>
              <h2 className="text-2xl font-semibold text-slate-900">Technical Support Form</h2>
              {supportMessage === "success" && <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">Thank you for your report. Our technical team will respond within 1 working day. If your issue is urgent, please mark this in your message and we will prioritise it.</p>}
              {supportMessage && supportMessage !== "success" && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{supportMessage}</p>}
              <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSupportSubmit}>
                <input type="text" name="companyWebsite" autoComplete="off" tabIndex={-1} className="hidden" />
                <label className="text-sm font-medium text-slate-700">Full Name<input name="fullName" required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" /></label>
                <label className="text-sm font-medium text-slate-700">Email Address<input name="email" type="email" required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" /></label>
                <label className="text-sm font-medium text-slate-700">I am a...<select name="userType" required className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"><option value="">Select</option><option>Student</option><option>Parent</option><option>Teacher</option><option>School Administrator</option></select></label>
                <label className="text-sm font-medium text-slate-700">Type of Problem
                  <select name="problemType" required value={supportProblemType} onChange={(e) => setSupportProblemType(e.target.value)} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2">
                    <option value="">Select</option><option>Cannot log in</option><option>Course access problem</option><option>Payment issue</option><option>Workbook or past paper download issue</option><option>Diagnostic not loading</option><option>Spaced retrieval schedule not showing</option><option>AI advisor not responding</option><option>Error message on screen</option><option>Other</option>
                  </select>
                </label>
                <label className="text-sm font-medium text-slate-700">Your Account Email (if different)<input name="accountEmail" type="email" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2" /></label>
                <label className="text-sm font-medium text-slate-700 md:col-span-2">Describe the Problem<textarea name="message" required maxLength={1000} placeholder="Describe what you were doing when the problem occurred, what you expected to happen, and what happened instead. If you saw an error message, please copy it here." className="mt-1 min-h-28 w-full rounded-md border border-slate-300 px-3 py-2" /></label>
                <label className="text-sm font-medium text-slate-700">Device<select name="device" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"><option value="">Select device</option><option>Windows</option><option>Mac</option><option>iPhone</option><option>iPad</option><option>Android phone</option><option>Android tablet</option><option>Other</option></select></label>
                <label className="text-sm font-medium text-slate-700">Browser<select name="browser" className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"><option value="">Select browser</option><option>Chrome</option><option>Safari</option><option>Firefox</option><option>Edge</option><option>Other</option></select></label>
                <label className="text-sm font-medium text-slate-700 md:col-span-2">Screenshot or Screen Recording
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.mp4,.mov"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (!file) return setAttachment(null);
                      if (file.size > 10 * 1024 * 1024) {
                        setSupportMessage("File must be 10MB or smaller.");
                        e.currentTarget.value = "";
                        return;
                      }
                      setAttachment(file);
                    }}
                    className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                  <span className="mt-1 block text-xs text-slate-500">Accepted formats: JPG, PNG, MP4, MOV. Maximum size: 10MB.</span>
                </label>
                {(supportProblemType === "Payment issue" || supportProblemType === "Cannot log in" || supportProblemType === "Course access problem" || supportProblemType === "Workbook or past paper download issue") && (
                  <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800 md:col-span-2">This issue will be marked as urgent for faster handling.</p>
                )}
                <input type="hidden" name="consultation_type" value="technical_support" />
                <button disabled={loading === "support"} className="rounded-md bg-[#2366c9] px-5 py-2.5 text-[14px] font-semibold text-white disabled:opacity-60">{loading === "support" ? "Submitting..." : "Report Problem"}</button>
              </form>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl font-semibold text-slate-900">Response Time Commitments</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse overflow-hidden rounded-xl border border-slate-200">
              <thead className="bg-[#2366c9] text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm">Enquiry Type</th><th className="px-4 py-3 text-left text-sm">Routed To</th><th className="px-4 py-3 text-left text-sm">Response Time</th><th className="px-4 py-3 text-left text-sm">Channel</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200"><td className="px-4 py-3 text-sm">School Strategy Session</td><td className="px-4 py-3 text-sm">Chief Adviser — personal</td><td className="px-4 py-3 text-sm">Within 1 working day</td><td className="px-4 py-3 text-sm">Email from CA</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3 text-sm">Cambridge 360° Hub Session (Plans 2–4)</td><td className="px-4 py-3 text-sm">Calendly — instant</td><td className="px-4 py-3 text-sm">Instant booking</td><td className="px-4 py-3 text-sm">Calendly confirmation</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3 text-sm">General Student / Parent Enquiry</td><td className="px-4 py-3 text-sm">Support inbox</td><td className="px-4 py-3 text-sm">1–2 working days</td><td className="px-4 py-3 text-sm">Email reply</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3 text-sm">Technical Support</td><td className="px-4 py-3 text-sm">Technical support inbox</td><td className="px-4 py-3 text-sm">1 working day</td><td className="px-4 py-3 text-sm">Email reply</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3 text-sm">Payment / Urgent Access Issue</td><td className="px-4 py-3 text-sm">Finance + support — flagged</td><td className="px-4 py-3 text-sm">Same or next working day</td><td className="px-4 py-3 text-sm">Email reply</td></tr>
                <tr className="border-t border-slate-200"><td className="px-4 py-3 text-sm">Scholarship Enquiry</td><td className="px-4 py-3 text-sm">Automatic system check</td><td className="px-4 py-3 text-sm">Instant (auto-generated)</td><td className="px-4 py-3 text-sm">Email with discount code</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">EduMeUp operates Monday to Friday. Enquiries received on weekends or public holidays are responded to on the next working day. For enrolled students and parents with urgent platform access issues, the technical support form is monitored 7 days a week.</p>
        </div>
      </section>

      <section className="bg-slate-50 py-12">
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl font-semibold text-slate-900">Many Questions Are Already Answered — Instantly.</h2>
          <p className="mt-2 text-slate-600">Before sending a message, check these pages — you may find your answer in under a minute:</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Pricing Questions", "All course prices, chapter pricing, subscription options, workbook prices, and scholarship details — all in one place.", "/pricing"],
              ["How the Platform Works", "The 6-stage mastery cycle (Diagnose → Repair → Master → Verify → Retain → Grow Independent), the diagnostic system, and interactive learning model.", "/for-students"],
              ["School Partnership", "Full details of all school services, the 5-step partnership process, class diagnostics, teacher CPD, and how to get started.", "/for-schools"],
              ["Parent Questions", "Plain-English explanations of the parent dashboard, diagnostic reports, tutoring, payments, and support for your child.", "/for-parents"],
              ["Teacher Training & Certification", "The full T1–T6 Teacher Training Pathway — from the free T1 diagnostic to CCTE certification, SMK certification, and tutor network.", "/teacher-courses"],
              ["Cambridge Consultancy", "AI consultancy plans, session booking, Cambridge 360° Empowerment Hub features, plan comparison, and subscription options.", "/cambridge-consultancy"],
              ["Pre-O-Level Programmes", "Foundation courses in Mathematics, Physics, Chemistry, and English for Cambridge O-Level entry preparation.", "/pre-olevel"],
              ["Exam Prep Workbooks & Past Papers", "Topical workbooks, past paper collections, and subject mind maps with clear pricing and usage guidance.", "/exam-prep-workbooks"],
              ["Cambridge O-Level Readiness Forecast", "What the Forecast is, who it is for, what the report includes, and pricing options.", "/olevel-readiness-forecast"],
            ].map(([title, desc, href]) => (
              <Link key={title} href={href}>
                <a className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-[#0d2f4f]">
                  <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{desc}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-teal-700">Go to {href} <ArrowRight className="h-4 w-4" /></span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
