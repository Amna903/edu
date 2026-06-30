/**
 * 4.21 / 4.20 — Admin Job Queue + Dead Letter Queue Panel
 * Shows background job status and lets admins replay failed DLQ jobs.
 */
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RefreshCw, RotateCcw, AlertTriangle, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Job {
  id: string;
  type: string;
  status: string;
  attempts: number;
  maxAttempts: number;
  runAt: string;
  doneAt: string | null;
  errorMsg: string | null;
  createdAt: string;
}

interface DlqJob {
  id: string;
  type: string;
  attempts: number;
  lastError: string;
  originalId: string;
  createdAt: string;
}

interface JobSummary {
  pending?: number;
  running?: number;
  done?: number;
  failed?: number;
}

function statusIcon(status: string) {
  switch (status) {
    case "done":     return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    case "running":  return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />;
    case "failed":   return <XCircle className="h-4 w-4 text-red-500" />;
    default:         return <Clock className="h-4 w-4 text-slate-400" />;
  }
}

export function JobQueuePanel() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("all");

  const jobsQuery = useQuery<{ jobs: Job[]; summary: JobSummary }>({
    queryKey: ["/api/admin/jobs", statusFilter],
    queryFn: async () => {
      const url = statusFilter === "all" ? "/api/admin/jobs" : `/api/admin/jobs?status=${statusFilter}`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load jobs");
      return res.json();
    },
    refetchInterval: 15_000,
  });

  const dlqQuery = useQuery<{ jobs: DlqJob[] }>({
    queryKey: ["/api/admin/dlq"],
    queryFn: async () => {
      const res = await fetch("/api/admin/dlq", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load DLQ");
      return res.json();
    },
  });

  const replayMutation = useMutation({
    mutationFn: async (dlqId: string) => {
      const res = await fetch(`/api/admin/dlq/${dlqId}/replay`, {
        method: "POST",
        credentials: "include",
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Replay failed");
      return body;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dlq"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/jobs"] });
    },
  });

  const summary = jobsQuery.data?.summary ?? {};

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {(["pending", "running", "done", "failed"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(statusFilter === s ? "all" : s)}
            className={`rounded-2xl border p-4 text-left transition ${
              statusFilter === s ? "border-blue-500 bg-blue-50" : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <p className="text-xs uppercase tracking-widest text-slate-400">{s}</p>
            <p className="mt-1 text-2xl font-black text-slate-900">{summary[s] ?? 0}</p>
          </button>
        ))}
      </div>

      {/* Job list */}
      <Card className="border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">
            Background Jobs
            {statusFilter !== "all" && (
              <span className="ml-2 text-xs font-normal text-blue-600">({statusFilter})</span>
            )}
          </CardTitle>
          <Button
            variant="ghost" size="sm"
            onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/admin/jobs"] })}
          >
            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {jobsQuery.isLoading ? (
            <p className="text-sm text-slate-500">Loading...</p>
          ) : jobsQuery.data?.jobs.length === 0 ? (
            <p className="text-sm text-slate-500">No jobs found.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">Type</th>
                    <th className="px-3 py-2 text-left font-semibold">Status</th>
                    <th className="px-3 py-2 text-left font-semibold">Attempts</th>
                    <th className="px-3 py-2 text-left font-semibold">Run At</th>
                    <th className="px-3 py-2 text-left font-semibold">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {jobsQuery.data?.jobs.map((job) => (
                    <tr key={job.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-3 py-2 font-mono">{job.type}</td>
                      <td className="px-3 py-2">
                        <span className="inline-flex items-center gap-1">
                          {statusIcon(job.status)}
                          {job.status}
                        </span>
                      </td>
                      <td className="px-3 py-2">{job.attempts}/{job.maxAttempts}</td>
                      <td className="px-3 py-2 text-slate-500">
                        {new Date(job.runAt).toLocaleString()}
                      </td>
                      <td className="px-3 py-2 text-red-600 max-w-[200px] truncate">
                        {job.errorMsg || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dead Letter Queue */}
      <Card className="border-red-200 bg-red-50/30">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            Dead Letter Queue
            {dlqQuery.data && dlqQuery.data.jobs.length > 0 && (
              <span className="ml-1 rounded-full bg-red-500 text-white text-xs px-2 py-0.5">
                {dlqQuery.data.jobs.length}
              </span>
            )}
          </CardTitle>
          <Button
            variant="ghost" size="sm"
            onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/admin/dlq"] })}
          >
            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-slate-500 mb-3">
            Jobs that exhausted all retry attempts. Click "Replay" to re-enqueue them.
          </p>
          {dlqQuery.isLoading ? (
            <p className="text-sm text-slate-500">Loading...</p>
          ) : dlqQuery.data?.jobs.length === 0 ? (
            <div className="flex items-center gap-2 text-emerald-700 text-sm">
              <CheckCircle2 className="h-4 w-4" /> DLQ is empty — all jobs succeeded.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-red-200">
              <table className="w-full text-xs">
                <thead className="bg-red-50 border-b border-red-200">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">Type</th>
                    <th className="px-3 py-2 text-left font-semibold">Attempts</th>
                    <th className="px-3 py-2 text-left font-semibold">Last Error</th>
                    <th className="px-3 py-2 text-left font-semibold">Failed At</th>
                    <th className="px-3 py-2 text-left font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dlqQuery.data?.jobs.map((job) => (
                    <tr key={job.id} className="border-b border-red-100 hover:bg-red-50/50">
                      <td className="px-3 py-2 font-mono">{job.type}</td>
                      <td className="px-3 py-2">{job.attempts}</td>
                      <td className="px-3 py-2 text-red-700 max-w-[240px] truncate">
                        {job.lastError}
                      </td>
                      <td className="px-3 py-2 text-slate-500">
                        {new Date(job.createdAt).toLocaleString()}
                      </td>
                      <td className="px-3 py-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 px-2 text-xs border-red-300 text-red-700 hover:bg-red-100"
                          disabled={replayMutation.isPending}
                          onClick={() => replayMutation.mutate(job.id)}
                        >
                          <RotateCcw className="h-3 w-3 mr-1" />
                          Replay
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {replayMutation.isSuccess && (
            <p className="mt-2 text-xs text-emerald-700">Job re-enqueued successfully.</p>
          )}
          {replayMutation.isError && (
            <p className="mt-2 text-xs text-red-700">
              {replayMutation.error instanceof Error ? replayMutation.error.message : "Replay failed"}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
