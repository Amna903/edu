import { useEffect } from "react";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Layout } from "@/components/Layout";
import { forecastPricing } from "@/config/forecastPricing";
import { forecastThresholds } from "@/config/forecastThresholds";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Compass,
  FileText,
  GraduationCap,
  Hourglass,
  Layers3,
  ListChecks,
  MapPinned,
  Medal,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

const profileCards = [
  {
    title: "The Overconfident Student",
    quote: "I have been doing well in school. I do not think I need extra preparation.",
    body:
      "That confidence may be justified. Or it may be based on a curriculum that never prepared you for Cambridge demands. The Forecast will tell you which.",
    outcome: "If you are right, you will have proof. If you are not, you will have time.",
    bg: "bg-[#f8fbff]",
    border: "border-brand-primary",
  },
  {
    title: "The Uncertain Student",
    quote: "I do not know if I am ready. I have heard about bridge courses but I have not done any.",
    body:
      "Uncertainty is the right instinct. The Forecast gives you a direct, data-backed answer so you can stop wondering and start acting.",
    outcome: "One session. A clear answer. A clear plan.",
    bg: "bg-white",
    border: "border-[#4f86e0]",
  },
  {
    title: "The Careless Student",
    quote: "I know I should do something. I just have not got around to it.",
    body:
      "There may still be time. But that depends entirely on where you are right now. The Forecast tells you how much time you actually have.",
    outcome: "It is not too late until it is. The Forecast tells you which side of that line you are on.",
    bg: "bg-[#f0fbf9]",
    border: "border-brand-primary",
  },
];

const whatItTellsYou = [
  {
    icon: Medal,
    title: "Your Predicted O-Level Grade Band",
    body: "A grade band forecast per subject: A* / A, B / A, C / B, D / C, or D / E track.",
  },
  {
    icon: Layers3,
    title: "Your Foundation Gap Analysis",
    body: "A systematic breakdown of the Pre-O-Level and bridge-course-level knowledge areas that drive the prediction.",
  },
  {
    icon: Hourglass,
    title: "What It Would Take to Improve",
    body: "The work required to move one grade band higher, with an estimated preparation range.",
  },
  {
    icon: Compass,
    title: "Your Recommended Starting Point",
    body: "A specific recommendation: O-Level now, Pre-O-Level first, or bridge courses first.",
  },
  {
    icon: ListChecks,
    title: "Subject-Specific Readiness Summary",
    body: "A written summary for each forecasted subject, written for the Academic Team review.",
  },
  {
    icon: MapPinned,
    title: "Your Grade Roadmap",
    body: "A trajectory view showing where you are now, where you could get to, and when you are ready.",
  },
];

const howSteps = [
  {
    step: "1",
    title: "Choose your subjects",
    body: "Select 1 subject or up to 3 subjects in one session. The Forecast covers all 10 Cambridge O-Level subjects.",
  },
  {
    step: "2",
    title: "Take the readiness assessment",
    body: "Complete a 60-90 minute foundation assessment per subject. Interactive questions plus written responses.",
  },
  {
    step: "3",
    title: "Receive your grade forecast",
    body: "Your predicted grade band, readiness score, and gap analysis appear immediately on screen.",
  },
  {
    step: "4",
    title: "Academic Team review",
    body: "The EduMeUp Academic Team reviews your result within 24 hours and adds personalised observations.",
  },
  {
    step: "5",
    title: "Get your report and roadmap",
    body: "The full report is delivered to your dashboard and email, including the recommended next steps.",
  },
];

