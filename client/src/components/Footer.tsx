import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Mail, MessageCircle, Twitter, Youtube } from "lucide-react";
import logoImage from "@/assets/edumeup-engine.png";

const learnLinks = [
  { label: "Must-Have Courses", href: "/programs" },
  { label: "Pre-O-Level Programmes", href: "/programs/pre-o-level-victory" },
  { label: "O-Level English", href: "/programs/english-mastery" },
  { label: "O-Level Subjects", href: "/programs/complete-o-level" },
  { label: "ATP Courses", href: "/programs/atp-courses" },
  { label: "Bridge Courses", href: "/programs/bridge-courses" },
  { label: "Teacher Training (T1-T6)", href: "/teacher-training" },
  { label: "Diagnostic Services", href: "/programs/ai-diagnostic" },
  { label: "All Courses ->", href: "/all-programs" },
];

const platformLinks = [
  { label: "Personalised Tutoring", href: "/tutoring" },
  { label: "Cambridge Consultancy", href: "/cambridge-consultancy" },
  { label: "Impact Partnerships", href: "/impact-partnerships" },
  { label: "Pricing", href: "/pricing" },
  { label: "Free Resources", href: "/free-resources" },
  { label: "Performance Reports", href: "/dashboard" },
  { label: "Diagnostic Services", href: "/programs/ai-diagnostic" },
  { label: "Scholarship Programme", href: "/pricing#scholarship" },
];

const forYouLinks = [
  { label: "For Students", href: "/for-students" },
  { label: "For Parents", href: "/for-parents" },
  { label: "For Teachers", href: "/for-teachers" },
  { label: "For Schools", href: "/for-schools" },
  { label: "My Dashboard", href: "/dashboard" },
  { label: "Impact Partnerships", href: "/impact-partnerships" },
];

const companyLinks = [
  { label: "About EduMeUp", href: "/about" },
  { label: "How EduMeUp Works", href: "/how-it-works" },
  { label: "How EduMeUp Is Different", href: "/how-edumeup-is-different" },
  { label: "Research & Development", href: "/research" },
  { label: "Blog", href: "/blog" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/edumeup/", Icon: Linkedin },
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "X", href: "#", Icon: Twitter },
  { label: "YouTube", href: "#", Icon: Youtube },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#1E3A5F] font-[Arial] text-white">
      <div className="h-1 w-full bg-[#17A589]" />

      <div className="mx-auto max-w-[1200px] px-6 pb-10 pt-10 md:px-8 md:pb-10 md:pt-10 lg:px-20 lg:pb-12 lg:pt-[60px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr] lg:gap-10">
          <div className="space-y-5">
            <img
              src={logoImage}
              alt="EduMeUp"
              className="h-9 w-auto object-contain brightness-0 invert"
            />
            <p className="max-w-[300px] text-[14px] leading-6 text-white/90">
              From content delivery to learning mastery - for every learner, everywhere.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-white transition-colors hover:text-[#17A589]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="LEARN" links={learnLinks} />
          <FooterColumn title="PLATFORM" links={platformLinks} />

          <div>
            <FooterColumn title="FOR YOU" links={forYouLinks} />
            <div className="my-4 h-px w-full bg-white/20" />
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] leading-5 text-white/90 transition-colors hover:text-[#17A589]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-[12px] font-bold uppercase tracking-[2px] text-[#17A589]">
              CONTACT US
            </h3>

            <a
              href="#"
              className="mb-4 flex w-full items-center justify-center gap-2 rounded-md bg-[#17A589] px-3 py-3 text-[13px] font-semibold text-white transition hover:bg-[#149174]"
            >
              <MessageCircle className="h-4 w-4" />
              Chat With Us on WhatsApp
            </a>

            <a
              href="mailto:support@edumeup.com"
              className="mb-3 inline-flex items-center gap-2 text-[14px] text-white transition-colors hover:text-[#17A589]"
            >
              <Mail className="h-4 w-4" />
              support@edumeup.com
            </a>

            <div className="mb-3">
              <Link
                href="/contact"
                className="text-[14px] text-white transition-colors hover:text-[#17A589]"
              >
                Contact Us
              </Link>
            </div>

            <p className="text-[12px] italic leading-5 text-[#C7D1DC]">
              We typically respond within 24 hours on working days.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#162D4A]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-3 px-6 py-4 text-[12px] text-white/90 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-20">
          <p className="whitespace-nowrap">&copy; 2026 EduMeUp.com - All rights reserved</p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <a href="#" className="transition-colors hover:text-[#17A589]">Privacy Policy</a>
            <span className="text-white/55">|</span>
            <a href="#" className="transition-colors hover:text-[#17A589]">Terms of Use</a>
            <span className="text-white/55">|</span>
            <a href="#" className="transition-colors hover:text-[#17A589]">Cookie Policy</a>
            <span className="text-white/55">|</span>
            <a href="#" className="transition-colors hover:text-[#17A589]">Teacher T&amp;C</a>
            <span className="text-white/55">|</span>
            <a href="#" className="transition-colors hover:text-[#17A589]">Parent T&amp;C</a>
          </div>

          <p className="whitespace-nowrap">EduMeUp.com</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-[12px] font-bold uppercase tracking-[2px] text-[#17A589]">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[14px] leading-5 text-white/90 transition-colors hover:text-[#17A589]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
