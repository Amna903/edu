import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  contactDetailItems,
  contactHelpItems,
  quickActions,
} from "@/components/contact/contact-content";

export default function Contact() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "Contact EduMeUp - Get in Touch | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Contact EduMeUp for school partnerships, teacher training bookings, or general enquiries. We respond within 24 hours.",
      );
    }

    return () => {
      document.title = previousTitle;
      if (metaDescription) {
        metaDescription.setAttribute("content", previousDescription);
      }
    };
  }, []);

  return (
    <Layout>
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/80 to-white py-16 md:py-24">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-4xl text-center"
          >
        
            <h1 className="text-4xl font-semibold text-slate-900 md:text-6xl">
              Get in Touch
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-slate-700 md:text-lg">
              We respond within 24 hours on working days.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
              Contact EduMeUp school partnership teacher training support.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/for-schools/partnership">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  School Partnership
                </span>
              </Link>
              <Link href="/teacher-training">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  Teacher Training
                </span>
              </Link>
              <Link href="/programs/ai-diagnostic">
                <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:border-blue-300 hover:text-[#2366c9]">
                  AI Diagnostic
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-3">
            {contactHelpItems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-[#2366c9]">
                  <item.icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
            <div className="space-y-5">
              <h2 className="text-3xl font-semibold text-slate-900">Contact Details</h2>
              {contactDetailItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-[#2366c9]">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-1 text-base font-semibold text-slate-900">
                        {item.value}
                      </p>
                      {item.hint ? (
                        <p className="mt-1 text-xs text-slate-500">{item.hint}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}

              <p className="text-sm text-slate-600">
                Social media: LinkedIn, Facebook, Twitter/X, Instagram (see footer links).
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <section className="border-t border-blue-100 bg-blue-50/40 py-14 md:py-20">
        <div className="container-custom">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              Quick Actions
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {quickActions.map((action) => (
              <div
                key={action.title}
                className="flex h-full flex-col rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-[#2366c9]">
                  <action.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{action.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">
                  {action.description}
                </p>
                <Link href={action.href}>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2366c9] hover:text-blue-700">
                    {action.cta}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
