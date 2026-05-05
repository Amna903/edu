import { useEffect } from "react";
import { Layout } from "@/components/Layout";

export default function Privacy() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "Privacy Policy | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Read the EduMeUp privacy policy covering data collection, usage, retention, and learner privacy rights.",
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
      <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50/80 to-white">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-semibold text-slate-900">Privacy Policy</h1>
          <p className="mt-4 text-sm text-slate-600">Last Updated: [INSERT DATE BEFORE PUBLISHING]</p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-custom max-w-4xl space-y-8">
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">1. Who We Are</h2>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              EduMeUp.com is an educational technology platform operated by [EduMeUp / Legal Entity Name, Address].
              Our platform provides interactive learning courses, diagnostic assessments, examination preparation resources,
              and teacher training programmes for Cambridge O-Level and IGCSE students.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">2. What Personal Data We Collect</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Account information: name, email address, phone number, role (student, parent, teacher, school administrator).</li>
              <li>Learning data: diagnostic results, course progress, test scores, platform activity logs.</li>
              <li>Payment information: processed through [INSERT PAYMENT PROVIDER]. We do not store card details directly.</li>
              <li>Device and technical data: IP address, browser type, device type, pages visited, session duration.</li>
              <li>Communications: messages submitted through contact or support channels.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">3. How We Use Your Data</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Provide and personalize learning experiences.</li>
              <li>Generate diagnostics and personalized pathways.</li>
              <li>Provide progress visibility to parents and school administrators where applicable.</li>
              <li>Send service communications such as setup, progress, and booking alerts.</li>
              <li>Improve platform quality using aggregated anonymized usage data.</li>
              <li>Comply with legal obligations.</li>
            </ul>
            <p className="mt-3 text-sm text-slate-700">We do not sell personal data and do not use personal data for advertising profiling.</p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">4. Data Sharing</h2>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              Data is shared only with essential service providers under processing agreements, relevant school or parent
              account stakeholders for learner progress where applicable, and legal or regulatory authorities when required by law.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">5. Data Retention</h2>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              Account data is retained while accounts remain active and for [INSERT PERIOD e.g. 2 years] after closure.
              Learning progress data is retained during active programme subscription periods.
              Users may request deletion at any time via support@edumeup.com.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">6. Your Rights</h2>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              Subject to applicable law, users may access, correct, delete, object to certain processing, and request portability
              of their personal data. To exercise rights, contact support@edumeup.com.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">7. Cookies</h2>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              We use cookies and similar technologies for platform operation, preference storage, and usage analytics.
              See Cookie Policy at edumeup.com/cookies for full details.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">8. Children's Privacy</h2>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              The platform may serve students under 18. Minor accounts must be created and managed by parents or school administrators.
              We do not knowingly collect personal data from children under 13 without parental consent.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">9. Contact</h2>
            <p className="mt-3 text-sm text-slate-700">Privacy enquiries: support@edumeup.com | EduMeUp.com</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
