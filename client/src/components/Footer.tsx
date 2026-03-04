import { Link } from "wouter";
import { GraduationCap, Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-lg bg-[#2366c9] flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="font-display text-2xl font-black text-white">Edumeup</span>
            </div>
            <p className="text-slate-400">
              Among the Most Comprehensive O-Level Learning Ecosystems. Built on Research-Backed 10X Learning Leap Model™.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="text-slate-400 hover:text-white transition-colors">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 font-display text-lg font-black text-white">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { label: "Our Programs", href: "/programs" },
                { label: "Free Resources", href: "/resources" },
                { label: "For Schools", href: "/schools" },
                { label: "Certified Tutors", href: "/tutors" },
                { label: "About Us", href: "/about" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 ">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="mb-6 font-display text-lg font-semibold text-white">Featured Programs</h3>
            <ul className="space-y-4">
              <li className="text-slate-400">Junior Genius (Grades 1-5)</li>
              <li className="text-slate-400">Middle Mastery (Grades 6-8)</li>
              <li className="text-slate-400">O-Level Excellence</li>
              <li className="text-slate-400">Foundation Builders</li>
              <li className="text-slate-400">School Charter Program</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 font-display text-lg font-black text-white uppercase tracking-widest">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 text-slate-400  ">
                <MapPin className="h-6 w-6 shrink-0 text-[#2366c9]" />
                <span>123 Education Lane, Learning City, PK</span>
              </li>
              <li className="flex items-center gap-4 text-slate-400 ">
                <Phone className="h-6 w-6 shrink-0 text-[#2366c9]" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-4 text-slate-400 ">
                <Mail className="h-6 w-6 shrink-0 text-[#2366c9]" />
                <span>info@edumeup.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-800 pt-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Edumeup. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
