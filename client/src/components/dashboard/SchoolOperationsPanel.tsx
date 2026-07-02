import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { BookOpen, CheckCircle2, FileUp, RefreshCw, ShieldCheck, UserPlus, Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { usePrograms } from "@/hooks/use-programs";
import {
  useSchoolAddStudent,
  useSchoolAssignSeats,
  useSchoolBulkLicenses,
  useSchoolLicenseMetrics,
  useSchoolRoster,
  useSchoolUploadStudents,
  useSchoolUsageReport,
} from "@/hooks/use-dashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const COURSE_COLORS = ["#2366c9", "#14b8a6", "#f59e0b", "#8b5cf6", "#ef4444", "#0ea5e9"];

export function SchoolOperationsPanel({
  schoolName,
  licenses,
  purchasedSeats,
  assignedSeats,
  activeCourses,
}: SchoolOperationsPanelProps) {
  const { data: courses = [] } = usePrograms();
  const [tab, setTab] = useState<"overview" | "purchase" | "roster" | "report">("overview");
  const bulkLicenses = useSchoolBulkLicenses();
  const uploadStudents = useSchoolUploadStudents();
  const addStudent = useSchoolAddStudent();
  const roster = useSchoolRoster(tab === "roster" || tab === "overview" || tab === "report");
  const assignSeats = useSchoolAssignSeats();
  const usageReport = useSchoolUsageReport(true);

  const [bulkCourseId, setBulkCourseId] = useState("");
  const [bulkQuantity, setBulkQuantity] = useState("25");
  const [uploadFilename, setUploadFilename] = useState("");
  const [uploadCsvText, setUploadCsvText] = useState("");
  const [uploadFileError, setUploadFileError] = useState<string | null>(null);
  const [manualFirstName, setManualFirstName] = useState("");
  const [manualLastName, setManualLastName] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [assignLicenseId, setAssignLicenseId] = useState("");
  const [usageLicenseFilter, setUsageLicenseFilter] = useState<string>("all");
  const [schoolReportView, setSchoolReportView] = useState<"overview" | "licenses" | "students">("overview");
  const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false);
  const [selectedRosterIds, setSelectedRosterIds] = useState<number[]>([]);
  const [rosterStep, setRosterStep] = useState<1 | 2 | 3>(1);
  const [assignResult, setAssignResult] = useState<{ assigned: number; failed: Array<{ rosterId: number; error: string }> } | null>(null);
  const [purchaseResultMessage, setPurchaseResultMessage] = useState<string | null>(null);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);
  const csvFileInputRef = useRef<HTMLInputElement>(null);
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

  const selectedMetrics = useSchoolLicenseMetrics(usageLicenseFilter, usageLicenseFilter !== "all");
  const safeBulkQuantity = Math.max(1, Number.parseInt(bulkQuantity, 10) || 0);
  const bulkTotal = (selectedBulkCourse?.price ?? 0) * safeBulkQuantity;
  const usage = usageReport.data;
  const rosterStudents = roster.data?.students ?? [];
  const eligibleRosterStudents = useMemo(() => {
    if (!selectedLicense) return rosterStudents;
    const selectedCourseName = selectedLicense.courseName.trim().toLowerCase();
    return rosterStudents.filter((student) => !student.assignments.some((assignment) => (
      assignment.licenseId === selectedLicense.id
      || assignment.courseName.trim().toLowerCase() === selectedCourseName
    )));
  }, [rosterStudents, selectedLicense]);

  const remainingSeats = selectedLicense
    ? Math.max(selectedLicense.totalSeats - selectedLicense.assignedSeats, 0)
    : 0;

  const allSelected = eligibleRosterStudents.length > 0 && selectedRosterIds.length === eligibleRosterStudents.length;
  const hasValidManualStudent =
    manualFirstName.trim().length > 0 &&
    manualLastName.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(manualEmail.trim());
  const hasCsvReady = uploadCsvText.trim().length > 0;
  const canProceedFromStepOne = rosterStudents.length > 0;
  const canProceedFromStepTwo = selectedRosterIds.length > 0;
  const filteredUsageLicenses = useMemo(() => {
    if (usageLicenseFilter === "all") return usage?.licenses ?? [];
    return (usage?.licenses ?? []).filter((license) => license.licenseId === usageLicenseFilter);
  }, [usage?.licenses, usageLicenseFilter]);

  const usageChartData = filteredUsageLicenses.map((license) => ({
    name: license.courseName,
    assigned: license.assignedSeats,
    available: Math.max(license.totalSeats - license.assignedSeats, 0),
  }));

  const usageTotals = filteredUsageLicenses.reduce((acc, license) => {
    acc.used += license.assignedSeats;
    acc.total += license.totalSeats;
    return acc;
  }, { used: 0, total: 0 });

  const usagePieData = [
    { name: "Used", value: usageTotals.used, color: "#2366c9" },
    { name: "Available", value: Math.max(usageTotals.total - usageTotals.used, 0), color: "#cbd5e1" },
  ];
  const studentUsageRows = useMemo(
    () => rosterStudents.flatMap((student) => student.assignments.map((assignment) => ({
      studentId: student.id,
      studentName: student.studentName,
      studentEmail: student.studentEmail,
      courseName: assignment.courseName,
      licenseId: assignment.licenseId,
      assignedAt: assignment.assignedAt,
    }))),
    [rosterStudents],
  );
  const selectedLicenseStudents = useMemo(
    () => rosterStudents.filter((student) => student.assignments.some((assignment) => assignment.licenseId === usageLicenseFilter)),
    [rosterStudents, usageLicenseFilter],
  );

  useEffect(() => {
    if (usageLicenseFilter === "all") return;
    const exists = (usage?.licenses ?? []).some((license) => license.licenseId === usageLicenseFilter);
    if (!exists) {
      setUsageLicenseFilter("all");
    }
  }, [usage?.licenses, usageLicenseFilter]);

  const toggleStudent = (rosterId: number, checked: boolean) => {
    setSelectedRosterIds((current) => {
      if (checked) {
        return current.includes(rosterId) ? current : [...current, rosterId];
      }
      return current.filter((id) => id !== rosterId);
    });
  };

  const toggleSelectAll = (checked: boolean) => {
    setSelectedRosterIds(checked ? eligibleRosterStudents.map((student) => student.id) : []);
  };

  const handleCsvFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setUploadFileError(null);
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setUploadFileError("Please choose a .csv file.");
      event.target.value = "";
      return;
    }

    try {
      const text = await file.text();
      setUploadFilename(file.name);
      setUploadCsvText(text);
    } catch {
      setUploadFileError("Could not read the file. Please try another CSV.");
    }
  };

  const handleUploadCsv = async () => {
    if (!uploadCsvText.trim()) return;
    const result = await uploadStudents.mutateAsync({
      csvText: uploadCsvText,
      filename: uploadFilename || "students.csv",
    });
    setUploadCsvText("");
    setUploadFilename("");
    if (csvFileInputRef.current) {
      csvFileInputRef.current.value = "";
    }
    await roster.refetch();
    if (result.processedStudents > 0) {
      setRosterStep(2);
    }
    setAssignResult(null);
    setActionSuccessMessage(`Uploaded ${result.processedStudents} student(s) successfully.`);
  };

  const handleAddStudent = async () => {
    await addStudent.mutateAsync({
      firstName: manualFirstName.trim(),
      lastName: manualLastName.trim(),
      email: manualEmail.trim(),
    });
    setManualFirstName("");
    setManualLastName("");
    setManualEmail("");
    await roster.refetch();
    setAssignResult(null);
    setActionSuccessMessage("Student added successfully.");
  };

  const goNextStep = () => {
    setRosterStep((current) => (current === 3 ? current : ((current + 1) as 1 | 2 | 3)));
  };

  const goPrevStep = () => {
    setRosterStep((current) => (current === 1 ? current : ((current - 1) as 1 | 2 | 3)));
  };

  useEffect(() => {
    if (tab !== "roster") return;
    if (rosterStep === 2 && rosterStudents.length === 0) {
      setRosterStep(1);
    }
    if (rosterStep === 3 && selectedRosterIds.length === 0) {
      setRosterStep(2);
    }
  }, [tab, rosterStep, rosterStudents.length, selectedRosterIds.length]);

  useEffect(() => {
    setSelectedRosterIds((current) => current.filter((id) => eligibleRosterStudents.some((student) => student.id === id)));
  }, [eligibleRosterStudents]);

  useEffect(() => {
    if (!assignResult && !actionSuccessMessage && !purchaseResultMessage) return;
    const timeoutId = window.setTimeout(() => {
      setAssignResult(null);
      setActionSuccessMessage(null);
      setPurchaseResultMessage(null);
    }, 5000);
    return () => window.clearTimeout(timeoutId);
  }, [assignResult, actionSuccessMessage, purchaseResultMessage]);

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden rounded-3xl border border-blue-100 shadow-xl">
        <CardHeader className="space-y-4 border-b border-slate-100 bg-[linear-gradient(135deg,#f7fbff,#ffffff)] pb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#2366c9]">School Operations</p>
              <CardTitle className="mt-2 text-2xl font-black text-slate-900">{schoolName} command center</CardTitle>
              <p className="mt-2 text-sm text-slate-600">
                Manage licenses, roster, and seat distribution from one place.
              </p>
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
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${tab === entry.key ? "bg-[#2366c9] text-white shadow-md shadow-blue-200" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                >
                  {entry.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-2 text-xs font-medium text-blue-800">Secure school-only controls</div>
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-2 text-xs font-medium text-blue-800">Real-time Moodle + local sync</div>
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 px-3 py-2 text-xs font-medium text-blue-800">Built for seat planning at scale</div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-6 md:p-8">
          {tab === "overview" && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-blue-100 bg-blue-50/50 shadow-sm"><CardContent className="p-5"><p className="text-sm font-semibold text-blue-700">Purchased Seats</p><p className="mt-2 text-3xl font-black text-slate-900">{purchasedSeats}</p></CardContent></Card>
                <Card className="border-emerald-100 bg-emerald-50/50 shadow-sm"><CardContent className="p-5"><p className="text-sm font-semibold text-emerald-700">Assigned Seats</p><p className="mt-2 text-3xl font-black text-slate-900">{assignedSeats}</p></CardContent></Card>
                <Card className="border-violet-100 bg-violet-50/50 shadow-sm"><CardContent className="p-5"><p className="text-sm font-semibold text-violet-700">Active Courses</p><p className="mt-2 text-3xl font-black text-slate-900">{activeCourses}</p></CardContent></Card>
                <Card className="border-amber-100 bg-amber-50/50 shadow-sm"><CardContent className="p-5"><p className="text-sm font-semibold text-amber-700">Licenses</p><p className="mt-2 text-3xl font-black text-slate-900">{licenses.length}</p></CardContent></Card>
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
                  <CardContent className="grid gap-3">
                    <Button className="h-11 w-full justify-start border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100" variant="outline" onClick={() => setTab("purchase")}><BookOpen className="mr-2 h-4 w-4" /> Purchase bulk licenses</Button>
                    <Button className="h-11 w-full justify-start border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100" variant="outline" onClick={() => setTab("roster")}><Users className="mr-2 h-4 w-4" /> Manage student roster</Button>
                    <Button className="h-11 w-full justify-start border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100" variant="outline" onClick={() => usageReport.refetch()}><RefreshCw className="mr-2 h-4 w-4" /> Refresh usage report</Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between gap-3">
                  <CardTitle>Uploaded students and seat status</CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={() => roster.refetch()}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {roster.isLoading ? (
                    <p className="text-sm text-slate-500">Loading uploaded students...</p>
                  ) : rosterStudents.length === 0 ? (
                    <p className="text-sm text-slate-500">No students uploaded yet.</p>
                  ) : (
                    <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
                      {rosterStudents.map((student) => (
                        <div key={student.id} className="rounded-2xl border border-slate-200 p-4">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="truncate font-semibold text-slate-900">{student.studentName}</p>
                              <p className="truncate text-sm text-slate-500">{student.studentEmail}</p>
                            </div>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                              {student.assignments.length > 0 ? "Seat assigned" : "Not assigned"}
                            </span>
                          </div>
                          <div className="mt-3 space-y-2">
                            {student.assignments.length === 0 ? (
                              <p className="text-xs text-slate-500">No seat assignment yet.</p>
                            ) : student.assignments.map((assignment) => (
                              <div key={`${student.id}-${assignment.licenseId}-${assignment.assignedAt ?? "na"}`} className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-700">
                                <p><strong>{assignment.courseName}</strong> ({assignment.licenseId})</p>
                                <p>Assigned at: {assignment.assignedAt ? new Date(assignment.assignedAt).toLocaleString() : "Unknown"}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {tab === "purchase" && (
            <div className="max-w-2xl">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#2366c9]" /> Bulk License Purchase</CardTitle>
                  <p className="text-sm text-slate-600">
                    Buy seats in bulk for a course and instantly make them available for assignment.
                  </p>
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
                      setPurchaseResultMessage(`Successfully purchased ${safeBulkQuantity} seat(s) for ${selectedBulkCourse.title}.`);
                      setTab("overview");
                    }}
                  >
                    {bulkLicenses.isPending ? "Purchasing..." : "Purchase Bulk Licenses"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {tab === "roster" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">Roster workflow</p>
                  <p className="text-xs font-medium text-slate-500">Step {rosterStep} of 3</p>
                </div>
                <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-[#2366c9] transition-all"
                    style={{ width: `${(rosterStep / 3) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-slate-600">
                  {rosterStep === 1 && "Add students (manual or CSV upload)."}
                  {rosterStep === 2 && "Select students from uploaded roster."}
                  {rosterStep === 3 && "Choose course license and assign seats."}
                </p>
              </div>

              {rosterStep === 1 && (
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4 text-[#2366c9]" />
                      Add students
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4 rounded-2xl border border-slate-200 p-4">
                      <p className="font-semibold text-slate-900">Add one student</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="manual-first-name">First name</Label>
                          <Input id="manual-first-name" value={manualFirstName} onChange={(e) => setManualFirstName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="manual-last-name">Last name</Label>
                          <Input id="manual-last-name" value={manualLastName} onChange={(e) => setManualLastName(e.target.value)} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="manual-email">Email (required, valid format)</Label>
                        <Input id="manual-email" type="email" value={manualEmail} onChange={(e) => setManualEmail(e.target.value)} placeholder="student@school.edu" />
                      </div>
                      <Button
                        className="w-full bg-[#2366c9] text-white hover:bg-[#1a4fa0]"
                        disabled={addStudent.isPending || !hasValidManualStudent}
                        onClick={handleAddStudent}
                      >
                        {addStudent.isPending ? "Adding..." : "Add student"}
                      </Button>
                    </div>

                    <div className="space-y-4 rounded-2xl border border-slate-200 p-4">
                      <p className="font-semibold text-slate-900">Upload CSV</p>
                      <p className="text-sm leading-6 text-slate-600">
                        Columns: <strong>email</strong> (required), <strong>firstname</strong>, <strong>lastname</strong>.
                      </p>
                      <pre className="overflow-x-auto rounded-xl bg-slate-100 p-3 text-xs text-slate-800">{`email,firstname,lastname
amina@school.edu,Amina,Ali
omar@school.edu,Omar,Khan`}</pre>
                      <p className="text-xs text-slate-500">
                        Samples:{" "}
                        <a href="/samples/school-roster-valid.csv" download className="font-semibold text-[#2366c9] underline">valid</a>
                        {" · "}
                        <a href="/samples/school-roster-invalid.csv" download className="font-semibold text-[#2366c9] underline">invalid</a>
                      </p>
                      <input
                        ref={csvFileInputRef}
                        id="school-roster-csv"
                        type="file"
                        accept=".csv,text/csv"
                        onChange={handleCsvFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-center gap-2 border-dashed border-slate-300 bg-white hover:bg-slate-50"
                        onClick={() => csvFileInputRef.current?.click()}
                      >
                        <FileUp className="h-4 w-4 text-[#2366c9]" />
                        {uploadFilename ? "Change CSV file" : "Choose CSV file"}
                      </Button>
                      {uploadCsvText ? (
                        <p className="text-xs text-slate-500">
                          {uploadFilename || "students.csv"} — {Math.max(uploadCsvText.split(/\r?\n/).filter((line) => line.trim()).length - 1, 0)} student(s) ready
                        </p>
                      ) : null}
                      {uploadFileError ? <p className="text-xs font-medium text-red-600">{uploadFileError}</p> : null}
                      <Button
                        variant="outline"
                        className="w-full"
                        disabled={uploadStudents.isPending || !hasCsvReady}
                        onClick={handleUploadCsv}
                      >
                        {uploadStudents.isPending ? "Uploading..." : "Upload CSV"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {rosterStep === 2 && (
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between gap-3">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#2366c9]" />
                      Select students
                    </CardTitle>
                    <Button type="button" variant="outline" size="sm" onClick={() => roster.refetch()}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {roster.isLoading ? (
                      <p className="text-sm text-slate-500">Loading roster...</p>
                    ) : rosterStudents.length === 0 ? (
                      <p className="text-sm text-slate-500">No students found. Go back and add/upload students first.</p>
                    ) : eligibleRosterStudents.length === 0 ? (
                      <p className="text-sm text-slate-500">All roster students are already assigned for this selected course.</p>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                          <Checkbox checked={allSelected} onCheckedChange={(value) => toggleSelectAll(value === true)} id="select-all-students" />
                          <Label htmlFor="select-all-students" className="cursor-pointer text-sm font-medium text-slate-700">
                            Select all ({eligibleRosterStudents.length})
                          </Label>
                        </div>
                        <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
                          {eligibleRosterStudents.map((student) => {
                            const checked = selectedRosterIds.includes(student.id);
                            const inputId = `student-${student.id}`;
                            return (
                              <label
                                key={student.id}
                                htmlFor={inputId}
                                className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition ${checked ? "border-[#2366c9] bg-blue-50/50" : "border-slate-200 bg-white hover:bg-slate-50"}`}
                              >
                                <Checkbox
                                  id={inputId}
                                  checked={checked}
                                  onCheckedChange={(value) => toggleStudent(student.id, value === true)}
                                />
                                <div className="min-w-0 flex-1">
                                  <p className="truncate font-semibold text-slate-900">{student.studentName}</p>
                                  <p className="truncate text-sm text-slate-500">{student.studentEmail}</p>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}

              {rosterStep === 3 && (
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-[#2366c9]" />
                      Assign seats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {licenses.length === 0 ? (
                      <p className="text-sm text-slate-500">Purchase a course license first, then assign seats.</p>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label>Select purchased course</Label>
                          <select
                            value={assignLicenseId}
                            onChange={(event) => setAssignLicenseId(event.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm"
                          >
                            {licenses.map((license) => (
                              <option key={license.id} value={license.id}>
                                {license.courseName} — {license.assignedSeats}/{license.totalSeats} seats used
                              </option>
                            ))}
                          </select>
                        </div>
                        <p className="text-sm text-slate-600">
                          {selectedRosterIds.length} student(s) selected · {remainingSeats} seat(s) available
                        </p>
                        <Button
                          className="w-full bg-slate-900 text-white hover:bg-slate-800"
                          disabled={
                            assignSeats.isPending
                            || !selectedLicense
                            || selectedRosterIds.length === 0
                            || selectedRosterIds.length > remainingSeats
                          }
                          onClick={async () => {
                            if (!selectedLicense) return;
                            const result = await assignSeats.mutateAsync({
                              licenseId: selectedLicense.id,
                              rosterIds: selectedRosterIds,
                            });
                            setAssignResult({ assigned: result.assigned.length, failed: result.failed });
                            if (result.assigned.length > 0) {
                              setSelectedRosterIds([]);
                            }
                          }}
                        >
                          {assignSeats.isPending ? "Assigning..." : `Assign seats to selected students`}
                        </Button>
                        {selectedRosterIds.length > remainingSeats ? (
                          <p className="text-xs font-medium text-amber-700">
                            Selected students are more than available seats.
                          </p>
                        ) : null}
                      </>
                    )}
                  </CardContent>
                </Card>
              )}

              <div className="flex items-center justify-between gap-3">
                <Button variant="outline" onClick={goPrevStep} disabled={rosterStep === 1}>
                  Previous
                </Button>
                <Button
                  onClick={goNextStep}
                  disabled={
                    rosterStep === 3 ||
                    (rosterStep === 1 && !canProceedFromStepOne) ||
                    (rosterStep === 2 && !canProceedFromStepTwo)
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          )}
          {tab === "report" && (
            <div className="space-y-5">
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="space-y-4 p-5">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#2366c9]">School Reports</p>
                    <h3 className="mt-2 text-xl font-black text-slate-900">Usage and allocation insights</h3>
                    <p className="mt-1 text-sm text-slate-600">Switch between overview, license performance, and student-level allocation insights.</p>
                  </div>
                  <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-100 p-1.5">
                    <button
                      type="button"
                      onClick={() => setSchoolReportView("overview")}
                      className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${schoolReportView === "overview" ? "bg-white text-[#2366c9] shadow-sm" : "text-slate-700 hover:bg-slate-200"}`}
                    >
                      Overview
                    </button>
                    <button
                      type="button"
                      onClick={() => setSchoolReportView("licenses")}
                      className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${schoolReportView === "licenses" ? "bg-white text-[#2366c9] shadow-sm" : "text-slate-700 hover:bg-slate-200"}`}
                    >
                      License Performance
                    </button>
                    <button
                      type="button"
                      onClick={() => setSchoolReportView("students")}
                      className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${schoolReportView === "students" ? "bg-white text-[#2366c9] shadow-sm" : "text-slate-700 hover:bg-slate-200"}`}
                    >
                      Student Allocation
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <Label>Usage filter</Label>
                    <select
                      value={usageLicenseFilter}
                      onChange={(event) => setUsageLicenseFilter(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm"
                    >
                      <option value="all">All purchased licenses</option>
                      {(usage?.licenses ?? []).map((license) => (
                        <option key={license.licenseId} value={license.licenseId}>
                          {license.courseName} ({license.assignedSeats}/{license.totalSeats})
                        </option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>

              {schoolReportView === "overview" && (
                <>
                  <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-slate-200 shadow-sm"><CardContent className="p-5"><p className="text-sm text-slate-500">Total Licenses</p><p className="mt-2 text-3xl font-black text-slate-900">{usage?.totalLicenses ?? licenses.length}</p></CardContent></Card>
                <Card className="border-slate-200 shadow-sm"><CardContent className="p-5"><p className="text-sm text-slate-500">Utilization</p><p className="mt-2 text-3xl font-black text-slate-900">{usage?.utilizationRate ?? 0}%</p></CardContent></Card>
                <Card className="border-slate-200 shadow-sm"><CardContent className="p-5"><p className="text-sm text-slate-500">Used Seats</p><p className="mt-2 text-3xl font-black text-slate-900">{usage?.usedSeats ?? assignedSeats}</p></CardContent></Card>
                <Card className="border-slate-200 shadow-sm"><CardContent className="p-5"><p className="text-sm text-slate-500">Available Seats</p><p className="mt-2 text-3xl font-black text-slate-900">{usage?.availableSeats ?? Math.max(purchasedSeats - assignedSeats, 0)}</p></CardContent></Card>
              </div>

              <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle>License Utilization Chart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(usage?.licenses ?? []).length > 0 ? (
                      <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={usageChartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="assigned" stackId="a" radius={[6, 6, 0, 0]}>
                              {usageChartData.map((_, index) => (
                                <Cell key={`assigned-${index}`} fill={COURSE_COLORS[index % COURSE_COLORS.length]} />
                              ))}
                            </Bar>
                            <Bar dataKey="available" stackId="a" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">Usage metrics will appear after you create licenses.</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle>Used vs Available</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {usagePieData.reduce((sum, entry) => sum + entry.value, 0) > 0 ? (
                      <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={usagePieData} dataKey="value" nameKey="name" innerRadius={70} outerRadius={100} paddingAngle={4}>
                              {usagePieData.map((slice) => (
                                <Cell key={slice.name} fill={slice.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">No course usage data available yet.</p>
                    )}
                  </CardContent>
                </Card>
              </div>
                </>
              )}
              {schoolReportView === "licenses" && (usage?.licenses ?? []).length > 0 && (
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle>Per-license details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {(usage?.licenses ?? []).map((license, index) => (
                      <div key={license.licenseId} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-semibold text-slate-900">
                              <span
                                className="mr-2 inline-block h-2.5 w-2.5 rounded-full"
                                style={{ backgroundColor: COURSE_COLORS[index % COURSE_COLORS.length] }}
                              />
                              {license.courseName}
                            </p>
                            <p className="text-xs text-slate-500">{license.assignedSeats}/{license.totalSeats} assigned</p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setUsageLicenseFilter(license.licenseId);
                              setIsMetricsModalOpen(true);
                            }}
                          >
                            View metrics
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
              {schoolReportView === "licenses" && (usage?.licenses ?? []).length === 0 && (
                <Card className="border-slate-200 shadow-sm">
                  <CardContent className="p-5 text-sm text-slate-500">No license metrics available yet.</CardContent>
                </Card>
              )}
              {schoolReportView === "students" && (
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle>Student allocation report</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {studentUsageRows.filter((row) => usageLicenseFilter === "all" || row.licenseId === usageLicenseFilter).length > 0 ? (
                      <div className="max-h-[460px] space-y-2 overflow-y-auto pr-1">
                        {studentUsageRows
                          .filter((row) => usageLicenseFilter === "all" || row.licenseId === usageLicenseFilter)
                          .map((row) => (
                            <div key={`${row.studentId}-${row.licenseId}-${row.assignedAt ?? "na"}`} className="rounded-xl border border-slate-200 p-3">
                              <p className="font-semibold text-slate-900">{row.studentName}</p>
                              <p className="text-sm text-slate-500">{row.studentEmail}</p>
                              <p className="mt-1 text-xs text-slate-500">
                                {row.courseName} ({row.licenseId}) · Assigned: {row.assignedAt ? new Date(row.assignedAt).toLocaleString() : "Unknown"}
                              </p>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">No student assignment data available yet.</p>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {assignResult && (
            <div className={`rounded-2xl border p-4 text-sm ${assignResult.failed.length > 0 ? "border-amber-200 bg-amber-50 text-amber-900" : "border-emerald-200 bg-emerald-50 text-emerald-800"}`}>
              <div className="flex flex-wrap items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>{assignResult.assigned} seat(s) assigned successfully.</span>
                {assignResult.failed.length > 0 ? <span>{assignResult.failed.length} failed.</span> : null}
              </div>
              {assignResult.failed.length > 0 ? (
                <div className="mt-2 space-y-1 text-xs">
                  {assignResult.failed.slice(0, 5).map((entry) => (
                    <p key={`${entry.rosterId}-${entry.error}`}>Student #{entry.rosterId}: {entry.error}</p>
                  ))}
                </div>
              ) : null}
            </div>
          )}

          {(actionSuccessMessage || purchaseResultMessage) && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
              <div className="flex flex-wrap items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>{purchaseResultMessage || actionSuccessMessage}</span>
              </div>
            </div>
          )}

          {(bulkLicenses.isError || uploadStudents.isError || addStudent.isError || assignSeats.isError) && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {bulkLicenses.error instanceof Error && bulkLicenses.error.message}
              {uploadStudents.error instanceof Error && uploadStudents.error.message}
              {addStudent.error instanceof Error && addStudent.error.message}
              {assignSeats.error instanceof Error && assignSeats.error.message}
            </div>
          )}
        </CardContent>
      </Card>

      {isMetricsModalOpen && usageLicenseFilter !== "all" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-slate-900">License metrics</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsMetricsModalOpen(false)}
              >
                Close
              </Button>
            </div>
            {selectedMetrics.data ? (
              <div className="mb-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">{selectedMetrics.data.courseName}</p>
                <p className="mt-1">
                  Active users: {selectedMetrics.data.activeUsers} · Seats used: {selectedMetrics.data.assignedSeats}/{selectedMetrics.data.totalSeats}
                </p>
              </div>
            ) : null}
            <div className="space-y-3">
              {selectedLicenseStudents.map((student) => {
                const assignment = student.assignments.find((entry) => entry.licenseId === usageLicenseFilter);
                return (
                  <div key={`${usageLicenseFilter}-${student.id}`} className="rounded-xl border border-slate-200 p-3">
                    <p className="font-semibold text-slate-900">{student.studentName}</p>
                    <p className="text-sm text-slate-500">{student.studentEmail}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Assigned at: {assignment?.assignedAt ? new Date(assignment.assignedAt).toLocaleString() : "Unknown"}
                    </p>
                  </div>
                );
              })}
              {selectedLicenseStudents.length === 0 ? (
                <p className="text-sm text-slate-500">No students assigned to this license yet.</p>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SchoolOperationsPanel;
