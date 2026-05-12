import { useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import type { SubjectData } from "@/data/subjects/types";
import { ArrowRight, CheckCircle2, ChevronRight, Clock3, GraduationCap, Sparkles } from "lucide-react";
import { Link } from "wouter";

type SubjectPageProps = {
  data: SubjectData;
};

function setMetaTag(selector: string, value: string, attribute: "name" | "property") {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    const [, key, content] = selector.match(/meta\[(name|property)="([^"]+)"\]/) || [];
    if (key && content) {
      element.setAttribute(key, content);
    }
    document.head.appendChild(element);
  }
  element.setAttribute("content", value);
}

export function SubjectPage({ data }: SubjectPageProps) {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";
    const canonical = document.querySelector('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute("href") || "";
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const previousOgTitle = ogTitle?.getAttribute("content") || "";
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const previousOgDescription = ogDescription?.getAttribute("content") || "";
    const ogImage = document.querySelector('meta[property="og:image"]');
    const previousOgImage = ogImage?.getAttribute("content") || "";
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const previousOgUrl = ogUrl?.getAttribute("content") || "";
    const keywords = document.querySelector('meta[name="keywords"]');
    const previousKeywords = keywords?.getAttribute("content") || "";

    document.title = data.seo.title;
    if (metaDescription) {
      metaDescription.setAttribute("content", data.seo.description);
    }

    if (canonical) {
      canonical.setAttribute("href", data.seo.canonicalUrl);
    }

    if (ogTitle) {
      ogTitle.setAttribute("content", data.seo.ogTitle);
    }
    if (ogDescription) {
      ogDescription.setAttribute("content", data.seo.ogDescription);
    }
    if (ogImage) {
      ogImage.setAttribute("content", "https://edume.up/og-homepage-1200x630.jpg");
    }
    if (ogUrl) {
      ogUrl.setAttribute("content", data.seo.canonicalUrl);
    }
    if (keywords) {
      keywords.setAttribute("content", data.seo.keywords);
    }

    const schemaId = "subject-course-schema";
    const previousSchema = document.getElementById(schemaId);
    if (previousSchema) {
      previousSchema.remove();
    }

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.id = schemaId;
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Course",
      name: data.subjectName,
      description: data.seo.description,
      provider: {
        "@type": "Organization",
        name: "EduMeUp",
        url: "https://edume.up",
      },
      url: data.seo.canonicalUrl,
      educationalCredentialAwarded: "Cambridge O-Level",
      educationalLevel: "secondary",
    });
    document.head.appendChild(schema);

    return () => {
      document.title = previousTitle;
      if (metaDescription) metaDescription.setAttribute("content", previousDescription);
      if (canonical) canonical.setAttribute("href", previousCanonical);
      if (ogTitle) ogTitle.setAttribute("content", previousOgTitle);
      if (ogDescription) ogDescription.setAttribute("content", previousOgDescription);
      if (ogImage) ogImage.setAttribute("content", previousOgImage);
      if (ogUrl) ogUrl.setAttribute("content", previousOgUrl);
      if (keywords) keywords.setAttribute("content", previousKeywords);
      schema.remove();
    };
  }, [data]);

  return (
    <Layout>
      <section className="bg-gradient-to-b from-blue-50/80 to-white py-16 md:py-20">
        <div className="container-custom grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#2366c9]">{data.subjectCode}</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-slate-900 md:text-6xl">{data.heroHeadline}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">{data.heroSubHeadline}</p>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">{data.heroCopy}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={data.diagnosticLink} className="inline-flex items-center rounded-lg bg-[#2366c9] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1d57aa]">
                Take Free Diagnostic <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a href={data.enrollUrl} className="inline-flex items-center rounded-lg border border-[#2366c9] px-5 py-3 text-sm font-semibold text-[#2366c9] transition hover:bg-[#eef6ff]">
                Enrol Now <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
            <div className="mt-8 grid gap-3 text-sm md:grid-cols-4">
              {[
                "H5P Interactive Content",
                "80% Mastery Gate",
                "Free Diagnostic Available",
                "Cambridge Syllabus Aligned",
              ].map((item) => (
                <div key={item} className="rounded-xl border border-blue-100 bg-white px-4 py-3 text-slate-700 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-xl">
            <div className="rounded-2xl bg-[#eef6ff] p-5 text-slate-900 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2366c9]">Quick Preview</p>
              <h2 className="mt-3 text-2xl font-bold">{data.subjectName}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{data.subjectName} is built to help students move from uncertainty to mastery with a clear path, strong practice, and guided review.</p>
              <div className="mt-5 grid gap-3 text-sm text-slate-700">
                <div className="flex items-start gap-2 rounded-xl bg-white p-3 shadow-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2366c9]" />{data.topicsAvailable} topics currently available</div>
                <div className="flex items-start gap-2 rounded-xl bg-white p-3 shadow-sm"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#2366c9]" />{data.syllabusYear}</div>
                <div className="flex items-start gap-2 rounded-xl bg-white p-3 shadow-sm"><GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-[#2366c9]" />{data.examBoard}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-blue-100 bg-blue-50/40 py-8">
        <div className="container-custom grid gap-4 md:grid-cols-4">
          {[
            { label: "Exam Board", value: data.examBoard },
            { label: "Topics Available", value: `${data.topicsAvailable} of ${data.topicsTotal}` },
            { label: "Syllabus Year", value: data.syllabusYear },
            { label: "Starting Price", value: data.priceFrom },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#dbe4ef] bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2366c9]">{item.label}</p>
              <p className="mt-2 text-lg font-semibold text-[#1E3A5F]">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-custom grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2366c9]">Course Overview</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">{data.subjectName} Designed for Real Mastery</h2>
            <ul className="mt-6 space-y-4">
              {data.keyFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-[#eef6ff] p-4 text-slate-700 shadow-sm">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#2366c9]" />
                  <span className="leading-7">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-blue-100 bg-[#eef6ff] p-6 shadow-sm">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <svg viewBox="0 0 360 360" className="h-auto w-full" role="img" aria-label="Education illustration">
                <circle cx="180" cy="180" r="110" fill="#eef6ff" />
                <circle cx="180" cy="180" r="70" fill="#dbeafe" />
                <path d="M110 215L180 150L250 215" fill="none" stroke="#2366c9" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="138" y="210" width="84" height="52" rx="10" fill="#1E3A5F" />
                <rect x="150" y="222" width="60" height="8" rx="4" fill="#bfdbfe" />
                <rect x="150" y="236" width="46" height="8" rx="4" fill="#bfdbfe" />
              </svg>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-600">Interactive exercises, clear progression, and targeted revision work together so students understand the subject before moving forward.</p>
          </div>
        </div>
      </section>

      <section className="bg-blue-50/40 py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2366c9]">Topics Covered</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">{data.topicsTotal} Topics, Clear Availability, Simple Progression</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">Teal topics are available now. Amber topics are being added continuously.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {data.topics.map((topic) => (
              <div
                key={topic.number}
                className={`rounded-2xl border p-5 shadow-sm ${topic.available ? "border-blue-100 bg-white" : "border-amber-200 bg-amber-50"}`}
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2366c9]">Topic {topic.number}</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{topic.name}{topic.available ? "" : " ◷"}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{topic.available ? "Available now." : "Being added continuously."}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-[#2366c9]" /> Available</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-amber-400" /> Being Added Continuously</span>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2366c9]">Pricing Summary</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">{data.priceFrom}</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">{data.pricingNote}</p>
            <p className="mt-4 text-sm text-slate-600">Chapter courses available from $6/chapter. Full pricing at <a href="/pricing" className="font-semibold text-[#2366c9] underline decoration-[#2366c9]/40 underline-offset-4">/pricing</a>. Scholarship support available for qualifying countries - see /pricing for details.</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2366c9]">How EduMeUp Teaches This Subject</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Three Core Methods, Built Into Every Subject</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ["H5P Interactive Content", "Every topic is taught through interactive exercises, not passive video. Students engage, answer, and demonstrate understanding before moving on."],
              ["80% Mastery Gate", "Students cannot advance to the next topic until they achieve 80% on the current topic assessment. This ensures genuine understanding."],
              ["AI Study Advisor", "AI-powered guidance identifies the specific concept that needs attention and points the student to the right resource."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-blue-100 bg-[#eef6ff] p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2366c9]">Method</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-50/40 py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2366c9]">Related Courses</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Continue Into the Right Next Step</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {data.relatedCourses.map((course) => (
              <a key={course.name} href={course.url} className="group rounded-2xl border border-[#dbe4ef] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2366c9]">Related Course</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">{course.name}</h3>
                <div className="mt-4 inline-flex items-center text-sm font-semibold text-[#2366c9]">
                  Open course <ChevronRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-50/40 py-16">
        <div className="container-custom flex flex-col items-start gap-5 rounded-3xl border border-blue-100 bg-white p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2366c9]">Take the Free Diagnostic</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Not sure if you need the full course?</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">Take our free {data.subjectName.toLowerCase()} diagnostic first and see exactly where you stand before you enrol.</p>
          </div>
          <a href={data.diagnosticLink} className="inline-flex items-center rounded-lg bg-[#2366c9] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1d57aa]">
            Start Diagnostic <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2366c9]">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Questions Students Ask Before They Start</h2>
          </div>
          <Accordion type="single" collapsible className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/40 px-6">
            {data.faq.map((item, index) => (
              <AccordionItem key={item.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-slate-900 no-underline hover:no-underline">{item.question}</AccordionTrigger>
                <AccordionContent className="text-slate-600">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2366c9]">Final CTA</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Choose the next step that fits where you are now.</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              { title: "Take Free Diagnostic", body: "See your current gaps before you buy anything.", href: data.diagnosticLink, cta: "Start now" },
              { title: `Enrol in ${data.subjectName}`, body: "Go straight into the full subject course.", href: data.enrollUrl, cta: "Enrol now" },
              { title: "View All O-Level Subjects", body: "Browse the full Cambridge O-Level subject catalogue.", href: "/olevel-subjects", cta: "Browse subjects" },
            ].map((item) => (
              <a key={item.title} href={item.href} className="rounded-2xl border border-blue-100 bg-[#eef6ff] p-6 text-slate-900 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#2366c9]">Next Step</p>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
                <div className="mt-5 inline-flex items-center text-sm font-semibold text-[#2366c9]">{item.cta} <ArrowRight className="ml-2 h-4 w-4" /></div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}