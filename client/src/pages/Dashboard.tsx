
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { BarChart3, Bell, Check, CreditCard, Download, FileText, GraduationCap, LayoutDashboard, LifeBuoy, LogOut, RefreshCw, Shield, UserCircle2, Users } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { AIChatLauncher } from "@/components/AIChatLauncher";
import SchoolAnalyticsClient from "@/components/dashboard/SchoolAnalyticsClient";
import { DashboardReportsSection } from "@/components/dashboard/DashboardReportsSection";
import { SchoolAtRiskPanel } from "@/components/dashboard/SchoolAtRiskPanel";
import SchoolOperationsPanel from "@/components/dashboard/SchoolOperationsPanel";
import { StudentDashboardSection } from "@/components/dashboard/StudentDashboardSection";
import { StudentPaymentsPanel } from "@/components/dashboard/StudentPaymentsPanel";
import { useAuthUser, useLogout } from "@/hooks/use-auth";
import { useOrders } from "@/hooks/use-orders";
import { useChangePassword, useUpdateProfile } from "@/hooks/use-profile";
import { useAdminDashboard, useAdminUsers, useSuspendUser, useAssignRole, useResetPassword, useActivityLogs, useAdminCourses, useUpdateCoursePricing, useUpdateCourseVisibility, useUpdateCourseCategory, useSyncCourses, useDashboardNotifications, useLinkChild, useMarkNotificationRead, useParentDashboard, useSchoolDashboard, useStudentCertificates, useStudentDashboard, useSupportTickets } from "@/hooks/use-dashboard";

function getDashboardPath(role?: string | null) {
  if (role === "admin") return "/dashboard/admin";
  if (role === "parent") return "/dashboard/parent";
  if (role === "school") return "/dashboard/school";
  return "/dashboard/student";
}

function getDashboardMenu(role?: string | null, unreadNotifications = 0) {
  const common = [
    { href: role ? getDashboardPath(role) : "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/reports", label: "Reports", icon: FileText, badge: unreadNotifications > 0 ? "New" : null },
    { href: "/dashboard/profile", label: "Profile", icon: UserCircle2 },
    { href: "/dashboard/notifications", label: "Notifications", icon: Bell, badge: unreadNotifications > 0 ? (unreadNotifications > 99 ? "99+" : String(unreadNotifications)) : null },
    { href: role === "admin" ? "/dashboard/admin/support" : "/dashboard/support", label: "Support", icon: LifeBuoy },
  ];

  if (role === "student") {
    return [...common, { href: "/dashboard/orders", label: "Orders", icon: CreditCard }, { href: "/dashboard/student/certificates", label: "Certificates", icon: GraduationCap }];
  }

  if (role === "school") {
    return [...common, { href: "/dashboard/school/analytics", label: "Analytics", icon: BarChart3 }];
  }

  if (role === "admin") {
    return [...common, { href: "/dashboard/admin/analytics", label: "Analytics", icon: Shield }];
  }

  return common;
}

