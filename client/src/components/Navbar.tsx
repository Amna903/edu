import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  House,
  BookOpen,
  GraduationCap,
  School,
  Users,
  FileText,
  ShoppingCart,
  Beaker,
  ChevronDown,
  ChevronRight,
  Mail,
  Award,
  Building2,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuthUser } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import logoImage from "@/assets/WhatsApp_Image_2026-02-22_at_20.36.37_1771782478374.jpeg";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { items } = useCart();
  const { data: user } = useAuthUser();

  const dashboardPath =
    user?.role === "admin"
      ? "/dashboard/admin"
      : user?.role === "parent"
        ? "/dashboard/parent"
        : user?.role === "school"
          ? "/dashboard/school"
          : "/dashboard/student";

  // v2.0 Correct Menu Structure (exact order from spec)
  const navItems: any[] = [
    { type: "link", href: "/", label: "Home", icon: House },
    {
      type: "dropdown",
      mainHref: "/about",
      label: "About & Process",
      icon: Users,
      children: [
        { href: "/why-edumeup", label: "Why EduMeUp", icon: Beaker },
        { href: "/why-edumeup/how-it-works", label: "How It Works", icon: BookOpen },
        { href: "/why-edumeup/8-step-model", label: "The 8-Step Mastery Cycle", icon: Award },
      ],
    },
    {
      type: "dropdown",
      mainHref: "/programs",
      label: "Mastery Path",
      icon: BookOpen,
      isMegaDropdown: true,
      children: [
        {
          label: "Cambridge / IGCSE",
          section: true,
          children: [
            { href: "/programs/ai-diagnostic", label: "AI Diagnostic Assessment", icon: Beaker },
            { href: "/programs/pre-o-level-victory", label: "Pre-O-Level Victory Program", icon: BookOpen },
            { href: "/programs/bridge-courses", label: "Foundational O-Level Bridge Courses", icon: BookOpen },
            { href: "/programs/complete-o-level", label: "Complete O-Level Subject Preparation", icon: BookOpen },
            { href: "/programs/english-mastery", label: "English Language Mastery Courses", icon: BookOpen },
            { href: "/programs/atp-courses", label: "ATP Courses (Physics | Chemistry | Biology)", icon: Beaker },
            { href: "/programs/exam-prep", label: "Real-Time Exam Preparation", icon: BookOpen },
            { href: "/programs/tutor-booking", label: "Tutor Booking — 1-to-1 Personalised Education", icon: Users },
          ],
        },
        {
          label: "Pakistan Curriculum",
          section: true,
          children: [
            { href: "/programs/matric", label: "Pakistan Matric Programme (Grades 9–10)", icon: BookOpen },
            { href: "/programs/fsc-ics", label: "Pakistan FSc / ICS Programme", icon: BookOpen },
            { href: "/programs/ecat", label: "Pakistan ECAT — Engineering Colleges Admission Test", icon: Beaker },
          ],
        },
      ],
    },
    {
      type: "dropdown",
      mainHref: "/portals",
      label: "My Dashboard",
      icon: Users,
      children: [
        { href: "/dashboard", label: "Student Portal", icon: GraduationCap },
        { href: "/dashboard", label: "Parent Portal", icon: Users },
        { href: "/dashboard", label: "Teacher Portal", icon: GraduationCap },
        { href: "/dashboard", label: "School Portal", icon: School },
      ],
    },
    {
      type: "dropdown",
      mainHref: "/resources",
      label: "Resources & Research",
      icon: Beaker,
      children: [
        {
          label: "Knowledge Content",
          section: true,
          children: [
            { href: "/resources/freebies", label: "Free Resources (Freebies)", icon: FileText },
            { href: "/research", label: "Research & Development", icon: Beaker },
            { href: "/blog", label: "Blog", icon: FileText },
          ],
        },
        {
          label: "Learning Materials",
          section: true,
          children: [
            { href: "/resources/workbooks", label: "Conceptual Learning & Practice Workbooks", icon: BookOpen },
            { href: "/resources/topical-workbooks", label: "Topical Exam Practice Workbooks", icon: BookOpen },
            { href: "/resources/exam-papers", label: "Exam Practice Papers with Enhanced Solutions", icon: FileText },
            { href: "/resources/worksheets", label: "Conceptual Learning & Practice Worksheets (Primary to O-Level)", icon: BookOpen },
            { href: "/resources/all", label: "All Resources (Courses | Workbooks | Worksheets)", icon: BookOpen },
          ],
        },
      ],
    },
    { type: "link", href: "/teacher-training", label: "Teacher Training", icon: GraduationCap },
    {
      type: "dropdown",
      mainHref: "/for-schools",
      label: "For Schools",
      icon: Building2,
      children: [
        { href: "/for-schools/partnership", label: "School Partnership Programme", icon: Building2 },
      ],
    },
    { type: "link", href: "/pricing", label: "Pricing", icon: ShoppingCart },
    { type: "link", href: "/contact", label: "Contact Us", icon: Mail },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/80">
      <div className="w-full px-3 lg:px-5 flex h-16 items-center">
        <div className="hidden md:flex items-center flex-1 min-w-0">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src={logoImage}
              alt="EduMeUp Logo"
              className="h-8 sm:h-9 lg:h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="flex items-center justify-center flex-1 min-w-0 ml-2 lg:ml-3">
            <div className="flex items-center gap-0">
            {navItems.map((item) => {
              if (item.type === "link") {
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      title={item.label}
                      className={`flex items-center gap-1 px-2 lg:px-2.5 py-2 text-[12px] xl:text-[13px] font-medium transition-colors rounded-lg whitespace-nowrap ${
                        isActive(item.href)
                          ? "bg-blue-50 text-[#2366c9]"
                          : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <item.icon className="hidden 2xl:block h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              }

              return (
                <DropdownMenu key={item.label}>
                  <div
                    className={`flex items-center rounded-lg whitespace-nowrap ${
                      isActive(item.mainHref) ||
                      item.children?.some((child: any) => !child.section && isActive(child.href))
                        ? "bg-blue-50 text-[#2366c9]"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <Link href={item.mainHref}>
                      <div className="flex items-center gap-1 px-2 lg:px-2.5 py-2 text-[12px] xl:text-[13px] font-medium">
                        <item.icon className="hidden 2xl:block h-4 w-4 shrink-0" />
                        <span>{item.label}</span>
                      </div>
                    </Link>
                    <DropdownMenuTrigger asChild>
                      <button type="button" className="pr-2 py-2">
                        <ChevronDown className="h-4 w-4 opacity-60" />
                      </button>
                    </DropdownMenuTrigger>
                  </div>
                  <DropdownMenuContent
                    align="end"
                    className={item.isMegaDropdown ? "w-[600px] p-2" : "w-56"}
                  >
                    {item.isMegaDropdown ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          {item.children
                            .filter((groupSection: any) => groupSection.label === "Cambridge / IGCSE")
                            .map((groupSection: any, idx: number) => (
                              <div key={groupSection.label}>
                                {idx > 0 && <DropdownMenuSeparator className="my-2" />}
                                <DropdownMenuLabel className="px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                  {groupSection.label}
                                </DropdownMenuLabel>
                                <div className="space-y-1">
                                  {groupSection.children.map((child: any) => (
                                    <DropdownMenuItem key={child.href} asChild>
                                      <Link href={child.href} className="flex items-center gap-2 w-full cursor-pointer rounded px-2 py-1.5 text-xs">
                                        <child.icon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                                        <span className="text-slate-700 text-xs">{child.label}</span>
                                      </Link>
                                    </DropdownMenuItem>
                                  ))}
                                </div>
                              </div>
                            ))}
                        </div>

                        <div className="border-l border-slate-200 pl-3">
                          {item.children
                            .filter((groupSection: any) => groupSection.label === "Pakistan Curriculum")
                            .map((groupSection: any) => (
                              <div key={groupSection.label}>
                                <DropdownMenuLabel className="px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                  {groupSection.label}
                                </DropdownMenuLabel>
                                <div className="space-y-1">
                                  {groupSection.children.map((child: any) => (
                                    <DropdownMenuItem key={child.href} asChild>
                                      <Link href={child.href} className="flex items-center gap-2 w-full cursor-pointer rounded px-2 py-1.5 text-xs">
                                        <child.icon className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                                        <span className="text-slate-700 text-xs">{child.label}</span>
                                      </Link>
                                    </DropdownMenuItem>
                                  ))}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        {item.children.map((child: any, childIdx: number) => {
                          if (child.section) {
                            return (
                              <div key={child.label}>
                                {childIdx > 0 && <DropdownMenuSeparator className="my-1" />}
                                <DropdownMenuLabel className="text-xs font-bold uppercase tracking-wide text-slate-500 px-2 py-1.5">
                                  {child.label}
                                </DropdownMenuLabel>
                                {child.children.map((subChild: any) => (
                                  <DropdownMenuItem key={subChild.href} asChild>
                                    <Link href={subChild.href} className="flex items-center gap-2 w-full cursor-pointer">
                                      <subChild.icon className="h-3.5 w-3.5" />
                                      <span className="text-xs">{subChild.label}</span>
                                    </Link>
                                  </DropdownMenuItem>
                                ))}
                              </div>
                            );
                          }
                          return (
                            <DropdownMenuItem key={child.href} asChild>
                              <Link href={child.href} className="flex items-center gap-2 w-full cursor-pointer">
                                <child.icon className="h-4 w-4" />
                                <span className="text-xs">{child.label}</span>
                              </Link>
                            </DropdownMenuItem>
                          );
                        })}
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            })}
            </div>
          </div>
        </div>

        {/* Mobile logo */}
        <Link href="/" className="md:hidden flex items-center shrink-0">
          <img
            src={logoImage}
            alt="EduMeUp Logo"
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-2 ml-auto shrink-0">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Button>
          </Link>
          {user ? (
            <Link href={dashboardPath}>
              <button
                type="button"
                className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-sm font-bold text-[#2366c9] transition hover:border-blue-200 hover:bg-blue-50"
                title="Open dashboard"
              >
                {user.firstname?.[0] || user.fullname?.[0] || user.username[0]}
              </button>
            </Link>
          ) : (
            <>
              <Link href="/register">
                <Button size="sm" className="hidden sm:flex font-semibold shadow-sm bg-[#2366c9] text-white hover:bg-blue-700">
                  Sign Up
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="sm" className="hidden sm:flex font-semibold border-slate-200 text-slate-700 hover:bg-slate-50">
                  Sign In
                </Button>
              </Link>
            </>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b bg-white md:hidden overflow-hidden"
          >
            <div className="space-y-1 p-4">
              {navItems.map((item) => {
                if (item.type === "link") {
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                      <div
                        className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                          isActive(item.href)
                            ? "bg-blue-50 text-[#2366c9]"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </div>
                    </Link>
                  );
                }

                return (
                  <div key={item.label} className="space-y-1">
                    <Link href={item.mainHref} onClick={() => setIsOpen(false)}>
                      <div className="flex items-center justify-between rounded-lg px-4 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hover:text-slate-700 hover:bg-slate-50 border border-transparent hover:border-slate-200">
                        <span>{item.label}</span>
                        <ChevronRight className="h-3.5 w-3.5 opacity-70" />
                      </div>
                    </Link>
                    {item.children.map((child: any) => {
                      if (child.section) {
                        return (
                          <div key={child.label} className="space-y-1">
                            <div className="px-4 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                              {child.label}
                            </div>
                            {child.children.map((subChild: any) => (
                              <Link key={subChild.href} href={subChild.href} onClick={() => setIsOpen(false)}>
                                <div
                                  className={`flex items-center gap-2 rounded-lg px-8 py-2.5 text-xs font-medium transition-colors ${
                                    isActive(subChild.href)
                                      ? "bg-blue-50 text-[#2366c9]"
                                      : "text-slate-700 hover:bg-slate-50"
                                  }`}
                                >
                                  <subChild.icon className="h-3.5 w-3.5" />
                                  {subChild.label}
                                </div>
                              </Link>
                            ))}
                          </div>
                        );
                      }
                      return (
                        <Link key={child.href} href={child.href} onClick={() => setIsOpen(false)}>
                          <div
                            className={`flex items-center gap-2 rounded-lg px-8 py-2.5 text-xs font-medium transition-colors ${
                              isActive(child.href)
                                ? "bg-blue-50 text-[#2366c9]"
                                : "text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <child.icon className="h-3.5 w-3.5" />
                            {child.label}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                );
              })}
              <div className="pt-4 mt-4 border-t">
                {user ? (
                  <Link href={dashboardPath} onClick={() => setIsOpen(false)}>
                    <div className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                      <Users className="h-4 w-4" />
                      Dashboard
                    </div>
                  </Link>
                ) : (
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <div className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                      Login
                    </div>
                  </Link>
                )}
                <Link href="/cart" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                    <ShoppingCart className="h-4 w-4" />
                    Cart ({items.length})
                  </div>
                </Link>
                {!user && (
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full font-semibold margin-top-2 bg-[#2366c9] text-white hover:bg-blue-700 mt-2">
                      Sign Up
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
