import { Link, useLocation } from "wouter";
import { ChevronDown } from "lucide-react";
import { useAuthUser, useLogout } from "@/hooks/use-auth";
import logoImage from "@/assets/WhatsApp_Image_2026-02-22_at_20.36.37_1771782478374.jpeg";

type MegaColumn = {
  heading?: string;
  items: {
    label: string;
    href: string;
    eyebrow?: string;
  }[];
};

type SimpleDropdownItem =
  | {
      type?: "item";
      label: string;
      description: string;
      href: string;
    }
  | {
      type: "separator";
    };

const learnColumns: MegaColumn[] = [
  {
    heading: "Diagnostics & Assessment",
    items: [
      { label: "Diagnostic Services", href: "/programs/ai-diagnostic", eyebrow: "Assessment" },
      { label: "O-Level Bridge Diagnostic", href: "/programs/ai-diagnostic" },
      { label: "English Level Check", href: "/programs/english-mastery" },
      { label: "O-Level Subject Diagnostic", href: "/programs/complete-o-level" },
      { label: "ATP Diagnostic", href: "/programs/atp-courses" },
      { label: "Teacher Subject Knowledge Diagnostic", href: "/teacher-courses#t1" },
      { label: "School Class-Level Diagnostic", href: "/diagnostics#school-class" },
    ],
  },
  {
    heading: "Student Programmes",
    items: [
      { label: "Lower Secondary", href: "/programs", eyebrow: "Gr 6-8" },
      { label: "Pre-O-Level", href: "/programs/pre-o-level-victory" },
      { label: "Must-Have Courses", href: "/programs" },
      { label: "O-Level English", href: "/programs/english-mastery", eyebrow: "10 courses" },
      { label: "O-Level Subjects", href: "/programs/complete-o-level", eyebrow: "10 subjects" },
      { label: "ATP Courses", href: "/programs/atp-courses" },
      { label: "Bridge Courses", href: "/programs/bridge-courses" },
    ],
  },
  {
    heading: "Exam, Resources & Teacher",
    items: [
      { label: "Exam Prep", href: "/programs/exam-prep" },
      { label: "Mock Exams", href: "/programs/exam-prep" },
      { label: "Exam Preparation Workbooks", href: "/exam-prep-workbooks", eyebrow: "paid" },
      { label: "Teacher Courses", href: "/teacher-courses", eyebrow: "T1-T6" },
      { label: "Teacher Certification", href: "/teacher-training" },
      { label: "Free Resources", href: "/free-resources", eyebrow: "samples only" },
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

const consultancyItems: SimpleDropdownItem[] = [
  { label: "Cambridge Consultancy", description: "Strategy and implementation support", href: "/cambridge-consultancy" },
  { type: "separator" },
  { label: "About EduMeUp", description: "Mission, team, and learning philosophy", href: "/about" },
  { label: "How EduMeUp Works", description: "Our model from diagnosis to mastery", href: "/how-it-works" },
  { label: "How EduMeUp Is Different", description: "What sets the platform apart", href: "/how-edumeup-is-different" },
  { label: "Research & Development", description: "Learning science and product research", href: "/research" },
  { label: "Blog", description: "Insights for students, parents, and schools", href: "/blog" },
  { type: "separator" },
  { label: "Contact Us", description: "Start a conversation with our team", href: "/contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const { data: user } = useAuthUser();
  const logout = useLogout();

  const dashboardPath =
    user?.role === "admin"
      ? "/dashboard/admin"
      : user?.role === "parent"
        ? "/dashboard/parent"
        : user?.role === "school"
          ? "/dashboard/school"
          : "/dashboard/student";

  const dashboardHref = user ? dashboardPath : "/login";
  const firstName =
    user?.firstname ||
    user?.fullname?.split(" ")[0] ||
    user?.username ||
    "Account";

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location === path || location.startsWith(`${path}/`);
  };

  const navLinkClass = (path?: string, activeOverride?: boolean) => {
    const active = activeOverride ?? Boolean(path && isActive(path));

    return `relative flex h-12 items-center whitespace-nowrap px-0 pt-0.5 font-[Arial] text-[12px] font-semibold uppercase tracking-normal transition-colors after:absolute after:bottom-[8px] after:left-0 after:h-[2px] after:bg-[#17A589] after:transition-all xl:h-14 xl:text-[13px] ${
      active
        ? "text-white after:w-full"
        : "text-white/85 after:w-0 hover:text-white hover:after:w-full"
    }`;
  };

  return (
    <nav className="sticky top-0 z-[1000] w-full border-b border-white/10 bg-gradient-to-r from-[#162B48] via-[#1E3A5F] to-[#163052] shadow-[0_2px_16px_rgba(0,0,0,0.25)]">
      <div className="relative flex h-14 w-full items-center gap-4 px-4 md:px-5 xl:h-16 xl:px-7 2xl:px-10">
        <Link href="/" className="flex shrink-0 items-center lg:w-[160px] 2xl:w-[200px]">
          <img
            src={logoImage}
            alt="EduMeUp Logo"
            className="h-8 w-auto object-contain xl:h-9"
          />
        </Link>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-5 xl:gap-7 2xl:gap-8">
          <Link href="/" className={navLinkClass("/")}>
            Home
          </Link>

          <div className="group static">
            <button
              type="button"
              className={navLinkClass(
                undefined,
                [
                  "/programs",
                  "/all-programs",
                  "/free-resources",
                  "/teacher-courses",
                  "/teacher-training",
                  "/exam-prep-workbooks",
                ].some(isActive),
              )}
            >
              <span>Learn</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="invisible absolute left-0 top-full w-screen translate-y-1 border-t border-[#17A589]/30 bg-[#F8FAFC] opacity-0 shadow-[0_24px_50px_rgba(15,23,42,0.22)] transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="h-1 w-full bg-gradient-to-r from-[#17A589] via-[#2E75B6] to-[#17A589]" />
              <div className="mx-auto grid max-w-7xl grid-cols-3 gap-4 px-6 py-5 xl:px-8 xl:py-6">
                {learnColumns.map((column) => (
                  <div
                    key={column.heading}
                    className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:p-5"
                  >
                    <p className="mb-3 border-b border-slate-100 pb-2 font-[Arial] text-[11px] font-bold uppercase tracking-[0.1em] text-[#1E3A5F]">
                      {column.heading}
                    </p>
                    <div className="space-y-0.5">
                      {column.items.map((item) => (
                        <Link
                          key={`${item.label}-${item.href}`}
                          href={item.href}
                          className="block rounded-md border-l-2 border-transparent px-2.5 py-1.5 transition hover:border-[#17A589] hover:bg-[#EAF7F4]"
                        >
                          <span className="block font-[Arial] text-[12px] font-bold uppercase leading-4 text-slate-800">
                            {item.label}
                          </span>
                          {item.eyebrow && (
                            <span className="block font-[Arial] text-[11px] italic text-slate-500">
                              {item.eyebrow}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/all-programs"
                className="block border-t border-slate-200 bg-white px-8 py-3 text-center font-[Arial] text-[13px] font-bold uppercase tracking-[0.06em] text-[#1E3A5F] transition hover:bg-[#17A589] hover:text-white"
              >
                All Courses - View the complete EduMeUp programme catalogue &gt;
              </Link>
            </div>
          </div>

          <Link href="/tutoring" className={navLinkClass("/tutoring")}>
            Tutoring
          </Link>

          <SimpleDropdown
            label="For You"
            active={["/for-students", "/for-parents", "/for-teachers", "/for-schools"].some(isActive)}
            items={forYouItems}
            widthClass="w-[280px]"
            navLinkClass={navLinkClass}
          />

          <SimpleDropdown
            label="Cambridge Consultancy"
            active={["/cambridge-consultancy", "/about", "/how-it-works", "/research", "/blog"].some(isActive)}
            items={consultancyItems}
            widthClass="w-[300px]"
            navLinkClass={navLinkClass}
          />

          <Link href="/pricing" className={navLinkClass("/pricing")}>
            Pricing
          </Link>
        </div>

        <div className="shrink-0 items-center justify-end gap-2 lg:flex lg:w-[330px] 2xl:w-[390px] 2xl:gap-3 hidden">
          <Link
            href="/free-resources"
            className="whitespace-nowrap rounded-md border border-[#17A589] px-4 py-2.5 font-[Arial] text-[12px] font-semibold leading-none text-[#17A589] transition hover:bg-[#17A589] hover:text-white xl:px-5 xl:py-3 xl:text-[13px]"
          >
            Free Resources
          </Link>

          <Link
            href={dashboardHref}
            className="whitespace-nowrap rounded-md bg-[#2E75B6] px-4 py-2.5 font-[Arial] text-[12px] font-semibold leading-none text-white transition hover:bg-[#163052] xl:px-5 xl:py-3 xl:text-[13px]"
          >
            My Dashboard
          </Link>

          {user ? (
            <div className="group relative">
              <button
                type="button"
                className="flex items-center whitespace-nowrap rounded-md bg-[#17A589] px-4 py-2.5 font-[Arial] text-[12px] font-semibold leading-none text-white transition hover:bg-[#1DC8A7] xl:px-5 xl:py-3 xl:text-[13px]"
              >
                {firstName}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="invisible absolute right-0 top-full w-40 translate-y-1 overflow-hidden rounded-b-lg border border-slate-200 bg-white py-2 opacity-0 shadow-[0_18px_36px_rgba(15,23,42,0.18)] transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="mb-1 h-1 bg-gradient-to-r from-[#17A589] to-[#2E75B6]" />
                <Link href={dashboardPath} className="mx-2 block rounded-md px-3 py-2 font-[Arial] text-[12px] font-semibold text-slate-700 transition hover:bg-[#EAF7F4] hover:text-[#1E3A5F]">
                  Dashboard
                </Link>
                <Link href="/dashboard/profile" className="mx-2 block rounded-md px-3 py-2 font-[Arial] text-[12px] font-semibold text-slate-700 transition hover:bg-[#EAF7F4] hover:text-[#1E3A5F]">
                  Profile
                </Link>
                <div className="my-1 h-px bg-slate-200" />
                <button
                  type="button"
                  onClick={() => logout.mutate()}
                  className="mx-2 block w-[calc(100%-16px)] rounded-md px-3 py-2 text-left font-[Arial] text-[12px] font-semibold text-slate-700 transition hover:bg-[#EAF7F4] hover:text-[#1E3A5F]"
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="whitespace-nowrap rounded-md bg-[#17A589] px-4 py-2.5 font-[Arial] text-[12px] font-semibold leading-none text-white transition hover:bg-[#1DC8A7] xl:px-5 xl:py-3 xl:text-[13px]"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

function SimpleDropdown({
  label,
  active,
  items,
  widthClass,
  navLinkClass,
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
        <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      <div
        className={`invisible absolute right-0 top-full ${widthClass} translate-y-1 overflow-hidden rounded-b-lg border border-slate-200 bg-white pb-2 opacity-0 shadow-[0_18px_36px_rgba(15,23,42,0.18)] transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100`}
      >
        <div className="h-1 bg-gradient-to-r from-[#17A589] to-[#2E75B6]" />
        {items.map((item, index) =>
          item.type === "separator" ? (
            <div key={`separator-${index}`} className="my-2 h-px bg-slate-200" />
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className="mx-2 mt-1 block rounded-md border-l-2 border-transparent px-3 py-2 transition hover:border-[#17A589] hover:bg-[#EAF7F4]"
            >
              <span className="block font-[Arial] text-[12px] font-bold leading-4 text-slate-800">
                {item.label}
              </span>
              <span className="mt-0.5 block font-[Arial] text-[11px] italic leading-4 text-slate-500">
                {item.description}
              </span>
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