const comparisonRows = [
  {
    left: "Knowledge gaps in a specific O-Level subject.",
    right: "Pre-O-Level and bridge-course-level foundation strength.",
  },
  {
    left: "Percentage score + topic gap list + recommended resources.",
    right: "Predicted grade band + gap-to-grade analysis + personalised roadmap.",
  },
  {
    left: "For students already preparing for O-Level.",
    right: "For students who have not done preparation and need a readiness forecast.",
  },
  {
    left: "Which topics do I still have gaps in?",
    right: "If I begin O-Level today, what grade am I on track for?",
  },
  {
    left: "Informational.",
    right: "Challenging.",
  },
  {
    left: "At any point during O-Level preparation.",
    right: "At entry to O-Level, before courses begin.",
  },
  {
    left: "Free or $18/subject.",
    right: "$25 per subject or $55 for 3 subjects.",
  },
];

const outcomes = [
  {
    title: "Strong Readiness",
    range: "85%+",
    tone: "bg-emerald-50 border-emerald-200",
    body: [
      "EduMeUp Academic Team confirms your O-Level readiness.",
      "You receive a targeted study plan focused on your specific gaps.",
      "Proceed directly to O-Level subject courses.",
      "Monthly re-forecasting is recommended to track the trajectory.",
    ],
  },
  {
    title: "Moderate Readiness",
    range: "55%-84%",
    tone: "bg-amber-50 border-amber-200",
    body: [
      "The Academic Team identifies the 2-3 foundation areas to address.",
      "You receive a prioritised action plan with estimated time to close each gap.",
      "1-2 targeted Pre-O-Level or bridge modules are recommended first.",
      "The Forecast is re-run after preparation to confirm improvement.",
    ],
  },
  {
    title: "Significant Gaps",
    range: "Below 55%",
    tone: "bg-rose-50 border-rose-200",
    body: [
      "The Academic Team prepares a personalised full roadmap.",
      "A structured Pre-O-Level and bridge-course plan is recommended before O-Level entry.",
      "The estimated timeline to readiness is calculated for you.",
      "Direct parent or student follow-up is offered to walk through the plan.",
    ],
  },
];

const faqs = [
  {
    q: "What is the difference between the Readiness Forecast and the diagnostic?",
    a: "The diagnostic identifies knowledge gaps in a specific O-Level subject. The Readiness Forecast assesses Pre-O-Level and bridge-course foundations and predicts the Cambridge grade band you are currently on track for.",
  },
  {
    q: "Who should take the Readiness Forecast?",
    a: "Students approaching O-Level entry, especially those in Grade 8, 9, or early Grade 10, and especially those who have not completed Pre-O-Level programmes or bridge courses.",
  },
  {
    q: "Is the Forecast a test I can fail?",
    a: "No. It is an assessment and a forecast, not a pass/fail test. Every result is paired with a clear roadmap from the EduMeUp Academic Team.",
  },
  {
    q: "What if my forecast result is very low?",
    a: "A low forecast result is a gift of honesty at the right moment. It means you found out before O-Level, not after the exams. The Academic Team will prepare a realistic roadmap and, when needed, offer a direct conversation to walk through it.",
  },
  {
    q: "How long does the Forecast take?",
    a: "60 to 90 minutes per subject. A 3-subject session can take 3 to 4 hours in total, including short breaks between subjects.",
  },
  {
    q: "Can I take the Forecast before I have done any O-Level study?",
    a: "Yes, and that is when it is most valuable. It is designed for entry to O-Level, before courses begin.",
  },
  {
    q: "Will my parents receive the forecast report?",
    a: "Yes for direct-registered families. A copy of the full report and roadmap is sent to the parent's registered email after Academic Team review.",
  },
  {
    q: "What subjects can I take the Forecast for?",
    a: "The full O-Level subject set on EduMeUp: Mathematics, Physics, Chemistry, Biology, Economics, Business Studies, English Language, Urdu, Islamiyat, and Pakistan Studies.",
  },
];

