import { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { useAdminFormSubmissions, useAdminForms } from "@/hooks/use-forms";
import { useAuthUser } from "@/hooks/use-auth";

function formatValue(value: unknown) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return JSON.stringify(value);
}

function formatSubmittedAt(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function AdminFormResponses() {
  const [match, params] = useRoute("/dashboard/admin/forms/:identifier/responses");
  const identifier = params?.identifier;
  const { data: authUser, isLoading: authLoading } = useAuthUser();
  const formsQuery = useAdminForms(true);
  const submissionsQuery = useAdminFormSubmissions(identifier, Boolean(identifier));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
  }, [identifier]);

  const form = useMemo(() => {
    return formsQuery.data?.forms.find((item) => item.publicId === identifier || item.kind === identifier) ?? null;
  }, [formsQuery.data, identifier]);

  const submissions = submissionsQuery.data?.submissions ?? [];
  const selectedSubmission = submissions[currentIndex] ?? null;
  const fullFormUrl = form?.publicUrl ? `${window.location.origin}${form.publicUrl}` : "";

  useEffect(() => {
    if (!submissions.length) return;
    setCurrentIndex((current) => (current >= submissions.length ? submissions.length - 1 : current));
  }, [submissions.length]);

  const handleCopyUrl = async () => {
    if (!fullFormUrl) return;
    try {
      await navigator.clipboard.writeText(fullFormUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const handleExportCsv = () => {
    if (!identifier) return;
    window.open(`/api/admin/forms/${encodeURIComponent(identifier)}/export.csv`, "_blank", "noopener,noreferrer");
  };

  if (!match) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">Response viewer unavailable</h1>
          <p className="mt-4 text-slate-600">The response page could not be loaded. Please return to the admin forms page.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-12 md:py-16">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50 shadow-sm">
            <div className="grid gap-5 p-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-primary">Form Responses</p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">{form?.title || "Form responses"}</h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-600">Review each submission one at a time, copy the live public form URL, and export the full response set as a CSV.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="outline" onClick={handleCopyUrl}>
                  {copied ? "Copied" : "Copy form URL"}
                </Button>
                <Button type="button" variant="outline" onClick={handleExportCsv}>
                  Export CSV
                </Button>
                {identifier ? (
                  <Button type="button" variant="outline" onClick={() => window.open(`/api/admin/forms/${encodeURIComponent(identifier)}/files.zip`, "_blank", "noopener,noreferrer")}>
                    Download all files (ZIP)
                  </Button>
                ) : null}
                <Link href="/dashboard/admin/forms">
                  <Button variant="secondary">Back to admin forms</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-700">Public URL</p>
                <p className="break-all rounded-2xl bg-slate-50 px-3 py-2 text-sm font-medium text-slate-900">{fullFormUrl || "Loading full form URL…"}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={() => setCurrentIndex((value) => Math.max(value - 1, 0))} disabled={!submissions.length || currentIndex === 0}>
                  Previous
                </Button>
                <Button type="button" variant="outline" onClick={() => setCurrentIndex((value) => Math.min(value + 1, submissions.length - 1))} disabled={!submissions.length || currentIndex >= submissions.length - 1}>
                  Next
                </Button>
              </div>
            </div>
          </div>

          {authLoading ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">Checking your admin access…</div>
          ) : authUser?.role !== "admin" ? (
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">Admin access is required to view these responses.</div>
          ) : submissionsQuery.isLoading ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">Loading submissions…</div>
          ) : submissionsQuery.isError ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-900">{submissionsQuery.error.message}</div>
          ) : !submissions.length ? (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">No submissions have been received for this form yet.</div>
          ) : selectedSubmission ? (
            <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50 p-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-primary">Response {currentIndex + 1} of {submissions.length}</p>
                    <h2 className="mt-2 text-2xl font-bold text-slate-900">{selectedSubmission.responderName || selectedSubmission.responderEmail || selectedSubmission.publicSubmissionId}</h2>
                    <p className="mt-1 text-sm text-slate-500">Submitted {formatSubmittedAt(selectedSubmission.submittedAt)}</p>
                  </div>
                  <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-600 shadow-sm">{selectedSubmission.status}</div>
                </div>
              </div>

              <div className="space-y-4 p-6">
                {Object.entries(selectedSubmission.payload).map(([key, value]) => (
                  <div key={key} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-800">{key}</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{formatValue(value)}</p>
                  </div>
                ))}

                {selectedSubmission.files.length ? (
                  <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-800">Files</p>
                    <div className="mt-3 space-y-3">
                      {selectedSubmission.files.map((file, fileIndex) => (
                        <div key={`${file.fieldName}-${file.originalName}`} className="rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-700">
                          <p className="font-semibold">{file.originalName}</p>
                          <p className="mt-1">{file.mimeType} · {(file.size / 1024).toFixed(1)} KB</p>
                          {identifier ? (
                            <a href={`/api/admin/forms/${encodeURIComponent(identifier)}/submissions/${encodeURIComponent(selectedSubmission.publicSubmissionId)}/files/${fileIndex}`} className="mt-2 inline-block font-semibold text-brand-primary hover:underline">
                              Download file
                            </a>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
