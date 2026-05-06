import { Link } from "wouter";
import { LegalList, LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";

export default function ParentTerms() {
  return (
    <LegalPageShell
      title="Parent & Guardian Terms"
      documentTitle="These terms apply to parents and guardians managing a student's education on EduMeUp."
      description="Read EduMeUp Parent and Guardian Terms covering consent, account linking, dashboards, payments, tutoring responsibilities, reports, scholarships, safeguarding, and data rights."
    >
      <LegalSection title="Parent & Guardian Terms and Conditions">
        <p>
          These Parent and Guardian Terms and Conditions ("Parent Terms") apply to all individuals who register on EduMeUp as a parent or guardian of a student, whether registering directly or whose child's account is linked to their parent account. These Parent Terms supplement the general <Link href="/terms">Terms of Use</Link> and <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <p>By registering as a parent or guardian, or by allowing your child to use EduMeUp, you agree to these Parent Terms.</p>
      </LegalSection>

      <LegalSection title="1. Registration and Consent">
        <LegalList
          items={[
            "You confirm that you are the parent or legal guardian of the child whose education you are managing on EduMeUp.",
            "You consent to EduMeUp processing your child's personal data as described in the Privacy Policy.",
            "If your child under 18 registers independently, you confirm your child has your knowledge and approval.",
            "You are responsible for ensuring your child's use of EduMeUp follows the general Terms of Use.",
          ]}
        />
      </LegalSection>

      <LegalSection title="2. Account Linking - Direct Registration">
        <LegalList
          items={[
            "When you register as a parent, you provide your child's name and grade. EduMeUp will link your parent account to your child's student account within 24 hours of your child's account being created and verified.",
            "You will receive a confirmation email when the account link is complete.",
            "Until the link is established, your parent dashboard will show a pending notice. This does not affect your child's learning access.",
            "If your child's account does not exist yet, register your parent account first. EduMeUp will match accounts when your child registers using the same email domain or name confirmation.",
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Account Linking - School Partner Enrolment">
        <LegalList
          items={[
            "If your child is enrolled through a partner school, EduMeUp's data relationship is with the school, not directly with you as parent.",
            "Your child's progress reports and academic data are shared with school administration, not directly with the parent account.",
            "Your parent dashboard will direct you to contact your child's school for detailed progress information.",
            "If you have questions about your child's progress as a school-partner student, contact the school first.",
            "If you believe you should have direct access to reports, contact support@edumeup.com.",
          ]}
        />
      </LegalSection>

      <LegalSection title="4. What You Can See in Your Parent Dashboard">
        <LegalList
          items={[
            "Your child's overall mastery progress across enrolled courses.",
            "Course-by-course completion percentage and mastery scores.",
            "All diagnostic results taken by your child.",
            "All published performance reports with download option.",
            "Upcoming and completed tutoring sessions, if your child is on a tutoring plan.",
            "Parent-appropriate session notes from tutoring sessions.",
            "Payment history and billing information for plans you have purchased.",
          ]}
        />
      </LegalSection>

      <LegalSection title="5. What You Cannot See">
        <LegalList
          items={[
            "Your child's individual diagnostic answers or written responses.",
            "Other students' data.",
            "Tutor earnings.",
            "EduMeUp internal Academic Team notes or teacher input forms.",
          ]}
        />
      </LegalSection>

      <LegalSection title="6. Payments">
        <LegalList
          items={[
            "All payments for EduMeUp products and services are made by you unless your child registers independently with their own financial arrangements.",
            "Tutoring plan fees are charged monthly and collected by EduMeUp in advance. You will never be asked to pay a tutor directly.",
            "For charge queries, contact support@edumeup.com with your order or payment reference.",
            "Refund policy is set out in the general Terms of Use, Section 4.",
          ]}
        />
      </LegalSection>

      <LegalSection title="7. Tutoring - Parent Responsibilities">
        <LegalList
          items={[
            "You confirm that tutoring contact information is accurate and that you are available for tutoring-related communications.",
            "EduMeUp matches certified tutors to students and will inform you of the matched tutor's name and subject qualifications before sessions begin.",
            "You or your child may request a tutor change at any time. Requests are managed by EduMeUp and are not guaranteed immediately.",
            "You must not arrange private tutoring directly with an EduMeUp tutor outside the Platform.",
          ]}
        />
      </LegalSection>

      <LegalSection title="8. Performance Reports - Your Responsibilities">
        <LegalList
          items={[
            "EduMeUp publishes performance reports monthly for students on tutoring plans, and periodically for diagnostics and course milestones.",
            "Reports are prepared by the EduMeUp Academic Team using tutor-submitted data and AI diagnostic data.",
            "Performance reports are educational guidance documents and should be discussed constructively with your child.",
            "If a report contains factually incorrect information, contact support@edumeup.com within 14 days of publication.",
          ]}
        />
      </LegalSection>

      <LegalSection title="9. Scholarship Application">
        <LegalList
          items={[
            "You may apply for the EduMeUp Global Access Scholarship on behalf of your child or family.",
            "The application requires your name, your child's grade, your email, your country, and a declaration of financial need. No documents are required.",
            "By submitting, you confirm the declaration is truthful. False declarations may result in account suspension.",
            "Scholarship discounts apply to eligible products at checkout and cannot be transferred.",
          ]}
        />
      </LegalSection>

      <LegalSection title="10. Safeguarding and Wellbeing">
        <LegalList
          items={[
            "Contact support@edumeup.com immediately with any safety or wellbeing concern connected to your child's use of the Platform.",
            "EduMeUp has a safeguarding policy for tutors, staff, and platform interactions involving students under 18.",
            "All tutors are certified through the EduMeUp T5 pathway. External background checks are not conducted in Phase 1.",
            "If your child is distressed by any Platform interaction, EduMeUp will take the report seriously and investigate promptly.",
          ]}
        />
      </LegalSection>

      <LegalSection title="11. Data Rights for Parents">
        <LegalList
          items={[
            "You have the right to request access to, correction of, or deletion of your child's personal data as set out in the Privacy Policy.",
            "Requests regarding your child's data: privacy@edumeup.com.",
            "We will respond to data requests within 30 days.",
          ]}
        />
      </LegalSection>

      <LegalSection title="12. Changes to These Parent Terms">
        <p>Material changes will be notified by email with at least 14 days' notice. Continued use after the effective date constitutes acceptance.</p>
      </LegalSection>

      <LegalSection title="13. Contact">
        <LegalList
          items={[
            "General parent support: support@edumeup.com",
            "Report queries: support@edumeup.com, include student name and report month.",
            "Privacy and data requests: privacy@edumeup.com",
            "Safeguarding concerns: support@edumeup.com, mark subject line SAFEGUARDING.",
            <span>Contact form: <Link href="/contact">/contact</Link></span>,
          ]}
        />
      </LegalSection>
    </LegalPageShell>
  );
}
