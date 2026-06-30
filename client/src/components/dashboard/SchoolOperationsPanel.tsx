import { useEffect, useMemo, useState } from "react";
import { BookOpen, CheckCircle2, FileUp, RefreshCw, ShieldCheck, Users } from "lucide-react";
import { usePrograms } from "@/hooks/use-programs";
import {
  useSchoolAssignSeats,
  useSchoolBulkLicenses,
  useSchoolLicenseMetrics,
  useSchoolUploadStudents,
  useSchoolUsageReport,
} from "@/hooks/use-dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type SchoolLicense = {
  id: string;
  courseId: number;
  courseName: string;
  assignedSeats: number;
  totalSeats: number;
};

interface SchoolOperationsPanelProps {
  schoolName: string;
  licenses: SchoolLicense[];
  purchasedSeats: number;
  assignedSeats: number;
  activeCourses: number;
}

function formatCurrency(value: number) {
  const inDollars = (Number.isFinite(value) ? value : 0) / 100;
  return `$${inDollars.toFixed(2)}`;
}

export function SchoolOperationsPanel({
  schoolName,
  licenses,
  purchasedSeats,
  assignedSeats,
  activeCourses,
}: SchoolOperationsPanelProps) {
  const { data: courses = [] } = usePrograms();
  const bulkLicenses = useSchoolBulkLicenses();
  const uploadStudents = useSchoolUploadStudents();
  const assignSeats = useSchoolAssignSeats();
  const usageReport = useSchoolUsageReport(true);

  const [tab, setTab] = useState<"overview" | "purchase" | "roster" | "report">("overview");
  const [bulkCourseId, setBulkCourseId] = useState("");
  const [bulkQuantity, setBulkQuantity] = useState("25");
  const [uploadFilename, setUploadFilename] = useState("students.csv");
  const [uploadCsvText, setUploadCsvText] = useState("email,firstname,lastname,moodleUserId\nstudent1@example.com,Amina,Ali,1001");
  const [assignLicenseId, setAssignLicenseId] = useState("");
  const [assignStudentIds, setAssignStudentIds] = useState("1001");

  useEffect(() => {
    if (!bulkCourseId && courses.length > 0) {
      setBulkCourseId(String(courses[0].id));
    }
  }, [courses, bulkCourseId]);

  useEffect(() => {
    if (!assignLicenseId && licenses.length > 0) {
      setAssignLicenseId(licenses[0].id);
    }
  }, [assignLicenseId, licenses]);

  const selectedBulkCourse = useMemo(
    () => courses.find((course) => String(course.id) === bulkCourseId) ?? null,
    [bulkCourseId, courses],
  );

  const selectedLicense = useMemo(
    () => licenses.find((license) => license.id === assignLicenseId) ?? null,
    [assignLicenseId, licenses],
  );

  const selectedMetrics = useSchoolLicenseMetrics(assignLicenseId, Boolean(assignLicenseId));
  const safeBulkQuantity = Math.max(1, Number.parseInt(bulkQuantity, 10) || 0);
  const bulkTotal = (selectedBulkCourse?.price ?? 0) * safeBulkQuantity;
  const usage = usageReport.data;

  const parsedStudentIds = useMemo(
    () =>
      assignStudentIds
        .split(/[\s,]+/)
        .map((value) => Number(value))
        .filter((value) => Number.isFinite(value) && value > 0),
    [assignStudentIds],
  );

  return (
    <div className="space-y-6">
      <Card className="border-blue-100 shadow-xl">
        <CardHeader className="space-y-3 border-b border-slate-100 bg-[linear-gradient(135deg,#f8fbff,#ffffff)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#2366c9]">School Operations</p>
              <CardTitle className="mt-2 text-2xl font-black text-slate-900">{schoolName} dashboard controls</CardTitle>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { key: "overview", label: "Overview" },
                { key: "purchase", label: "Licenses" },
                { key: "roster", label: "Roster" },
                { key: "report", label: "Usage" },
              ].map((entry) => (
                <button
                  key={entry.key}
                  type="button"
                  onClick={() => setTab(entry.key as typeof tab)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${tab === entry.key ? "bg-[#2366c9] text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                >
                  {entry.label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm leading-7 text-slate-600">
            Everything below stays hidden from other roles and is backed by school-only API checks.
          </p>
        </CardHeader>

        <CardContent className="space-y-6 p-6 md:p-8">
          {tab === "overview" && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-slate-200 shadow-sm"><CardContent className="p-5"><p className="text-sm text-slate-500">Purchased Seats</p><p className="mt-2 text-3xl font-black text-slate-900">{purchasedSeats}</p></CardContent></Card>
                <Card className="border-slate-200 shadow-sm"><CardContent className="p-5"><p className="text-sm text-slate-500">Assigned Seats</p><p className="mt-2 text-3xl font-black text-slate-900">{assignedSeats}</p></CardContent></Card>
                <Card className="border-slate-200 shadow-sm"><CardContent className="p-5"><p className="text-sm text-slate-500">Active Courses</p><p className="mt-2 text-3xl font-black text-slate-900">{activeCourses}</p></CardContent></Card>
                <Card className="border-slate-200 shadow-sm"><CardContent className="p-5"><p className="text-sm text-slate-500">Licenses</p><p className="mt-2 text-3xl font-black text-slate-900">{licenses.length}</p></CardContent></Card>
              </div>



              <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle>Current Seat Allocation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {licenses.length > 0 ? licenses.map((license) => (
                      <div key={license.id} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-semibold text-slate-900">{license.courseName}</p>
                            <p className="text-xs text-slate-500">License {license.id}</p>
                          </div>
                          <div className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-700">
                            {license.assignedSeats}/{license.totalSeats}
                          </div>
                        </div>
                      </div>
                    )) : <p className="text-sm text-slate-500">No licenses yet. Purchase bulk licenses to begin.</p>}
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline" onClick={() => setTab("purchase")}><BookOpen className="mr-2 h-4 w-4" /> Purchase bulk licenses</Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => setTab("roster")}><Users className="mr-2 h-4 w-4" /> Upload / assign students</Button>
                    <Button className="w-full justify-start" variant="outline" onClick={() => usageReport.refetch()}><RefreshCw className="mr-2 h-4 w-4" /> Refresh usage report</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {tab === "purchase" && (
            <div className="max-w-2xl">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#2366c9]" /> Bulk License Purchase</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Course</Label>
                    <select
                      value={bulkCourseId}
                      onChange={(event) => setBulkCourseId(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm"
                    >
                      {courses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>License Quantity</Label>
                    <Input type="number" min={1} value={bulkQuantity} onChange={(event) => setBulkQuantity(event.target.value)} />
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Estimated Total</p>
                    <p className="mt-2 text-2xl font-black text-slate-900">{formatCurrency(bulkTotal)}</p>
                  </div>
                  <Button
                    className="w-full bg-slate-900 text-white hover:bg-slate-800"
                    disabled={bulkLicenses.isPending || !selectedBulkCourse}
                    onClick={async () => {
                      if (!selectedBulkCourse) return;
                      await bulkLicenses.mutateAsync({ courseId: selectedBulkCourse.id, quantity: safeBulkQuantity });
                    }}
                  >
                    {bulkLicenses.isPending ? "Purchasing..." : "Purchase Bulk Licenses"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {tab === "roster" && (
            <div className="grid gap-5 xl:grid-cols-2">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><FileUp className="h-4 w-4 text-[#2366c9]" /> Upload Students</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Filename</Label>
                    <Input value={uploadFilename} onChange={(event) => setUploadFilename(event.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>CSV content</Label>
                    <Textarea value={uploadCsvText} onChange={(event) => setUploadCsvText(event.target.value)} className="min-h-40" />
                  </div>
                  <Button
                    className="w-full bg-[#2366c9] text-white hover:bg-[#1a4fa0]"
                    disabled={uploadStudents.isPending || !uploadCsvText.trim()}
                    onClick={async () => {
                      await uploadStudents.mutateAsync({ csvText: uploadCsvText, filename: uploadFilename });
                    }}
                  >
                    {uploadStudents.isPending ? "Uploading..." : "Upload Students"}
                  </Button>
                  {uploadStudents.data ? (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                      Uploaded {uploadStudents.data.processedStudents}/{uploadStudents.data.totalStudents} students.
                    </div>
                  ) : null}
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Users className="h-4 w-4 text-[#2366c9]" /> Assign Seats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select License</Label>
                    <select
                      value={assignLicenseId}
                      onChange={(event) => setAssignLicenseId(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm"
                    >
                      {licenses.map((license) => (
                        <option key={license.id} value={license.id}>
                          {license.courseName} ({license.assignedSeats}/{license.totalSeats})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Student Moodle IDs</Label>
                    <Textarea
                      value={assignStudentIds}
                      onChange={(event) => setAssignStudentIds(event.target.value)}
                      placeholder="1001, 1002, 1003"
                      className="min-h-32"
                    />
                  </div>
                  <Button
                    className="w-full bg-slate-900 text-white hover:bg-slate-800"
                    disabled={assignSeats.isPending || !selectedLicense || parsedStudentIds.length === 0}
                    onClick={async () => {
                      if (!selectedLicense) return;
                      await assignSeats.mutateAsync({ licenseId: selectedLicense.id, studentIds: parsedStudentIds });
                    }}
                  >
                    {assignSeats.isPending ? "Assigning..." : "Assign Seats"}
                  </Button>
                  {assignSeats.data ? (
                    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                      Assigned {assignSeats.data.assigned.length} seat(s), {assignSeats.data.failed.length} failed.
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>
          )}

          {tab === "report" && (
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-slate-200 shadow-sm"><CardContent className="p-5"><p className="text-sm text-slate-500">Total Licenses</p><p className="mt-2 text-3xl font-black text-slate-900">{usage?.totalLicenses ?? licenses.length}</p></CardContent></Card>
                <Card className="border-slate-200 shadow-sm"><CardContent className="p-5"><p className="text-sm text-slate-500">Utilization</p><p className="mt-2 text-3xl font-black text-slate-900">{usage?.utilizationRate ?? 0}%</p></CardContent></Card>
                <Card className="border-slate-200 shadow-sm"><CardContent className="p-5"><p className="text-sm text-slate-500">Used Seats</p><p className="mt-2 text-3xl font-black text-slate-900">{usage?.usedSeats ?? assignedSeats}</p></CardContent></Card>
                <Card className="border-slate-200 shadow-sm"><CardContent className="p-5"><p className="text-sm text-slate-500">Available Seats</p><p className="mt-2 text-3xl font-black text-slate-900">{usage?.availableSeats ?? Math.max(purchasedSeats - assignedSeats, 0)}</p></CardContent></Card>
              </div>

              <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle>License Utilization</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {(usage?.licenses ?? []).map((license) => (
                      <div key={license.licenseId} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-semibold text-slate-900">{license.courseName}</p>
                            <p className="text-xs text-slate-500">{license.assignedSeats}/{license.totalSeats} assigned</p>
                          </div>
                          <Button type="button" variant="outline" size="sm" onClick={() => setAssignLicenseId(license.licenseId)}>
                            View metrics
                          </Button>
                        </div>
                      </div>
                    ))}
                    {(usage?.licenses ?? []).length === 0 && <p className="text-sm text-slate-500">Usage metrics will appear after you create licenses.</p>}
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle>Selected License Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedMetrics.data ? (
                      <>
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">License</p>
                          <p className="mt-2 font-semibold text-slate-900">{selectedMetrics.data.courseName}</p>
                          <p className="mt-1 text-sm text-slate-500">{selectedMetrics.data.assignedSeats}/{selectedMetrics.data.totalSeats} seats used</p>
                        </div>
                        {selectedMetrics.data.lastAccessDates.map((entry) => (
                          <div key={entry.studentId} className="rounded-2xl border border-slate-200 p-3 text-sm">
                            <p className="font-semibold text-slate-900">Student {entry.studentId}</p>
                            <p className="text-slate-500">Progress {entry.enrollmentProgress}%</p>
                          </div>
                        ))}
                      </>
                    ) : (
                      <p className="text-sm text-slate-500">Pick a license to inspect its usage metrics.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {(bulkLicenses.isSuccess || uploadStudents.isSuccess || assignSeats.isSuccess) && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
              <div className="flex flex-wrap items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>School actions completed successfully.</span>
              </div>
            </div>
          )}

          {(bulkLicenses.isError || uploadStudents.isError || assignSeats.isError) && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {bulkLicenses.error instanceof Error && bulkLicenses.error.message}
              {uploadStudents.error instanceof Error && uploadStudents.error.message}
              {assignSeats.error instanceof Error && assignSeats.error.message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default SchoolOperationsPanel;