function setSeo() {
  const previousTitle = document.title;
  const metaDescription = document.querySelector('meta[name="description"]');
  const previousDescription = metaDescription?.getAttribute("content") || "";
  const canonical = document.querySelector('link[rel="canonical"]');
  const previousCanonical = canonical?.getAttribute("href") || "";

  document.title = "Cambridge O-Level Readiness Forecast | Know Your Grade Before You Start | EduMeUp";
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      "EduMeUp's Cambridge O-Level Readiness Forecast predicts your likely O-Level grade band before you start. Academic Team review included. $25 per subject.",
    );
  }

  if (canonical) {
    canonical.setAttribute("href", "/olevel-readiness-forecast");
  }

  return () => {
    document.title = previousTitle;
    if (metaDescription) {
      metaDescription.setAttribute("content", previousDescription);
    }
    if (canonical) {
      canonical.setAttribute("href", previousCanonical);
    }
  };
}

export default function OLevelReadinessForecast() {
  useEffect(setSeo, []);

  return (
    <Layout>
      <section className="border-b border-slate-200 bg-white">
        <div className="container-custom flex flex-wrap items-center gap-3 py-3 text-sm">
          <span className="font-semibold text-brand-primary">On this page:</span>
          <a href="#profiles" className="font-semibold text-brand-primary hover:underline">Profiles</a>
          <a href="#forecast-details" className="font-semibold text-brand-primary hover:underline">Forecast Details</a>
          <a href="#how-it-works" className="font-semibold text-brand-primary hover:underline">How It Works</a>
          <a href="#comparison" className="font-semibold text-brand-primary hover:underline">Compare</a>
          <a href="#pricing" className="font-semibold text-brand-primary hover:underline">Pricing</a>
          <a href="#faq" className="font-semibold text-brand-primary hover:underline">FAQ</a>
        </div>
      </section>

      <section className="relative overflow-hidden bg-brand-primary py-16 text-white md:min-h-[500px] md:py-20">
        <div
          className="absolute inset-0 opacity-25"
          style={{ backgroundImage: "repeating-linear-gradient(-35deg, rgba(255,255,255,.18) 0, rgba(255,255,255,.18) 2px, transparent 2px, transparent 18px)" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1.5 bg-white/10" />
        <div className="container-custom relative z-10 flex min-h-[320px] flex-col items-center justify-center text-center md:min-h-[420px]">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#eaf2ff]">Cambridge O-Level Readiness Forecast</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            You Think You Are Ready for O-Level. Let&apos;s Find Out.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/85 md:text-xl">
            The Cambridge O-Level Readiness Forecast gives you a precise, data-informed prediction of your O-Level grade band based on where your knowledge stands today. Taken at the point of entry to O-Level. Before the gap becomes the result.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/olevel-readiness-forecast/start">
              <span className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-primary hover:bg-[#f8fbff] transition-colors cursor-pointer">
                Take My Readiness Forecast
              </span>
            </Link>
            <a href="#how-it-works" className="rounded-lg border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-brand-primary transition-colors">
              See How It Works
            </a>
          </div>
        </div>
      </section>

      <section id="rubicon" className="bg-[#f8fbff]/50 py-14">
        <div className="container-custom grid gap-5 md:grid-cols-3">
          {[
            {
              icon: <Target className="h-6 w-6 text-brand-primary" />,
              title: "Most O-Level results are decided before Year 1 begins.",
              body: "The gap between what a student knows at O-Level entry and what the syllabus requires determines the ceiling of their performance.",
            },
            {
              icon: <CalendarClock className="h-6 w-6 text-brand-primary" />,
              title: "Two years is enough time - if it starts with an honest assessment.",
              body: "Students who discover gaps in Year 2 rarely have enough time to close them. Students who discover them at entry almost always do.",
            },
            {
              icon: <Compass className="h-6 w-6 text-brand-primary" />,
              title: "The Forecast shows you exactly where the gap is.",
              body: "What you do with that information determines everything that follows. EduMeUp gives the roadmap after the honest picture.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-center">{item.icon}</div>
              <h2 className="text-center text-xl font-semibold text-brand-navy">{item.title}</h2>
              <p className="mt-3 text-center text-sm leading-7 text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="profiles" className="bg-white py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-primary">Who Is This For</p>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">Is This Forecast For You?</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
              Three types of students take the Cambridge O-Level Readiness Forecast. All three leave knowing something they did not know before.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {profileCards.map((card) => (
              <article key={card.title} className={`rounded-2xl border-2 ${card.border} ${card.bg} p-6 shadow-sm`}>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">Profile</p>
                <h3 className="mt-2 text-xl font-semibold text-brand-navy">{card.title}</h3>
                <p className="mt-4 text-sm italic leading-7 text-brand-navy">&ldquo;{card.quote}&rdquo;</p>
                <p className="mt-4 text-sm leading-7 text-slate-700">{card.body}</p>
                <p className="mt-4 rounded-xl bg-white/70 px-4 py-3 text-sm font-semibold text-brand-primary">{card.outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="forecast-details" className="bg-white py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-primary">What It Tells You</p>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">Your Forecast. Six Things It Shows You.</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
              Not just what you know. What it means for your Cambridge result - and what to do about it.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {whatItTellsYou.map((item) => (
              <div key={item.title} className="rounded-2xl border-t-4 border-brand-primary bg-[#f8fbff] p-6 shadow-sm">
                <item.icon className="h-7 w-7 text-brand-primary" />
                <h3 className="mt-4 text-lg font-semibold text-brand-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="grid grid-cols-4 bg-brand-primary text-xs font-bold uppercase tracking-[0.16em] text-white">
              <div className="p-4">Readiness Score</div>
              <div className="p-4">Grade Forecast</div>
              <div className="p-4">What It Means</div>
              <div className="p-4">Recommended Action</div>
            </div>
            {forecastThresholds.map((band) => (
              <div key={band.gradeBand} className="grid grid-cols-4 border-t border-slate-200 text-sm">
                <div className={`p-4 font-semibold ${band.colorClass}`}>{band.min === 0 ? "Below 40%" : band.min === 85 ? "85%+" : band.min === 70 ? "70-84%" : band.min === 55 ? "55-69%" : band.min === 40 ? "40-54%" : ""}</div>
                <div className="p-4 font-semibold text-brand-primary">{band.gradeBand}</div>
                <div className="p-4 text-slate-600">{band.label}</div>
                <div className="p-4 text-slate-600">{band.action}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-brand-primary py-16 text-white">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/85">How the Forecast Works</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Five Steps From Sitting Down to Knowing Your Trajectory.</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-white/80 md:text-base">
              60 to 90 minutes per subject. This is longer than the standard diagnostic because the Forecast includes foundation assessment, grade prediction, and gap-to-grade analysis.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {howSteps.map((step) => (
              <div key={step.step} className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-brand-primary">{step.step}</div>
                <h3 className="mt-4 text-center text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-center text-sm leading-7 text-white/80">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="comparison" className="bg-[#f8fbff] py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-primary">Forecast vs Diagnostic</p>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">Is This Different from the EduMeUp Diagnostic?</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">Yes - significantly different. Here is exactly how.</p>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <div className="grid grid-cols-2 bg-brand-primary text-xs font-bold uppercase tracking-[0.16em] text-white">
              <div className="p-4">Standard Diagnostic</div>
              <div className="border-l border-white/10 p-4">Cambridge O-Level Readiness Forecast</div>
            </div>
            {comparisonRows.map((row, index) => (
              <div key={index} className={`grid grid-cols-2 border-t border-slate-200 text-sm ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                <div className="p-4 text-slate-600">{row.left}</div>
                <div className="border-l border-slate-200 p-4 font-semibold text-brand-primary">{row.right}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-brand-primary/20 bg-white p-5 text-sm leading-7 text-slate-700">
            Already taken an EduMeUp diagnostic? Good. The diagnostic told you which topics you have gaps in. The Readiness Forecast tells you what those gaps mean for your Cambridge grade - and what your grade could be if you close them. They are complementary.
          </div>
        </div>
      </section>

      <section id="outcomes" className="bg-white py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-primary">What Happens After</p>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">You Have Your Forecast. Now What?</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
              The Forecast is not a dead end. It is the point where EduMeUp turns honesty into direction.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {outcomes.map((item) => (
              <div key={item.title} className={`rounded-2xl border p-6 shadow-sm ${item.tone}`}>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">Forecast</p>
                <h3 className="mt-2 text-xl font-semibold text-brand-navy">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold text-brand-primary">{item.range}</p>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-700">
                  {item.body.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-brand-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-brand-primary py-16 text-white">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/85">Pricing</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Clear Pricing. Complete Picture.</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-2 text-brand-navy">
            <div className="rounded-2xl border border-white/15 bg-white p-6 shadow-lg">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">Single Subject Forecast</p>
              <div className="mt-4 text-5xl font-bold text-brand-primary">${forecastPricing.singleSubject}</div>
              <p className="mt-2 text-sm text-slate-500">per subject</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">{forecastPricing.sessionMinutesPerSubjectMin}-{forecastPricing.sessionMinutesPerSubjectMax} minutes · Full grade band prediction · Foundation gap analysis · Recommended starting point</p>
              <Link href="/olevel-readiness-forecast/start">
                <span className="mt-6 inline-flex rounded-lg bg-brand-primary px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy transition-colors cursor-pointer">
                  Choose Subject & Start Forecast
                </span>
              </Link>
            </div>
            <div className="rounded-2xl border border-white/15 bg-[#f8fbff] p-6 shadow-lg">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">3-Subject Session</p>
              <div className="mt-4 text-5xl font-bold text-brand-primary">${forecastPricing.threeSubjects}</div>
              <p className="mt-2 text-sm text-slate-500">for 3 subjects</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">Save ${forecastPricing.savings} versus 3 individual forecasts. All the same features, assessed one after another in a single session.</p>
              <Link href="/olevel-readiness-forecast/start?mode=3">
                <span className="mt-6 inline-flex rounded-lg bg-brand-primary px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy transition-colors cursor-pointer">
                  Choose 3 Subjects & Start Forecast
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-primary">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-4xl">Questions students ask before they start.</h2>
          </div>
          <div className="mx-auto mt-10 max-w-4xl">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.q} value={`faq-${index}`} className="rounded-xl border border-slate-200 px-5">
                  <AccordionTrigger className="text-left text-base font-semibold text-brand-navy hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-7 text-slate-600">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="final-cta" className="bg-brand-primary py-16 text-white">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/85">Final CTA</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">What Do You Want to Do Next?</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3 text-brand-navy">
            <div className="rounded-2xl border border-white/15 bg-white p-6 shadow-lg">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">Take My Readiness Forecast</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">One session. A complete grade forecast. A personalised roadmap.</p>
              <Link href="/olevel-readiness-forecast/start">
                <span className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-primary px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy transition-colors cursor-pointer">
                  Start My Forecast <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
            <div className="rounded-2xl border border-white/15 bg-[#f8fbff] p-6 shadow-lg">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">Start with a Free Diagnostic</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">Not sure if you are ready? Take the free diagnostic first - it identifies topic gaps.</p>
              <Link href="/diagnostics">
                <span className="mt-6 inline-flex items-center gap-2 rounded-lg border border-brand-primary px-5 py-3 text-sm font-semibold text-brand-primary hover:bg-brand-primary hover:text-white transition-colors cursor-pointer">
                  Take Free Diagnostic <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white p-6 shadow-lg">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">Talk to Us First</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">Questions about whether it is right for you? Contact us directly.</p>
              <Link href="/contact">
                <span className="mt-6 inline-flex items-center gap-2 rounded-lg border border-brand-primary px-5 py-3 text-sm font-semibold text-brand-primary hover:bg-brand-primary hover:text-white transition-colors cursor-pointer">
                  Contact EduMeUp <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
