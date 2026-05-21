import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Mail, MessageCircle, Twitter, Youtube, ExternalLink, Globe, Phone } from "lucide-react";
import logoImage from "@/assets/WhatsApp_Image_2026-02-22_at_20.36.37_1771782478374.jpeg";

const learnLinks = [
  { label: "Lower Secondary Gr 6–8", href: "/programs" },
  { label: "Pre-O-Level Programmes", href: "/programs/pre-o-level-victory" },
  { label: "Must-Have Courses", href: "/programs/must-have-courses" },
  { label: "O-Level Subjects", href: "/programs/complete-o-level" },
  { label: "O-Level English (10 courses)", href: "/programs/english-mastery" },
  { label: "ATP Courses (2-yr access)", href: "/programs/atp-courses" },
  { label: "Bridge Courses", href: "/programs/bridge-courses" },
  { label: "Teacher Courses T1–T6", href: "/teacher-courses" },
  { label: "Exam Prep Workbooks", href: "/exam-prep-workbooks" },
  { label: "Mock Exams", href: "/programs/mock-exams" },
  { label: "View All Programmes →", href: "/all-programs", isViewAll: true },
];

const diagnoseLinks = [
  { label: "Free Diagnostic", href: "/diagnostics", isFree: true },
  { label: "Paid Diagnostic", href: "/diagnostics" },
  { label: "O-Level Readiness Forecast", href: "/olevel-readiness-forecast", isNew: true },
  { label: "Teacher Diagnostic (T1)", href: "/teacher-courses#t1" },
  { label: "School Class Diagnostic", href: "/diagnostics#school-class" },
  { label: "Personalised Tutoring", href: "/tutoring", isPopular: true },
  { label: "Tutor Directory", href: "/find-a-tutor" },
  { label: "Pricing", href: "/pricing" },
  { label: "Free Resources", href: "/free-resources", isFree: true },
];

const consultancyLinks = [
  { label: "Cambridge Consultancy", href: "/cambridge-consultancy" },
];

const forYouLinks = [
  { label: "For Students", href: "/for-students" },
  { label: "For Parents", href: "/for-parents" },
  { label: "For Teachers", href: "/for-teachers" },
  { label: "For Schools", href: "/for-schools" },
  { label: "Impact Partnerships", href: "/impact-partnerships" },
];

const companyLinks = [
  { label: "About EduMeUp", href: "/about" },
  { label: "How EduMeUp Works", href: "/how-it-works" },
  { label: "How We Are Different", href: "/why-edumeup" },
  { label: "Research & Development", href: "/research" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/edumeup/", Icon: Linkedin },
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "X", href: "#", Icon: Twitter },
  { label: "YouTube", href: "#", Icon: Youtube },
];

const emailLinks = [
  { label: "info@edumeup.com", sub: "General enquiries", href: "mailto:info@edumeup.com" },
  { label: "support@edumeup.com", sub: "Student & parent support", href: "mailto:support@edumeup.com" },
  { label: "schools@edumeup.com", sub: "Schools & institutions", href: "mailto:schools@edumeup.com" },
  { label: "privacy@edumeup.com", sub: "Data & privacy requests", href: "mailto:privacy@edumeup.com" },
];

