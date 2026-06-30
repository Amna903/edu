import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, ShoppingCart, Menu, X, LogOut, User, LayoutDashboard } from "lucide-react";
import { useAuthUser, useLogout } from "@/hooks/use-auth";
import { useCart } from "@/context/CartContext";
import logoImage from "@/assets/WhatsApp_Image_2026-02-22_at_20.36.37_1771782478374.jpeg";

// ── Types ────────────────────────────────────────────────────
type MegaColumn = {
  heading?: string;
  items: { label: string; href: string; eyebrow?: string }[];
};

type SimpleDropdownItem =
  | { type?: "item"; label: string; description: string; href: string }
  | { type: "separator" };

// ── Static data ──────────────────────────────────────────────
const learnColumns: MegaColumn[] = [
  {
    heading: "Diagnostics & Assessment",
    items: [
      { label: "Diagnostic Services", href: "/diagnostics" },
      { label: "O-Level Bridge Diagnostic", href: "/diagnostics/start?type=1" },
      { label: "English Level Check", href: "/programs/english-mastery" },
      { label: "O-Level Subject Diagnostic", href: "/diagnostics" },
      { label: "ATP Diagnostic", href: "/programs/atp-courses" },
      { label: "Teacher Subject Knowledge", href: "/teacher-courses#t1" },
      { label: "School Class-Level Diagnostic", href: "/diagnostics#school-class" },
    ],
  },
  {
    heading: "Student Programmes",
    items: [
      { label: "Lower Secondary Grade 6–8", href: "/programs" },
      { label: "Pre-O-Level", href: "/programs/pre-o-level" },
      { label: "Must-Have Courses", href: "/programs/must-have-courses" },
      { label: "O-Level English", href: "/programs/english-mastery" },
      { label: "O-Level Subjects", href: "/olevel-subjects" },
      { label: "ATP Courses", href: "/programs/atp-courses" },
      { label: "Bridge Courses", href: "/programs/bridge-courses" },
    ],
  },
  {
    heading: "Exam, Resources & Teacher",
    items: [
      { label: "Exam Prep", href: "/programs/exam-prep" },
      { label: "Mock Exams", href: "/programs/exam-prep" },
      { label: "Exam Preparation Workbooks", href: "/exam-prep-workbooks" },
      { label: "Topical Workbooks", href: "/resources/topical-workbooks" },
      { label: "Past Paper Collections", href: "/resources/exam-papers" },
      { label: "Teacher Courses T1–T6", href: "/teacher-courses" },
      { label: "Teacher Certification", href: "/teacher-training" },
      { label: "Free Resources", href: "/free-resources" },
    ],
  },
];

const forYouItems: SimpleDropdownItem[] = [
  { label: "For Students", description: "Courses, diagnostics, and study support", href: "/for-students" },
  { label: "For Parents", description: "Progress visibility and guided learning plans", href: "/for-parents" },
  { label: "For Teachers", description: "Training, certification, and classroom tools", href: "/for-teachers" },
  { label: "For Schools", description: "Whole-school programmes and implementation", href: "/for-schools" },
  { type: "separator" },
  { label: "Impact Partnerships", description: "Access, scholarships, and ecosystem work", href: "/impact-partnerships" },
  { label: "Contact Us / Get a Demo", description: "Talk to the EduMeUp team", href: "/contact" },
];

const tutorItems: SimpleDropdownItem[] = [
  { label: "Tutoring", description: "Explore our tutoring services and programmes", href: "/tutoring" },
  { label: "Find a Tutor", description: "Search and connect with certified tutors", href: "/find-a-tutor" },
];

const whyItems: SimpleDropdownItem[] = [
  { label: "How EduMeUp Works", description: "Our model from diagnosis to mastery", href: "/how-it-works" },
  { label: "How We Are Different", description: "Why EduMeUp vs alternatives", href: "/how-edumeup-is-different" },
  { label: "About EduMeUp", description: "Mission, team, and learning philosophy", href: "/about" },
  { label: "Research & Development", description: "Learning science and product research", href: "/research" },
];

