import { useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { BarChart3, BookOpen, CreditCard, GraduationCap, LayoutDashboard, LifeBuoy, LogOut, Shield, UserCircle2, Users } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useAuthUser, useLogout } from "@/hooks/use-auth";
import { useOrders } from "@/hooks/use-orders";
import { useChangePassword, useUpdateProfile } from "@/hooks/use-profile";
import { useAdminDashboard, useLinkChild, useParentDashboard, useSchoolDashboard, useStudentCertificates, useStudentDashboard } from "@/hooks/use-dashboard";

function getDashboardPath(role?: string | null) {
  if (role === "admin") return "/dashboard/admin";
  if (role === "parent") return "/dashboard/parent";
  if (role === "school") return "/dashboard/school";
  return "/dashboard/student";
}

function getDashboardMenu(role?: string | null) {
  const common = [
    { href: role ? getDashboardPath(role) : "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/profile", label: "Profile", icon: UserCircle2 },
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
    message: "",
  });
  const [supportState, setSupportState] = useState({ error: "", success: "", pending: false });
  const [childIdInput, setChildIdInput] = useState("");

  const effectiveProfile = {
    firstname: profileForm.firstname || user?.firstname || "",
    lastname: profileForm.lastname || user?.lastname || "",
    email: profileForm.email || user?.email || "",
    city: profileForm.city || user?.city || "",
    country: profileForm.country || user?.country || "",
    phone: profileForm.phone || user?.phone || "",
    description: profileForm.description || user?.description || "",
  };

  const menu = useMemo(() => getDashboardMenu(user?.role), [user?.role]);
  const onMainDashboard = location === "/dashboard" || location === getDashboardPath(user?.role);
  const onProfile = location === "/dashboard/profile";
  const onOrders = location === "/dashboard/orders";
  const onSupport = location === "/dashboard/support";
  const onStudentCertificates = location === "/dashboard/student/certificates";
  const onSchoolAnalytics = location === "/dashboard/school/analytics";
  const onAdminAnalytics = location === "/dashboard/admin/analytics";

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
                <Card>
                  <CardHeader><CardTitle>School Analytics</CardTitle></CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <p className="text-sm text-slate-500">Utilization Rate</p>
                      <p className="mt-2 text-3xl font-black text-slate-900">
                        {schoolDashboard.data.stats.purchasedSeats > 0
                          ? Math.round((schoolDashboard.data.stats.assignedSeats / schoolDashboard.data.stats.purchasedSeats) * 100)
                          : 0}%
                      </p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <p className="text-sm text-slate-500">Courses Running</p>
                      <p className="mt-2 text-3xl font-black text-slate-900">{schoolDashboard.data.stats.activeCourses}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-5">
                      <p className="text-sm text-slate-500">Unassigned Seats</p>
                      <p className="mt-2 text-3xl font-black text-slate-900">{Math.max(schoolDashboard.data.stats.purchasedSeats - schoolDashboard.data.stats.assignedSeats, 0)}</p>
                    </div>
                  </CardContent>
                </Card>
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
                <Card>
                  <CardHeader><CardTitle>Support</CardTitle></CardHeader>
                  <CardContent>
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
                              subjectInterest: supportForm.subject,
                              message: supportForm.message,
                            }),
                          });
                          const body = await response.json();
                          if (!response.ok) {
                            throw new Error(body.message || "Failed to submit support request");
                          }
                          setSupportForm({ subject: "", message: "" });
                          setSupportState({ error: "", success: "Support request submitted successfully.", pending: false });
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
                          placeholder="Billing, access, dashboard issue, etc."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="support-message">Message</Label>
                        <Textarea
                          id="support-message"
                          value={supportForm.message}
                          onChange={(event) => setSupportForm((current) => ({ ...current, message: event.target.value }))}
                          placeholder="Describe the issue clearly so we can help faster."
                        />
                      </div>
                      {supportState.error && <p className="text-sm text-red-600">{supportState.error}</p>}
                      {supportState.success && <p className="text-sm text-emerald-600">{supportState.success}</p>}
                      <Button type="submit" className="bg-[#2366c9] text-white hover:bg-blue-700">
                        {supportState.pending ? "Submitting..." : "Submit Support Request"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </section>
          </div>
        )}
      </div>
    </Layout>
  );
}
