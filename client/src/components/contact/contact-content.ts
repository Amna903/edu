import {
  Building2,
  GraduationCap,
  LifeBuoy,
  Phone,
  Mail,
  Clock3,
  Handshake,
  Presentation,
 Sparkles,
  type LucideIcon,
} from "lucide-react";

export type ContactHelpItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ContactDetailItem = {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
};

export type QuickActionItem = {
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: LucideIcon;
};

export const contactHelpItems: ContactHelpItem[] = [
  {
    title: "School Partnerships",
    description:
      "Enquire about the EduMeUp school partnership model, request a consultation, or ask about pricing for your school.",
    icon: Building2,
  },
  {
    title: "Teacher Training (CTMW)",
    description:
      "Book a Cambridge Teacher Mastery Workshop for your school, or register as an individual teacher.",
    icon: GraduationCap,
  },
  {
    title: "Student & Parent Support",
    description:
      "Questions about programmes, the free diagnostic, platform access, or technical support.",
    icon: LifeBuoy,
  },
];

export const contactDetailItems: ContactDetailItem[] = [
  {
    label: "Phone",
    value: "+92 300 1234567",
    hint: "Please confirm this number is correct and actively monitored.",
    icon: Phone,
  },
  {
    label: "Email",
    value: "support@edumeup.com",
    icon: Mail,
  },
  {
    label: "Response Time",
    value: "Within 24 hours on working days",
    icon: Clock3,
  },
];

export const quickActions: QuickActionItem[] = [
  {
    title: "Book a School Consultation",
    description:
      "Talk to our team about the EduMeUp school partnership model for your institution.",
    cta: "Book School Consultation ->",
    href: "/for-schools/partnership",
    icon: Handshake,
  },
  {
    title: "Book Teacher Training",
    description:
      "Register your school for the Cambridge Teacher Mastery Workshop (CTMW).",
    cta: "Book Teacher Training ->",
    href: "/teacher-training",
    icon: Presentation,
  },
  {
    title: "Start Free Diagnostic",
    description:
      "No call needed - start your child's free 90-minute AI diagnostic immediately.",
    cta: "Start Free Diagnostic ->",
    href: "/programs/ai-diagnostic",
    icon: Sparkles,
  },
];
