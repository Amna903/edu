import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { BarChart3, Bell, BookOpen, Check, CreditCard, GraduationCap, LayoutDashboard, LifeBuoy, LogOut, RefreshCw, Shield, UserCircle2, Users } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { AIChatLauncher } from "@/components/AIChatLauncher";
import SchoolPurchaseSeatsCard from "@/components/dashboard/SchoolPurchaseSeatsCard";
import SchoolAnalyticsClient from "@/components/dashboard/SchoolAnalyticsClient";
import { useAuthUser, useLogout } from "@/hooks/use-auth";
import { useOrders } from "@/hooks/use-orders";
import { useChangePassword, useUpdateProfile } from "@/hooks/use-profile";
import { useAdminDashboard, useDashboardNotifications, useLinkChild, useMarkNotificationRead, useParentDashboard, useSchoolDashboard, useStudentCertificates, useStudentDashboard, useSupportTickets } from "@/hooks/use-dashboard";

function getDashboardPath(role?: string | null) {
  if (role === "admin") return "/dashboard/admin";
  if (role === "parent") return "/dashboard/parent";
  if (role === "school") return "/dashboard/school";
  return "/dashboard/student";
}

function getDashboardMenu(role?: string | null, unreadNotifications = 0) {
  const common = [
    { href: role ? getDashboardPath(role) : "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/profile", label: "Profile", icon: UserCircle2 },
    { href: "/dashboard/notifications", label: "Notifications", icon: Bell, badge: unreadNotifications > 0 ? (unreadNotifications > 99 ? "99+" : String(unreadNotifications)) : null },
    { href: "/dashboard/support", label: "Support", icon: LifeBuoy },
    { href: "/dashboard/orders", label: "Orders", icon: CreditCard },
  ];

  if (role === "student") {
    return [...common, { href: "/dashboard/student/certificates", label: "Certificates", icon: GraduationCap }];
  }

  if (role === "school") {
    return [...common, { href: "/dashboard/school/analytics", label: "Analytics", icon: BarChart3 }];
  }

  if (role === "admin") {
    return [...common, { href: "/dashboard/admin/analytics", label: "Analytics", icon: Shield }];
  }

  return common;
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
  const [childIdInput, setChildIdInput] = useState("");
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedTicketId !== null) {
      return;
    }

    if (supportTickets.data && supportTickets.data.length > 0) {
      setSelectedTicketId(supportTickets.data[0].id);
    }
  }, [selectedTicketId, supportTickets.data]);

  const effectiveProfile = {
    firstname: profileForm.firstname || user?.firstname || "",
    lastname: profileForm.lastname || user?.lastname || "",
    email: profileForm.email || user?.email || "",
    city: profileForm.city || user?.city || "",
    country: profileForm.country || user?.country || "",
    phone: profileForm.phone || user?.phone || "",
    description: profileForm.description || user?.description || "",
  };

  const unreadNotifications = notifications.data?.notifications.filter((notification) => !notification.isRead).length ?? 0;
  const menu = useMemo(() => getDashboardMenu(user?.role, unreadNotifications), [user?.role, unreadNotifications]);
  const onMainDashboard = location === "/dashboard" || location === getDashboardPath(user?.role);
  const onProfile = location === "/dashboard/profile";
  const onNotifications = location === "/dashboard/notifications";
  const onOrders = location === "/dashboard/orders";
  const onSupport = location === "/dashboard/support";
  const onStudentCertificates = location === "/dashboard/student/certificates";
  const onSchoolAnalytics = location === "/dashboard/school/analytics";
  const onAdminAnalytics = location === "/dashboard/admin/analytics";
  const unreadUpdates = supportTickets.data?.filter((ticket) => ticket.status === "new").length ?? 0;
  const selectedTicket = supportTickets.data?.find((ticket) => ticket.id === selectedTicketId) ?? null;

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
                <Button className="bg-[#2366c9] text-white hover:bg-blue-700" onClick={() => navigate("/login")}>
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
                          active ? "bg-[#2366c9] text-white shadow-lg shadow-blue-100" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                        {item.badge ? (
                          <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-black ${active ? "bg-white text-[#2366c9]" : "bg-red-500 text-white"}`}>
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
                      <div className="mt-5">
                        <AIChatLauncher className="bg-[#2366c9] text-white hover:bg-[#1c56aa]" />
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Username</p>
                      <p className="mt-2 font-bold text-slate-900">{user.username}</p>
                    </div>
                    <div className="rounded-3xl bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">User ID</p>
                      <p className="mt-2 font-bold text-slate-900">{user.id}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {onMainDashboard && user.role === "student" && studentDashboard.data && (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Enrolled Courses</p><p className="mt-2 text-3xl font-black text-slate-900">{studentDashboard.data.stats.enrolledCourses}</p></CardContent></Card>
                    <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Completed</p><p className="mt-2 text-3xl font-black text-slate-900">{studentDashboard.data.stats.completedCourses}</p></CardContent></Card>
                    <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Average Progress</p><p className="mt-2 text-3xl font-black text-slate-900">{studentDashboard.data.stats.averageProgress}%</p></CardContent></Card>
                  </div>
                  <Card>
                    <CardHeader><CardTitle>My Courses</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                      {studentDashboard.data.courses.map((course) => (
                        <div key={course.id} className="rounded-3xl border border-slate-200 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-bold text-slate-900">{course.title}</p>
                              <p className="mt-1 text-sm text-slate-500">Grade: {course.grade || "N/A"}</p>
                            </div>
                            <div className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">{Math.round(course.progress)}%</div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}

              {onMainDashboard && user.role === "parent" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader><CardTitle>Link Your Child</CardTitle></CardHeader>
                    <CardContent>
                      <form
                        className="flex flex-col gap-3 md:flex-row"
                        onSubmit={async (event) => {
                          event.preventDefault();
                          await linkChild.mutateAsync(Number(childIdInput));
                          setChildIdInput("");
                        }}
                      >
                        <Input value={childIdInput} onChange={(event) => setChildIdInput(event.target.value)} placeholder="Child Moodle User ID" />
                        <Button type="submit"><Users className="mr-2 h-4 w-4" />Link Child</Button>
                      </form>
                    </CardContent>
                  </Card>
                  <div className="grid gap-4">
                    {parentDashboard.data?.children.map((child) => (
                      <Card key={child.id}>
                        <CardHeader><CardTitle>{child.name}</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm text-slate-500">{child.email}</p>
                          {child.courses.map((course) => (
                            <div key={course.id} className="rounded-2xl border border-slate-200 p-4">
                              <p className="font-semibold text-slate-900">{course.courseName}</p>
                              <p className="mt-1 text-sm text-slate-500">Progress {Math.round(course.progress)}% • Grade {course.grade}</p>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    ))}
                    {parentDashboard.data?.children.length === 0 && <p className="text-slate-600">No linked children yet.</p>}
                  </div>
                </div>
              )}

              {onMainDashboard && user.role === "school" && schoolDashboard.data && (
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
                  <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Purchased Seats</p><p className="mt-2 text-3xl font-black text-slate-900">{schoolDashboard.data.stats.purchasedSeats}</p></CardContent></Card>
                      <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Assigned Seats</p><p className="mt-2 text-3xl font-black text-slate-900">{schoolDashboard.data.stats.assignedSeats}</p></CardContent></Card>
                      <Card><CardContent className="p-6"><p className="text-sm text-slate-500">Active Courses</p><p className="mt-2 text-3xl font-black text-slate-900">{schoolDashboard.data.stats.activeCourses}</p></CardContent></Card>
                    </div>
                    <Card>
                      <CardHeader><CardTitle>Seat Allocation</CardTitle></CardHeader>
                      <CardContent className="grid gap-4">
                        {schoolDashboard.data.licenses.map((license) => (
                          <div key={`${license.courseId}-${license.courseName}`} className="rounded-3xl border border-slate-200 p-4">
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="font-bold text-slate-900">{license.courseName}</p>
                                <p className="text-sm text-slate-500">Course ID {license.courseId}</p>
                              </div>
                              <div className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                                {license.assignedSeats}/{license.totalSeats}
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <SchoolPurchaseSeatsCard />
                    <Card className="bg-slate-900 text-white">
                      <CardContent className="space-y-3 p-6">
                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">Need Help?</p>
                        <p className="text-sm leading-7 text-slate-300">Contact our support team for customized enterprise plans and pricing.</p>
                        <Button className="bg-white text-slate-900 hover:bg-blue-50">Contact Support</Button>
                      </CardContent>
                    </Card>
                  </div>
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

              {onStudentCertificates && (
                <Card>
                  <CardHeader><CardTitle>Certificates</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    {studentCertificates.data?.map((certificate) => (
                      <div key={`${certificate.courseId}-${certificate.id}`} className="flex flex-col gap-3 rounded-3xl border border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="font-bold text-slate-900">{certificate.name}</p>
                          <p className="mt-1 text-sm text-slate-500">{certificate.courseName}</p>
                        </div>
                        <a href={certificate.url} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full bg-[#2366c9] px-4 py-2 text-sm font-semibold text-white">
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
                                  className="mt-3 inline-flex text-xs font-semibold text-[#2366c9]"
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

              {onProfile && (
                <Card>
                  <CardHeader><CardTitle>Profile Settings</CardTitle></CardHeader>
                  <CardContent className="space-y-8">
                    <form
                      className="grid gap-4 md:grid-cols-2"
                      onSubmit={async (event) => {
                        event.preventDefault();
                        await updateProfile.mutateAsync(effectiveProfile);
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
                      <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={effectiveProfile.email} onChange={(event) => setProfileForm((current) => ({ ...current, email: event.target.value }))} /></div>
                      <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" value={effectiveProfile.phone} onChange={(event) => setProfileForm((current) => ({ ...current, phone: event.target.value }))} /></div>
                      <div className="space-y-2"><Label htmlFor="city">City</Label><Input id="city" value={effectiveProfile.city} onChange={(event) => setProfileForm((current) => ({ ...current, city: event.target.value }))} /></div>
                      <div className="space-y-2"><Label htmlFor="country">Country</Label><Input id="country" value={effectiveProfile.country} onChange={(event) => setProfileForm((current) => ({ ...current, country: event.target.value }))} /></div>
                      <div className="space-y-2 md:col-span-2"><Label htmlFor="description">Bio</Label><Textarea id="description" value={effectiveProfile.description} onChange={(event) => setProfileForm((current) => ({ ...current, description: event.target.value }))} /></div>
                      {updateProfile.error && <p className="text-sm text-red-600 md:col-span-2">{updateProfile.error.message}</p>}
                      <div className="md:col-span-2"><Button type="submit" className="bg-[#2366c9] text-white hover:bg-blue-700">{updateProfile.isPending ? "Saving..." : "Save Profile"}</Button></div>
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

              {onOrders && (
                <Card>
                  <CardHeader><CardTitle>Order History</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    {orders && orders.length > 0 ? (
                      orders.map((order) => (
                        <div key={order.id} className="rounded-3xl border border-slate-200 p-5">
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="font-bold text-slate-900">Order #{order.id}</p>
                              <p className="text-sm text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                              ${(order.totalAmount / 100).toFixed(2)}
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-2 text-sm text-slate-600">
                                <BookOpen className="h-4 w-4 text-blue-500" />
                                <span>{item.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-600">No orders yet.</p>
                    )}
                  </CardContent>
                </Card>
              )}

              {onSupport && (
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

                        <Button type="submit" className="bg-[#2366c9] text-white hover:bg-blue-700">
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
                                    ? "border-[#2366c9] bg-blue-50"
                                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div>
                                    <p className="text-sm font-semibold text-slate-900">{ticket.subjectInterest || "Support Ticket"}</p>
                                    <p className="mt-1 text-xs text-slate-500">{ticket.type} • {ticket.status}</p>
                                  </div>
                                  <p className="text-[11px] text-slate-400">
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
