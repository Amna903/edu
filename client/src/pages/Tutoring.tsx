import { useState } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";

export default function Tutoring() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white font-sans text-slate-700">
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-primary px-10 pb-14 pt-16 max-md:px-5 max-md:py-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(35,102,201,0.15)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary via-brand-sky to-brand-primary" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[58%_42%]">
          <div>
            <p className="mb-3.5 text-sm md:text-base font-bold uppercase tracking-[2.5px] text-blue-100">
              Personalised Cambridge Tutoring
            </p>
            <h1 className="mb-4 text-[40px] font-bold leading-[1.15] text-white max-md:text-[30px]">
              The Right Tutor.<br />The Right Subject.<br />Matched for You.
            </h1>
            <p className="mb-7 text-lg leading-[1.75] text-white/95">
              EduMeUp connects students with certified Cambridge tutors for personalised sessions — online globally or in person in major cities. All fees paid securely to EduMeUp. Never directly to the tutor.
            </p>
            <div className="mb-7 flex flex-wrap gap-2.5">
              {["\u2713 Every tutor EduMeUp-certified", "\u2713 Fees always via EduMeUp", "\u2713 Notes & worksheets included", "\u2713 Free 30-min demo session", "\u2713 Online worldwide"].map((pill) => (
                <span key={pill} className="rounded-full border border-white/35 bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white">
                  {pill}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3.5">
              <Link href="/find-a-tutor" className="inline-block rounded-lg bg-brand-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-primary-dark">
                Find a Tutor
              </Link>
              <a href="#demo" className="inline-block rounded-lg border-2 border-white/50 px-6 py-3 text-sm font-bold text-white transition hover:border-white">
                Book Free Demo Session
              </a>
            </div>
          </div>

          {/* Demo Box - hidden on mobile */}
          <div className="hidden rounded-2xl border border-brand-primary/20 bg-white/[0.06] p-7 lg:flex lg:flex-col lg:gap-3.5">
            <p className="mb-1 text-sm font-bold uppercase tracking-[1.5px] text-white">Your Tutoring Dashboard</p>
            <DemoItem label="Your Tutor" value="Mr Ahmed K. — Physics & Mathematics" sub="EduMeUp Certified · 47 sessions delivered" />
            <DemoItem label="Next Session" value="Tuesday 15 April · 4:00 PM" sub="Topic: Trigonometry — Sine and Cosine Rules" />
            <DemoItem label="Current Plan" value="Progress — 3 sessions/week" sub="Online · $100/month · 12 sessions this month" />
            <div className="rounded-lg border-l-[3px] border-brand-sky bg-white/[0.07] px-4 py-3.5">
              <p className="mb-1 text-xs uppercase tracking-[1px] text-white">Latest Session Note</p>
              <p className="text-sm md:text-base text-white">Strong improvement in algebraic manipulation. Focus next session on graph interpretation under timed conditions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* THREE GUARANTEES */}
      <section className="bg-neutral-surface px-10 py-16 max-md:px-5">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[2px] text-brand-primary">Why EduMeUp Tutoring</p>
          <h2 className="mb-9 text-[30px] font-bold text-brand-navy">Three Guarantees Every Parent and Student Gets</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ProtectCard icon="🔒" title="All Fees Paid to EduMeUp" text="Every tutoring fee is paid securely to EduMeUp — never directly to the tutor. If you are ever asked to pay a tutor directly, report it to us immediately. Your money is always protected." />
            <ProtectCard icon="🎓" title="Every Tutor Is Certified" text="Every EduMeUp tutor passes the T5 Tutor Certification Pathway — a rigorous subject knowledge test (81% pass mark) and a full professional training programme. No unverified tutors — ever." />
            <ProtectCard icon="📚" title="Everything Included" text="Notes, worksheets, online platform tests, and three dashboards (Student, Parent, Tutor) are included in every tutoring plan — at no extra cost. A free 30-minute demo session before any plan starts." />
          </div>
        </div>
      </section>

      {/* 1-TO-1 PRICING */}
      <section className="px-10 py-16 max-md:px-5" id="find-tutor">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[2px] text-brand-primary">1-to-1 Booking · TB2</p>
          <h2 className="mb-2.5 text-[30px] font-bold text-brand-navy">1-to-1 Tutoring Plans — Monthly</h2>
          <p className="mb-9 max-w-[700px] text-[15px] leading-[1.65] text-neutral-slate-gray">
            One student. One certified tutor. Fully personalised. Choose your plan based on how many sessions per week your learning goals require.
          </p>

          {/* O-Level Table */}
          <div className="mb-10">
            <p className="mb-1.5 text-lg font-bold text-brand-navy">Cambridge O-Level · IGCSE · Pre-O-Level · Bridge Courses</p>
            <p className="mb-5 text-[13px] text-neutral-slate-gray">All online sessions are 50 minutes. Physical sessions (in major cities) add $40/month.</p>
            <div className="overflow-x-auto rounded-xl border border-neutral-border shadow-sm">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr>
                    <th className="bg-brand-navy px-4 py-3.5 text-left text-[13px] font-bold text-white">Plan</th>
                    <th className="bg-brand-primary px-4 py-3.5 text-left text-[13px] font-bold text-white">Online / Month</th>
                    <th className="bg-brand-navy px-4 py-3.5 text-left text-[13px] font-bold text-white">Physical (+$40)</th>
                    <th className="bg-brand-navy px-4 py-3.5 text-left text-[13px] font-bold text-white">Sessions / Week</th>
                    <th className="bg-brand-navy px-4 py-3.5 text-left text-[13px] font-bold text-white">Length</th>
                    <th className="bg-brand-navy px-4 py-3.5 text-left text-[13px] font-bold text-white">Cost / Session</th>
                  </tr>
                </thead>
                <tbody>
                  <PricingRow plan="Starter" online="$70" physical="$110" sessions="2 sessions" length="50 min" cost="~$8.75" />
                  <PricingRow plan="Progress" badge="Most Popular" online="$100" physical="$140" sessions="3 sessions" length="50 min" cost="~$8.33" even />
                  <PricingRow plan="Intensive" online="$160" physical="$200" sessions="5 sessions" length="50 min" cost="~$8.00" />
                </tbody>
              </table>
            </div>
          </div>

          {/* A-Level Table */}
          <div className="mb-10">
            <p className="mb-1.5 text-lg font-bold text-brand-navy">A-Level (30% Uplift Applied to All O-Level Rates)</p>
            <div className="overflow-x-auto rounded-xl border border-neutral-border shadow-sm">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr>
                    <th className="bg-brand-navy px-4 py-3.5 text-left text-[13px] font-bold text-white">Plan</th>
                    <th className="bg-brand-primary px-4 py-3.5 text-left text-[13px] font-bold text-white">Online / Month</th>
                    <th className="bg-brand-navy px-4 py-3.5 text-left text-[13px] font-bold text-white">Physical (+$40)</th>
                    <th className="bg-brand-navy px-4 py-3.5 text-left text-[13px] font-bold text-white">Sessions / Week</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border-b border-neutral-border px-4 py-3.5 text-sm font-bold text-brand-navy">A-Level Starter</td><td className="border-b border-neutral-border px-4 py-3.5 text-base font-bold text-brand-primary">$90</td><td className="border-b border-neutral-border px-4 py-3.5 text-sm">$130</td><td className="border-b border-neutral-border px-4 py-3.5 text-sm text-neutral-slate-gray">2 sessions</td></tr>
                  <tr className="bg-neutral-surface"><td className="border-b border-neutral-border px-4 py-3.5 text-sm font-bold text-brand-navy">A-Level Progress</td><td className="border-b border-neutral-border px-4 py-3.5 text-base font-bold text-brand-primary">$130</td><td className="border-b border-neutral-border px-4 py-3.5 text-sm">$170</td><td className="border-b border-neutral-border px-4 py-3.5 text-sm text-neutral-slate-gray">3 sessions</td></tr>
                  <tr><td className="px-4 py-3.5 text-sm font-bold text-brand-navy">A-Level Intensive</td><td className="px-4 py-3.5 text-base font-bold text-brand-primary">$210</td><td className="px-4 py-3.5 text-sm">$250</td><td className="px-4 py-3.5 text-sm text-neutral-slate-gray">5 sessions</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bundle Strip */}
          <div className="flex flex-col items-center justify-between gap-6 rounded-xl border border-brand-primary/20 bg-brand-primary-soft p-6 sm:flex-row">
            <div>
              <p className="text-base font-bold text-brand-navy">Add a Tutor to Your EduMeUp Course — Save 20%</p>
              <p className="mt-1 text-[13px] text-neutral-slate-gray">When you add a tutoring plan to an active EduMeUp platform course, your course fee is automatically reduced by 20% at checkout. No code needed.</p>
            </div>
            <Link href="/pricing" className="inline-block whitespace-nowrap rounded-lg bg-brand-primary px-5 py-2.5 text-[13px] font-bold text-white transition hover:bg-brand-primary-dark">
              See Full Pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* GROUP BOOKING */}
      <section className="bg-neutral-surface px-10 py-16 max-md:px-5">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[2px] text-brand-primary">Group Booking · TB1 · 2–7 Students</p>
          <h2 className="mb-2.5 text-[30px] font-bold text-brand-navy">Group Tutoring — Share the Session, Share the Cost</h2>
          <p className="mb-9 max-w-[700px] text-[15px] leading-[1.65] text-neutral-slate-gray">
            2 to 7 students share one certified tutor session. The organiser who forms and manages the group pays 70% of the standard online rate. All other group members pay 80%. Physical add-on: +$40 per member per month.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border-l-4 border-brand-primary bg-white p-6 shadow-sm">
              <p className="mb-3.5 text-[15px] font-bold text-brand-navy">Group Organiser (pays 70% of standard rate)</p>
              <GroupRow role="Starter (2 sessions/week)" price="$49/month" />
              <GroupRow role="Progress (3 sessions/week)" price="$70/month" />
              <GroupRow role="Intensive (5 sessions/week)" price="$112/month" last />
            </div>
            <div className="rounded-xl border-l-4 border-brand-primary bg-white p-6 shadow-sm">
              <p className="mb-3.5 text-[15px] font-bold text-brand-navy">Each Other Group Member (pays 80% of standard rate)</p>
              <GroupRow role="Starter (2 sessions/week)" price="$56/month" />
              <GroupRow role="Progress (3 sessions/week)" price="$80/month" />
              <GroupRow role="Intensive (5 sessions/week)" price="$128/month" last />
            </div>
          </div>
          <div className="mt-5 rounded-lg border border-neutral-border bg-white p-4 text-[13px] text-neutral-slate-gray shadow-sm">
            <strong className="text-brand-navy">Example — Group of 5 students, Starter plan, online:</strong> Organiser: $49/month. 4 other members: 4 × $56 = $224. Total group cost: $273/month. Per student average: <strong className="text-brand-primary">$54.60/month</strong>.
          </div>

          {/* Non-Cambridge Callout */}
          <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-xl border border-neutral-border bg-blue-50/60 p-7 sm:flex-row">
            <div>
              <p className="text-[17px] font-bold text-brand-navy">Non-Cambridge Curricula</p>
              <p className="mt-1 text-[13px] text-neutral-slate-gray">Matric, FSc, and other curricula — tutoring pricing arranged individually. Contact us to discuss availability and rates for your specific curriculum.</p>
            </div>
            <Link href="/contact" className="inline-block whitespace-nowrap rounded-lg bg-brand-primary px-5 py-2.5 text-[13px] font-bold text-white transition hover:bg-brand-primary-dark">
              Contact Us →
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="bg-blue-50/50 px-10 py-16 max-md:px-5">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[2px] text-brand-primary">Included in Every Plan</p>
          <h2 className="mb-2.5 text-[30px] font-bold text-brand-navy">What Every Tutoring Plan Includes</h2>
          <p className="mb-9 max-w-[700px] text-[15px] leading-[1.65] text-neutral-slate-gray">
            These are included in every TB1 and TB2 plan at every price point — Starter, Progress, and Intensive. No upsells, no hidden extras.
          </p>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <IncludedItem icon="📋" text="Session Notes" sub="Written by tutor after each session" />
            <IncludedItem icon="📄" text="Practice Worksheets" sub="Curriculum-aligned per topic" />
            <IncludedItem icon="💻" text="Online Platform Tests" sub="Track progress between sessions" />
            <IncludedItem icon="📊" text="Student Dashboard" sub="Live progress and session history" />
            <IncludedItem icon="👨‍👩‍👦" text="Parent Dashboard" sub="Reports and session summaries" />
            <IncludedItem icon="📈" text="Tutor Management" sub="Booking, scheduling, notes" />
            <IncludedItem icon="📅" text="Monthly Report" sub="Published by EduMeUp Academic Team" />
            <IncludedItem icon="🎯" text="Curriculum Provided" sub="Tutor follows EduMeUp framework" />
          </div>
        </div>
      </section>

      {/* FREE DEMO */}
      <section className="bg-neutral-surface px-10 py-16 max-md:px-5" id="demo">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[2px] text-brand-primary">No Commitment Required</p>
          <h2 className="mb-2.5 text-[30px] font-bold text-brand-navy">Free 30-Minute Demo Session</h2>
          <p className="mb-9 max-w-[700px] text-[15px] leading-[1.65] text-neutral-slate-gray">
            Before committing to any tutoring plan, every new student gets a free 30-minute demo session with an EduMeUp certified tutor. No payment. No obligation. Just a genuine experience of what EduMeUp tutoring delivers.
          </p>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            <DemoStep num={1} title="Contact Us" desc="WhatsApp or contact form. Tell us your subject, grade level, and preferred session time." />
            <DemoStep num={2} title="We Match You" desc="EduMeUp staff match you with a certified tutor for your subject — consultative, not self-serve." />
            <DemoStep num={3} title="Free Demo Session" desc="30 minutes. Online. The tutor follows your current EduMeUp topic or a topic you choose." />
            <DemoStep num={4} title="Choose Your Plan" desc="If you are happy with the demo, choose your Starter, Progress, or Intensive plan. No pressure." />
          </div>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-block rounded-lg bg-brand-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-primary-dark">
              Book My Free Demo Session
            </Link>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#25D166] px-6 py-3 text-sm font-bold text-white">
              <WhatsAppIcon />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* WHY EDUMEUP */}
      <section className="px-10 py-16 max-md:px-5">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[2px] text-brand-primary">EduMeUp vs Private Tutors</p>
          <h2 className="mb-9 text-[30px] font-bold text-brand-navy">Why Choose EduMeUp Tutoring?</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <WhyCard title="Financial Protection" text="All fees flow through EduMeUp. If a tutor cancels, you get a refund or reschedule — not a dispute with an individual. Private tutors offer no such protection." />
            <WhyCard title="Certified, Not Self-Certified" text={'EduMeUp tutors pass the T5 Tutor Certification Pathway \u2014 a formal, externally administered test and training programme. A tutor\u2019s claim to be \u201cexperienced\u201d is not EduMeUp certification.'} />
            <WhyCard title="Curriculum Always Ready" text="Your tutor has the EduMeUp course framework — notes, worksheets, platform tests, and past paper materials — ready for every session. No time wasted on preparation gaps." />
            <WhyCard title="Platform + Tutor = Compound Effect" text="Students on EduMeUp platform courses who add a tutor benefit from both: the spaced retrieval and mastery system of the platform, reinforced and personalised by the tutor in every session." />
            <WhyCard title="Monthly Academic Oversight" text="Every tutoring student receives a monthly performance report from the EduMeUp Academic Team — a professional document for parents and students that tracks real progress, not just session attendance." />
            <WhyCard title="Cost Per Session Comparison" text="EduMeUp Progress plan: $8.33 per session (online). Private Cambridge tutors in most markets: $25–$60 per session. EduMeUp delivers certified, curriculum-aligned, platform-connected tutoring at a fraction of the market rate." />
          </div>
          <div className="mt-6 rounded-lg border-l-4 border-brand-navy bg-neutral-surface p-5 text-[13px] leading-[1.6] text-neutral-slate-gray">
            <strong className="text-brand-navy">Are you a Cambridge teacher?</strong> EduMeUp certified tutors earn in USD, work with students globally, receive ready-made curriculum materials, and are fully managed by the EduMeUp platform.{" "}
            <Link href="/for-teachers" className="font-bold text-brand-primary">Learn about becoming an EduMeUp certified tutor →</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-neutral-surface px-10 py-16 max-md:px-5">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[2px] text-brand-primary">Frequently Asked Questions</p>
          <h2 className="mb-8 text-[30px] font-bold text-brand-navy">Tutoring Questions — Answered</h2>
          <div className="flex flex-col">
            {faqData.map((faq, i) => (
              <div key={i} className="border-b border-neutral-border">
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="flex w-full items-center justify-between px-1 py-4 text-left text-[15px] font-bold text-brand-navy transition hover:text-brand-primary"
                >
                  {faq.q}
                  <span className={`ml-4 text-lg text-brand-primary transition-transform ${openFaq === i ? "rotate-180" : ""}`}>▾</span>
                </button>
                {openFaq === i && (
                  <p className="px-1 pb-4 text-sm leading-[1.7] text-neutral-slate-gray">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-blue-50/50 px-10 py-[72px] text-center max-md:px-5">
        <div className="mx-auto max-w-[800px]">
          <h2 className="mb-3 text-[34px] font-bold text-brand-navy">Ready to Find Your Tutor?</h2>
          <p className="mb-9 text-base leading-[1.6] text-neutral-slate-gray">
            Start with a free 30-minute demo session. No payment. No commitment. Just a genuine experience of what EduMeUp certified tutoring delivers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-block rounded-lg bg-brand-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-primary-dark">
              Book Free Demo Session
            </Link>
            <Link href="/pricing" className="inline-block rounded-lg border-2 border-brand-primary/40 px-6 py-3 text-sm font-bold text-brand-primary transition hover:border-brand-primary">
              View Full Pricing
            </Link>
            <Link href="/for-teachers" className="inline-block rounded-lg border-2 border-brand-primary/40 px-6 py-3 text-sm font-bold text-brand-primary transition hover:border-brand-primary">
              Become a Tutor
            </Link>
          </div>
        </div>
      </section>
      </div>
    </Layout>
  );
}

/* ─── Sub-components ─── */

function DemoItem({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-lg border-l-[3px] border-brand-primary bg-white/[0.07] px-4 py-3.5">
      <p className="mb-1 text-xs uppercase tracking-[1px] text-white">{label}</p>
      <p className="text-base md:text-lg font-bold text-white">{value}</p>
      <p className="mt-0.5 text-sm text-white/95">{sub}</p>
    </div>
  );
}

function ProtectCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="rounded-xl border border-neutral-border border-t-4 border-t-brand-primary bg-white p-7 shadow-sm">
      <p className="mb-3.5 text-[32px]">{icon}</p>
      <p className="mb-2.5 text-[17px] font-bold text-brand-navy">{title}</p>
      <p className="text-sm leading-[1.6] text-neutral-slate-gray">{text}</p>
    </div>
  );
}

function PricingRow({ plan, badge, online, physical, sessions, length, cost, even }: {
  plan: string; badge?: string; online: string; physical: string; sessions: string; length: string; cost: string; even?: boolean;
}) {
  return (
    <tr className={even ? "bg-neutral-surface" : ""}>
      <td className="border-b border-neutral-border px-4 py-3.5 text-sm font-bold text-brand-navy">
        {plan} {badge && <span className="ml-2 inline-block rounded bg-brand-primary-soft px-2 py-0.5 text-[10px] font-bold text-brand-primary">{badge}</span>}
      </td>
      <td className="border-b border-neutral-border px-4 py-3.5 text-base font-bold text-brand-primary">{online}</td>
      <td className="border-b border-neutral-border px-4 py-3.5 text-sm">{physical}</td>
      <td className="border-b border-neutral-border px-4 py-3.5 text-sm text-neutral-slate-gray">{sessions}</td>
      <td className="border-b border-neutral-border px-4 py-3.5 text-sm">{length}</td>
      <td className="border-b border-neutral-border px-4 py-3.5 text-sm">{cost}</td>
    </tr>
  );
}

function GroupRow({ role, price, last }: { role: string; price: string; last?: boolean }) {
  return (
    <div className={`flex items-center justify-between py-2 text-[13px] ${last ? "" : "border-b border-neutral-border"}`}>
      <span className="text-neutral-slate-gray">{role}</span>
      <span className="font-bold text-brand-primary">{price}</span>
    </div>
  );
}

function IncludedItem({ icon, text, sub }: { icon: string; text: string; sub: string }) {
  return (
    <div className="rounded-lg border border-neutral-border bg-white p-4 text-center shadow-sm">
      <p className="mb-2.5 text-2xl">{icon}</p>
      <p className="text-[13px] font-semibold text-brand-navy">{text}</p>
      <p className="mt-1 text-xs text-neutral-muted">{sub}</p>
    </div>
  );
}

function DemoStep({ num, title, desc }: { num: number; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-neutral-border bg-white p-6 text-center shadow-sm">
      <div className="mx-auto mb-3.5 flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary text-lg font-bold text-white">
        {num}
      </div>
      <p className="mb-2 text-sm font-bold text-brand-navy">{title}</p>
      <p className="text-xs leading-[1.5] text-neutral-slate-gray">{desc}</p>
    </div>
  );
}

function WhyCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-neutral-border bg-white p-6 shadow-sm">
      <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary-soft text-lg text-brand-primary">✓</div>
      <p className="mb-2 text-[15px] font-bold text-brand-navy">{title}</p>
      <p className="text-[13px] leading-[1.6] text-neutral-slate-gray">{text}</p>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M20.52 3.48A11.93 11.93 0 0012.01 0C5.4 0 .01 5.39.01 12a11.96 11.96 0 001.61 6.02L0 24l6.16-1.61A11.96 11.96 0 0012.01 24C18.62 24 24 18.61 24 12c0-3.2-1.25-6.2-3.48-8.52z" fill="#25D166"/>
    </svg>
  );
}

