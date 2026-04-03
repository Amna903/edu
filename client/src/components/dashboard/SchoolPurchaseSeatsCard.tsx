import { useEffect, useMemo, useState } from "react";
import { useSchoolSeatPurchase } from "@/hooks/use-dashboard";
import { usePrograms } from "@/hooks/use-programs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SchoolPurchaseSeatsCard() {
  const { data: courses = [] } = usePrograms();
  const purchaseSeats = useSchoolSeatPurchase();
  const [courseId, setCourseId] = useState<string>("");
  const [seats, setSeats] = useState("10");
  const [message, setMessage] = useState<{ success: boolean; text: string } | null>(null);

  useEffect(() => {
    if (!courseId && courses.length > 0) {
      setCourseId(String(courses[0].id));
    }
  }, [courseId, courses]);

  const selectedCourse = useMemo(
    () => courses.find((course) => String(course.id) === courseId) ?? null,
    [courses, courseId],
  );

  const seatCount = Math.max(1, Number.parseInt(seats, 10) || 0);
  const unitPrice = selectedCourse?.price ?? 0;
  const totalAmount = unitPrice * seatCount;

  return (
    <Card className="border-blue-100 shadow-xl shadow-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-black text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm text-white">💳</span>
          Purchase Seats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <form
          className="space-y-5"
          onSubmit={async (event) => {
            event.preventDefault();
            setMessage(null);

            if (!selectedCourse) {
              setMessage({ success: false, text: "Select a course before purchasing seats." });
              return;
            }

            if (selectedCourse.price == null || Number.isNaN(selectedCourse.price)) {
              setMessage({ success: false, text: "This course does not have a price configured yet." });
              return;
            }

            try {
              await purchaseSeats.mutateAsync({ courseId: selectedCourse.id, seats: seatCount });

              setMessage({
                success: true,
                text: `Purchased ${seatCount} seat${seatCount === 1 ? "" : "s"} for ${selectedCourse.title}.`,
              });
              setSeats("10");
            } catch (error) {
              setMessage({
                success: false,
                text: error instanceof Error ? error.message : "Seat purchase failed.",
              });
            }
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="courseId" className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Select Course
            </Label>
            <select
              id="courseId"
              value={courseId}
              onChange={(event) => setCourseId(event.target.value)}
              className="w-full appearance-none rounded-2xl border-none bg-slate-50 p-4 text-sm font-medium transition-all focus:ring-2 focus:ring-blue-500"
            >
              {courses.length === 0 ? (
                <option value="">Loading courses...</option>
              ) : (
                courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seats" className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Number of Seats
            </Label>
            <Input
              id="seats"
              type="number"
              min={1}
              value={seats}
              onChange={(event) => setSeats(event.target.value)}
              className="rounded-2xl border-none bg-slate-50 p-4 text-sm font-medium focus-visible:ring-2 focus-visible:ring-blue-500"
            />
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Estimated Total</p>
            <p className="mt-2 text-2xl font-black text-slate-900">
              ${((Number.isFinite(totalAmount) ? totalAmount : 0) / 100).toFixed(2)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {selectedCourse ? selectedCourse.title : "Choose a course to calculate pricing."}
            </p>
          </div>

          {message && (
            <div className={`rounded-xl p-4 text-xs font-bold ${message.success ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
              {message.text}
            </div>
          )}

          <Button
            type="submit"
            disabled={purchaseSeats.isPending || !selectedCourse}
            className="w-full rounded-2xl bg-blue-600 py-4 font-black text-white shadow-lg shadow-blue-100 transition-all hover:bg-blue-700 hover:scale-[1.01] active:scale-95 disabled:opacity-50"
          >
            {purchaseSeats.isPending ? "Processing..." : "Purchase Licenses"}
          </Button>

          <p className="px-4 text-center text-[10px] font-medium leading-relaxed text-slate-400">
            Bulk purchases provide discounted rates for institutions and organizations.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}