function CourseImage({ imageUrl, title }: { imageUrl?: string | null; title: string }) {
  const [hasError, setHasError] = useState(false);

  if (imageUrl && !hasError) {
    return (
      <img
        src={imageUrl}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        onError={() => setHasError(true)}
      />
    );
  }

  const initials = title
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-primary to-[#4f46e5] text-white">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-20"></div>
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm text-3xl font-black">
          {initials}
        </div>
        <span className="text-xs font-bold uppercase tracking-widest opacity-60">Learning Module</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [location, navigate] = useLocation();
  const { data: user, isLoading } = useAuthUser();
  const logout = useLogout();
  const { data: orders } = useOrders();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();
  const studentDashboard = useStudentDashboard(user?.role === "student");
  const studentCertificates = useStudentCertificates(user?.role === "student");
  const parentDashboard = useParentDashboard(user?.role === "parent");
  const schoolDashboard = useSchoolDashboard(user?.role === "school");
  const adminDashboard = useAdminDashboard(user?.role === "admin");
  const linkChild = useLinkChild();
  const supportTickets = useSupportTickets(user !== undefined);
  const notifications = useDashboardNotifications(Boolean(user));
  const markNotificationRead = useMarkNotificationRead();

  const [profileForm, setProfileForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    city: "",
    country: "",
    phone: "",
    description: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [supportForm, setSupportForm] = useState({
    subject: "",
    category: "Technical",
    priority: "Medium",
    message: "",
    attachmentName: "",
  });
  const [supportState, setSupportState] = useState({ error: "", success: "", pending: false });
  const [adminReplyState, setAdminReplyState] = useState({ message: "", error: "", success: "", pending: false });
  const [ticketReplyState, setTicketReplyState] = useState({ message: "", error: "", success: "", pending: false });
  const [childIdInput, setChildIdInput] = useState("");
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [linkChildState, setLinkChildState] = useState<{ pending: boolean; success: string; error: string }>({ pending: false, success: "", error: "" });
  const [reportDownloadState, setReportDownloadState] = useState<{ pending: boolean; error: string }>({ pending: false, error: "" });
  const [aiWebhookTestState, setAiWebhookTestState] = useState<{
    pending: boolean;
    success: string;
    error: string;
    result: string;
  }>({ pending: false, success: "", error: "", result: "" });
  const [adminPanel, setAdminPanel] = useState({ tab: "users", userPage: 1, logPage: 1, coursePage: 1, searchQuery: "", courseSearch: "", selectedUserId: null as string | null });
  const isAdminUser = user?.role === "admin";
  const adminUsers = useAdminUsers(adminPanel.userPage, 20, adminPanel.searchQuery, isAdminUser);
  const activityLogs = useActivityLogs(adminPanel.logPage, 20, isAdminUser);
  const adminCourses = useAdminCourses(adminPanel.coursePage, 20, adminPanel.courseSearch, isAdminUser);
  const suspendUser = useSuspendUser();
  const assignRole = useAssignRole();
  const resetPassword = useResetPassword();
  const updateCoursePricing = useUpdateCoursePricing();
  const updateCourseVisibility = useUpdateCourseVisibility();
  const updateCourseCategory = useUpdateCourseCategory();
  const syncCourses = useSyncCourses();
  const [courseDrafts, setCourseDrafts] = useState<Record<string, { price: string; categoryId: string; categoryName: string }>>({});

  useEffect(() => {
    if (selectedTicketId !== null) {
      return;
    }

    if (supportTickets.data && supportTickets.data.length > 0) {
      setSelectedTicketId(supportTickets.data[0].id);
    }
  }, [selectedTicketId, supportTickets.data]);

  useEffect(() => {
    if (!selectedTicketId) return;
    setTicketReplyState({ message: "", error: "", success: "", pending: false });
  }, [selectedTicketId]);

  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin" && location.startsWith("/dashboard/admin")) {
      navigate(getDashboardPath(user.role));
      return;
    }
    if (user.role === "admin" && location === "/dashboard/support") {
      navigate("/dashboard/admin/support");
      return;
    }
    if (user.role !== "admin" && location === "/dashboard/admin/support") {
      navigate("/dashboard/support");
      return;
    }
    if (user.role !== "student" && location === "/dashboard/orders") {
      navigate(getDashboardPath(user.role));
    }
  }, [location, navigate, user]);

  useEffect(() => {
    const courses = adminCourses.data?.courses;
    if (!courses) {
      return;
    }

    setCourseDrafts(
      Object.fromEntries(
        courses.map((course) => [
          course.id,
          {
            price: course.price > 0 ? course.price.toFixed(2) : "",
            categoryId: course.categoryId !== null ? String(course.categoryId) : "",
            categoryName: course.categoryName ?? "",
          },
        ]),
      ),
    );
  }, [adminCourses.data?.courses]);

  useEffect(() => {
    const isMainDashboard = location === "/dashboard" || location === getDashboardPath(user?.role);
    if (!user || user.role !== "student" || !isMainDashboard) {
      return;
    }

    const dashboardData = studentDashboard.data;
    if (!dashboardData || !Array.isArray(dashboardData.activities) || dashboardData.activities.length === 0) {
      return;
    }

    const quizActivities = dashboardData.activities.filter((activity) => /quiz/i.test(activity.moduleName));
    if (quizActivities.length === 0) {
      return;
    }

    const storageKey = `edu:quiz-webhook-sent:${user.id}`;
    const savedIdsRaw = window.localStorage.getItem(storageKey);
    const savedIds = new Set<string>(
      savedIdsRaw
        ? (JSON.parse(savedIdsRaw) as string[])
        : [],
    );

    const pending = quizActivities.filter((activity) => !savedIds.has(`${activity.id}:${activity.timeCompleted}`));
    if (pending.length === 0) {
      return;
    }

    void (async () => {
      const newlySaved: string[] = [];

      for (const activity of pending) {
        const matchedCourse = dashboardData.courses.find((course) => course.title === activity.courseName);
        const rawGradeValue =
          typeof matchedCourse?.percentage === "number" && Number.isFinite(matchedCourse.percentage)
            ? matchedCourse.percentage.toFixed(2)
            : "0.00";

        const response = await fetch("/api/webhook/quiz-attempt", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userid: String(user.id),
            quizid: String(activity.id),
            attemptid: `${activity.id}-${activity.timeCompleted}`,
            timefinish: String(activity.timeCompleted),
            rawgrade: rawGradeValue,
          }),
        }).catch(() => null);

        if (response?.ok) {
          const dedupeId = `${activity.id}:${activity.timeCompleted}`;
          savedIds.add(dedupeId);
          newlySaved.push(dedupeId);
        }
      }

      if (newlySaved.length > 0) {
        window.localStorage.setItem(storageKey, JSON.stringify(Array.from(savedIds)));
      }
    })();
  }, [location, studentDashboard.data, user]);

  const effectiveProfile = {
    firstname: profileForm.firstname || user?.firstname || "",
    lastname: profileForm.lastname || user?.lastname || "",
    email: user?.email || (user?.username?.includes("@") ? user.username : ""),
    city: profileForm.city || user?.city || "",
    country: profileForm.country || user?.country || "",
    phone: profileForm.phone || user?.phone || "",
    description: profileForm.description || user?.description || "",
  };

  const [launchingCourseId, setLaunchingCourseId] = useState<number | null>(null);

  const handleLaunchCourse = (courseId: number, lmsCourseUrl: string) => {
    // Open blank window immediately to prevent popup blocker
    const newWindow = window.open('about:blank', '_blank');
    if (!newWindow) {
      alert("Please allow popups for this site to launch courses.");
      return;
    }

    setLaunchingCourseId(courseId);
    
    // The lmsCourseUrl is our proxy route /api/dashboard/student/course-login/:id
    // which handles the auto-login logic on the server
    newWindow.location.href = lmsCourseUrl;
    
    // Clear loading state after a delay
    setTimeout(() => setLaunchingCourseId(null), 2000);
  };

  const unreadNotifications = notifications.data?.notifications.filter((notification) => !notification.isRead).length ?? 0;
  const menu = useMemo(() => getDashboardMenu(user?.role, unreadNotifications), [user?.role, unreadNotifications]);
  const onMainDashboard = location === "/dashboard" || location === getDashboardPath(user?.role);
  const onProfile = location === "/dashboard/profile";
  const onNotifications = location === "/dashboard/notifications";
  const onReports = location === "/dashboard/reports";
  const onOrders = location === "/dashboard/orders";
  const onSupport = location === "/dashboard/support";
  const onAdminSupport = location === "/dashboard/admin/support";
  const onStudentCertificates = location === "/dashboard/student/certificates";
  const onSchoolAnalytics = location === "/dashboard/school/analytics";
  const onAdminAnalytics = location === "/dashboard/admin/analytics";
  const adminCourseCategoryOptions = useMemo(() => {
    const categories = new Map<string, { id: number | null; name: string }>();

    for (const course of adminCourses.data?.courses ?? []) {
      const name = course.categoryName?.trim() || "Uncategorized";
      const key = `${course.categoryId ?? "null"}:${name}`;
      if (!categories.has(key)) {
        categories.set(key, {
          id: course.categoryId,
          name,
        });
      }
    }

    return Array.from(categories.values()).sort((left, right) => left.name.localeCompare(right.name));
  }, [adminCourses.data?.courses]);

  const adminCourseCategoryStats = useMemo(() => {
    const stats = new Map<string, { name: string; total: number; visible: number; hidden: number }>();

    for (const course of adminCourses.data?.courses ?? []) {
      const name = course.categoryName?.trim() || "Uncategorized";
      const entry = stats.get(name) ?? { name, total: 0, visible: 0, hidden: 0 };
      entry.total += 1;
      if (course.isVisible) {
        entry.visible += 1;
      } else {
        entry.hidden += 1;
      }
      stats.set(name, entry);
    }

    return Array.from(stats.values()).sort((left, right) => right.total - left.total || left.name.localeCompare(right.name));
  }, [adminCourses.data?.courses]);
  const unreadUpdates = supportTickets.data?.filter((ticket) => ticket.status === "new").length ?? 0;
  const selectedTicket = supportTickets.data?.find((ticket) => ticket.id === selectedTicketId) ?? null;
  const parentChildren = parentDashboard.data?.children ?? [];
  const parentAlerts = notifications.data?.notifications ?? [];
  const unreadParentAlerts = parentAlerts.filter((notification) => !notification.isRead);
  const studentRecentActivities = useMemo(() => studentDashboard.data?.activities?.slice(0, 6) ?? [], [studentDashboard.data?.activities]);
  const studentRecentNotifications = useMemo(() => notifications.data?.notifications.slice(0, 5) ?? [], [notifications.data?.notifications]);
  const studentDashboardCourses = useMemo(() => {
    if (!studentDashboard.data) return [];
    const activitiesByCourse = new Map<string, string>();
    for (const activity of studentDashboard.data.activities) {
      if (!activitiesByCourse.has(activity.courseName)) {
        activitiesByCourse.set(activity.courseName, new Date(activity.timeCompleted * 1000).toLocaleString());
      }
    }

    return studentDashboard.data.courses.map((course) => ({
      id: String(course.id),
      title: course.title,
      progress: course.progress,
      mastery: course.percentage ?? course.progress,
      completed: course.completed,
      grade: course.grade,
      percentage: course.percentage,
      thumbnail: course.imageUrl || undefined,
      lastActivity: activitiesByCourse.get(course.title),
      lmsCourseUrl: course.lmsCourseUrl,
    }));
  }, [studentDashboard.data]);

  async function readJsonSafely(response: Response): Promise<Record<string, unknown>> {
    const raw = await response.text();
    if (!raw.trim()) return {};
    try {
      return JSON.parse(raw) as Record<string, unknown>;
    } catch {
      return { message: raw };
    }
  }

  async function downloadParentReport() {
    setReportDownloadState({ pending: true, error: "" });

    try {
      const response = await fetch("/api/dashboard/parent/report.csv", {
        credentials: "include",
      });

      if (!response.ok) {
        const body = await readJsonSafely(response);
        throw new Error(typeof body.message === "string" ? body.message : "Failed to download report");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `parent-dashboard-report-${user?.id || "export"}.csv`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);

      setReportDownloadState({ pending: false, error: "" });
    } catch (error) {
      setReportDownloadState({
        pending: false,
        error: error instanceof Error ? error.message : "Failed to download report",
      });
    }
  }

  async function testAiTeamWebhook() {
    if (!user) return;

    setAiWebhookTestState({ pending: true, success: "", error: "", result: "" });

    try {
      const nowUnix = Math.floor(Date.now() / 1000);
      const payload = {
        userid: String(user.id),
        quizid: "12",
        attemptid: `manual-test-${user.id}-${nowUnix}`,
        timefinish: String(nowUnix),
        rawgrade: "14.00",
      };

      const response = await fetch("/api/webhook/quiz-attempt", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await readJsonSafely(response);
      if (!response.ok) {
        const postStatus = typeof body.postStatus === "number" ? body.postStatus : undefined;
        const postResponse = typeof body.postResponse === "string"
          ? body.postResponse
          : body.postResponse !== undefined
            ? JSON.stringify(body.postResponse)
            : undefined;
        const getStatus = typeof body.getStatus === "number" ? body.getStatus : undefined;
        const getResponse = typeof body.getResponse === "string"
          ? body.getResponse
          : body.getResponse !== undefined
            ? JSON.stringify(body.getResponse)
            : undefined;

        const detailParts = [
          postStatus ? `POST: ${postStatus}${postResponse ? ` (${postResponse})` : ""}` : "",
          getStatus ? `GET fallback: ${getStatus}${getResponse ? ` (${getResponse})` : ""}` : "",
        ].filter(Boolean);

        throw new Error(
          `${typeof body.message === "string" ? body.message : `Webhook test failed with status ${response.status}`}${
            detailParts.length ? ` | ${detailParts.join(" | ")}` : ""
          }`,
        );
      }

      const destinationStatus = typeof body.destinationStatus === "number" ? body.destinationStatus : 200;
      const destinationResponse =
        typeof body.destinationResponse === "string"
          ? body.destinationResponse
          : JSON.stringify(body.destinationResponse ?? {});

      console.info("AI webhook test result", {
        status: response.status,
        destinationStatus,
        destinationResponse,
      });

      setAiWebhookTestState({
        pending: false,
        success: `AI webhook test sent successfully (destination status: ${destinationStatus}).`,
        error: "",
        result: destinationResponse,
      });
    } catch (error) {
      setAiWebhookTestState({
        pending: false,
        success: "",
        error: error instanceof Error ? error.message : "Failed to test AI webhook",
        result: "",
      });
    }
  }

  return (
    <Layout>
      <div className="container-custom py-10 md:py-14">
        {isLoading && <p className="text-slate-600">Loading your session...</p>}

        {!isLoading && !user && (
          <Card className="mx-auto max-w-2xl border-blue-100 shadow-xl">
            <CardContent className="space-y-4 p-8 text-center">
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Sign in to open your dashboard</h1>
              <p className="text-slate-600">Your role-based student, parent, school, or admin dashboard lives inside `edu` now.</p>
              <div className="flex justify-center gap-3">
                <Button className="bg-brand-primary text-white hover:bg-brand-primary-dark" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
                <Button variant="outline" onClick={() => navigate("/register")}>
                  Sign Up
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {user && (
          <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:h-fit">
              <div className="flex items-center gap-4 rounded-3xl bg-slate-50 p-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                  {user.firstname?.[0] || user.fullname[0]}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-base font-bold text-slate-900">{user.fullname}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{user.role}</p>
                </div>
              </div>

              <nav className="mt-6 space-y-2">
                {menu.map((item) => {
                  const Icon = item.icon;
                  const active = location === item.href || (item.label === "Dashboard" && onMainDashboard);
                  return (
                    <Link key={item.href} href={item.href}>
                      <div
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                          active ? "bg-brand-primary text-white shadow-lg shadow-blue-100" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                        {item.badge ? (
                          <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-black ${active ? "bg-white text-brand-primary" : "bg-red-500 text-white"}`}>
                            {item.badge}
                          </span>
                        ) : null}
                      </div>
                    </Link>
                  );
                })}
              </nav>

              <Button
                className="mt-6 w-full bg-slate-900 text-white hover:bg-slate-800"
                onClick={async () => {
                  await logout.mutateAsync();
                  navigate("/login");
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </aside>

            <section className="space-y-6">
              <Card className="overflow-hidden border-0 bg-[radial-gradient(circle_at_top,_rgba(35,102,201,0.18),_transparent_50%),linear-gradient(135deg,#ffffff,#f8fbff)] shadow-xl">
                <CardContent className="grid gap-4 p-8 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Edu Dashboard</p>
                    <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                      {user.role === "student" && "Student Dashboard"}
                      {user.role === "parent" && "Parent Dashboard"}
                      {user.role === "school" && "School Dashboard"}
                      {user.role === "admin" && "Admin Dashboard"}
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                      Your Moodle-connected data is now surfaced inside `edu`, including profile, orders, enrollments, role dashboards, and the new signup flow.
                    </p>
                    {user.role === "student" && (
                      <div className="mt-5 space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <AIChatLauncher className="bg-brand-primary text-white hover:bg-brand-primary-dark" />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={testAiTeamWebhook}
                            disabled={aiWebhookTestState.pending}
                          >
                            {aiWebhookTestState.pending ? "Testing AI Webhook..." : "Test AI Webhook"}
                          </Button>
                        </div>
                        {aiWebhookTestState.success ? (
                          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                            {aiWebhookTestState.success}
                          </p>
                        ) : null}
                        {aiWebhookTestState.error ? (
                          <p className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
                            {aiWebhookTestState.error}
                          </p>
                        ) : null}
                        {aiWebhookTestState.result ? (
                          <div className="rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-xs text-slate-700">
                            <p className="mb-1 font-semibold uppercase tracking-[0.12em] text-slate-500">Webhook Result</p>
                            <pre className="whitespace-pre-wrap break-words text-[11px] leading-5">{aiWebhookTestState.result}</pre>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Username</p>
                      <p className="mt-2 font-bold text-slate-900">{user?.username}</p>
                    </div>
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">User ID</p>
                      <p className="mt-2 font-bold text-slate-900">{user?.id}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {onMainDashboard && user?.role === "student" && (
                <StudentDashboardSection
                  data={studentDashboard.data ? {
                    ...studentDashboard.data,
                    courses: studentDashboardCourses,
                    stats: {
                      overallMastery: studentDashboard.data.stats.averageProgress,
                      topicsCompleted: studentDashboard.data.stats.completedCourses,
                      topicsTotal: studentDashboard.data.stats.enrolledCourses,
                      testsTaken: studentDashboard.data.activities.length,
                      streak: Math.min(30, studentDashboard.data.activities.length),
                    }
                  } : undefined}
                  fullname={user?.fullname || ""}
                />
              )}

              {onMainDashboard && user?.role === "student" && (
                <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                  <Card className="border-slate-200 shadow-sm">
                    <CardHeader>
                      <CardTitle>Activity Timeline</CardTitle>
                      <p className="text-sm text-slate-600">Your latest Moodle activity updates in one place.</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {studentRecentActivities.length > 0 ? (
                        studentRecentActivities.map((activity) => (
                          <div key={`${activity.courseName}-${activity.id}-${activity.timeCompleted}`} className="rounded-2xl border border-slate-200 p-4">
                            <p className="font-semibold text-slate-900">{activity.moduleName}</p>
                            <p className="mt-1 text-sm text-slate-600">{activity.courseName}</p>
                            <p className="mt-2 text-xs text-slate-500">{new Date(activity.timeCompleted * 1000).toLocaleString()}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-slate-600">No recent activity yet.</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 shadow-sm">
                    <CardHeader>
                      <CardTitle>Notifications</CardTitle>
                      <p className="text-sm text-slate-600">Course, order, and account updates.</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {studentRecentNotifications.length > 0 ? (
                        studentRecentNotifications.map((notification) => (
                          <div key={notification.id} className={`rounded-2xl border p-4 ${notification.isRead ? "border-slate-200 bg-white" : "border-blue-200 bg-blue-50/50"}`}>
                            <p className="font-semibold text-slate-900">{notification.title}</p>
                            <p className="mt-1 text-sm text-slate-600">{notification.message}</p>
                            <p className="mt-2 text-xs text-slate-500">{new Date(notification.createdAt).toLocaleString()}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-slate-600">No notifications yet.</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {onMainDashboard && user?.role === "student" && (
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-sm text-slate-500">Certificates</p>
                      <p className="mt-2 text-3xl font-black text-slate-900">{studentCertificates.data?.length ?? 0}</p>
                      <Button variant="ghost" className="mt-3 h-auto px-0 text-brand-primary hover:bg-transparent" asChild>
                        <Link href="/dashboard/student/certificates">Open certificates</Link>
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-sm text-slate-500">Orders</p>
                      <p className="mt-2 text-3xl font-black text-slate-900">{orders?.length ?? 0}</p>
                      <Button variant="ghost" className="mt-3 h-auto px-0 text-brand-primary hover:bg-transparent" asChild>
                        <Link href="/dashboard/orders">Open payments</Link>
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-sm text-slate-500">Unread Notifications</p>
                      <p className="mt-2 text-3xl font-black text-slate-900">{unreadNotifications}</p>
                      <Button variant="ghost" className="mt-3 h-auto px-0 text-brand-primary hover:bg-transparent" asChild>
                        <Link href="/dashboard/notifications">Open notifications</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {onMainDashboard && user.role === "parent" && (
                <div className="space-y-6">
                  <Card className="border-0 bg-[radial-gradient(circle_at_top,_rgba(35,102,201,0.16),_transparent_40%),linear-gradient(135deg,#ffffff,#f7fbff)] shadow-xl">
                    <CardContent className="grid gap-4 p-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Parent Tools</p>
                        <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">Manage your children's progress from one place</h2>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                          View profiles, track progress and grades, watch alerts, and export a report whenever you need one.
                        </p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Button type="button" variant="outline" className="justify-start rounded-2xl border-slate-200 bg-white" onClick={() => document.getElementById("parent-children")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                          <Users className="mr-2 h-4 w-4" /> View Children Profiles
                        </Button>
                        <Button type="button" variant="outline" className="justify-start rounded-2xl border-slate-200 bg-white" onClick={() => document.getElementById("parent-progress")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                          <BarChart3 className="mr-2 h-4 w-4" /> Monitor Progress
                        </Button>
                        <Button type="button" variant="outline" className="justify-start rounded-2xl border-slate-200 bg-white" onClick={() => document.getElementById("parent-grades")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                          <Check className="mr-2 h-4 w-4" /> View Grades
                        </Button>
                        <Button type="button" variant="outline" className="justify-start rounded-2xl border-slate-200 bg-white" onClick={() => document.getElementById("parent-alerts")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                          <Bell className="mr-2 h-4 w-4" /> Receive Alerts
                        </Button>
                        <Button
                          type="button"
                          className="justify-start rounded-2xl bg-brand-primary text-white hover:bg-brand-primary-dark sm:col-span-2"
                          onClick={downloadParentReport}
                          disabled={reportDownloadState.pending}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          {reportDownloadState.pending ? "Preparing Report..." : "Download Reports"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {reportDownloadState.error && (
                    <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{reportDownloadState.error}</p>
                  )}
                  {linkChildState.success && (
                    <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{linkChildState.success}</p>
                  )}
                  {linkChildState.error && (
                    <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{linkChildState.error}</p>
                  )}

                  <div className="grid gap-4 md:grid-cols-4">
                    <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Children Linked</p><p className="mt-2 text-3xl font-black text-slate-900">{parentChildren.length}</p></CardContent></Card>
                    <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Total Courses</p><p className="mt-2 text-3xl font-black text-slate-900">{parentChildren.reduce((sum, child) => sum + child.courses.length, 0)}</p></CardContent></Card>
                    <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Unread Alerts</p><p className="mt-2 text-3xl font-black text-slate-900">{unreadParentAlerts.length}</p></CardContent></Card>
                    <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Avg. Progress</p><p className="mt-2 text-3xl font-black text-slate-900">{parentChildren.length > 0 ? Math.round(parentChildren.flatMap((child) => child.courses).reduce((sum, course) => sum + course.progress, 0) / Math.max(parentChildren.flatMap((child) => child.courses).length, 1)) : 0}%</p></CardContent></Card>
                  </div>

                  <Card id="parent-alerts" className="scroll-mt-28">
                    <CardHeader><CardTitle>Alerts & Notifications</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                      {parentAlerts.length > 0 ? (
                        parentAlerts.slice(0, 5).map((notification) => (
                          <div key={notification.id} className={`rounded-3xl border p-4 ${notification.isRead ? "border-slate-200 bg-white" : "border-blue-200 bg-blue-50/50"}`}>
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="font-semibold text-slate-900">{notification.title}</p>
                                <p className="mt-1 text-xs text-slate-500">{new Date(notification.createdAt).toLocaleString()}</p>
                                <p className="mt-3 text-sm text-slate-700">{notification.message}</p>
                              </div>
                              {!notification.isRead ? (
                                <Button type="button" variant="outline" size="sm" onClick={() => markNotificationRead.mutate(notification.id)}>
                                  Mark as read
                                </Button>
                              ) : (
                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Read</span>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-slate-600">No alerts yet.</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader><CardTitle>Link Your Child</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      <form
                        className="flex flex-col gap-3 md:flex-row"
                        onSubmit={async (event) => {
                          event.preventDefault();
                          const childId = Number(childIdInput);
                          if (!Number.isFinite(childId) || childId <= 0) {
                            setLinkChildState({ pending: false, success: "", error: "Please enter a valid student Moodle ID." });
                            return;
                          }

                          setLinkChildState({ pending: true, success: "", error: "" });
                          try {
                            await linkChild.mutateAsync(childId);
                            setChildIdInput("");
                            setLinkChildState({ pending: false, success: "Child linked successfully.", error: "" });
                          } catch (error) {
                            setLinkChildState({
                              pending: false,
                              success: "",
                              error: error instanceof Error ? error.message : "Failed to link child",
                            });
                          }
                        }}
                      >
                        <Input value={childIdInput} onChange={(event) => setChildIdInput(event.target.value)} placeholder="Child Moodle User ID" />
                        <Button type="submit" disabled={linkChildState.pending}>
                          <Users className="mr-2 h-4 w-4" />
                          {linkChildState.pending ? "Linking..." : "Link Child"}
                        </Button>
                      </form>
                      <p className="text-xs text-slate-500">After linking, the child will appear below with their enrolled courses and marks.</p>

                  <div className="space-y-6">
                    {parentChildren.map((child) => {
                      const avgProgress = child.courses.length > 0
                        ? Math.round(child.courses.reduce((sum, course) => sum + course.progress, 0) / child.courses.length)
                        : 0;

                      const gradedCourses = child.courses.filter((course) => course.grade !== "N/A" && course.grade !== "-");
                      const averageMarks = child.courses.length > 0
                        ? Math.round(child.courses.reduce((sum, course) => sum + course.percentage, 0) / child.courses.length)
                        : 0;

                      return (
                        <Card key={child.id} id={`parent-child-${child.id}`} className="scroll-mt-28 border-slate-200 shadow-sm">
                          <CardHeader className="border-b border-slate-100">
                            <CardTitle>{child.name}</CardTitle>
                            <p className="text-sm text-slate-500">{child.email}</p>
                          </CardHeader>
                          <CardContent className="space-y-5 p-6">
                            <div className="grid gap-4 md:grid-cols-3">
                              <div className="rounded-3xl bg-slate-50 p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Enrolled Courses</p>
                                <p className="mt-2 text-2xl font-black text-slate-900">{child.courses.length}</p>
                              </div>
                              <div className="rounded-3xl bg-slate-50 p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Average Marks</p>
                                <p className="mt-2 text-2xl font-black text-slate-900">{averageMarks}%</p>
                              </div>
                              <div className="rounded-3xl bg-slate-50 p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Graded Courses</p>
                                <p className="mt-2 text-2xl font-black text-slate-900">{gradedCourses.length}</p>
                              </div>
                            </div>

                            <div id="parent-children" className="space-y-3 scroll-mt-28">
                              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">View Children Profiles</p>
                              <p className="text-sm text-slate-600">This child is enrolled in the courses below.</p>
                            </div>

                            <div id="parent-progress" className="space-y-3 scroll-mt-28">
                              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Monitor Progress</p>
                              <div className="space-y-3">
                                {child.courses.map((course) => (
                                  <div key={`${child.id}-${course.id}-progress`} className="rounded-2xl border border-slate-200 p-4">
                                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                      <div>
                                        <p className="font-semibold text-slate-900">{course.courseName}</p>
                                        <p className="text-xs text-slate-500">Enrolled course</p>
                                      </div>
                                      <p className="text-sm font-bold text-brand-primary">Progress {Math.round(course.progress)}%</p>
                                    </div>
                                    <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                                      <div className="h-full rounded-full bg-gradient-to-r from-brand-primary to-indigo-500" style={{ width: `${course.progress}%` }} />
                                    </div>
                                  </div>
                                ))}
                                {child.courses.length === 0 && <p className="text-sm text-slate-500">No course progress yet.</p>}
                              </div>
                            </div>

                            <div id="parent-grades" className="space-y-3 scroll-mt-28">
                              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">View Grades / Marks</p>
                              <div className="space-y-3">
                                {child.courses.map((course) => (
                                  <div key={`${child.id}-${course.id}-grade`} className="rounded-2xl border border-slate-200 p-4">
                                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                      <p className="font-semibold text-slate-900">{course.courseName}</p>
                                      <p className="text-sm font-bold text-slate-700">
                                        {course.grade !== "N/A" && course.grade !== "-" ? `Marks: ${Math.round(course.percentage)}% (Grade ${course.grade})` : `Marks: ${Math.round(course.percentage)}% (Pending grade)`}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-slate-500">Raw percentage: {Math.round(course.percentage)}%</p>
                                  </div>
                                ))}
                                {child.courses.length === 0 && <p className="text-sm text-slate-500">No grades available yet.</p>}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                    {parentChildren.length === 0 && <p className="text-slate-600">No linked children yet.</p>}
                  </div>
                </CardContent>
              </Card>
              </div>
            )}

            {onMainDashboard && user.role === "school" && schoolDashboard.data && (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Purchased Seats</p><p className="mt-2 text-3xl font-black text-slate-900">{schoolDashboard.data.stats.purchasedSeats}</p></CardContent></Card>
                    <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Assigned Seats</p><p className="mt-2 text-3xl font-black text-slate-900">{schoolDashboard.data.stats.assignedSeats}</p></CardContent></Card>
                    <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Active Courses</p><p className="mt-2 text-3xl font-black text-slate-900">{schoolDashboard.data.stats.activeCourses}</p></CardContent></Card>
                  </div>

                  <SchoolOperationsPanel
                    schoolName={user.fullname}
                    licenses={schoolDashboard.data.licenses}
                    purchasedSeats={schoolDashboard.data.stats.purchasedSeats}
                    assignedSeats={schoolDashboard.data.stats.assignedSeats}
                    activeCourses={schoolDashboard.data.stats.activeCourses}
                  />

                  <SchoolAtRiskPanel schoolName={user.fullname} />
                </div>
              )}

              {onMainDashboard && user.role === "admin" && adminDashboard.data && (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-4">
                    <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Users</p><p className="mt-2 text-3xl font-black text-slate-900">{adminDashboard.data.stats.totalUsers}</p></CardContent></Card>
                    <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Orders</p><p className="mt-2 text-3xl font-black text-slate-900">{adminDashboard.data.stats.totalOrders}</p></CardContent></Card>
                    <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Revenue</p><p className="mt-2 text-3xl font-black text-slate-900">${(adminDashboard.data.stats.totalRevenue / 100).toFixed(2)}</p></CardContent></Card>
                    <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Courses</p><p className="mt-2 text-3xl font-black text-slate-900">{adminDashboard.data.stats.activeCourses}</p></CardContent></Card>
                  </div>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Admin Management</CardTitle>
                      <div className="flex gap-2">
                        <button onClick={() => setAdminPanel({ ...adminPanel, tab: "users" })} className={`px-4 py-2 rounded-lg font-semibold text-sm ${adminPanel.tab === "users" ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-900"}`}>Users</button>
                        <button onClick={() => setAdminPanel({ ...adminPanel, tab: "courses" })} className={`px-4 py-2 rounded-lg font-semibold text-sm ${adminPanel.tab === "courses" ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-900"}`}>Courses</button>
                        <button onClick={() => setAdminPanel({ ...adminPanel, tab: "logs" })} className={`px-4 py-2 rounded-lg font-semibold text-sm ${adminPanel.tab === "logs" ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-900"}`}>Activity Logs</button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {adminPanel.tab === "users" && (
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <Input placeholder="Search users by name or email..." value={adminPanel.searchQuery} onChange={(e) => setAdminPanel({ ...adminPanel, searchQuery: e.target.value, userPage: 1 })} />
                            <Button onClick={() => adminUsers.refetch()}>Search</Button>
                          </div>

                          {adminUsers.isLoading ? (
                            <p className="text-slate-500">Loading users...</p>
                          ) : adminUsers.error ? (
                            <p className="text-red-500">Error loading users</p>
                          ) : (
                            <>
                              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                                <table className="w-full text-sm">
                                  <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                      <th className="px-4 py-3 text-left font-semibold">Username</th>
                                      <th className="px-4 py-3 text-left font-semibold">Email</th>
                                      <th className="px-4 py-3 text-left font-semibold">Role</th>
                                      <th className="px-4 py-3 text-left font-semibold">Status</th>
                                      <th className="px-4 py-3 text-left font-semibold">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {adminUsers.data?.users.map((u) => (
                                      <tr key={u.id} className="border-b border-slate-200 hover:bg-slate-50">
                                        <td className="px-4 py-3 font-semibold">{u.username}</td>
                                        <td className="px-4 py-3 text-slate-600">{u.email || "N/A"}</td>
                                        <td className="px-4 py-3">
                                          <select
                                            value={u.role}
                                            onChange={(e) => assignRole.mutate({ userId: u.id, role: e.target.value })}
                                            disabled={assignRole.isPending}
                                            className="px-2 py-1 border border-slate-300 rounded text-sm"
                                          >
                                            <option value="student">Student</option>
                                            <option value="parent">Parent</option>
                                            <option value="school">School</option>
                                            <option value="admin">Admin</option>
                                          </select>
                                        </td>
                                        <td className="px-4 py-3">
                                          <button
                                            onClick={() => suspendUser.mutate({ userId: u.id, suspend: !u.isSuspended })}
                                            disabled={suspendUser.isPending}
                                            className={`px-3 py-1 rounded text-xs font-semibold ${
                                              u.isSuspended ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                                            }`}
                                          >
                                            {u.isSuspended ? "Suspended" : "Active"}
                                          </button>
                                        </td>
                                        <td className="px-4 py-3 space-x-2">
                                          <button
                                            onClick={() => resetPassword.mutate({ userId: u.id })}
                                            disabled={resetPassword.isPending}
                                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold hover:bg-blue-200"
                                          >
                                            Reset PW
                                          </button>
                                          <button
                                            onClick={() => suspendUser.mutate({ userId: u.id, suspend: !u.isSuspended })}
                                            disabled={suspendUser.isPending}
                                            className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-semibold hover:bg-orange-200"
                                          >
                                            {u.isSuspended ? "Unsuspend" : "Suspend"}
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>

                              {adminUsers.data && (
                                <div className="flex items-center justify-between">
                                  <p className="text-sm text-slate-500">
                                    Showing {((adminPanel.userPage - 1) * 20) + 1} to {Math.min(adminPanel.userPage * 20, adminUsers.data.total)} of {adminUsers.data.total}
                                  </p>
                                  <div className="flex gap-2">
                                    <Button
                                      disabled={adminPanel.userPage === 1}
                                      onClick={() => setAdminPanel({ ...adminPanel, userPage: adminPanel.userPage - 1 })}
                                    >
                                      Previous
                                    </Button>
                                    <Button
                                      disabled={adminPanel.userPage * 20 >= adminUsers.data.total}
                                      onClick={() => setAdminPanel({ ...adminPanel, userPage: adminPanel.userPage + 1 })}
                                    >
                                      Next
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </>
                          )}

                          {(suspendUser.isSuccess || assignRole.isSuccess || resetPassword.isSuccess) && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 text-sm">
                              {suspendUser.isSuccess && "User status updated successfully"}
                              {assignRole.isSuccess && "Role assigned successfully"}
                              {resetPassword.isSuccess && resetPassword.data?.message}
                            </div>
                          )}

                          {(suspendUser.isError || assignRole.isError || resetPassword.isError) && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                              {suspendUser.error instanceof Error && suspendUser.error.message}
                              {assignRole.error instanceof Error && assignRole.error.message}
                              {resetPassword.error instanceof Error && resetPassword.error.message}
                            </div>
                          )}
                        </div>
                      )}

                      {adminPanel.tab === "logs" && (
                        <div className="space-y-4">
                          {activityLogs.isLoading ? (
                            <p className="text-slate-500">Loading activity logs...</p>
                          ) : activityLogs.error ? (
                            <p className="text-red-500">Error loading logs</p>
                          ) : (
                            <>
                              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                                <table className="w-full text-sm">
                                  <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                      <th className="px-4 py-3 text-left font-semibold">Admin</th>
                                      <th className="px-4 py-3 text-left font-semibold">Action</th>
                                      <th className="px-4 py-3 text-left font-semibold">Target User</th>
                                      <th className="px-4 py-3 text-left font-semibold">Details</th>
                                      <th className="px-4 py-3 text-left font-semibold">Time</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {activityLogs.data?.logs.map((log) => (
                                      <tr key={log.id} className="border-b border-slate-200 hover:bg-slate-50">
                                        <td className="px-4 py-3 font-semibold">{log.adminUsername}</td>
                                        <td className="px-4 py-3">
                                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                                            {log.action.replace(/_/g, " ")}
                                          </span>
                                        </td>
                                        <td className="px-4 py-3 text-slate-600">{log.targetUsername || "System"}</td>
                                        <td className="px-4 py-3 text-xs text-slate-500">{log.details ? JSON.stringify(log.details).substring(0, 40) : "N/A"}...</td>
                                        <td className="px-4 py-3 text-slate-600 text-xs">{new Date(log.createdAt).toLocaleString()}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>

                              {activityLogs.data && (
                                <div className="flex items-center justify-between">
                                  <p className="text-sm text-slate-500">
                                    Showing {((adminPanel.logPage - 1) * 20) + 1} to {Math.min(adminPanel.logPage * 20, activityLogs.data.total)} of {activityLogs.data.total}
                                  </p>
                                  <div className="flex gap-2">
                                    <Button
                                      disabled={adminPanel.logPage === 1}
                                      onClick={() => setAdminPanel({ ...adminPanel, logPage: adminPanel.logPage - 1 })}
                                    >
                                      Previous
                                    </Button>
                                    <Button
                                      disabled={adminPanel.logPage * 20 >= activityLogs.data.total}
                                      onClick={() => setAdminPanel({ ...adminPanel, logPage: adminPanel.logPage + 1 })}
                                    >
                                      Next
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}

                      {adminPanel.tab === "courses" && (
                        <div className="space-y-5">
                          <div className="grid gap-4 md:grid-cols-4">
                            <Card className="border-slate-200 shadow-sm">
                              <CardContent className="p-5">
                                <p className="text-sm text-slate-500">Courses Loaded</p>
                                <p className="mt-2 text-3xl font-black text-slate-900">{adminCourses.data?.total ?? 0}</p>
                              </CardContent>
                            </Card>
                            <Card className="border-slate-200 shadow-sm">
                              <CardContent className="p-5">
                                <p className="text-sm text-slate-500">Visible</p>
                                <p className="mt-2 text-3xl font-black text-emerald-600">
                                  {adminCourses.data?.courses.filter((course) => course.isVisible).length ?? 0}
                                </p>
                              </CardContent>
                            </Card>
                            <Card className="border-slate-200 shadow-sm">
                              <CardContent className="p-5">
                                <p className="text-sm text-slate-500">Hidden</p>
                                <p className="mt-2 text-3xl font-black text-amber-600">
                                  {adminCourses.data?.courses.filter((course) => !course.isVisible).length ?? 0}
                                </p>
                              </CardContent>
                            </Card>
                            <Card className="border-slate-200 shadow-sm">
                              <CardContent className="p-5">
                                <p className="text-sm text-slate-500">Categories</p>
                                <p className="mt-2 text-3xl font-black text-slate-900">{adminCourseCategoryStats.length}</p>
                              </CardContent>
                            </Card>
                          </div>

                          <Card className="border-blue-100 bg-blue-50/40 shadow-sm">
                            <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
                              <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Moodle Sync</p>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                  Sync the catalog from Moodle, then control pricing, category assignment, and visibility from this admin-only panel.
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <Button variant="outline" onClick={() => adminCourses.refetch()}>
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  Refresh
                                </Button>
                                <Button onClick={() => syncCourses.mutate("COURSE_CATALOG")} disabled={syncCourses.isPending} className="bg-green-600 hover:bg-green-700">
                                  {syncCourses.isPending ? "Syncing..." : "Sync from Moodle"}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>

                          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
                            <Card className="border-slate-200 shadow-sm">
                              <CardHeader className="pb-3">
                                <CardTitle>Category Overview</CardTitle>
                              </CardHeader>
                              <CardContent className="grid gap-3">
                                {adminCourseCategoryStats.length > 0 ? (
                                  adminCourseCategoryStats.map((category) => (
                                    <div key={category.name} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                                      <div>
                                        <p className="font-semibold text-slate-900">{category.name}</p>
                                        <p className="text-xs text-slate-500">
                                          {category.visible} visible, {category.hidden} hidden
                                        </p>
                                      </div>
                                      <div className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-700">{category.total}</div>
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-sm text-slate-500">Category information will appear after Moodle sync.</p>
                                )}
                              </CardContent>
                            </Card>

                            <Card className="border-slate-200 shadow-sm">
                              <CardHeader className="pb-3">
                                <CardTitle>Quick Filters</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                <div className="flex gap-2">
                                  <Input placeholder="Search courses by name or category..." value={adminPanel.courseSearch} onChange={(e) => setAdminPanel({ ...adminPanel, courseSearch: e.target.value, coursePage: 1 })} />
                                  <Button onClick={() => adminCourses.refetch()}>Search</Button>
                                </div>
                                <p className="text-sm text-slate-600">
                                  Every control here is hidden from non-admin users and blocked again on the server.
                                </p>
                              </CardContent>
                            </Card>
                          </div>

                          {adminCourses.isLoading ? (
                            <p className="text-slate-500">Loading courses...</p>
                          ) : adminCourses.error ? (
                            <p className="text-red-500">Error loading courses</p>
                          ) : (
                            <>
                              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                                <table className="w-full text-sm">
                                  <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                      <th className="px-4 py-3 text-left font-semibold">Course</th>
                                      <th className="px-4 py-3 text-left font-semibold">Category</th>
                                      <th className="px-4 py-3 text-left font-semibold">Pricing</th>
                                      <th className="px-4 py-3 text-left font-semibold">Visibility</th>
                                      <th className="px-4 py-3 text-left font-semibold">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {adminCourses.data?.courses.map((course) => {
                                      const draft = courseDrafts[course.id] ?? {
                                        price: course.price > 0 ? course.price.toFixed(2) : "",
                                        categoryId: course.categoryId !== null ? String(course.categoryId) : "",
                                        categoryName: course.categoryName ?? "",
                                      };
                                      const selectedCategory = adminCourseCategoryOptions.find((category) => String(category.id ?? "") === draft.categoryId) ?? null;

                                      return (
                                        <tr key={course.id} className="border-b border-slate-200 hover:bg-slate-50/80">
                                          <td className="px-4 py-4 align-top">
                                            <div className="space-y-1">
                                              <p className="font-semibold text-slate-900">{course.fullname}</p>
                                              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">{course.shortname}</p>
                                              <p className="max-w-md text-xs leading-5 text-slate-500">{course.summary || "No course summary available."}</p>
                                            </div>
                                          </td>
                                          <td className="px-4 py-4 align-top">
                                            <div className="space-y-2">
                                              <select
                                                value={draft.categoryId}
                                                onChange={(event) => {
                                                  const value = event.target.value;
                                                  const matched = adminCourseCategoryOptions.find((category) => String(category.id ?? "") === value) ?? null;
                                                  setCourseDrafts((previous) => ({
                                                    ...previous,
                                                    [course.id]: {
                                                      ...draft,
                                                      categoryId: value,
                                                      categoryName: matched?.name || draft.categoryName,
                                                    },
                                                  }));
                                                }}
                                                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
                                              >
                                                <option value="">Custom or uncategorized</option>
                                                {adminCourseCategoryOptions.map((category) => (
                                                  <option key={`${category.id ?? "none"}-${category.name}`} value={String(category.id ?? "")}>
                                                    {category.name}
                                                  </option>
                                                ))}
                                              </select>
                                              <Input
                                                value={draft.categoryName}
                                                onChange={(event) =>
                                                  setCourseDrafts((previous) => ({
                                                    ...previous,
                                                    [course.id]: {
                                                      ...draft,
                                                      categoryName: event.target.value,
                                                    },
                                                  }))
                                                }
                                                placeholder={selectedCategory ? `Override ${selectedCategory.name}` : "Category name"}
                                              />
                                              <Button
                                                type="button"
                                                variant="outline"
                                                className="w-full"
                                                disabled={updateCourseCategory.isPending}
                                                onClick={() =>
                                                  updateCourseCategory.mutate({
                                                    courseId: course.id,
                                                    categoryId: draft.categoryId ? Number(draft.categoryId) : null,
                                                    categoryName: draft.categoryName.trim() || selectedCategory?.name || null,
                                                  })
                                                }
                                              >
                                                Save Category
                                              </Button>
                                            </div>
                                          </td>
                                          <td className="px-4 py-4 align-top">
                                            <div className="space-y-2">
                                              <Input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={draft.price}
                                                onChange={(event) =>
                                                  setCourseDrafts((previous) => ({
                                                    ...previous,
                                                    [course.id]: {
                                                      ...draft,
                                                      price: event.target.value,
                                                    },
                                                  }))
                                                }
                                                placeholder="0.00"
                                              />
                                              <Button
                                                type="button"
                                                variant="outline"
                                                className="w-full"
                                                disabled={updateCoursePricing.isPending}
                                                onClick={() => {
                                                  const parsedPrice = Number(draft.price);
                                                  if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
                                                    return;
                                                  }
                                                  updateCoursePricing.mutate({ courseId: course.id, price: parsedPrice });
                                                }}
                                              >
                                                Save Price
                                              </Button>
                                            </div>
                                          </td>
                                          <td className="px-4 py-4 align-top">
                                            <button
                                              onClick={() => updateCourseVisibility.mutate({ courseId: course.id, isVisible: !course.isVisible })}
                                              disabled={updateCourseVisibility.isPending}
                                              className={`inline-flex min-w-28 items-center justify-center rounded-full px-3 py-2 text-xs font-semibold transition ${
                                                course.isVisible ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                              }`}
                                            >
                                              {course.isVisible ? "Published" : "Hidden"}
                                            </button>
                                          </td>
                                          <td className="px-4 py-4 align-top">
                                            <div className="space-y-2">
                                              <Button
                                                type="button"
                                                variant="secondary"
                                                className="w-full"
                                                onClick={() => updateCourseVisibility.mutate({ courseId: course.id, isVisible: !course.isVisible })}
                                                disabled={updateCourseVisibility.isPending}
                                              >
                                                {course.isVisible ? "Hide Course" : "Show Course"}
                                              </Button>
                                              <p className="text-xs leading-5 text-slate-500">
                                                Last synced {course.lastSyncedAt ? new Date(course.lastSyncedAt).toLocaleString() : "not yet synced"}.
                                              </p>
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>

                              {adminCourses.data && (
                                <div className="flex items-center justify-between">
                                  <p className="text-sm text-slate-500">
                                    Showing {((adminPanel.coursePage - 1) * 20) + 1} to {Math.min(adminPanel.coursePage * 20, adminCourses.data.total)} of {adminCourses.data.total}
                                  </p>
                                  <div className="flex gap-2">
                                    <Button
                                      disabled={adminPanel.coursePage === 1}
                                      onClick={() => setAdminPanel({ ...adminPanel, coursePage: adminPanel.coursePage - 1 })}
                                    >
                                      Previous
                                    </Button>
                                    <Button
                                      disabled={adminPanel.coursePage * 20 >= adminCourses.data.total}
                                      onClick={() => setAdminPanel({ ...adminPanel, coursePage: adminPanel.coursePage + 1 })}
                                    >
                                      Next
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </>
                          )}

                          {(updateCoursePricing.isSuccess || updateCourseVisibility.isSuccess || updateCourseCategory.isSuccess || syncCourses.isSuccess) && (
                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
                              {updateCoursePricing.isSuccess && "Course pricing updated. "}
                              {updateCourseVisibility.isSuccess && "Course visibility updated. "}
                              {updateCourseCategory.isSuccess && "Course category updated. "}
                              {syncCourses.isSuccess && syncCourses.data?.message}
                            </div>
                          )}

                          {(updateCoursePricing.isError || updateCourseVisibility.isError || updateCourseCategory.isError || syncCourses.isError) && (
                            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                              {updateCoursePricing.error instanceof Error && updateCoursePricing.error.message}
                              {updateCourseVisibility.error instanceof Error && updateCourseVisibility.error.message}
                              {updateCourseCategory.error instanceof Error && updateCourseCategory.error.message}
                              {syncCourses.error instanceof Error && syncCourses.error.message}
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader><CardTitle>Course Activity</CardTitle></CardHeader>
                    <CardContent className="grid gap-4">
                      {adminDashboard.data.courses.map((course) => (
                        <div key={course.id} className="rounded-3xl border border-slate-200 p-4">
                          <p className="font-bold text-slate-900">{course.title}</p>
                          <p className="mt-1 text-sm text-slate-500">Average progress {Math.round(course.progress)}%</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}

              {onStudentCertificates && user.role === "student" && (
                <Card>
                  <CardHeader><CardTitle>Certificates</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    {studentCertificates.data?.map((certificate) => (
                      <div key={`${certificate.courseId}-${certificate.id}`} className="flex flex-col gap-3 rounded-3xl border border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="font-bold text-slate-900">{certificate.name}</p>
                          <p className="mt-1 text-sm text-slate-500">{certificate.courseName}</p>
                        </div>
                        <a href={certificate.url} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white">
                          Open Certificate
                        </a>
                      </div>
                    ))}
                    {studentCertificates.data?.length === 0 && <p className="text-slate-600">No certificates found yet.</p>}
                  </CardContent>
                </Card>
              )}

              {onSchoolAnalytics && schoolDashboard.data && (
                <SchoolAnalyticsClient
                  schoolName={user.fullname}
                  licenses={schoolDashboard.data.licenses}
                />
              )}

              {onAdminAnalytics && adminDashboard.data && (
                <Card>
                  <CardHeader><CardTitle>Admin Analytics</CardTitle></CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <p className="text-sm text-slate-500">Average Revenue Per Order</p>
                      <p className="mt-2 text-3xl font-black text-slate-900">
                        ${adminDashboard.data.stats.totalOrders > 0 ? (adminDashboard.data.stats.totalRevenue / adminDashboard.data.stats.totalOrders / 100).toFixed(2) : "0.00"}
                      </p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <p className="text-sm text-slate-500">Active Catalog Coverage</p>
                      <p className="mt-2 text-3xl font-black text-slate-900">{adminDashboard.data.stats.activeCourses}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {onNotifications && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Notifications</CardTitle>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-xs text-slate-600"
                      onClick={async () => {
                        await notifications.refetch();
                      }}
                    >
                      <RefreshCw className="mr-2 h-3.5 w-3.5" />
                      Refresh
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {notifications.data?.notifications.length ? (
                      notifications.data.notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`rounded-3xl border p-5 ${notification.isRead ? "border-slate-200 bg-white" : "border-blue-200 bg-blue-50/40"}`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-bold text-slate-900">{notification.title}</p>
                              <p className="mt-1 text-xs text-slate-500">{new Date(notification.createdAt).toLocaleString()}</p>
                              <p className="mt-3 text-sm text-slate-700">{notification.message}</p>
                              {notification.actionUrl ? (
                                <button
                                  type="button"
                                  onClick={() => navigate(notification.actionUrl || "/dashboard")}
                                  className="mt-3 inline-flex text-xs font-semibold text-brand-primary"
                                >
                                  Open related section
                                </button>
                              ) : null}
                            </div>
                            <div className="flex items-center gap-2">
                              {!notification.isRead ? (
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={async () => {
                                    await markNotificationRead.mutateAsync(notification.id);
                                  }}
                                >
                                  <Check className="mr-2 h-4 w-4" />
                                  Mark as read
                                </Button>
                              ) : (
                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Read</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-600">
                        <p className="text-sm font-semibold text-slate-900">No notifications yet.</p>
                        <p className="mt-2 text-sm">New account, order, support, and course updates will appear here.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {onReports && (
                <DashboardReportsSection
                  role={user.role}
                  fullname={user.fullname}
                  studentDashboard={studentDashboard.data}
                  parentDashboard={parentDashboard.data}
                  schoolDashboard={schoolDashboard.data}
                  adminDashboard={adminDashboard.data}
                  onDownloadParentReport={downloadParentReport}
                />
              )}

              {onProfile && (
                <Card>
                  <CardHeader><CardTitle>Profile Settings</CardTitle></CardHeader>
                  <CardContent className="space-y-8">
                    <form
                      className="grid gap-4 md:grid-cols-2"
                      onSubmit={async (event) => {
                        event.preventDefault();
                        await updateProfile.mutateAsync({
                          ...effectiveProfile,
                          email: effectiveProfile.email || undefined,
                        });
                        setProfileForm({
                          firstname: "",
                          lastname: "",
                          email: "",
                          city: "",
                          country: "",
                          phone: "",
                          description: "",
                        });
                      }}
                    >
                      <div className="space-y-2"><Label htmlFor="firstname">First Name</Label><Input id="firstname" value={effectiveProfile.firstname} onChange={(event) => setProfileForm((current) => ({ ...current, firstname: event.target.value }))} /></div>
                      <div className="space-y-2"><Label htmlFor="lastname">Last Name</Label><Input id="lastname" value={effectiveProfile.lastname} onChange={(event) => setProfileForm((current) => ({ ...current, lastname: event.target.value }))} /></div>
                      <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="text" value={effectiveProfile.email || "No email linked to this account"} disabled className="cursor-not-allowed bg-slate-100 text-slate-600" /></div>
                      <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" value={effectiveProfile.phone} onChange={(event) => setProfileForm((current) => ({ ...current, phone: event.target.value }))} /></div>
                      <div className="space-y-2"><Label htmlFor="city">City</Label><Input id="city" value={effectiveProfile.city} onChange={(event) => setProfileForm((current) => ({ ...current, city: event.target.value }))} /></div>
                      <div className="space-y-2"><Label htmlFor="country">Country</Label><Input id="country" value={effectiveProfile.country} onChange={(event) => setProfileForm((current) => ({ ...current, country: event.target.value }))} /></div>
                      <div className="space-y-2 md:col-span-2"><Label htmlFor="description">Bio</Label><Textarea id="description" value={effectiveProfile.description} onChange={(event) => setProfileForm((current) => ({ ...current, description: event.target.value }))} /></div>
                      {updateProfile.error && <p className="text-sm text-red-600 md:col-span-2">{updateProfile.error.message}</p>}
                      <div className="md:col-span-2"><Button type="submit" className="bg-brand-primary text-white hover:bg-brand-primary-dark">{updateProfile.isPending ? "Saving..." : "Save Profile"}</Button></div>
                    </form>

                    <Separator />

                    <form
                      className="grid gap-4 md:grid-cols-2"
                      onSubmit={async (event) => {
                        event.preventDefault();
                        await changePassword.mutateAsync(passwordForm);
                        setPasswordForm({ currentPassword: "", newPassword: "" });
                      }}
                    >
                      <div className="space-y-2"><Label htmlFor="currentPassword">Current Password</Label><Input id="currentPassword" type="password" value={passwordForm.currentPassword} onChange={(event) => setPasswordForm((current) => ({ ...current, currentPassword: event.target.value }))} /></div>
                      <div className="space-y-2"><Label htmlFor="newPassword">New Password</Label><Input id="newPassword" type="password" value={passwordForm.newPassword} onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))} /></div>
                      {changePassword.error && <p className="text-sm text-red-600 md:col-span-2">{changePassword.error.message}</p>}
                      <div className="md:col-span-2"><Button type="submit" className="bg-slate-900 text-white hover:bg-slate-800">{changePassword.isPending ? "Updating..." : "Update Password"}</Button></div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {onOrders && user.role === "student" && (
                <StudentPaymentsPanel
                  orders={orders ?? undefined}
                  studentName={user.fullname}
                />
              )}

              {onAdminSupport && user.role === "admin" && (
                <div className="space-y-6">
                  <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="space-y-2 border-b border-slate-100 pb-4">
                      <div className="flex items-center justify-between gap-3">
                        <CardTitle>Support Queue</CardTitle>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-xs text-slate-600"
                          onClick={async () => {
                            await supportTickets.refetch();
                          }}
                        >
                          <RefreshCw className="mr-2 h-3.5 w-3.5" />
                          Refresh
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                      {supportTickets.data && supportTickets.data.length > 0 ? (
                        <div className="space-y-3 max-h-72 overflow-auto pr-1">
                          {supportTickets.data.map((ticket) => (
                            <button
                              key={ticket.id}
                              type="button"
                              onClick={() => setSelectedTicketId(ticket.id)}
                              className={`w-full rounded-2xl border p-4 text-left transition ${
                                selectedTicketId === ticket.id
                                  ? "border-brand-primary bg-blue-50"
                                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <p className="text-sm font-semibold text-slate-900">{ticket.subjectInterest || "Support Ticket"}</p>
                                  <p className="mt-1 text-xs text-slate-500">{ticket.type} • {ticket.status}</p>
                                </div>
                                <p className="text-sm-small text-slate-400">
                                  {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : ""}
                                </p>
                              </div>
                              <p className="mt-2 text-xs text-slate-600">From: {ticket.email || "Unknown user"}</p>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-600">
                          <p className="text-sm font-semibold text-slate-900">No tickets yet.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 shadow-sm">
                    <CardContent className="space-y-4 p-6">
                      {selectedTicket ? (
                        <>
                          <div className="space-y-1">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Selected Ticket</p>
                            <h3 className="text-lg font-semibold text-slate-900">{selectedTicket.subjectInterest || "Support Ticket"}</h3>
                            <p className="text-sm text-slate-600">From: {selectedTicket.email || "Unknown user"}</p>
                          </div>

                          <div className="rounded-3xl bg-slate-50 p-5">
                            <p className="whitespace-pre-line text-sm text-slate-700">{selectedTicket.message || "No details provided."}</p>
                          </div>

                          <div className="space-y-2 border-t border-slate-200 pt-4">
                            <Label htmlFor="admin-ticket-reply">Reply To This Ticket</Label>
                            <Textarea
                              id="admin-ticket-reply"
                              value={adminReplyState.message}
                              onChange={(event) => setAdminReplyState((current) => ({ ...current, message: event.target.value, error: "", success: "" }))}
                              placeholder="Write your reply to this ticket"
                              className="min-h-28"
                            />
                            {adminReplyState.error && <p className="text-sm text-red-600">{adminReplyState.error}</p>}
                            {adminReplyState.success && <p className="text-sm text-emerald-600">{adminReplyState.success}</p>}
                            <Button
                              className="bg-slate-900 text-white hover:bg-slate-800"
                              onClick={async () => {
                                if (!selectedTicketId) return;
                                const replyText = adminReplyState.message.trim();
                                if (!replyText) {
                                  setAdminReplyState((current) => ({ ...current, error: "Reply message is required" }));
                                  return;
                                }
                                setAdminReplyState((current) => ({ ...current, pending: true, error: "", success: "" }));
                                try {
                                  const response = await fetch(`/api/inquiries/${selectedTicketId}/reply`, {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ message: replyText }),
                                  });
                                  const body = await readJsonSafely(response);
                                  if (!response.ok) {
                                    const maybeMessage =
                                      typeof body.message === "string" && body.message.trim()
                                        ? body.message
                                        : "Failed to send reply";
                                    if (
                                      typeof body.message === "string" &&
                                      body.message.includes("<!DOCTYPE")
                                    ) {
                                      throw new Error(
                                        "Reply API returned HTML instead of JSON. Make sure you are running the EDU app backend and opening the EDU dashboard.",
                                      );
                                    }
                                    throw new Error(maybeMessage);
                                  }
                                  await supportTickets.refetch();
                                  setAdminReplyState({ message: "", error: "", success: "Reply sent to ticket.", pending: false });
                                } catch (error) {
                                  setAdminReplyState((current) => ({
                                    ...current,
                                    error: error instanceof Error ? error.message : "Failed to send reply",
                                    pending: false,
                                  }));
                                }
                              }}
                              disabled={adminReplyState.pending}
                            >
                              {adminReplyState.pending ? "Sending..." : "Send Reply To Ticket"}
                            </Button>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-slate-600">Select a ticket from above to view details and reply.</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {onSupport && user.role !== "admin" && (
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                  <Card className="border-blue-100 shadow-sm">
                    <CardContent className="space-y-5 p-6">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Support Center</p>
                        <p className="text-sm text-slate-600">Submit tickets, track status, and receive support responses.</p>
                        <p className="text-sm font-semibold text-slate-900">Unread Updates: {unreadUpdates}</p>
                      </div>

                      <form
                        className="space-y-4"
                        onSubmit={async (event) => {
                          event.preventDefault();
                          setSupportState({ error: "", success: "", pending: true });
                          try {
                            const response = await fetch("/api/inquiries", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                type: "contact",
                                name: user.fullname,
                                email: user.email || "",
                                role: user.role,
                                subjectInterest: supportForm.category,
                                learningMode: supportForm.priority,
                                message: `Subject: ${supportForm.subject}\n\nCategory: ${supportForm.category}\nPriority: ${supportForm.priority}\nAttachment: ${supportForm.attachmentName || "No file attached"}\n\n${supportForm.message}`,
                              }),
                            });
                            const body = await response.json();
                            if (!response.ok) {
                              throw new Error(body.message || "Failed to submit support request");
                            }
                            setSupportForm({ subject: "", category: "Technical", priority: "Medium", message: "", attachmentName: "" });
                            setSelectedTicketId(body.id ?? null);
                            await supportTickets.refetch();
                            setSupportState({ error: "", success: "Ticket submitted successfully.", pending: false });
                          } catch (error) {
                            setSupportState({
                              error: error instanceof Error ? error.message : "Failed to submit support request",
                              success: "",
                              pending: false,
                            });
                          }
                        }}
                      >
                        <div className="space-y-2">
                          <Label htmlFor="support-subject">Subject</Label>
                          <Input
                            id="support-subject"
                            value={supportForm.subject}
                            onChange={(event) => setSupportForm((current) => ({ ...current, subject: event.target.value }))}
                            placeholder="I cannot access my course after purchase"
                          />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="support-category">Category</Label>
                            <select
                              id="support-category"
                              value={supportForm.category}
                              onChange={(event) => setSupportForm((current) => ({ ...current, category: event.target.value }))}
                              className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700"
                            >
                              <option>Technical</option>
                              <option>Billing</option>
                              <option>Account</option>
                              <option>Course Access</option>
                              <option>Other</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="support-priority">Priority</Label>
                            <select
                              id="support-priority"
                              value={supportForm.priority}
                              onChange={(event) => setSupportForm((current) => ({ ...current, priority: event.target.value }))}
                              className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700"
                            >
                              <option>Low</option>
                              <option>Medium</option>
                              <option>High</option>
                              <option>Urgent</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="support-message">Description</Label>
                          <Textarea
                            id="support-message"
                            value={supportForm.message}
                            onChange={(event) => setSupportForm((current) => ({ ...current, message: event.target.value }))}
                            placeholder="Describe the issue with enough detail so support can reproduce it quickly"
                            className="min-h-32"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="support-attachment">Attachments</Label>
                          <Input
                            id="support-attachment"
                            type="file"
                            onChange={(event) => setSupportForm((current) => ({ ...current, attachmentName: event.target.files?.[0]?.name || "" }))}
                          />
                          {supportForm.attachmentName && <p className="text-xs text-slate-500">Attached: {supportForm.attachmentName}</p>}
                        </div>

                        {supportState.error && <p className="text-sm text-red-600">{supportState.error}</p>}
                        {supportState.success && <p className="text-sm text-emerald-600">{supportState.success}</p>}

                        <Button type="submit" className="bg-brand-primary text-white hover:bg-brand-primary-dark">
                          {supportState.pending ? "Submitting..." : "Submit Ticket"}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="space-y-2 border-b border-slate-100 pb-4">
                      <div className="flex items-center justify-between gap-3">
                        <CardTitle>My Tickets</CardTitle>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-xs text-slate-600"
                          onClick={async () => {
                            await supportTickets.refetch();
                          }}
                        >
                          <RefreshCw className="mr-2 h-3.5 w-3.5" />
                          Refresh
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                      {supportTickets.data && supportTickets.data.length > 0 ? (
                        <>
                          <div className="space-y-3 max-h-72 overflow-auto pr-1">
                            {supportTickets.data.map((ticket) => (
                              <button
                                key={ticket.id}
                                type="button"
                                onClick={() => setSelectedTicketId(ticket.id)}
                                className={`w-full rounded-2xl border p-4 text-left transition ${
                                  selectedTicketId === ticket.id
                                    ? "border-brand-primary bg-blue-50"
                                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div>
                                    <p className="text-sm font-semibold text-slate-900">{ticket.subjectInterest || "Support Ticket"}</p>
                                    <p className="mt-1 text-xs text-slate-500">{ticket.type} • {ticket.status}</p>
                                  </div>
                                  <p className="text-sm-small text-slate-400">
                                    {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : ""}
                                  </p>
                                </div>
                                <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-600">
                                  {ticket.message || "No details provided."}
                                </p>
                              </button>
                            ))}
                          </div>

                          <div className="rounded-3xl bg-slate-50 p-5">
                            {selectedTicket ? (
                              <div className="space-y-3">
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Selected Ticket</p>
                                    <h3 className="mt-1 text-base font-semibold text-slate-900">{selectedTicket.subjectInterest || "Support Ticket"}</h3>
                                  </div>
                                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                                    {selectedTicket.status}
                                  </span>
                                </div>
                                <div className="space-y-1 text-sm text-slate-600">
                                  <p><span className="font-semibold text-slate-900">Category:</span> {selectedTicket.subjectInterest || "Technical"}</p>
                                  <p><span className="font-semibold text-slate-900">Priority:</span> {selectedTicket.learningMode || "Medium"}</p>
                                  <p><span className="font-semibold text-slate-900">Created:</span> {selectedTicket.createdAt ? new Date(selectedTicket.createdAt).toLocaleString() : ""}</p>
                                  <p className="whitespace-pre-line pt-2 text-slate-700">{selectedTicket.message}</p>
                                </div>

                                <div className="space-y-4 border-t border-slate-200 pt-4">
                                  <Label htmlFor="ticket-reply">Reply To Support</Label>
                                  <Textarea
                                    id="ticket-reply"
                                    value={ticketReplyState.message}
                                    onChange={(event) => setTicketReplyState((current) => ({ ...current, message: event.target.value, error: "", success: "" }))}
                                    placeholder="Write your reply to support here"
                                    className="min-h-28"
                                  />
                                  {ticketReplyState.error && <p className="text-sm text-red-600">{ticketReplyState.error}</p>}
                                  {ticketReplyState.success && <p className="text-sm text-emerald-600">{ticketReplyState.success}</p>}
                                  <Button
                                    className="bg-brand-primary text-white hover:bg-brand-primary-dark"
                                    onClick={async () => {
                                      if (!selectedTicketId) return;
                                      const replyText = ticketReplyState.message.trim();
                                      if (!replyText) {
                                        setTicketReplyState((current) => ({ ...current, error: "Reply message is required" }));
                                        return;
                                      }
                                      setTicketReplyState((current) => ({ ...current, pending: true, error: "", success: "" }));
                                      try {
                                        const response = await fetch(`/api/inquiries/${selectedTicketId}/reply`, {
                                          method: "POST",
                                          headers: { "Content-Type": "application/json" },
                                          body: JSON.stringify({ message: replyText }),
                                        });
                                        const body = await readJsonSafely(response);
                                        if (!response.ok) {
                                          const maybeMessage =
                                            typeof body.message === "string" && body.message.trim()
                                              ? body.message
                                              : "Failed to send reply";
                                          if (
                                            typeof body.message === "string" &&
                                            body.message.includes("<!DOCTYPE")
                                          ) {
                                            throw new Error(
                                              "Reply API returned HTML instead of JSON. Make sure you are running the EDU app backend and opening the EDU dashboard.",
                                            );
                                          }
                                          throw new Error(maybeMessage);
                                        }
                                        await supportTickets.refetch();
                                        setTicketReplyState({ message: "", error: "", success: "Reply sent to support.", pending: false });
                                      } catch (error) {
                                        setTicketReplyState((current) => ({
                                          ...current,
                                          error: error instanceof Error ? error.message : "Failed to send reply",
                                          pending: false,
                                        }));
                                      }
                                    }}
                                    disabled={ticketReplyState.pending}
                                  >
                                    {ticketReplyState.pending ? "Sending..." : "Send Reply"}
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-2 text-slate-600">
                                <p className="text-sm font-semibold text-slate-900">No tickets yet.</p>
                                <p className="text-sm">Select a ticket to view full details.</p>
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-600">
                          <p className="text-sm font-semibold text-slate-900">No tickets yet.</p>
                          <p className="mt-2 text-sm">Select a ticket to view full details.</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </Layout>
  );
}