/* ─── FAQ Data ─── */

const faqData = [
  { q: "How does EduMeUp match me with a tutor?", a: "EduMeUp staff match students with certified tutors based on subject, grade level, availability, location (for physical sessions), and tutor specialisation. This is a consultative matching process — not a self-serve booking system. Once matched, you have the option to take a free 30-minute demo session before confirming any plan." },
  { q: "Can I change my tutor if I am not satisfied?", a: "Yes. You can request a tutor change at any time by contacting support@edumeup.com. EduMeUp will arrange a new match. We aim to fulfil change requests within 5 working days, though availability may vary by subject and location." },
  { q: "What happens if my tutor cancels a session?", a: "Sessions cancelled by EduMeUp or the tutor are fully refunded to your account or rescheduled at your choice — no questions asked. If a session is cancelled by the student with less than 24 hours' notice, it is not refunded per the tutoring terms." },
  { q: "Do I need to be enrolled in an EduMeUp course to use the tutoring service?", a: "No. You can use EduMeUp tutoring independently of platform course enrolment. However, students who combine the tutoring service with an EduMeUp platform course benefit from both the spaced retrieval system and the personalised tutor support — and receive 20% off their course fee." },
  { q: "Are physical sessions available everywhere?", a: "Physical (in-person) sessions are available in major cities where EduMeUp certified tutors are located. Online sessions are available globally — any student with a reliable internet connection can access online tutoring. Contact us to check physical tutor availability in your city." },
  { q: "Can I cancel my tutoring plan at any time?", a: "Tutoring plans are monthly. A minimum commitment of one full month applies. After the first month, plans may be cancelled with 7 days' written notice to support@edumeup.com. Cancellation stops future charges but does not refund the current month." },
];