// ── Main Navbar ──────────────────────────────────────────────
export function Navbar() {
  const [location] = useLocation();
  const { data: user } = useAuthUser();
  const { itemCount } = useCart();
  const logout = useLogout();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false); setMobileSection(null); }, [location]);

  // Close drawer on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const dashboardPath =
    user?.role === "admin" ? "/dashboard/admin"
    : user?.role === "parent" ? "/dashboard/parent"
    : user?.role === "school" ? "/dashboard/school"
    : "/dashboard/student";

  const firstName =
    user?.firstname || user?.fullname?.split(" ")[0] || user?.username || "Account";

  const isActive = (path: string) =>
    path === "/" ? location === "/" : location === path || location.startsWith(`${path}/`);

  const navLinkCls = (path?: string, activeOverride?: boolean) => {
    const active = activeOverride ?? Boolean(path && isActive(path));
    return `relative flex h-14 items-center gap-0.5 whitespace-nowrap px-0 pt-0.5 font-[Arial] text-[12px] font-semibold uppercase tracking-normal transition-colors after:absolute after:bottom-[10px] after:left-0 after:h-[2px] after:bg-brand-primary after:transition-all xl:h-16 xl:text-[13px] ${
      active ? "text-brand-navy after:w-full" : "text-slate-600 after:w-0 hover:text-brand-primary hover:after:w-full"
    }`;
  };

  return (
    <>
      {/* ── Desktop + tablet bar ─────────────────────────── */}
      <nav className="sticky top-0 z-[1000] w-full border-b border-slate-200 bg-white shadow-sm">
        <div className="flex h-14 w-full items-center gap-3 px-4 md:px-5 xl:h-16 xl:gap-5 xl:px-7 2xl:px-10">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <img src={logoImage} alt="EduMeUp" className="h-8 w-auto object-contain xl:h-9" />
          </Link>

          {/* Desktop nav links — hidden below lg */}
          <div className="hidden min-w-0 flex-1 items-center justify-center gap-4 lg:flex xl:gap-6 2xl:gap-8">
            <Link href="/" className={navLinkCls("/")}>Home</Link>

            {/* Learn mega menu */}
            <div className="group static">
              <button type="button" className={navLinkCls(undefined,
                ["/programs","/all-programs","/free-resources","/teacher-courses","/teacher-training","/exam-prep-workbooks"].some(isActive))}>
                <span>Learn</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <div className="invisible absolute left-0 top-full w-screen translate-y-1 border-t border-slate-200 bg-[#F8FAFC] opacity-0 shadow-[0_24px_50px_rgba(15,23,42,0.12)] transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="h-1 w-full bg-brand-primary" />
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 py-5 sm:grid-cols-2 lg:grid-cols-3 xl:px-8 xl:py-6">
                  {learnColumns.map((col) => (
                    <div key={col.heading} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:p-5">
                      <p className="mb-3 border-b border-slate-100 pb-2 font-[Arial] text-[11px] font-bold uppercase tracking-[0.1em] text-brand-navy">{col.heading}</p>
                      <div className="space-y-0.5">
                        {col.items.map((item) => (
                          <Link key={item.href + item.label} href={item.href}
                            className="block rounded-md border-l-2 border-transparent px-2.5 py-1.5 transition hover:border-brand-primary hover:bg-[#eef6ff]">
                            <span className="block font-[Arial] text-[12px] font-bold uppercase leading-4 text-slate-800">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/all-programs"
                  className="block border-t border-slate-200 bg-white px-8 py-3 text-center font-[Arial] text-[13px] font-bold uppercase tracking-[0.06em] text-brand-navy transition hover:bg-brand-primary hover:text-white">
                  All Courses — View the complete EduMeUp programme catalogue &gt;
                </Link>
              </div>
            </div>

            <SimpleDropdown label="Tutor"
              active={["/tutoring","/find-a-tutor"].some(isActive)}
              items={tutorItems} widthClass="w-[280px]" navLinkClass={navLinkCls} />

            <SimpleDropdown label="For You"
              active={["/for-students","/for-parents","/for-teachers","/for-schools"].some(isActive)}
              items={forYouItems} widthClass="w-[280px]" navLinkClass={navLinkCls} />

            <Link href="/cambridge-consultancy" className={navLinkCls("/cambridge-consultancy")}>
              <span className="hidden xl:inline">Cambridge Consultancy</span>
              <span className="xl:hidden">Consultancy</span>
            </Link>

            <SimpleDropdown label="Why EduMeUp"
              active={["/how-edumeup-is-different","/why-edumeup","/how-it-works","/about","/research"].some(isActive)}
              items={whyItems} widthClass="w-[320px]" navLinkClass={navLinkCls} />

            <Link href="/pricing" className={navLinkCls("/pricing")}>Pricing</Link>
          </div>

          {/* Right side — desktop */}
          <div className="ml-auto hidden shrink-0 items-center gap-2 lg:flex 2xl:gap-3">
            <CartIcon itemCount={itemCount} />
            <Link href="/free-resources"
              className="whitespace-nowrap rounded-md border border-slate-200 px-3 py-2 font-[Arial] text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-brand-primary xl:px-4 xl:py-2.5 xl:text-[12px]">
              Free Resources
            </Link>
            {user ? (
              <div className="group relative">
                <button type="button"
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-md border border-slate-200 bg-white px-3 py-2 font-[Arial] text-[11px] font-semibold text-brand-primary transition hover:bg-slate-50 xl:px-4 xl:py-2.5 xl:text-[12px]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700 text-[10px]">
                    {firstName[0]?.toUpperCase()}
                  </span>
                  <span>{firstName}</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                <div className="invisible absolute right-0 top-full w-44 translate-y-1 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 opacity-0 shadow-[0_18px_36px_rgba(15,23,42,0.18)] transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="mb-1 h-1 bg-brand-primary" />
                  <Link href={dashboardPath} className="flex items-center gap-2 mx-2 rounded-md px-3 py-2 font-[Arial] text-[12px] font-semibold text-slate-700 transition hover:bg-[#eef6ff] hover:text-[#1E3A5F]">
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                  <Link href="/dashboard/profile" className="flex items-center gap-2 mx-2 rounded-md px-3 py-2 font-[Arial] text-[12px] font-semibold text-slate-700 transition hover:bg-[#eef6ff] hover:text-[#1E3A5F]">
                    <User className="h-4 w-4" /> Profile
                  </Link>
                  <div className="my-1 h-px bg-slate-200" />
                  <button type="button" onClick={() => logout.mutate()}
                    className="flex w-[calc(100%-16px)] items-center gap-2 mx-2 rounded-md px-3 py-2 font-[Arial] text-[12px] font-semibold text-slate-700 transition hover:bg-[#eef6ff] hover:text-red-600">
                    <LogOut className="h-4 w-4" /> Log out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login"
                className="whitespace-nowrap rounded-md border border-slate-200 bg-white px-3 py-2 font-[Arial] text-[11px] font-semibold text-brand-primary transition hover:bg-slate-50 xl:px-4 xl:py-2.5 xl:text-[12px]">
                Login
              </Link>
            )}
          </div>

          {/* Mobile right: cart + hamburger */}
          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <CartIcon itemCount={itemCount} />
            <button type="button" onClick={() => setMobileOpen(true)} aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition hover:bg-slate-50">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile overlay backdrop ──────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[1001] bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)} />
      )}

      {/* ── Mobile drawer ────────────────────────────────── */}
      <div ref={drawerRef}
        className={`fixed right-0 top-0 z-[1002] flex h-full w-[min(85vw,340px)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}>

        {/* Drawer header */}
        <div className="flex h-14 items-center justify-between border-b border-slate-200 px-4">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <img src={logoImage} alt="EduMeUp" className="h-7 w-auto object-contain" />
          </Link>
          <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer body — scrollable */}
        <div className="flex-1 overflow-y-auto">

          {/* User banner */}
          {user && (
            <div className="flex items-center gap-3 border-b border-slate-100 bg-blue-50 px-4 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-200 font-bold text-blue-800 text-sm">
                {firstName[0]?.toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="truncate font-semibold text-sm text-slate-900">{user.fullname}</p>
                <p className="text-xs text-slate-500 capitalize">{user.role}</p>
              </div>
            </div>
          )}

          {/* Top links */}
          <div className="px-3 py-3 space-y-0.5">
            {[
              { label: "Home", href: "/" },
              { label: "Pricing", href: "/pricing" },
              { label: "Free Resources", href: "/free-resources" },
              { label: "Cambridge Consultancy", href: "/cambridge-consultancy" },
            ].map((item) => (
              <Link key={item.href} href={item.href}
                className={`block rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                  isActive(item.href) ? "bg-blue-50 text-brand-primary" : "text-slate-700 hover:bg-slate-50"
                }`}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mx-3 my-1 h-px bg-slate-100" />

          {/* Accordion sections */}
          {[
            { id: "learn", label: "Learn", links: learnColumns.flatMap((c) => c.items) },
            { id: "tutor", label: "Tutor", links: tutorItems.filter((i): i is Extract<SimpleDropdownItem,{href:string}> => i.type !== "separator") },
            { id: "foryou", label: "For You", links: forYouItems.filter((i): i is Extract<SimpleDropdownItem,{href:string}> => i.type !== "separator") },
            { id: "why", label: "Why EduMeUp", links: whyItems.filter((i): i is Extract<SimpleDropdownItem,{href:string}> => i.type !== "separator") },
          ].map((section) => (
            <div key={section.id}>
              <button type="button"
                onClick={() => setMobileSection(mobileSection === section.id ? null : section.id)}
                className="flex w-full items-center justify-between px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-700 transition hover:text-brand-primary">
                {section.label}
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileSection === section.id ? "rotate-180" : ""}`} />
              </button>
              {mobileSection === section.id && (
                <div className="pb-2 px-3 space-y-0.5">
                  {section.links.map((item) => (
                    <Link key={item.href} href={item.href}
                      className="block rounded-lg px-4 py-2 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-brand-primary">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
              <div className="mx-3 h-px bg-slate-100" />
            </div>
          ))}

          {/* Account links */}
          <div className="px-3 py-3 space-y-0.5">
            {user ? (
              <>
                <Link href={dashboardPath}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  <LayoutDashboard className="h-4 w-4 text-brand-primary" /> Dashboard
                </Link>
                <Link href="/dashboard/profile"
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                  <User className="h-4 w-4 text-brand-primary" /> Profile
                </Link>
              </>
            ) : (
              <Link href="/login"
                className="flex items-center justify-center rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-navy">
                Login / Register
              </Link>
            )}
          </div>
        </div>

        {/* Drawer footer */}
        <div className="border-t border-slate-200 px-4 py-3">
          {user ? (
            <button type="button" onClick={() => { logout.mutate(); setMobileOpen(false); }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          ) : (
            <Link href="/contact"
              className="flex w-full items-center justify-center rounded-lg border border-brand-primary py-2.5 text-sm font-bold text-brand-primary transition hover:bg-blue-50">
              Get a Demo
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

// ── Cart icon (shared) ───────────────────────────────────────
function CartIcon({ itemCount }: { itemCount: number }) {
  return (
    <Link href="/cart" aria-label={`Cart — ${itemCount} item${itemCount === 1 ? "" : "s"}`}
      className="relative flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition hover:bg-slate-50 hover:text-brand-primary">
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-primary px-1 font-[Arial] text-[10px] font-bold leading-none text-white">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
}

// ── Desktop simple dropdown ──────────────────────────────────
function SimpleDropdown({
  label, active, items, widthClass, navLinkClass,
}: {
  label: string;
  active: boolean;
  items: SimpleDropdownItem[];
  widthClass: string;
  navLinkClass: (path?: string, activeOverride?: boolean) => string;
}) {
  return (
    <div className="group relative">
      <button type="button" className={navLinkClass(undefined, active)}>
        <span>{label}</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      <div className={`invisible absolute right-0 top-full ${widthClass} translate-y-1 overflow-hidden rounded-xl border border-slate-200 bg-white pb-2 opacity-0 shadow-[0_18px_36px_rgba(15,23,42,0.18)] transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100`}>
        <div className="h-1 bg-brand-primary" />
        {items.map((item, i) =>
          item.type === "separator" ? (
            <div key={`sep-${i}`} className="my-2 h-px bg-slate-200" />
          ) : (
            <Link key={item.href} href={item.href}
              className="mx-2 mt-1 block rounded-md border-l-2 border-transparent px-3 py-2 transition hover:border-brand-primary hover:bg-[#eef6ff]">
              <span className="block font-[Arial] text-[12px] font-bold uppercase leading-4 text-slate-800">{item.label}</span>
              <span className="mt-0.5 block font-[Arial] text-[11px] italic leading-4 text-slate-500">{item.description}</span>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
