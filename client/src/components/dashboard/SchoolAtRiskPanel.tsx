import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, History, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AtRiskStudent = {
  id: number;
  name: string;
  subject: string;
  risk: "High" | "Medium" | "Low";
  reason: string;
  lastReview: string;
};

const baseStudents: AtRiskStudent[] = [
  { id: 1, name: "Amina Rahman", subject: "Chemistry", risk: "High", reason: "Recent quiz drop and missed retrieval sessions", lastReview: "2 days ago" },
  { id: 2, name: "Omar Hassan", subject: "Mathematics", risk: "Medium", reason: "Homework completion below 60%", lastReview: "5 days ago" },
  { id: 3, name: "Sara Ali", subject: "English", risk: "Low", reason: "Slow but improving progress trend", lastReview: "Today" },
  { id: 4, name: "Yusuf Khan", subject: "Physics", risk: "High", reason: "Three consecutive absence flags", lastReview: "Yesterday" },
];

export function SchoolAtRiskPanel({ schoolName }: { schoolName: string }) {
  const [reviewed, setReviewed] = useState<number[]>([]);

  const sortedStudents = useMemo(
    () => [...baseStudents].sort((left, right) => (left.risk === right.risk ? left.name.localeCompare(right.name) : left.risk === "High" ? -1 : right.risk === "High" ? 1 : left.risk === "Medium" ? -1 : 1)),
    [],
  );

  return (
    <Card className="border-blue-100 shadow-sm">
      <CardHeader className="space-y-2 border-b border-slate-100 bg-[linear-gradient(135deg,#f8fbff,#ffffff)]">
        <div className="flex items-center gap-3">
          <ShieldAlert className="h-5 w-5 text-[#2366c9]" />
          <CardTitle>At-Risk Flag Section</CardTitle>
        </div>
        <p className="text-sm leading-7 text-slate-600">
          School admin view only. The backend should enforce role access and return 403 to non-school_admin users.
        </p>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Predictive alerts before they become exam failures</p>
              <p className="mt-1 leading-6">
                {schoolName} can review at-risk students, mark interventions as reviewed, and keep a visual history of follow-up actions.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {sortedStudents.map((student) => {
            const isReviewed = reviewed.includes(student.id);
            return (
              <div key={student.id} className={`rounded-3xl border p-4 transition ${isReviewed ? "border-emerald-200 bg-emerald-50/70" : "border-slate-200 bg-white"}`}>
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-900">{student.name}</p>
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-[0.18em] ${student.risk === "High" ? "bg-red-100 text-red-700" : student.risk === "Medium" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
                        {student.risk}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">{student.subject}</p>
                    <p className="text-sm text-slate-700">{student.reason}</p>
                  </div>
                  <div className="flex flex-col gap-2 md:items-end">
                    <p className="text-xs text-slate-400">Last reviewed {student.lastReview}</p>
                    <Button
                      type="button"
                      variant={isReviewed ? "outline" : "default"}
                      className={isReviewed ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50" : "bg-[#2366c9] text-white hover:bg-[#1a4fa0]"}
                      onClick={() => setReviewed((current) => (current.includes(student.id) ? current.filter((id) => id !== student.id) : [...current, student.id]))}
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      {isReviewed ? "Reviewed" : "Mark as Reviewed"}
                    </Button>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
                  <History className="h-4 w-4 text-[#2366c9]" />
                  History log and intervention timeline would appear here once backend persistence is connected.
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
