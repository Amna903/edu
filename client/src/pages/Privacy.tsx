import { Link } from "wouter";
import { LegalList, LegalPageShell, LegalSection, LegalTable } from "@/components/legal/LegalPageShell";

export default function Privacy() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      documentTitle="EduMeUp is committed to protecting the privacy of every person who uses our platform."
      description="Read the EduMeUp Privacy Policy covering personal data collection, AI-powered features, sharing, retention, rights, security, and children's data."
    >
      <LegalSection title="Privacy Policy">
        <p>
          EduMeUp.com ("EduMeUp", "we", "us", "our") is committed to protecting the privacy of every person who uses our platform - students, parents, teachers, and school administrators. This Privacy Policy explains what personal data we collect, why we collect it, how we use it, who we share it with, and what rights you have over it.
        </p>
        <p>
          By registering for or using the EduMeUp platform, you agree to this Privacy Policy. If you do not agree, please do not use our platform. If you are registering a child under 18, you confirm that you are their parent or legal guardian and you provide consent on their behalf.
        </p>
      </LegalSection>

      <LegalSection title="1. Who We Are">
        <p>
          EduMeUp.com is an online educational platform offering Cambridge O-Level and IGCSE preparation courses, diagnostics, AI-powered study tools, certified tutoring, and performance reporting services. The platform operates globally and is accessible to students, parents, teachers, and schools worldwide.
        </p>
      </LegalSection>

      <LegalSection title="2. What Personal Data We Collect">
        <h3 className="font-semibold text-slate-950">2.1 Data You Give Us Directly at Registration</h3>
        <LegalList
          items={[
            "Student: first name, last name, email address, grade level, country, password hashed and never stored in plain text.",
            "Parent: first name, last name, email address, child's name and grade, password.",
            "Teacher: first name, last name, email address, subjects taught, teaching role, city, country, password.",
            "School Admin: first name, last name, school email address, school name, partner code, role at school, password.",
          ]}
        />
        <h3 className="font-semibold text-slate-950">2.2 Data Created When You Use the Platform</h3>
        <LegalList
          items={[
            "Course enrolment records and completion progress.",
            "Diagnostic test attempts, scores, and section-level results.",
            "Written response submissions for AI-graded questions.",
            "Tutoring session bookings, attendance records, and session notes.",
            "Performance report data including mastery scores, topic completion, and test results.",
            "Purchase records including products bought and payment confirmation references, but not card details.",
            "Login timestamps, IP address at time of login, device type, and browser type.",
            "Pages visited, time on platform, and feature usage patterns for analytics.",
          ]}
        />
        <h3 className="font-semibold text-slate-950">2.3 Data From the Free Diagnostic</h3>
        <p>
          If you take a free diagnostic without registering an account, we collect your IP address, the subject and grade level you selected, and your diagnostic results. This data is linked to your IP address. If you subsequently register an account, this data is linked to your account.
        </p>
        <h3 className="font-semibold text-slate-950">2.4 Payment Data</h3>
        <p>
          EduMeUp processes payments through Stripe. We do not store credit card numbers, expiry dates, or CVV codes on our servers. Stripe processes and stores payment data under its own Privacy Policy and PCI-DSS compliance. EduMeUp receives only a payment confirmation reference, the amount paid, the product purchased, and the associated email address.
        </p>
        <h3 className="font-semibold text-slate-950">2.5 Data We Do NOT Collect</h3>
        <LegalList
          items={[
            "Government ID numbers, national identity card data, or passport information.",
            "Biometric data.",
            "Medical or health data.",
            "Social media profile data unless you voluntarily share it with us.",
            "Scholarship application documents. The application uses name, email, country, and declaration only.",
          ]}
        />
      </LegalSection>

      <LegalSection title="3. How We Use Your Data">
        <LegalTable
          headers={["Purpose", "Data Used", "Legal Basis"]}
          rows={[
            ["Provide the learning platform and courses", "Enrolment records, progress data, diagnostic results, course completion", "Contract performance"],
            ["Generate diagnostic and performance reports", "Section scores, written response data, AI evaluation results", "Contract performance"],
            ["Operate the tutoring service", "Booking records, session notes, teacher-submitted monthly report form data", "Contract performance"],
            ["Send transactional communications", "Email address, purchase reference", "Contract performance"],
            ["Enforce access control", "IP address, user account flag, grade level", "Legitimate interest"],
            ["Manage scholarship applications", "Name, email, country, declaration", "Legitimate interest"],
            ["Maintain security and prevent fraud", "IP address, login attempts, session tokens", "Legitimate interest"],
            ["Improve platform features and content", "Anonymised usage analytics", "Legitimate interest"],
            ["Send marketing communications", "Email address", "Consent - opt-in only. Unsubscribe at any time."],
            ["Comply with legal obligations", "Any data relevant to legal requests", "Legal obligation"],
          ]}
        />
      </LegalSection>

      <LegalSection title="4. AI-Powered Features and Your Data">
        <p>
          EduMeUp uses AI tools as processing tools. AI does not make autonomous decisions that affect your legal rights or that have significant consequences without human review.
        </p>
        <LegalList
          items={[
            "Diagnostic report generation: section scores and pre-written template texts are sent to an AI system to produce a personalised narrative report. The AI personalises language; recommendations and resource links are pre-set by the EduMeUp Academic Team.",
            "Written response grading: written responses are sent to an AI system with the marking rubric. The EduMeUp Academic Team may review AI-graded responses on request.",
            "AI Study Advisor: in-session questions and current topic context are sent to an AI system to generate guidance responses. Logged-in session history may be stored in your account.",
            "Predictive risk flagging: aggregated mastery data is used to flag students at risk of falling behind. This is visible to school admins only and is advisory, not determinative.",
          ]}
        />
        <p>We do not use your data to train AI models. Your personal data and responses are not shared with AI model providers for training purposes.</p>
      </LegalSection>

      <LegalSection title="5. Who We Share Your Data With">
        <h3 className="font-semibold text-slate-950">5.1 Service Providers</h3>
        <LegalList
          items={[
            "Stripe for payment processing confirmation data only.",
            "Cloud hosting and database providers for secure platform hosting.",
            "Email service providers for transactional and marketing emails.",
            "AI API providers for diagnostic section scores, written responses, and rubric data. No names or contact details are included in AI API calls.",
            "Cloud storage providers for PDF files such as workbooks, past papers, and mind maps.",
          ]}
        />
        <h3 className="font-semibold text-slate-950">5.2 Sharing Within EduMeUp</h3>
        <LegalList
          items={[
            "Student data is shared with the student's linked parent account for direct registration.",
            "Student data is shared with school admin accounts for school-partner students.",
            "Tutoring session notes and monthly report input forms are visible to the assigned tutor and EduMeUp Academic Team only.",
            "At-risk flags are visible to school admins only, not to students or parents.",
          ]}
        />
        <h3 className="font-semibold text-slate-950">5.3 We Do NOT Sell Your Data</h3>
        <p>EduMeUp does not sell, rent, or trade your personal data to any third party for any commercial purpose.</p>
      </LegalSection>

      <LegalSection title="6. Children's Data">
        <p>EduMeUp serves students from Grade 6, typically age 11-12, and above. We take the protection of children's data seriously.</p>
        <LegalList
          items={[
            "Students under 18 who register directly confirm they have parental permission or are registering with parental knowledge and consent.",
            "Parents who register on behalf of their child provide consent through the parent registration form.",
            "School admin accounts enrol students on behalf of schools, and the school confirms it has appropriate parental consent.",
            "We do not show advertising to any user on EduMeUp. EduMeUp products are ad-free.",
            "We do not use children's data for profiling, behavioural targeting, or commercial purposes beyond delivering educational services.",
            "Parents can request access, correction, or deletion of their child's data by contacting privacy@edumeup.com.",
          ]}
        />
      </LegalSection>

      <LegalSection title="7. Data Retention">
        <LegalTable
          headers={["Data Type", "Retention Period"]}
          rows={[
            ["Active account data", "Retained for as long as your account is active."],
            ["Inactive accounts", "Accounts with no login activity for 36 months are notified by email and deleted after a 30-day grace period."],
            ["Diagnostic and performance data", "Retained for 24 months from the date of assessment, or for the duration of the account, whichever is longer."],
            ["Purchase records", "Retained for 7 years for legal and accounting purposes."],
            ["Teacher monthly report input forms", "Retained for 36 months from submission date."],
            ["IP address logs", "Retained for 90 days for security purposes."],
            ["Deleted accounts", "All personal data deleted within 30 days. Anonymised analytics data may be retained."],
          ]}
        />
      </LegalSection>

      <LegalSection title="8. Your Rights">
        <p>Depending on your country of residence, you may have the following rights. Contact privacy@edumeup.com. We will respond within 30 days.</p>
        <LegalTable
          headers={["Right", "What It Means"]}
          rows={[
            ["Access", "Request a copy of all personal data EduMeUp holds about you."],
            ["Correction", "Request correction of inaccurate personal data."],
            ["Deletion", "Request deletion of your personal data, subject to legal retention obligations."],
            ["Portability", "Request your data in a machine-readable format."],
            ["Restriction", "Request that we restrict processing in certain circumstances."],
            ["Object", "Object to processing based on legitimate interest, including marketing emails."],
            ["Withdraw Consent", "Withdraw consent for marketing communications at any time."],
            ["Complaint", "Lodge a complaint with your relevant national data protection authority."],
          ]}
        />
      </LegalSection>

      <LegalSection title="9. International Data Transfers">
        <p>
          EduMeUp is a global platform and your data may be processed on servers located outside your home country. Where we transfer data internationally, we ensure appropriate safeguards are in place, including data processing agreements with standard contractual clauses where required by applicable law.
        </p>
      </LegalSection>

      <LegalSection title="10. Security">
        <LegalList
          items={[
            "Passwords are stored as hashed values and never in plain text.",
            "JWT authentication tokens are stored in httpOnly cookies and are not accessible to JavaScript.",
            "All data is transmitted over HTTPS and encrypted in transit.",
            "PDF files are stored in private cloud storage and accessible via signed, time-limited URLs only.",
            "Rate limiting on login and registration helps prevent brute-force attacks.",
            "Role-based access controls restrict users to their own permitted data.",
          ]}
        />
        <p>No system is completely secure. If you believe your account has been compromised, contact support@edumeup.com immediately.</p>
      </LegalSection>

      <LegalSection title="11. Cookies">
        <p>
          EduMeUp uses cookies and similar technologies. For full details, please see our <Link href="/cookies">Cookie Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection title="12. Changes to This Privacy Policy">
        <p>
          We may update this Privacy Policy from time to time. When we do, we will update the Effective Date and notify registered users by email if changes are material. Continued use after a change constitutes acceptance of the updated policy.
        </p>
      </LegalSection>

      <LegalSection title="13. Contact Us">
        <LegalList
          items={[
            "Privacy enquiries: privacy@edumeup.com",
            "General enquiries: support@edumeup.com",
            <span>Contact form: <Link href="/contact">/contact</Link></span>,
            "Response time: within 5 working days for privacy enquiries.",
          ]}
        />
      </LegalSection>
    </LegalPageShell>
  );
}
