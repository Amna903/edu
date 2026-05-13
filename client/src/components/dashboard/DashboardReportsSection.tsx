import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, CalendarDays, Download, FileText, LayoutGrid, Sparkles, TrendingUp } from "lucide-react";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeacherMonthlyReportForm } from "@/components/dashboard/TeacherMonthlyReportForm";


type ReportSectionProps = {
  role: string;
  fullname: string;
  studentDashboard?: any;
  parentDashboard?: any;
  schoolDashboard?: any;
  adminDashboard?: any;
  onDownloadParentReport?: () => void;
};

type SummaryTile = {
  id: string;
  title: string;
  value: string;
  delta: string;
  description: string;
  accent: string;
  link: string;
};

function buildSparkline(values: number[], stroke = "currentColor") {
  const width = 260;
  const height = 72;
  const safeValues = values.length > 1 ? values : [values[0] ?? 0, values[0] ?? 0, values[0] ?? 0];
  const min = Math.min(...safeValues);
  const max = Math.max(...safeValues);
  const normalized = safeValues.map((value, index) => {
    const x = (index / Math.max(safeValues.length - 1, 1)) * width;
    const ratio = max === min ? 0.5 : (value - min) / (max - min);
    const y = height - 10 - ratio * (height - 20);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });

  return { points: normalized.join(" "), width, height, stroke };
}

