import { Link } from "wouter";
import { LegalList, LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";

export default function TeacherTerms() {
  return (
    <LegalPageShell
      title="Teacher & Tutor Terms"
      documentTitle="These terms apply to teachers, teacher-training participants, and certified EduMeUp tutors."
      description="Read EduMeUp Teacher and Tutor Terms covering registration, T1-T6 training, tutor certification, session standards, payments, monthly reports, AI tools, and conduct."
    >
      <LegalSection title="Teacher & Tutor Terms and Conditions">
        <p>
          These Teacher and Tutor Terms and Conditions ("Teacher Terms") apply to all individuals who register on the EduMeUp platform as teachers, train through the EduMeUp Teacher Training Pathway (T1-T6), or are matched with students as certified EduMeUp tutors. These Teacher Terms supplement the general <Link href="/terms">Terms of Use</Link> and <Link href="/privacy">Privacy Policy</Link>.
        </p>
        <p>By registering as a teacher or tutor on EduMeUp, you agree to these Teacher Terms. If you do not agree, please do not register as a teacher.</p>
      </LegalSection>

      <LegalSection title="1. Registration and Eligibility">
        <LegalList
          items={[
            "You must be 18 years of age or older to register as an EduMeUp teacher or tutor.",
            "You confirm that all registration information, including subjects, qualifications, and location, is accurate and complete.",
            "EduMeUp may verify registration details and decline or revoke teacher registration at its discretion.",
            "A single registered teacher account is allowed per individual. You may not register multiple accounts.",
          ]}
        />
      </LegalSection>

      <LegalSection title="2. Teacher Training Pathway - T1 to T6">
        <h3 className="font-semibold text-slate-950">2.1 T1 - Teacher Subject Knowledge Diagnostic</h3>
        <LegalList
          items={[
            "The T1 Diagnostic is the first step in the EduMeUp Teacher Training Pathway.",
            "Pass mark: 81%. Two free attempts are provided. A resit fee of $20 applies from the third attempt.",
            "If both free attempts are not passed, the full T5 Tutor Certification Pathway ($149) is required before joining the tutoring network.",
            "T1 results are internal EduMeUp records only and are not disclosed to students or parents.",
          ]}
        />
        <h3 className="font-semibold text-slate-950">2.2 T2 to T6 Courses</h3>
        <LegalList
          items={[
            "T2 (CTMW Workshop): live online, one day. Earns the EduMeUp Certificate of Cambridge Teaching Excellence and 7 CPD hours on successful completion.",
            "T3 (SMK Certification): Moodle self-paced. Pass mark: 75%. Two attempts included. Earns the Structured Mastery Knowledge Certificate.",
            "T4 (Examiner Intelligence): live online. Completion badge awarded.",
            "T5 (Tutor Certification Pathway): multi-stage. Pass mark: 75%. Required for joining the certified tutor network.",
            "T6 (AI Tools Subscription): monthly or annual subscription for AI-powered lesson planning and feedback tools. No certification, active subscription only.",
          ]}
        />
        <h3 className="font-semibold text-slate-950">2.3 Certificates</h3>
        <LegalList
          items={[
            "EduMeUp certificates are issued by EduMeUp.com and are not Cambridge Assessment International Education certificates.",
            "Certificates are issued digitally via the EduMeUp platform. Physical certificates are not issued in Phase 1.",
            "Certificates remain valid while your account is active. EduMeUp may revoke certificates for breaches of these Teacher Terms or the general Terms of Use.",
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Tutor Certification and Matching">
        <LegalList
          items={[
            "Only teachers who complete the T5 Tutor Certification Pathway with a 75% pass mark may be matched with students as certified tutors.",
            "Tutor matching is managed by EduMeUp staff based on subject, grade level, availability, and location.",
            "EduMeUp does not guarantee that a certified tutor will be matched with students.",
            "Tutors may be listed as pending placement while their profile is being matched.",
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Tutoring Sessions - Professional Obligations">
        <h3 className="font-semibold text-slate-950">4.1 Session Standards</h3>
        <LegalList
          items={[
            "Conduct every session professionally, respectfully, and appropriately.",
            "Follow the EduMeUp curriculum framework for the student's course or programme.",
            "Arrive at scheduled sessions on time and prepared.",
            "Session notes, worksheets, and materials must be original or properly licensed.",
          ]}
        />
        <h3 className="font-semibold text-slate-950">4.2 Cancellation Policy</h3>
        <LegalList
          items={[
            "Give at least 24 hours' notice to cancel or reschedule a session.",
            "Late cancellations may result in a session fee deduction at EduMeUp's discretion.",
            "Repeated late cancellations may result in suspension from the tutor network.",
          ]}
        />
        <h3 className="font-semibold text-slate-950">4.3 Communication with Students and Parents</h3>
        <LegalList
          items={[
            "All tutoring communication must remain within EduMeUp-approved channels.",
            "You must not solicit students for tutoring services outside EduMeUp.",
            "You must not share personal phone numbers, personal email addresses, or social profiles with students or parents directly.",
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Payments and Earnings">
        <LegalList
          items={[
            "All student tutoring fees are collected by EduMeUp. You receive payment from EduMeUp after sessions are confirmed as completed.",
            "Tutor earnings structure is communicated privately to certified tutors and is not disclosed publicly.",
            "Payment is made monthly for sessions delivered in the previous month, confirmed via the teacher dashboard monthly report.",
            "You must not accept direct payment from students or parents for EduMeUp tutoring sessions.",
            "EduMeUp deducts its service fee before calculating tutor earnings.",
          ]}
        />
      </LegalSection>

      <LegalSection title="6. Monthly Report Submission">
        <LegalList
          items={[
            "You must submit the 18-field Monthly Report Input Form for every active tutoring student by the 3rd of each calendar month.",
            "The monthly report is the basis for EduMeUp generating student performance reports.",
            "Once submitted, the form is locked. Corrections must be sent to support@edumeup.com.",
            "Persistent late submissions may result in suspension from the tutoring network.",
          ]}
        />
      </LegalSection>

      <LegalSection title="7. AI Tools - T6 Subscribers">
        <LegalList
          items={[
            "The T6 AI Tools subscription provides AI-powered lesson planning and feedback drafting tools.",
            "Do not input students' full names, personally identifiable data, or sensitive student information into T6 AI tools. Use reference codes or initials.",
            "AI-generated lesson plans and feedback are suggestions. Professional judgement remains your responsibility.",
          ]}
        />
      </LegalSection>

      <LegalSection title="8. Intellectual Property">
        <LegalList
          items={[
            "Materials produced using EduMeUp AI tools, Platform templates, or course frameworks remain EduMeUp intellectual property.",
            "Independently created session notes and worksheets are your intellectual property unless they incorporate EduMeUp content.",
            "You must not use EduMeUp content commercially outside the Platform without written permission.",
          ]}
        />
      </LegalSection>

      <LegalSection title="9. Conduct and Removal">
        <p>EduMeUp may suspend or permanently remove a teacher or tutor for:</p>
        <LegalList
          items={[
            "Breach of these Teacher Terms or the general Terms of Use.",
            "Accepting direct payments from students or parents.",
            "Soliciting students for off-platform tutoring.",
            "Unprofessional, harmful, or inappropriate conduct.",
            "Providing false information at registration or in the T1 diagnostic.",
            "Persistent failure to meet session or reporting obligations.",
          ]}
        />
        <p>
          Where removal is considered, EduMeUp will communicate the reason in writing and provide a 7-day response period, except in serious misconduct cases where immediate suspension applies.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes to These Teacher Terms">
        <p>Material changes will be notified by email with at least 14 days' notice. Continued use of teacher features after the effective date constitutes acceptance.</p>
      </LegalSection>

      <LegalSection title="11. Contact">
        <LegalList
          items={[
            "Teacher support: support@edumeup.com",
            "Certification queries: training@edumeup.com",
            "Monthly report corrections: support@edumeup.com, including session ID and student reference.",
          ]}
        />
      </LegalSection>
    </LegalPageShell>
  );
}
