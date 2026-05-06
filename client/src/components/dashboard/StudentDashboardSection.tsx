import { ChevronLeft, ChevronRight, ChevronDown, Download, BookOpen, Award, TrendingUp, AlertCircle, CheckCircle2, Clock, User, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MasteryProgressBar } from "@/components/dashboard/MasteryProgressBar";
import jsPDF from "jspdf";

type StudentDashboardProps = {
  data?: {
    courses: Array<{
      id: string;
      title: string;
      progress: number;
      mastery: number;
      thumbnail?: string;
      lastActivity?: string;
    }>;
    diagnostics?: Array<{
      id: string;
      date: string;
      score: number;
      weaknesses: string[];
      recommendedResources: string[];
      status: "completed" | "pending";
    }>;
    tests?: Array<{
      id: string;
      date: string;
      course: string;
      score: number;
      trend: "up" | "down" | "flat";
    }>;
    stats?: {
      overallMastery: number;
      topicsCompleted: number;
      topicsTotal: number;
      testsTaken: number;
      streak: number;
    };
  };
  fullname: string;
};

export function StudentDashboardSection({ data, fullname }: StudentDashboardProps) {
  const [activeScrollIndex, setActiveScrollIndex] = useState(0);
  const [expandedDiagnostic, setExpandedDiagnostic] = useState<string | null>(null);

  const courses = data?.courses ?? [
    { id: "1", title: "GCSE Mathematics", progress: 65, mastery: 72, lastActivity: "Today" },
    { id: "2", title: "IGCSE Physics", progress: 52, mastery: 58, lastActivity: "Yesterday" },
    { id: "3", title: "A-Level Chemistry", progress: 81, mastery: 85, lastActivity: "2 days ago" },
    { id: "4", title: "English Literature", progress: 44, mastery: 51, lastActivity: "4 days ago" },
  ];

  const diagnostics = data?.diagnostics ?? [
    {
      id: "d1",
      date: "May 1, 2026",
      score: 78,
      weaknesses: ["Quadratic equations", "Trigonometry"],
      recommendedResources: ["Algebra mastery series", "Khan Academy trigonometry"],
      status: "completed" as const,
    },
  ];

  const tests = data?.tests ?? [
    { id: "t1", date: "May 4, 2026", course: "GCSE Mathematics", score: 82, trend: "up" as const },
    { id: "t2", date: "May 2, 2026", course: "IGCSE Physics", score: 71, trend: "flat" as const },
    { id: "t3", date: "Apr 28, 2026", course: "A-Level Chemistry", score: 88, trend: "up" as const },
  ];

  const stats = data?.stats ?? {
    overallMastery: 67,
    topicsCompleted: 24,
    topicsTotal: 38,
    testsTaken: 12,
    streak: 5,
  };

  const visibleCourses = courses.slice(activeScrollIndex, activeScrollIndex + 3);
  const canScrollLeft = activeScrollIndex > 0;
  const canScrollRight = activeScrollIndex + 3 < courses.length;

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.setFillColor(35, 102, 201);
    doc.rect(0, 0, 210, 42, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("EduMeUp Student Report", 14, 22);
    doc.setFontSize(10);
    doc.text(`${fullname} | Student`, 14, 32);
    doc.text(new Date().toLocaleString(), 140, 32);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(16);
    doc.text("This Month's Progress", 14, 58);
    doc.setFontSize(12);
    doc.text(`Overall Mastery: ${stats.overallMastery}%`, 14, 70);
    doc.text(`Topics Completed: ${stats.topicsCompleted}/${stats.topicsTotal}`, 14, 79);
    doc.text(`Tests Taken: ${stats.testsTaken}`, 14, 88);
    doc.text(`Learning Streak: ${stats.streak} days`, 14, 97);
    doc.text("Your active courses and progress are detailed above. Continue practicing to improve your mastery score.", 14, 112, { maxWidth: 182 });

    const month = new Date().toISOString().slice(0, 7);
    doc.save(`EMU-StudentReport-${month}.pdf`);
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-r from-[#2366c9] to-[#4f86e0]">
        <CardContent className="p-6">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-blue-100">Your Progress</p>
          <h1 className="mt-2 text-3xl font-black text-white">Welcome back, {fullname.split(" ")[0]}</h1>
          <p className="mt-2 text-sm text-blue-50/90">Here's what you've accomplished this month and what's next to master.</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2366c9]">Overall Mastery</p>
            <p className="mt-3 text-3xl font-black text-slate-900">{stats.overallMastery}%</p>
            <p className="mt-1 text-xs text-slate-500">Across all courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2366c9]">Topics Completed</p>
            <p className="mt-3 text-3xl font-black text-slate-900">{stats.topicsCompleted}</p>
            <p className="mt-1 text-xs text-slate-500">{stats.topicsTotal} total this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2366c9]">Tests Taken</p>
            <p className="mt-3 text-3xl font-black text-slate-900">{stats.testsTaken}</p>
            <p className="mt-1 text-xs text-slate-500">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2366c9]">Streak</p>
            <p className="mt-3 text-3xl font-black text-slate-900">{stats.streak}</p>
            <p className="mt-1 text-xs text-slate-500">Consecutive days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#2366c9]" />
                My Active Courses
              </CardTitle>
              <p className="mt-1 text-sm text-slate-600">Enrolled courses — scroll to see all</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!canScrollLeft}
                onClick={() => setActiveScrollIndex(Math.max(0, activeScrollIndex - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!canScrollRight}
                onClick={() => setActiveScrollIndex(Math.min(courses.length - 3, activeScrollIndex + 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {visibleCourses.map((course) => (
              <div key={course.id} className="rounded-2xl border border-slate-200 p-4 bg-white hover:shadow-md transition">
                <div className="aspect-video bg-gradient-to-br from-[#2366c9] to-[#4f86e0] rounded-lg mb-3" />
                <h3 className="font-semibold text-slate-900">{course.title}</h3>
                <div className="mt-3 space-y-2">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Progress</p>
                    <MasteryProgressBar value={course.progress} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Mastery</p>
                    <MasteryProgressBar value={course.mastery} />
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-500">Last activity: {course.lastActivity}</p>
                <Button className="mt-3 w-full bg-[#2366c9] text-white hover:bg-[#1a4fa0]" asChild>
                  <Link href={`/programs/${course.id}`}>Continue</Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-[#2366c9]" />
            My Diagnostic Results
          </CardTitle>
          <p className="mt-1 text-sm text-slate-600">Expand to view detailed results and recommended actions</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {diagnostics.length > 0 ? (
            diagnostics.map((diag) => (
              <div key={diag.id} className="rounded-xl border border-slate-200">
                <button
                  onClick={() => setExpandedDiagnostic(expandedDiagnostic === diag.id ? null : diag.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-left">
                      <p className="font-semibold text-slate-900">Diagnostic Test</p>
                      <p className="text-sm text-slate-500">{diag.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${diag.status === "completed" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                      {diag.status === "completed" ? "✓ Completed" : "⚠ Pending"}
                    </span>
                    <ChevronDown className={`h-5 w-5 text-slate-400 transition ${expandedDiagnostic === diag.id ? "rotate-180" : ""}`} />
                  </div>
                </button>
                {expandedDiagnostic === diag.id && (
                  <div className="border-t border-slate-200 p-4 space-y-4 bg-slate-50">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-2">Score</p>
                      <MasteryProgressBar value={diag.score} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-2">Identified Weaknesses</p>
                      <ul className="space-y-1">
                        {diag.weaknesses.map((weakness) => (
                          <li key={weakness} className="text-sm text-slate-700 flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span> {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-2">Recommended Resources</p>
                      <ul className="space-y-1">
                        {diag.recommendedResources.map((resource) => (
                          <li key={resource} className="text-sm text-slate-700 flex items-start gap-2">
                            <span className="text-[#2366c9] mt-1">→</span> {resource}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500 p-4 text-center">No diagnostics taken yet. Take your first diagnostic to identify your learning gaps.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#2366c9]" />
            Practice Tests
          </CardTitle>
          <p className="mt-1 text-sm text-slate-600">Your recent test attempts and trends</p>
        </CardHeader>
        <CardContent>
          {tests.length > 0 ? (
            <div className="space-y-3">
              {tests.map((test) => (
                <div key={test.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition">
                  <div>
                    <p className="font-semibold text-slate-900">{test.course}</p>
                    <p className="text-sm text-slate-500">{test.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-black text-slate-900">{test.score}%</p>
                      <p className="text-xs text-slate-500">
                        {test.trend === "up" && "📈 Improving"} {test.trend === "down" && "📉 Declining"} {test.trend === "flat" && "→ Steady"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 p-4 text-center">No practice tests taken yet. Start practicing to track your progress.</p>
          )}
          <Button className="mt-4 w-full border-[#2366c9] text-[#2366c9]" variant="outline" asChild>
            <Link href="/programs">Take a Test</Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#2366c9]" />
              Performance Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-blue-50 border border-blue-100 p-4">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2366c9]">Latest Report</p>
              <p className="mt-2 font-semibold text-slate-900">May 2026</p>
              <p className="mt-1 text-sm text-slate-600">Overall mastery: <span className="font-bold text-slate-900">{stats.overallMastery}%</span></p>
              <p className="mt-2 text-sm italic text-slate-600">"Strong progress in core concepts. Focus on practice tests to consolidate learning."</p>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-[#2366c9] text-white hover:bg-[#1a4fa0]" asChild>
                <Link href="/dashboard/reports">View Full Report</Link>
              </Button>
              <Button className="flex-1" variant="outline" onClick={downloadReport}>
                <Download className="mr-2 h-4 w-4" />
                PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#2366c9]" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: "Revisit Quadratic Equations", href: "/programs/math-quadratic" },
                { label: "Take IGCSE Physics Quiz", href: "/programs/igcse-physics" },
                { label: "Download Trigonometry Worksheet", href: "/resources" },
                { label: "Schedule Tutoring Session", href: "/tutor-booking" },
              ].map((step) => (
                <Link key={step.label} href={step.href} className="flex items-center justify-between rounded-lg border border-slate-200 p-3 hover:bg-blue-50 hover:border-blue-200 transition">
                  <span className="text-sm font-semibold text-slate-900">{step.label}</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#2366c9]" />
            Resource Library
          </CardTitle>
          <p className="mt-1 text-sm text-slate-600">Your saved notes, worksheets, and workbook samples</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Algebra Masterclass Notes", course: "GCSE Mathematics", date: "May 2, 2026" },
              { name: "Forces & Motion Worksheet", course: "IGCSE Physics", date: "Apr 28, 2026" },
              { name: "Ionic Bonding Study Guide", course: "A-Level Chemistry", date: "Apr 25, 2026" },
            ].map((resource) => (
              <div key={resource.name} className="rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition">
                <p className="font-semibold text-slate-900">{resource.name}</p>
                <div className="mt-1 flex items-center justify-between text-sm text-slate-500">
                  <span>{resource.course}</span>
                  <span>{resource.date}</span>
                </div>
              </div>
            ))}
          </div>
          <Button className="mt-4 w-full border-[#2366c9] text-[#2366c9]" variant="outline" asChild>
            <Link href="/free-resources">Browse Library</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-[#2366c9] to-[#4f86e0] border-0 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-100" />
            My Tutoring Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 p-4">
            <p className="text-sm text-blue-50">You don't have an active tutoring plan yet.</p>
            <p className="mt-2 text-sm text-blue-100">Personalized 1-on-1 tutoring can accelerate your learning. Explore our tutoring options to get started.</p>
          </div>
          <Button className="w-full bg-white text-[#2366c9] hover:bg-blue-50" asChild>
            <Link href="/tutor-booking">Explore Tutoring</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