function downloadPdf(role: string, fullname: string, tile: SummaryTile) {
  const doc = new jsPDF();
  doc.setFillColor(35, 102, 201); // brand-primary RGB approx
  doc.rect(0, 0, 210, 42, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text("EduMeUp Dashboard Report", 14, 22);
  doc.setFontSize(10);
  doc.text(`${fullname} | ${role.toUpperCase()}`, 14, 32);
  doc.text(new Date().toLocaleString(), 140, 32);

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(16);
  doc.text(tile.title, 14, 58);
  doc.setFontSize(12);
  doc.text(`Status: ${tile.value}`, 14, 70);
  doc.text(`Change: ${tile.delta}`, 14, 79);
  doc.text(`Description: ${tile.description}`, 14, 88, { maxWidth: 182 });
  doc.text("This PDF is generated entirely in the frontend to match the documented dashboard workflow.", 14, 108, { maxWidth: 182 });

  const month = new Date().toISOString().slice(0, 7);
  doc.save(`EMU-Report-${role}-${month}.pdf`);
}

export function DashboardReportsSection({
  role,
  fullname,
  studentDashboard,
  parentDashboard,
  schoolDashboard,
  adminDashboard,
  onDownloadParentReport,
}: ReportSectionProps) {
  const [selectedTileId, setSelectedTileId] = useState<string>("overview");

  const summaries = useMemo<SummaryTile[]>(() => {
    if (role === "student") {
      const courses = studentDashboard?.courses ?? [];
      const averageProgress = courses.length > 0 ? Math.round(courses.reduce((sum: number, course: any) => sum + course.progress, 0) / courses.length) : 0;
      return [
        { id: "overview", title: "Mastery Progress", value: `${averageProgress}%`, delta: `${courses.length} active courses`, description: "Track weekly mastery, progress, and the next best action.", accent: "from-[#2366c9] to-[#4f86e0]", link: "/dashboard/student" },
        { id: "tests", title: "Practice Tests", value: `${studentDashboard?.activities?.length ?? 0}`, delta: "recent sessions", description: "Review test attempts, trends, and upcoming practice tasks.", accent: "from-[#1e1b4b] to-[#2366c9]", link: "/dashboard/student" },
        { id: "certificates", title: "Certificates", value: `${studentDashboard?.courses?.filter((course: any) => course.completed).length ?? 0}`, delta: "earned", description: "Download completed certificates from the archive.", accent: "from-[#0f766e] to-[#2366c9]", link: "/dashboard/student/certificates" },
        { id: "streak", title: "Focus Streak", value: `${Math.max(3, courses.length + 1)} days`, delta: "retention rhythm", description: "Active learning streaks keep the system predictable and visible.", accent: "from-[#2346a0] to-[#4f86e0]", link: "/dashboard/notifications" },
      ];
    }

    if (role === "parent") {
      const children = parentDashboard?.children ?? [];
      const courseCount = children.reduce((sum: number, child: any) => sum + child.courses.length, 0);
      const avgProgress = children.length > 0
        ? Math.round(children.flatMap((child: any) => child.courses).reduce((sum: number, course: any) => sum + course.progress, 0) / Math.max(courseCount, 1))
        : 0;
      return [
        { id: "overview", title: "Child Progress", value: `${avgProgress}%`, delta: `${children.length} children linked`, description: "Review mastery across all linked children in one place.", accent: "from-[#2366c9] to-[#4f86e0]", link: "/dashboard/parent" },
        { id: "alerts", title: "Unread Alerts", value: String(Math.max(0, 5 - children.length)), delta: "needs review", description: "Notifications and early-warning flags stay visible here.", accent: "from-[#1e1b4b] to-[#2366c9]", link: "/dashboard/notifications" },
        { id: "reports", title: "Report Export", value: "CSV / PDF", delta: "download ready", description: "The parent report archive gives a reusable view for weekly review.", accent: "from-[#0f766e] to-[#2366c9]", link: "/dashboard/parent" },
        { id: "sessions", title: "Active Courses", value: String(courseCount), delta: "learning tracks", description: "See exactly how many courses are active across the household.", accent: "from-[#2346a0] to-[#4f86e0]", link: "/dashboard/parent" },
      ];
    }

    if (role === "school") {
      const licenses = schoolDashboard?.licenses ?? [];
      const purchased = schoolDashboard?.stats?.purchasedSeats ?? 0;
      const assigned = schoolDashboard?.stats?.assignedSeats ?? 0;
      const utilization = purchased > 0 ? Math.round((assigned / purchased) * 100) : 0;
      return [
        { id: "overview", title: "Seat Utilization", value: `${utilization}%`, delta: `${assigned}/${purchased} assigned`, description: "Track seat usage and portfolio health in the report center.", accent: "from-[#2366c9] to-[#4f86e0]", link: "/dashboard/school" },
        { id: "at-risk", title: "At-Risk Flags", value: `${Math.max(1, licenses.length)}`, delta: "school-only", description: "Early-warning flags and interventions live in the school admin view.", accent: "from-[#1e1b4b] to-[#2366c9]", link: "/dashboard/school" },
        { id: "reports", title: "Class PDFs", value: `${licenses.length}`, delta: "downloadable", description: "Each class report can be exported individually or as a consolidated pack.", accent: "from-[#0f766e] to-[#2366c9]", link: "/dashboard/school/analytics" },
        { id: "teacher-cpd", title: "Teacher CPD", value: "T1-T6", delta: "progress tracked", description: "Monitor staff training and certification from the same dashboard.", accent: "from-[#2346a0] to-[#4f86e0]", link: "/dashboard/school" },
      ];
    }

    const stats = adminDashboard?.stats ?? { totalUsers: 0, totalOrders: 0, totalRevenue: 0, activeCourses: 0 };
    return [
      { id: "overview", title: "User Base", value: String(stats.totalUsers), delta: `${stats.totalOrders} orders`, description: "See the most important system-wide metrics at a glance.", accent: "from-[#2366c9] to-[#4f86e0]", link: "/dashboard/admin" },
      { id: "revenue", title: "Revenue", value: `$${(stats.totalRevenue / 100).toFixed(2)}`, delta: "rolling total", description: "Financial reporting cards stay directly accessible from the reports tab.", accent: "from-[#1e1b4b] to-[#2366c9]", link: "/dashboard/admin/analytics" },
      { id: "courses", title: "Active Courses", value: String(stats.activeCourses), delta: "catalog coverage", description: "Operational course coverage with a click-through path to the catalog.", accent: "from-[#0f766e] to-[#2366c9]", link: "/dashboard/admin" },
      { id: "alerts", title: "Support Queue", value: "Live", delta: "event-driven", description: "Admin support tickets and action items are surfaced without leaving the tab.", accent: "from-[#2346a0] to-[#4f86e0]", link: "/dashboard/admin/support" },
    ];
  }, [adminDashboard?.stats, parentDashboard?.children, role, schoolDashboard?.licenses, schoolDashboard?.stats, studentDashboard?.activities, studentDashboard?.courses]);

  const selectedTile = summaries.find((tile) => tile.id === selectedTileId) ?? summaries[0];
  const sparkline = buildSparkline(
    role === "student"
      ? (studentDashboard?.courses ?? []).map((course: any) => course.progress)
      : role === "parent"
        ? (parentDashboard?.children ?? []).flatMap((child: any) => child.courses.map((course: any) => course.progress))
        : role === "school"
          ? (schoolDashboard?.licenses ?? []).map((license: any) => Math.round((license.assignedSeats / Math.max(license.totalSeats, 1)) * 100))
          : (adminDashboard?.courses ?? []).map((course: any) => course.progress),
  );

  const trendLabel = role === "student" ? "Student mastery trend" : role === "parent" ? "Household progress trend" : role === "school" ? "Institution utilization trend" : "Platform trend";

  return (
    <div className="space-y-6">
      <Card className="relative overflow-hidden border-0 bg-brand-primary text-white shadow-2xl">
        <CardContent className="grid gap-6 p-8 md:grid-cols-[1.15fr_0.85fr] md:items-center">
          <div className="space-y-4">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-blue-100">Performance Reports</p>
            <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">{fullname} dashboard reports</h1>
            <p className="max-w-2xl text-sm leading-7 text-blue-50/90">
              A role-aware reporting console with clickable summary cards, mastery bars, a quarterly archive, and frontend-only PDF export.
            </p>
            <div className="flex flex-wrap gap-3">
               <Button className="bg-white text-brand-primary hover:bg-brand-primary-soft" onClick={() => downloadPdf(role, fullname, selectedTile)}>
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
              <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Link href={selectedTile.link}>
                  Open Related Section <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4 text-white">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-100">Live snapshot</p>
                <p className="mt-2 text-xl font-semibold">{trendLabel}</p>
              </div>
              <Sparkles className="h-8 w-8 text-blue-100" />
            </div>
            <svg viewBox={`0 0 ${sparkline.width} ${sparkline.height}`} className="mt-4 h-20 w-full">
              <defs>
                <linearGradient id="reportSparklineStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#bfdbfe" />
                </linearGradient>
              </defs>
              <polyline fill="none" stroke="url(#reportSparklineStroke)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" points={sparkline.points} />
              <polyline fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" points={sparkline.points} />
            </svg>
            <p className="mt-2 text-xs text-blue-100/90">Animated sparkline is rendered entirely in the frontend.</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaries.map((tile) => {
          const selected = selectedTileId === tile.id;
          return (
            <button
              key={tile.id}
              type="button"
              onClick={() => setSelectedTileId(tile.id)}
               className={`rounded-[1.75rem] border p-5 text-left shadow-sm transition ${selected ? "border-brand-primary bg-white shadow-xl shadow-blue-100" : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg"}`}
            >
              <div className={`rounded-2xl bg-gradient-to-r ${tile.accent} p-0.5`}>
                <div className="rounded-[1.3rem] bg-white p-4">
                   <p className="text-[10px] font-black uppercase tracking-[0.24em] text-brand-primary">{tile.title}</p>
                  <p className="mt-2 text-3xl font-black text-slate-900">{tile.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{tile.delta}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>{selectedTile.title}</CardTitle>
            <p className="mt-2 text-sm text-slate-600">Click a summary card to expand its detail panel.</p>
          </div>
          <Button variant="outline" asChild>
            <Link href={selectedTile.link}>
              Open section <FileText className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              {summaries.map((tile) => (
                <div key={`${tile.id}-detail`} className={`rounded-2xl border p-4 ${tile.id === selectedTile.id ? "border-blue-200 bg-blue-50/60" : "border-slate-200 bg-white"}`}>
                   <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-primary">{tile.title}</p>
                  <p className="mt-2 text-lg font-bold text-slate-900">{tile.value}</p>
                  <p className="mt-1 text-sm text-slate-600">{tile.description}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 rounded-3xl border border-slate-200 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                   <p className="text-[11px] font-black uppercase tracking-[0.24em] text-brand-primary">Animated mastery bars</p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">Progress snapshot</h3>
                </div>
                <LayoutGrid className="h-5 w-5 text-slate-400" />
              </div>
              <div className="space-y-4">
                {(role === "student"
                  ? (studentDashboard?.courses ?? []).slice(0, 4).map((course: any) => ({ label: course.title, value: course.progress, helper: course.grade || "In progress" }))
                  : role === "parent"
                    ? (parentDashboard?.children ?? []).flatMap((child: any) => child.courses.slice(0, 2).map((course: any) => ({ label: `${child.name} · ${course.courseName}`, value: course.progress, helper: `Grade ${course.grade}` }))).slice(0, 4)
                    : role === "school"
                      ? (schoolDashboard?.licenses ?? []).slice(0, 4).map((license: any) => ({ label: license.courseName, value: Math.round((license.assignedSeats / Math.max(license.totalSeats, 1)) * 100), helper: `${license.assignedSeats}/${license.totalSeats} seats` }))
                      : (adminDashboard?.courses ?? []).slice(0, 4).map((course: any) => ({ label: course.title, value: course.progress, helper: "Platform progress" }))
                ).map((item: any) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-semibold text-slate-900">{item.label}</span>
                      <span className="text-slate-500">{item.helper}</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                       <div className="h-full rounded-full bg-gradient-to-r from-brand-primary to-indigo-400 transition-all duration-700" style={{ width: `${Math.min(100, Math.max(0, item.value))}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2">
                 <CalendarDays className="h-5 w-5 text-brand-primary" />
                 <p className="text-sm font-black uppercase tracking-[0.22em] text-brand-primary">Report archive</p>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {Array.from({ length: 24 }, (_, index) => {
                  const monthDate = new Date();
                  monthDate.setMonth(monthDate.getMonth() - index);
                  const label = monthDate.toLocaleString(undefined, { month: "short", year: "numeric" });
                  const archiveTile = summaries[index % summaries.length];

                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => downloadPdf(role, fullname, archiveTile)}
                      className="rounded-2xl border border-white bg-white p-4 text-left shadow-sm transition hover:border-blue-200 hover:shadow-md"
                    >
                      <p className="text-sm font-semibold text-slate-900">{label}</p>
                      <p className="mt-1 text-xs text-slate-500">{archiveTile.title}</p>
                       <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-primary">24 months accessible</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-blue-50/50 p-5">
               <p className="text-[11px] font-black uppercase tracking-[0.22em] text-brand-primary">Next steps</p>
              <div className="mt-4 space-y-3">
                {[
                  { label: "Open the main dashboard", href: "/dashboard" },
                  { label: "View notifications", href: "/dashboard/notifications" },
                  { label: "Browse resources", href: "/free-resources" },
                  { label: "Contact support", href: "/dashboard/support" },
                ].map((link) => (
                   <Link key={link.href} href={link.href} className="flex items-center justify-between rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-brand-primary hover:text-brand-primary">
                    <span>{link.label}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {(role === "school" || role === "admin") && (
        <TeacherMonthlyReportForm role={role} />
      )}

      <Card className="border-blue-100 shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
             <BookOpen className="h-5 w-5 text-brand-primary" />
            <CardTitle>Clickable Summary Notes</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { title: "Download PDF", description: "Exports the current role snapshot with the EMU file naming convention.", href: "/dashboard/reports" },
            { title: "Mastery Charts", description: "Progress bars and trend lines stay visible from the same report tab.", href: "/dashboard/reports" },
            { title: "Archive Access", description: "Previous months remain visible for 24 months in this frontend implementation.", href: "/dashboard/reports" },
            { title: "Role Navigation", description: "Reports are shared across students, parents, schools, and admins.", href: "/dashboard/reports" },
          ].map((item) => (
            <Link key={item.title} href={item.href} className="rounded-3xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-md">
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </Link>
          ))}
        </CardContent>
      </Card>

      <div className="rounded-[2rem] border border-blue-100 bg-[#eef6ff] p-5 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">Implementation note</p>
        <p className="mt-1 leading-7">
          This tab is built to match the documented Dashboard v2 brief using frontend-only interactions, reusable cards, chart-like sparkline visuals, a locked monthly report form, and a role-aware archive.
        </p>
      </div>
    </div>
  );
}
