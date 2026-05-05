import { useEffect } from "react";
import { Layout } from "@/components/Layout";

export default function Terms() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "Terms of Use | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Read EduMeUp terms of use including account rules, subscriptions, intellectual property, and legal conditions.",
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
          <h1 className="text-4xl md:text-6xl font-semibold text-slate-900">Terms of Use</h1>
          <p className="mt-4 text-sm text-slate-600">Last Updated: [INSERT DATE BEFORE PUBLISHING]</p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-custom max-w-4xl space-y-8">
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">1. Acceptance of Terms</h2>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              By accessing or using EduMeUp.com, you agree to be bound by these Terms of Use. If you do not agree, do not use
              the platform. These terms apply to all users including students, parents, teachers, and school administrators.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">2. Use of the Platform</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>You must be 18 or older to create an account, or have parental/school guardian consent if under 18.</li>
              <li>You may use the platform only for lawful educational purposes.</li>
              <li>You may not share account credentials, resell access, or reproduce platform content without written permission.</li>
              <li>You may not attempt to reverse-engineer, copy, or extract platform content or code.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">3. Accounts and Access</h2>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              You are responsible for maintaining the security of your account. EduMeUp is not liable for loss resulting from
              unauthorized account use. School administrators are responsible for accounts created within their school partnership.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">4. Subscriptions and Payments</h2>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              Subscription fees are listed on the Pricing page at the time of purchase. Prices may change with notice.
              Refunds are available within [INSERT REFUND PERIOD e.g. 14 days] if the programme has not been substantially accessed.
              Contact support@edumeup.com for refund requests.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">5. Intellectual Property</h2>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              All content on EduMeUp.com, including courses, workbooks, worksheets, assessments, and research articles, is the
              intellectual property of EduMeUp.com. Content may be accessed for personal educational use only. You may not copy,
              distribute, publish, or create derivative works from EduMeUp content.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">6. Limitation of Liability</h2>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              EduMeUp provides the platform on an "as is" basis. We do not guarantee uninterrupted access or error-free operation.
              EduMeUp is not liable for indirect, incidental, or consequential damages from platform use. Total liability is limited
              to the amount paid by you in the 12 months preceding the claim.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">7. Governing Law</h2>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              These terms are governed by the laws of [INSERT JURISDICTION e.g. Pakistan]. Any dispute shall be subject to the
              exclusive jurisdiction of the courts of [INSERT JURISDICTION].
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">8. Changes to These Terms</h2>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              We may update these Terms of Use with notice. Continued use of the platform after changes are posted constitutes
              acceptance of the revised terms.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">9. Contact</h2>
            <p className="mt-3 text-sm text-slate-700">Legal enquiries: support@edumeup.com | EduMeUp.com</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