export function Footer() {
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-brand-navy font-sans text-white">
      {/* Accent Bar */}
      <div className="h-1 w-full bg-brand-sky" />

      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 lg:px-12 2xl:px-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr] xl:gap-16">
          
          {/* Brand & Advisor Column */}
          <div className="space-y-8">
            <div className="inline-block bg-white p-4 rounded-xl shadow-lg mb-4">
              <img
                src={logoImage}
                alt="EduMeUp Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold leading-tight tracking-tight text-white">
                From Content Delivery <br/>
                <span className="text-brand-sky">to Learning Mastery.</span>
              </h2>
              <p className="max-w-[340px] text-[14px] leading-relaxed text-white/70">
                Cambridge O-Level · IGCSE · Pre-O-Level preparation for students, parents, teachers, and schools worldwide. Interactive. Diagnostic-first. AI-powered.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 max-w-[300px]">
              <p className="text-[11px] font-bold uppercase tracking-[2px] text-brand-sky mb-3">Chief Adviser</p>
              <div className="flex items-center gap-4">
                <div className="space-y-1">
                  <p className="text-[15px] font-bold text-white">Muhammad Benyameen</p>
                  <p className="text-[12px] text-white/60">M.Phil Educational Planning & Management</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white transition-all hover:bg-brand-primary hover:scale-110"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          <FooterColumn title="Learn" links={learnLinks} />
          
          <div className="space-y-10">
            <FooterColumn title="Diagnose & Resources" links={diagnoseLinks} />
            <FooterColumn title="Cambridge Consultancy" links={consultancyLinks} />
          </div>

          <div className="space-y-10">
            <FooterColumn title="For You" links={forYouLinks} />
            <FooterColumn title="Company" links={companyLinks} />
          </div>

          {/* Contact & Support Column */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-brand-sky">
                <Globe className="h-5 w-5" />
                <span className="text-sm font-bold tracking-widest uppercase">edumeup.com</span>
              </div>

              <div className="space-y-5">
                {emailLinks.map((email) => (
                  <div key={email.label} className="group">
                    <a 
                      href={email.href}
                      className="flex items-center gap-3 text-[14px] font-semibold text-white hover:text-brand-sky transition-colors"
                    >
                      <Mail className="h-4 w-4 shrink-0" />
                      {email.label}
                    </a>
                    <p className="pl-7 text-[11px] text-white/40 uppercase tracking-wider">{email.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col gap-6">
              <a
                href="https://wa.me/YOURPHONENUMBER"
                className="w-full flex items-center justify-center gap-3 rounded-xl bg-[#25D366] px-8 py-4 text-[14px] font-bold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] active:scale-95"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
              <Link href="/contact" className="w-full">
                <button className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-[14px] font-bold text-white transition-all hover:bg-white hover:text-brand-navy active:scale-95">
                  Contact Us / Get a Demo
                </button>
              </Link>
            </div>
          </div>

        </div>

        {/* BOTTOM STRIP */}
        <div className="mt-20 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[13px] text-white/40">
              © 2026 EduMeUp.com — All rights reserved.
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
              {[
                { l: "Privacy Policy", h: "/privacy" },
                { l: "Terms of Use", h: "/terms" },
                { l: "Cookie Policy", h: "/cookies" },
                { l: "Teacher T&C", h: "/terms-teacher" },
                { l: "Parent T&C", h: "/terms-parent" },
                { l: "Sitemap", h: "/sitemap" },
              ].map((item) => (
                <Link 
                  key={item.l} 
                  href={item.h} 
                  onClick={goToTop}
                  className="text-[12px] text-white/60 hover:text-white transition-colors"
                >
                  {item.l}
                </Link>
              ))}
              <button 
                id="cookie-settings-btn"
                className="text-[12px] text-white/60 hover:text-white transition-colors"
              >
                Cookie Settings
              </button>
            </div>
          </div>
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
  links: { label: string; href: string; isFree?: boolean; isNew?: boolean; isPopular?: boolean; isViewAll?: boolean }[];
}) {
  const regularLinks = links.filter((l) => !l.isViewAll);
  const viewAllLink = links.find((l) => l.isViewAll);

  return (
    <div className="space-y-6">
      <h3 className="text-[12px] font-bold uppercase tracking-[2px] text-brand-sky">
        {title}
      </h3>
      <ul className="space-y-3">
        {regularLinks.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group flex items-center gap-2 text-[14px] font-medium text-white/80 transition-all hover:text-white hover:translate-x-1"
            >
              <span className="whitespace-nowrap">{link.label}</span>
              {link.isFree && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-brand-sky text-brand-navy font-bold uppercase tracking-wider">Free</span>
              )}
              {link.isNew && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-status-warning text-white font-bold uppercase tracking-wider">New</span>
              )}
              {link.isPopular && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-status-success text-white font-bold uppercase tracking-wider">Popular</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
      {viewAllLink && (
        <div className="pt-3 border-t border-white/10">
          <Link
            href={viewAllLink.href}
            className="text-[13px] font-bold text-white hover:text-brand-sky transition-colors"
          >
            {viewAllLink.label}
          </Link>
        </div>
      )}
    </div>
  );
}
