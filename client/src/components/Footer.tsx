import { Link } from "wouter";
import { GraduationCap, Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About & How It Works", href: "/about" },
    { label: "All Programmes", href: "/programs" },
    { label: "Free Diagnostic", href: "/programs/ai-diagnostic" },
    { label: "Free Resources", href: "/resources/freebies" },
    { label: "Research & Development", href: "/research" },
    { label: "Blog", href: "/blog" },
    { label: "For Schools", href: "/for-schools" },
    { label: "Teacher Training (CTMW)", href: "/teacher-training" },
  ];

  const cambridgeProgrammes = [
    { label: "Pre-O-Level Victory Program", href: "/programs/pre-o-level-victory" },
    { label: "Foundational O-Level Bridge Courses", href: "/programs/bridge-courses" },
    { label: "Complete O-Level Subject Preparation", href: "/programs/complete-o-level" },
    { label: "English Language Mastery Courses", href: "/programs/english-mastery" },
    { label: "ATP Courses (Physics / Chemistry / Biology)", href: "/programs/atp-courses" },
    { label: "Real-Time Exam Preparation", href: "/programs/exam-prep" },
    { label: "Tutor Booking - 1-to-1 Personalised Education", href: "/programs/tutor-booking" },
    { label: "Teacher Training (CTMW)", href: "/teacher-training" },
  ];

  const resourceLinks = [
    { label: "Conceptual Learning & Practice Workbooks", href: "/resources/workbooks" },
    { label: "Topical Exam Practice Workbooks", href: "/resources/topical-workbooks" },
    { label: "Exam Practice Papers with Enhanced Solutions", href: "/resources/exam-papers" },
    { label: "Conceptual Learning & Practice Worksheets (Primary to O-Level)", href: "/resources/worksheets" },
    { label: "All Resources (Courses | Workbooks | Worksheets)", href: "/resources" },
    { label: "Free Resources (Freebies)", href: "/resources/freebies" },
    { label: "Research & Development", href: "/research" },
    { label: "Blog", href: "/blog" },
  ];

  const pakistanProgrammes = [
    { label: "Pakistan Matric Programme (Grades 9-10)", href: "/programs/matric" },
    { label: "Pakistan FSc / ICS Programme (Intermediate)", href: "/programs/fsc-ics" },
    { label: "ECAT Engineering Entry Test", href: "/programs/ecat" },
  ];

  return (
    <footer className="overflow-x-hidden bg-slate-900 text-slate-100">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-[0.9fr_0.95fr_1.2fr_1fr_0.85fr_0.95fr] xl:gap-4">
          
          {/* Brand Column */}
          <div className="min-w-0 space-y-5">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-lg bg-[#2366c9] flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="font-display text-2xl font-black text-white">Edumeup</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-300 [text-shadow:0_0_10px_rgba(226,232,240,0.2)]">
              A complete science-powered learning ecosystem - built for ambitious learners and high-performance schools worldwide.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Twitter, href: "#", label: "Twitter / X" },
                { Icon: Linkedin, href: "https://www.linkedin.com/company/edumeup/", label: "LinkedIn" },
                { Icon: Instagram, href: "#", label: "Instagram" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  title={label}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-white transition-colors [text-shadow:0_0_8px_rgba(226,232,240,0.18)]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <p className="text-sm text-slate-400 [text-shadow:0_0_8px_rgba(226,232,240,0.14)]">
              Built on 27+ years of Cambridge classroom experience and cognitive science.
            </p>
          </div>

          {/* Quick Links */}
          <div className="min-w-0">
            <h3 className="mb-5 font-display text-base font-black text-slate-50 [text-shadow:0_0_14px_rgba(226,232,240,0.28)]">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="break-words text-sm leading-snug text-slate-200 hover:text-white transition-colors [text-shadow:0_0_10px_rgba(226,232,240,0.22)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cambridge / IGCSE Programmes */}
          <div className="min-w-0">
            <h3 className="mb-5 font-display text-base font-semibold text-slate-50 [text-shadow:0_0_14px_rgba(226,232,240,0.28)]">Cambridge / IGCSE Programmes</h3>
            <ul className="space-y-3">
              {cambridgeProgrammes.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="break-words text-sm leading-snug text-slate-200 hover:text-white transition-colors [text-shadow:0_0_10px_rgba(226,232,240,0.22)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Workbooks */}
          <div className="min-w-0">
            <h3 className="mb-5 font-display text-base font-semibold text-slate-50 [text-shadow:0_0_14px_rgba(226,232,240,0.28)]">Resources & Workbooks</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="break-words text-sm leading-snug text-slate-200 hover:text-white transition-colors [text-shadow:0_0_10px_rgba(226,232,240,0.22)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pakistan Curriculum */}
          <div className="hidden min-w-0 xl:block">
            <h3 className="mb-5 font-display text-base font-semibold text-slate-50 [text-shadow:0_0_14px_rgba(226,232,240,0.28)]">Pakistan Curriculum</h3>
            <ul className="space-y-3">
              {pakistanProgrammes.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="break-words text-sm leading-snug text-slate-200 hover:text-white transition-colors [text-shadow:0_0_10px_rgba(226,232,240,0.22)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pakistan Programmes mobile accordion */}
          <details className="md:col-span-2 rounded-lg border border-slate-800 bg-slate-900/40 p-4 xl:hidden">
            <summary className="cursor-pointer list-none font-display text-base font-semibold text-slate-50 [text-shadow:0_0_14px_rgba(226,232,240,0.28)]">
              Pakistan Programmes
            </summary>
            <ul className="mt-4 space-y-3">
              {pakistanProgrammes.map((link) => (
                <li key={`mobile-${link.href}`}>
                  <Link href={link.href} className="break-words text-sm leading-snug text-slate-200 hover:text-white transition-colors [text-shadow:0_0_10px_rgba(226,232,240,0.22)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>

          {/* Contact */}
          <div className="min-w-0">
            <h3 className="mb-5 font-display text-base font-black text-slate-50 [text-shadow:0_0_14px_rgba(226,232,240,0.28)]">Contact Us</h3>
            <ul className="space-y-3 text-sm text-slate-200 [text-shadow:0_0_10px_rgba(226,232,240,0.2)]">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-[#2366c9]" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-[#2366c9]" />
                <span>info@edumeup.com</span>
              </li>
              <li className="text-slate-300">We respond within 24 hours</li>
              <li>
                <Link href="/contact" className="break-words hover:text-white transition-colors underline-offset-2 hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/for-schools/consultation" className="break-words hover:text-white transition-colors underline-offset-2 hover:underline">
                  Book School Consultation
                </Link>
              </li>
              <li>
                <Link href="/teacher-training/book" className="break-words hover:text-white transition-colors underline-offset-2 hover:underline">
                  Book Teacher Training
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 bg-slate-950/80">
        <div className="container-custom flex flex-col gap-3 py-5 text-xs text-slate-400 [text-shadow:0_0_8px_rgba(226,232,240,0.16)] md:flex-row md:items-center md:justify-between md:text-sm">
          <p>&copy; {new Date().getFullYear()} EduMeUp.com | All Rights Reserved</p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Link href="/privacy" className="text-slate-300 hover:text-white underline-offset-2 hover:underline">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/terms" className="text-slate-300 hover:text-white underline-offset-2 hover:underline">
              Terms of Use
            </Link>
            <span>|</span>
            <Link href="/cookies" className="text-slate-300 hover:text-white underline-offset-2 hover:underline">
              Cookie Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
