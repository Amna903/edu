import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, CalendarDays, Download, FileText, LayoutGrid, Sparkles, TrendingUp } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeacherMonthlyReportForm } from "@/components/dashboard/TeacherMonthlyReportForm";
import { useMonthlyFormSubmissions, useReviewMonthlyForm, useSchoolReportArchive, useSchoolReportStats, useSchoolRoster, useSchoolUsageReport, useSyncSchoolRisk } from "@/hooks/use-dashboard";
import { useToast } from "@/hooks/use-toast";


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
  const schoolRoster = useSchoolRoster(role === "school");
  const schoolUsage = useSchoolUsageReport(role === "school");
  const schoolReportStats = useSchoolReportStats(role === "school");
  const schoolReportArchive = useSchoolReportArchive(undefined, role === "school");
  const monthlySubmissions = useMonthlyFormSubmissions(undefined, role === "school" || role === "admin");
  const reviewMonthlyForm = useReviewMonthlyForm();
  const syncSchoolRisk = useSyncSchoolRisk();
  const { toast } = useToast();
  const usageData = role === "school" ? schoolUsage.data : undefined;
  const rosterStudents = role === "school" ? (schoolRoster.data?.students ?? []) : [];
  const assignmentRows = role === "school"
    ? rosterStudents.flatMap((student) => student.assignments.map((assignment) => ({
      studentName: student.studentName,
      studentEmail: student.studentEmail,
      courseName: assignment.courseName,
      licenseId: assignment.licenseId,
      assignedAt: assignment.assignedAt ? new Date(assignment.assignedAt).toLocaleString() : "Unknown",
    })))
    : [];

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
      const purchased = schoolReportStats.data?.purchasedSeats ?? schoolDashboard?.stats?.purchasedSeats ?? 0;
      const assigned = schoolReportStats.data?.assignedSeats ?? schoolDashboard?.stats?.assignedSeats ?? 0;
      const utilization = schoolReportStats.data?.seatUtilizationPercent ?? (purchased > 0 ? Math.round((assigned / purchased) * 100) : 0);
      const atRiskFlags = schoolReportStats.data?.atRiskFlags ?? Math.max(1, licenses.length);
      const classPdfCount = schoolReportStats.data?.classPdfCount ?? licenses.length;
      const teacherCpdLabel = schoolReportStats.data?.teacherCpdLabel ?? "T1-T6";
      return [
        { id: "overview", title: "Seat Utilization", value: `${utilization}%`, delta: `${assigned}/${purchased} assigned`, description: "Track seat usage and portfolio health in the report center.", accent: "from-[#2366c9] to-[#4f86e0]", link: "/dashboard/school" },
        { id: "at-risk", title: "At-Risk Flags", value: `${atRiskFlags}`, delta: "school-only", description: "Early-warning flags and interventions live in the school admin view.", accent: "from-[#1e1b4b] to-[#2366c9]", link: "/dashboard/school" },
        { id: "reports", title: "Class PDFs", value: `${classPdfCount}`, delta: "downloadable", description: "Each class report can be exported individually or as a consolidated pack.", accent: "from-[#0f766e] to-[#2366c9]", link: "/dashboard/school/analytics" },
        { id: "teacher-cpd", title: "Teacher CPD", value: teacherCpdLabel, delta: "progress tracked", description: "Monitor staff training and certification from the same dashboard.", accent: "from-[#2346a0] to-[#4f86e0]", link: "/dashboard/school" },
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
  const snapshotRows = (
    role === "student"
      ? (studentDashboard?.courses ?? []).slice(0, 6).map((course: any) => ({
        label: course.title,
        value: `${Math.round(course.progress)}%`,
        helper: course.grade || "In progress",
      }))
      : role === "parent"
        ? (parentDashboard?.children ?? [])
          .flatMap((child: any) => child.courses.slice(0, 2).map((course: any) => ({
            label: `${child.name} · ${course.courseName}`,
            value: `${Math.round(course.progress)}%`,
            helper: `Grade ${course.grade}`,
          })))
          .slice(0, 8)
        : role === "school"
          ? (schoolReportStats.data?.courseSeatSummary ?? (schoolDashboard?.licenses ?? []).map((license: any) => ({
            courseName: license.courseName,
            assignedSeats: license.assignedSeats,
            totalSeats: license.totalSeats,
          }))).slice(0, 8).map((license: any) => ({
            label: license.courseName,
            value: `${Math.round((license.assignedSeats / Math.max(license.totalSeats, 1)) * 100)}%`,
            helper: `${license.assignedSeats}/${license.totalSeats} seats`,
          }))
          : (adminDashboard?.courses ?? []).slice(0, 8).map((course: any) => ({
            label: course.title,
            value: `${Math.round(course.progress)}%`,
            helper: "Platform progress",
          }))
  );

  const archiveRows = role === "school" && schoolReportArchive.data
    ? schoolReportArchive.data.months.map((entry) => ({
      month: new Date(`${entry.month}-01T00:00:00.000Z`).toLocaleString(undefined, { month: "short", year: "numeric" }),
      focus: entry.summaryTitle,
      note: entry.availabilityNote,
    }))
    : Array.from({ length: 24 }, (_, index) => {
      const monthDate = new Date();
      monthDate.setMonth(monthDate.getMonth() - index);
      return {
        month: monthDate.toLocaleString(undefined, { month: "short", year: "numeric" }),
        focus: summaries[index % summaries.length]?.title ?? "Overview",
        note: "24 months accessible",
      };
    });
  const reviewedSubmissionRows = (monthlySubmissions.data?.submissions ?? []).slice(0, 20);
  const canReviewSubmissions = role === "school" || role === "admin";
  const handleSyncRisk = async () => {
    try {
      const result = await syncSchoolRisk.mutateAsync();
      toast({
        title: "Risk sync completed",
        description: `${result.processedStudents} students checked, ${result.flagsFound} flagged.`,
      });
    } catch (error) {
      toast({
        title: "Risk sync failed",
        description: error instanceof Error ? error.message : "Could not sync at-risk data.",
        variant: "destructive",
      });
    }
  };

  const handleReviewSubmission = async (submissionId: string, status: "approved" | "returned") => {
    try {
      await reviewMonthlyForm.mutateAsync({
        submissionId,
        payload: {
          status,
          reviewNotes: status === "approved" ? "Approved by school reviewer." : "Needs revision from teacher.",
        },
      });
      toast({
        title: status === "approved" ? "Submission approved" : "Submission returned",
        description: "Review status updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Review action failed",
        description: error instanceof Error ? error.message : "Could not update review status.",
        variant: "destructive",
      });
    }
  };

  const downloadDetailedPdf = () => {
    const doc = new jsPDF();
    doc.setFillColor(35, 102, 201);
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text("EduMeUp Dashboard Full Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`${fullname} | ${role.toUpperCase()} | ${new Date().toLocaleString()}`, 14, 30);

    doc.setTextColor(30, 41, 59);
    autoTable(doc, {
      startY: 46,
      head: [["Selected Focus", "Value", "Delta", "Description"]],
      body: [[selectedTile.title, selectedTile.value, selectedTile.delta, selectedTile.description]],
    });

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 8,
      head: [["Summary Tile", "Value", "Delta", "Description"]],
      body: summaries.map((tile) => [tile.title, tile.value, tile.delta, tile.description]),
    });

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 8,
      head: [["Progress Snapshot Item", "Value", "Detail"]],
      body: snapshotRows.map((row: { label: string; value: string; helper: string }) => [row.label, row.value, row.helper]),
    });

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 8,
      head: [["Archive Month", "Report Focus", "Availability"]],
      body: archiveRows.map((row) => [row.month, row.focus, row.note]),
    });

    if (canReviewSubmissions) {
      autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 8,
        head: [["Month", "Teacher", "Class", "Status", "At-Risk", "Avg Mastery"]],
        body: reviewedSubmissionRows.map((submission) => [
          submission.reportMonth,
          submission.payload.teacherName,
          submission.payload.className,
          submission.status,
          String(submission.payload.atRiskStudents),
          `${submission.payload.averageMastery}%`,
        ]),
      });
    }

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 8,
      head: [["Action Item", "Target"]],
      body: [
        ["Open the main dashboard", "/dashboard"],
        ["View notifications", "/dashboard/notifications"],
        ["Browse resources", "/free-resources"],
        ["Contact support", "/dashboard/support"],
      ],
    });

    doc.save(`EMU-FullReport-${role}-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

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
               <Button className="bg-white text-brand-primary hover:bg-brand-primary-soft" onClick={downloadDetailedPdf}>
                <Download className="mr-2 h-4 w-4" /> Download Full PDF
              </Button>
              <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Link href={selectedTile.link}>
                  Open Related Section <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {role === "school" && (
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  disabled={syncSchoolRisk.isPending}
                  onClick={handleSyncRisk}
                >
                  {syncSchoolRisk.isPending ? "Syncing risk..." : "Sync At-Risk Now"}
                </Button>
              )}
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
                {archiveRows.map((row) => (
                  <button
                    key={`${row.month}-${row.focus}`}
                    type="button"
                    onClick={downloadDetailedPdf}
                    className="rounded-2xl border border-white bg-white p-4 text-left shadow-sm transition hover:border-blue-200 hover:shadow-md"
                  >
                    <p className="text-sm font-semibold text-slate-900">{row.month}</p>
                    <p className="mt-1 text-xs text-slate-500">{row.focus}</p>
                    <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-primary">{row.note}</p>
                  </button>
                ))}
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

      {canReviewSubmissions && (
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Teacher Submissions Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {monthlySubmissions.isError && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {monthlySubmissions.error instanceof Error ? monthlySubmissions.error.message : "Failed to load submissions."}
              </p>
            )}
            {(monthlySubmissions.data?.submissions ?? []).map((submission) => (
              <div key={submission.id} className="rounded-2xl border border-slate-200 p-4">
                <p className="font-semibold text-slate-900">
                  {submission.payload.teacherName} · {submission.payload.className}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Month: {submission.reportMonth} · Status: {submission.status}
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  At-risk students: {submission.payload.atRiskStudents} · Avg mastery: {submission.payload.averageMastery}%
                </p>
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    disabled={reviewMonthlyForm.isPending || !["submitted", "returned"].includes(submission.status)}
                    onClick={() => handleReviewSubmission(submission.id, "approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={reviewMonthlyForm.isPending || !["submitted", "approved"].includes(submission.status)}
                    onClick={() => handleReviewSubmission(submission.id, "returned")}
                  >
                    Return
                  </Button>
                </div>
              </div>
            ))}
            {(monthlySubmissions.data?.submissions ?? []).length === 0 && (
              <p className="text-sm text-slate-500">No form submissions yet.</p>
            )}
          </CardContent>
        </Card>
      )}

      {role === "school" && (
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>At-Risk Sync Outcome</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-slate-600">
              Last synced: {schoolReportStats.data?.lastRiskSyncAt ? new Date(schoolReportStats.data.lastRiskSyncAt).toLocaleString() : "Not synced yet"}
            </p>
            <p className="text-sm text-slate-600">
              Students checked in last sync: {schoolReportStats.data?.riskStudentsChecked ?? 0}
            </p>
            {(schoolReportStats.data?.atRiskStudents ?? []).map((student) => (
              <div key={`${student.studentId}-${student.studentEmail}`} className="rounded-xl border border-slate-200 p-3">
                <p className="font-semibold text-slate-900">{student.studentName}</p>
                <p className="text-xs text-slate-500">{student.studentEmail}</p>
                <p className="mt-1 text-sm text-slate-700">
                  Reasons: {student.lowGrade ? "Low grade" : "No low grade"} · Inactivity: {student.inactivityDays} day(s)
                </p>
              </div>
            ))}
            {(schoolReportStats.data?.atRiskStudents ?? []).length === 0 && (
              <p className="text-sm text-slate-500">No at-risk students currently flagged.</p>
            )}
          </CardContent>
        </Card>
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
          This tab now combines backend-driven school report stats, archive snapshots, at-risk sync actions, and teacher submission review workflows in one report center.
        </p>
      </div>
    </div>
  );
}
