import { useEffect } from "react";
import { Layout } from "@/components/Layout";

export default function Cookies() {
  useEffect(() => {
    const previousTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const previousDescription = metaDescription?.getAttribute("content") || "";

    document.title = "Cookie Policy | EduMeUp";
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Read EduMeUp cookie policy including necessary, functional, analytics, and performance cookie usage.",
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
          <h1 className="text-4xl md:text-6xl font-semibold text-slate-900">Cookie Policy</h1>
          <p className="mt-4 text-sm text-slate-600">Last Updated: [INSERT DATE BEFORE PUBLISHING]</p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-custom max-w-4xl space-y-8">
          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">1. What Are Cookies</h2>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              Cookies are small text files placed on your device when you visit a website. They help websites recognize devices,
              remember preferences, and collect usage insights.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">2. Cookies We Use</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 shadow-md">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="bg-[#2366c9] text-white text-left">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">Cookie Type</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">Purpose</th>
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide">Can Be Disabled?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-blue-100">
                    <td className="px-4 py-3 text-sm font-medium text-slate-800">Strictly Necessary</td>
                    <td className="px-4 py-3 text-sm text-slate-700">Required for login sessions, security, and platform access.</td>
                    <td className="px-4 py-3 text-sm text-slate-700">No - platform cannot function without these.</td>
                  </tr>
                  <tr className="border-t border-blue-100">
                    <td className="px-4 py-3 text-sm font-medium text-slate-800">Functional</td>
                    <td className="px-4 py-3 text-sm text-slate-700">Remember language and display preferences.</td>
                    <td className="px-4 py-3 text-sm text-slate-700">Yes - preferences reset if disabled.</td>
                  </tr>
                  <tr className="border-t border-blue-100">
                    <td className="px-4 py-3 text-sm font-medium text-slate-800">Analytics</td>
                    <td className="px-4 py-3 text-sm text-slate-700">Understand visitor behavior and improve content/navigation. We use [INSERT ANALYTICS TOOL e.g. Google Analytics 4].</td>
                    <td className="px-4 py-3 text-sm text-slate-700">Yes - opt out in cookie settings.</td>
                  </tr>
                  <tr className="border-t border-blue-100">
                    <td className="px-4 py-3 text-sm font-medium text-slate-800">Performance</td>
                    <td className="px-4 py-3 text-sm text-slate-700">Measure load times and identify technical issues.</td>
                    <td className="px-4 py-3 text-sm text-slate-700">Yes - opt out in cookie settings.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">3. Managing Your Cookie Preferences</h2>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              Manage preferences through the cookie settings banner or browser controls. Disabling certain cookies may affect
              how some platform features work.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">4. Third-Party Cookies</h2>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">
              Some features may use third-party services that set their own cookies: [INSERT e.g. YouTube, Google Analytics,
              payment processor]. We do not control these cookies. Review third-party privacy policies for details.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">5. Contact</h2>
            <p className="mt-3 text-sm text-slate-700">Cookie and privacy enquiries: support@edumeup.com | EduMeUp.com</p>
          </div>

          <p className="text-xs text-slate-500">Prepared for: Muhammad Benyameen, Chief Adviser - EduMeUp.com | 13 Missing Pages - Complete Copy | Locked Output</p>
        </div>
      </section>
    </Layout>
  );
}
