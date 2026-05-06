import { Link } from "wouter";
import { LegalList, LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";

export default function Terms() {
  return (
    <LegalPageShell
      title="Terms of Use"
      documentTitle="These Terms govern your access to and use of the EduMeUp.com platform."
      description="Read EduMeUp Terms of Use covering eligibility, course access, payments, tutoring, acceptable use, intellectual property, AI features, and liability."
    >
      <LegalSection title="Terms of Use">
        <p>
          These Terms of Use ("Terms") govern your access to and use of the EduMeUp.com platform, including all courses, diagnostics, tutoring services, workbooks, performance reports, and AI-powered tools ("the Platform"). By registering for or using the Platform, you agree to be bound by these Terms. If you do not agree, do not use the Platform.
        </p>
      </LegalSection>

      <LegalSection title="1. Eligibility">
        <LegalList
          items={[
            "You must be at least 11 years old, Grade 6 or above, to use EduMeUp independently.",
            "Users under 18 must have the knowledge and consent of a parent or legal guardian.",
            "By registering, you confirm that all information you provide is accurate and complete.",
            "Each person may hold only one EduMeUp account per email address.",
            "EduMeUp reserves the right to refuse registration or suspend accounts that violate these Terms.",
          ]}
        />
      </LegalSection>

      <LegalSection title="2. Account Security">
        <LegalList
          items={[
            "You are responsible for maintaining the confidentiality of your password and for all activity under your account.",
            "You must notify EduMeUp immediately at support@edumeup.com if you suspect unauthorised account access.",
            "EduMeUp will never ask for your password by email, WhatsApp, or any channel outside the Platform's own login page.",
            "You may not share your account credentials with any other person.",
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Course Access and Enrolment">
        <LegalList
          items={[
            "Access to paid courses begins immediately on confirmed payment and continues for the access period stated at purchase.",
            "Access is personal and enrolled in your account only. Courses may not be shared, transferred, or resold.",
            "EduMeUp's mastery system requires 80% on topic assessments before advancing. This gate cannot be bypassed.",
            "EduMeUp may update course content at any time. Syllabus updates are provided to enrolled students at no additional charge.",
            "ATP courses are updated annually. Your access period includes the most current version of ATP content.",
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Payments and Refunds">
        <h3 className="font-semibold text-slate-950">4.1 Payments</h3>
        <LegalList
          items={[
            "All prices are in USD. Payments are processed securely by Stripe.",
            "EduMeUp does not store credit card or payment card data.",
            "Subscription plans are billed monthly or annually as selected. Cancellation stops future charges but does not refund the current billing period.",
          ]}
        />
        <h3 className="font-semibold text-slate-950">4.2 Refund Policy</h3>
        <LegalList
          items={[
            "Course refunds: if you have not accessed lesson content, a full refund is available within 7 days of purchase. Once lesson content has been accessed, no refund is available.",
            "Diagnostic refunds: once a diagnostic session has started, no refund is available. If a technical error prevents completion, contact support@edumeup.com within 48 hours.",
            "Workbook and past paper refunds: once a PDF has been downloaded, no refund is available. Corrupted or incorrect files can be replaced.",
            "Tutoring refunds: sessions cancelled by the student with less than 24 hours' notice are not refunded. Sessions cancelled by EduMeUp or the tutor are refunded or rescheduled.",
            "Cambridge O-Level Readiness Forecast: once the assessment session has started, no refund is available.",
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Tutoring Terms">
        <LegalList
          items={[
            "All EduMeUp tutors are certified through the EduMeUp certification process before matching.",
            "All tutoring fees are paid to EduMeUp, never directly to the tutor.",
            "Tutors use EduMeUp curriculum materials and session guidelines, while their professional teaching judgement remains their own.",
            "EduMeUp does not guarantee specific academic outcomes from tutoring.",
            "Tutoring plans are monthly with a minimum commitment of one full month and may be cancelled after the first month with 7 days' written notice.",
            "A free 30-minute demo session is offered before any paid tutoring plan is confirmed.",
          ]}
        />
      </LegalSection>

      <LegalSection title="6. Acceptable Use">
        <p>You agree not to:</p>
        <LegalList
          items={[
            "Use the Platform for unlawful, harmful, or prohibited purposes.",
            "Share, copy, redistribute, or resell EduMeUp content without written permission.",
            "Reverse-engineer, decompile, or extract source code from the Platform.",
            "Use automated tools, bots, or scripts to access the Platform or extract data.",
            "Impersonate another user, EduMeUp staff, or any other person.",
            "Submit false or misleading information, including false scholarship declarations.",
            "Upload or transmit offensive, harmful, defamatory, or unlawful content.",
            "Attempt to bypass diagnostic limits, access controls, or Platform security measures.",
          ]}
        />
      </LegalSection>

      <LegalSection title="7. Intellectual Property">
        <LegalList
          items={[
            "All course content, diagnostic questions, workbooks, past paper solutions, mind maps, AI tools, performance reports, and Platform design are the intellectual property of EduMeUp.com.",
            "You receive a personal, non-exclusive, non-transferable licence to access Platform content for your own educational purposes during your access period.",
            "This licence does not permit downloading course videos, scraping content, sharing materials with third parties, or commercial use.",
            "Cambridge past papers remain the intellectual property of Cambridge Assessment International Education. EduMeUp reproduces them under applicable fair use and educational licensing principles.",
          ]}
        />
      </LegalSection>

      <LegalSection title="8. AI-Powered Features - Limitations">
        <LegalList
          items={[
            "AI-generated diagnostic reports, grade forecasts, and study recommendations are educational guidance only.",
            "AI-graded written responses are evaluated against rubric criteria. EduMeUp's Academic Team may review AI-graded responses on request.",
            "The Cambridge O-Level Readiness Forecast is data-informed, not a guarantee of results.",
            "EduMeUp AI tools support learning and do not replace teacher judgement, parental guidance, or student responsibility.",
          ]}
        />
      </LegalSection>

      <LegalSection title="9. Platform Availability">
        <p>
          EduMeUp aims for continuous Platform availability but does not guarantee uninterrupted access. Scheduled maintenance will be announced in advance where possible. EduMeUp is not liable for loss or inconvenience caused by downtime, provided it takes reasonable steps to minimise disruption.
        </p>
      </LegalSection>

      <LegalSection title="10. Limitation of Liability">
        <LegalList
          items={[
            "EduMeUp's total liability for any claim is limited to the amount paid for the specific product or service in the 12 months preceding the claim.",
            "EduMeUp is not liable for indirect, incidental, or consequential losses, loss of data, loss of educational opportunity, or Cambridge examination results.",
            "EduMeUp is not liable for acts or omissions of certified tutors beyond its certification and matching responsibilities.",
            "Nothing in these Terms excludes liability that cannot be limited by law.",
          ]}
        />
      </LegalSection>

      <LegalSection title="11. Termination">
        <LegalList
          items={[
            "You may close your account at any time from dashboard settings. Closure does not entitle you to a refund.",
            "EduMeUp may suspend or terminate your account if you breach these Terms.",
            "On termination, access to paid course content ends. Personal data is handled according to the Privacy Policy.",
          ]}
        />
      </LegalSection>

      <LegalSection title="12. Changes to These Terms">
        <p>
          EduMeUp may update these Terms. Material changes will be communicated by email with at least 14 days' notice before they take effect. Continued use after the effective date constitutes acceptance.
        </p>
      </LegalSection>

      <LegalSection title="13. Governing Law and Disputes">
        <p>
          These Terms are governed by applicable law. EduMeUp encourages users to contact support@edumeup.com first to resolve any dispute informally. EduMeUp is committed to resolving complaints fairly and promptly.
        </p>
      </LegalSection>

      <LegalSection title="14. Contact">
        <LegalList items={["General: support@edumeup.com", "Legal: legal@edumeup.com", <span>Contact form: <Link href="/contact">/contact</Link></span>]} />
      </LegalSection>
    </LegalPageShell>
  );
}
