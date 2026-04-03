import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface SchoolAnalyticsClientProps {
  schoolName: string;
  licenses: Array<{
    courseId: number;
    courseName: string;
    assignedSeats: number;
    totalSeats: number;
  }>;
}

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function SchoolAnalyticsClient({ schoolName, licenses }: SchoolAnalyticsClientProps) {
  const summary = useMemo(() => {
    const totalSeats = licenses.reduce((sum, license) => sum + license.totalSeats, 0);
    const assignedSeats = licenses.reduce((sum, license) => sum + license.assignedSeats, 0);
    const availableSeats = licenses.reduce((sum, license) => sum + Math.max(license.totalSeats - license.assignedSeats, 0), 0);

    return {
      totalSeats,
      assignedSeats,
      availableSeats,
      utilization: totalSeats > 0 ? Math.round((assignedSeats / totalSeats) * 100) : 0,
    };
  }, [licenses]);

  const barData = licenses.map((license) => ({
    name: license.courseName || `Course ${license.courseId}`,
    assigned: license.assignedSeats,
    remaining: Math.max(license.totalSeats - license.assignedSeats, 0),
  }));

  const pieData = [
    { name: "Assigned Seats", value: summary.assignedSeats },
    { name: "Available Seats", value: summary.availableSeats },
  ];

  const generatePDF = async () => {
    const doc = new jsPDF() as any;
    const date = new Date().toLocaleDateString();

    doc.setFillColor(30, 41, 59);
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("ANALYTICS REPORT", 14, 25);

    doc.setFontSize(10);
    doc.text(`INSTITUTION: ${schoolName.toUpperCase()}`, 14, 33);
    doc.text(`DATE: ${date}`, 170, 33);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(16);
    doc.text("Key Performance Indicators", 14, 55);

    autoTable(doc, {
      startY: 60,
      head: [["Indicator", "Status", "Count"]],
      body: [
        ["Total License Portfolio", "Active", licenses.length.toString()],
        ["Total Capacity", "Allocated", summary.totalSeats.toString()],
        ["Current Enrollment", "Active", summary.assignedSeats.toString()],
        ["Seat Utilization", summary.utilization >= 100 ? "Full" : "Available", `${summary.utilization}%`],
      ],
      theme: "striped",
      headStyles: { fillColor: [79, 70, 229] },
    });

    autoTable(doc, {
      startY: (doc as any).lastAutoTable.finalY + 20,
      head: [["Course Name", "Total Seats", "Assigned", "Remaining", "Utilization"]],
      body: licenses.map((license) => [
        license.courseName || `CID-${license.courseId}`,
        license.totalSeats.toString(),
        license.assignedSeats.toString(),
        Math.max(license.totalSeats - license.assignedSeats, 0).toString(),
        `${license.totalSeats > 0 ? Math.round((license.assignedSeats / license.totalSeats) * 100) : 0}%`,
      ]),
      theme: "grid",
      headStyles: { fillColor: [30, 41, 59] },
    });

    doc.save(`${schoolName}_Analytics_Report_${new Date().getTime()}.pdf`);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-end">
        <button
          onClick={generatePDF}
          className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-xl shadow-slate-200 transition-all hover:scale-105"
        >
          <span>📥</span> Download Detailed Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="min-h-[400px] overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
          <h3 className="mb-8 flex items-center gap-2 text-lg font-bold text-slate-800">
            <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
            Seat Allocation Overview
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} tick={{ fill: "#94a3b8" }} />
                <YAxis axisLine={false} tickLine={false} fontSize={10} tick={{ fill: "#94a3b8" }} />
                <Tooltip
                  contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                  cursor={{ fill: "#f8fafc" }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px", fontSize: "10px", fontWeight: "bold" }} />
                <Bar dataKey="assigned" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Assigned Seats" />
                <Bar dataKey="remaining" fill="#e2e8f0" radius={[4, 4, 0, 0]} name="Available Seats" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="min-h-[400px] overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-sm">
          <h3 className="mb-8 flex items-center gap-2 text-lg font-bold text-slate-800">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            Overall Utilization Rate
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={80} outerRadius={100} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-indigo-200">
          <div>
            <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-indigo-500">Assigned Seats</p>
            <h4 className="mb-4 text-lg font-bold text-slate-900">Active Enrollments</h4>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-black text-slate-900">{summary.assignedSeats}</p>
              <p className="text-xs font-bold uppercase text-slate-400">Assigned</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-xl">🎯</div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-indigo-200">
          <div>
            <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-indigo-500">Available Seats</p>
            <h4 className="mb-4 text-lg font-bold text-slate-900">Remaining Capacity</h4>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-black text-slate-900">{summary.availableSeats}</p>
              <p className="text-xs font-bold uppercase text-slate-400">Available</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-xl">📊</div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-indigo-200">
          <div>
            <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-indigo-500">Overall Utilization Rate</p>
            <h4 className="mb-4 text-lg font-bold text-slate-900">Portfolio Utilization</h4>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-black text-slate-900">{summary.utilization}%</p>
              <p className="text-xs font-bold uppercase text-slate-400">Usage</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-xl">📈</div>
          </div>
        </div>
      </div>
    </div>
  );
}
