import { FormEvent, useEffect, useMemo, useState } from "react";
import { useAuthUser } from "@/hooks/use-auth";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Layout } from "@/components/Layout";
import { useAdminFormSubmissions, useAdminForms, useCreateAdminForm, type CreateFormFieldInput, type CreateFormInput } from "@/hooks/use-forms";

const FIELD_TYPES = ["text", "email", "textarea", "select", "file", "number", "tel", "date"] as const;

function formatSubmittedAt(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function formIdentifier(form: { kind?: string | null; publicId: string }) {
  return form.kind && form.kind !== "custom" ? form.kind : form.publicId;
}

type FieldType = (typeof FIELD_TYPES)[number];

function buildEmptyField(index: number): CreateFormFieldInput {
  return {
    label: "",
    name: `field_${index}`,
    type: "text",
    required: false,
    placeholder: "",
    helpText: "",
    options: [],
    sortOrder: index,
  };
}

function renderFieldInput(index: number, field: CreateFormFieldInput, onChange: (field: CreateFormFieldInput) => void, onRemove: () => void) {
  return (
    <div key={index} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="grid flex-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={`label-${index}`}>Label</Label>
            <Input
              id={`label-${index}`}
              value={field.label}
              onChange={(event) => onChange({ ...field, label: event.target.value })}
              placeholder="Field label"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`name-${index}`}>Field name</Label>
            <Input
              id={`name-${index}`}
              value={field.name}
              onChange={(event) => onChange({ ...field, name: event.target.value })}
              placeholder="formFieldKey"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`type-${index}`}>Type</Label>
            <select
              id={`type-${index}`}
              value={field.type}
              onChange={(event) => onChange({ ...field, type: event.target.value as FieldType })}
              className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700"
            >
              {FIELD_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`required-${index}`}>Required</Label>
            <select
              id={`required-${index}`}
              value={field.required ? "yes" : "no"}
              onChange={(event) => onChange({ ...field, required: event.target.value === "yes" })}
              className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" onClick={onRemove} className="text-sm">
            Remove field
          </Button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`placeholder-${index}`}>Placeholder</Label>
          <Input
            id={`placeholder-${index}`}
            value={field.placeholder ?? ""}
            onChange={(event) => onChange({ ...field, placeholder: event.target.value })}
            placeholder="Optional placeholder"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`helpText-${index}`}>Help text</Label>
          <Input
            id={`helpText-${index}`}
            value={field.helpText ?? ""}
            onChange={(event) => onChange({ ...field, helpText: event.target.value })}
            placeholder="Optional helper text"
          />
        </div>
      </div>

      {field.type === "select" ? (
        <div className="mt-4 space-y-2">
          <Label htmlFor={`options-${index}`}>Options</Label>
          <Textarea
            id={`options-${index}`}
            value={field.options?.join("\n") ?? ""}
            onChange={(event) => onChange({ ...field, options: event.target.value.split(/\r?\n/).map((option) => option.trim()).filter(Boolean) })}
            rows={4}
            placeholder="Enter one option per line"
          />
        </div>
      ) : null}
    </div>
  );
}

export default function AdminForms() {
  const { data: authUser, isLoading: authLoading } = useAuthUser();
  const adminForms = useAdminForms(true);
  const createForm = useCreateAdminForm();
  const [selectedIdentifier, setSelectedIdentifier] = useState<string | null>(null);
  const generalEnquiryForm = useMemo(() => {
    return adminForms.data?.forms.find((form) => form.kind === "general-enquiry" || form.publicId === "general-enquiry") ?? null;
  }, [adminForms.data]);
  const nonSystemForms = useMemo(() => {
    return adminForms.data?.forms.filter((form) => form.kind !== "general-enquiry") ?? [];
  }, [adminForms.data]);
  const selectedForm = useMemo(() => {
    return adminForms.data?.forms.find((form) => formIdentifier(form) === selectedIdentifier) ?? null;
  }, [adminForms.data, selectedIdentifier]);

  useEffect(() => {
    if (!adminForms.data || selectedIdentifier) {
      return;
    }

    const defaultIdentifier = generalEnquiryForm?.kind || generalEnquiryForm?.publicId;
    if (defaultIdentifier) {
      setSelectedIdentifier(defaultIdentifier);
    }
  }, [adminForms.data, generalEnquiryForm, selectedIdentifier]);

  const openResponsesInNewTab = (form: { kind?: string | null; publicId: string }) => {
    const identifier = formIdentifier(form);
    window.open(`/dashboard/admin/forms/${encodeURIComponent(identifier)}/responses`, "_blank", "noopener,noreferrer");
  };
  const submissionsQuery = useAdminFormSubmissions(selectedIdentifier, Boolean(selectedIdentifier));
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formKind, setFormKind] = useState("");
  const [fields, setFields] = useState<CreateFormFieldInput[]>([buildEmptyField(0)]);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const addField = () => {
    setFields((current) => [...current, buildEmptyField(current.length)]);
  };

  const updateField = (index: number, field: CreateFormFieldInput) => {
    setFields((current) => current.map((existing, idx) => (idx === index ? field : existing)));
  };

  const removeField = (index: number) => {
    setFields((current) => current.filter((_, idx) => idx !== index));
  };

  const handleCreateForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    try {
      const input: CreateFormInput = {
        title: formTitle,
        description: formDescription || null,
        kind: formKind || undefined,
        fields: fields.map((field, index) => ({
          ...field,
          sortOrder: index,
        })),
      };
      const created = await createForm.mutateAsync(input);
      setFormTitle("");
      setFormDescription("");
      setFormKind("");
      setFields([buildEmptyField(0)]);
      setMessage({ type: "success", text: `Created form ${created.title}. Public URL: ${created.publicUrl}` });
    } catch (error) {
      console.error("Create form failed", error);
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Failed to create form" });
    }
  };

  return (
    <Layout>
      <div className="container-custom py-12 md:py-16">
        <div className="mb-6 overflow-hidden rounded-[30px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50 shadow-sm">
          <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-brand-primary">
                Admin Forms
              </span>
              <div className="space-y-3">
                <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">Form Studio</h1>
                <p className="max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
                  Build public forms, share them with users, and monitor every response in one clean admin workspace.
                </p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">System form</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{generalEnquiryForm ? "General Enquiry" : "—"}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Custom forms</p>
                <p className="mt-1 text-lg font-bold text-slate-900">{nonSystemForms.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
          <section className="space-y-6">
            <Card className="overflow-hidden border-slate-200 shadow-sm">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-5">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>Create a new form</CardTitle>
                  <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">Builder</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {message ? (
                  <div className={`rounded-3xl border p-4 ${message.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-red-200 bg-red-50 text-red-900"}`}>
                    {message.text}
                  </div>
                ) : null}

                {authLoading ? (
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">Checking your admin access…</div>
                ) : authUser?.role !== "admin" ? (
                  <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                    You need an admin account to create and manage forms. Sign in as an administrator and try again.
                  </div>
                ) : (
                <form className="space-y-6" onSubmit={handleCreateForm}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="new-form-title">Form title</Label>
                      <Input
                        id="new-form-title"
                        value={formTitle}
                        onChange={(event) => setFormTitle(event.target.value)}
                        placeholder="Teacher application form"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-form-kind">Public identifier</Label>
                      <Input
                        id="new-form-kind"
                        value={formKind}
                        onChange={(event) => setFormKind(event.target.value)}
                        placeholder="custom-form-name (optional)"
                      />
                      <p className="text-xs text-slate-500">Leave blank to generate a random public ID. Use a custom identifier for friendlier URLs.</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-form-description">Description</Label>
                    <Textarea
                      id="new-form-description"
                      value={formDescription}
                      onChange={(event) => setFormDescription(event.target.value)}
                      rows={3}
                      placeholder="Describe what this form is for."
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Form fields</p>
                        <p className="text-xs text-slate-500">Add one or more input blocks for the public form.</p>
                      </div>
                      <Button type="button" variant="secondary" onClick={addField}>Add field</Button>
                    </div>
                    <div className="space-y-4">
                      {fields.map((field, index) => renderFieldInput(index, field, (updated) => updateField(index, updated), () => removeField(index)))}
                    </div>
                  </div>

                  <div className="space-y-3">
                  {createForm.isError ? (
                    <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
                      <strong>Error:</strong> {createForm.error?.message || "Failed to create form."}
                    </div>
                  ) : null}
                  <Button
                    type="submit"
                    className="bg-brand-primary text-white hover:bg-brand-primary-dark"
                    disabled={createForm.isPending}
                  >
                    {createForm.isPending ? "Creating form..." : "Create form"}
                  </Button>
                </div>
              </form>
                )}
              </CardContent>
            </Card>
          </section>

          <aside className="space-y-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-100">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>Existing forms</CardTitle>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{(generalEnquiryForm ? 1 : 0) + nonSystemForms.length} total</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {authLoading ? (
                  <p className="text-sm text-slate-600">Checking access…</p>
                ) : authUser?.role !== "admin" ? (
                  <p className="text-sm text-amber-700">Admin access is required to view forms.</p>
                ) : adminForms.isLoading ? (
                  <p className="text-sm text-slate-600">Loading forms…</p>
                ) : adminForms.isError ? (
                  <p className="text-sm text-red-600">{adminForms.error.message}</p>
                ) : nonSystemForms.length || generalEnquiryForm ? (
                  <div className="space-y-3">
                    {generalEnquiryForm ? (
                      <div
                        key={generalEnquiryForm.id}
                        className={`rounded-[24px] border p-4 shadow-sm transition ${selectedIdentifier === generalEnquiryForm.publicId || selectedIdentifier === generalEnquiryForm.kind ? "border-brand-primary bg-blue-50" : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300"}`}
                      >
                        <button
                          type="button"
                          className="w-full text-left"
                          onClick={() => setSelectedIdentifier(formIdentifier(generalEnquiryForm))}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="rounded-full bg-brand-primary/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary">System</span>
                                <p className="font-semibold text-slate-900">General Enquiry</p>
                              </div>
                              <p className="mt-2 text-xs text-slate-500">{generalEnquiryForm.publicUrl}</p>
                            </div>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{generalEnquiryForm.submissionCount} responses</span>
                          </div>
                        </button>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Button type="button" variant="outline" size="sm" onClick={() => openResponsesInNewTab(generalEnquiryForm)}>
                            Open responses
                          </Button>
                          <Button type="button" variant="outline" size="sm" onClick={() => window.open(`/api/admin/forms/${encodeURIComponent(formIdentifier(generalEnquiryForm))}/export.csv`, "_blank", "noopener,noreferrer")}>
                            Export CSV
                          </Button>
                          <Button type="button" variant="outline" size="sm" onClick={() => window.open(`/api/admin/forms/${encodeURIComponent(formIdentifier(generalEnquiryForm))}/files.zip`, "_blank", "noopener,noreferrer")}>
                            Files ZIP
                          </Button>
                          <Button type="button" variant="secondary" size="sm" onClick={() => setSelectedIdentifier(formIdentifier(generalEnquiryForm))}>
                            Select form
                          </Button>
                        </div>
                      </div>
                    ) : null}

                    {nonSystemForms.map((form) => (
                      <div
                        key={form.id}
                        className={`rounded-[24px] border p-4 shadow-sm transition ${selectedIdentifier === form.publicId || selectedIdentifier === form.kind ? "border-brand-primary bg-blue-50" : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300"}`}
                      >
                        <button
                          type="button"
                          className="w-full text-left"
                          onClick={() => setSelectedIdentifier(formIdentifier(form))}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600">Custom</span>
                                <p className="font-semibold text-slate-900">{form.title}</p>
                              </div>
                              <p className="mt-2 text-xs text-slate-500">{form.publicUrl}</p>
                            </div>
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{form.submissionCount} responses</span>
                          </div>
                        </button>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Button type="button" variant="outline" size="sm" onClick={() => openResponsesInNewTab(form)}>
                            Open responses
                          </Button>
                          <Button type="button" variant="outline" size="sm" onClick={() => window.open(`/api/admin/forms/${encodeURIComponent(formIdentifier(form))}/export.csv`, "_blank", "noopener,noreferrer")}>
                            Export CSV
                          </Button>
                          <Button type="button" variant="outline" size="sm" onClick={() => window.open(`/api/admin/forms/${encodeURIComponent(formIdentifier(form))}/files.zip`, "_blank", "noopener,noreferrer")}>
                            Files ZIP
                          </Button>
                          <Button type="button" variant="secondary" size="sm" onClick={() => setSelectedIdentifier(formIdentifier(form))}>
                            Select form
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-600">No forms created yet.</p>
                )}
              </CardContent>
            </Card>

            {selectedForm ? (
              <Card className="overflow-hidden border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle>Selected form</CardTitle>
                    <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">Live</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Form title</p>
                    <p className="mt-2 text-lg font-bold text-slate-900">{selectedForm.title}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Public URL</p>
                    <Link href={selectedForm.publicUrl} className="mt-2 block break-all text-sm font-semibold text-brand-primary hover:underline">{selectedForm.publicUrl}</Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={selectedForm.publicUrl}>Open public form</Link>
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => window.open(`/api/admin/forms/${encodeURIComponent(formIdentifier(selectedForm))}/export.csv`, "_blank", "noopener,noreferrer")}>
                      Export CSV
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={() => window.open(`/api/admin/forms/${encodeURIComponent(formIdentifier(selectedForm))}/files.zip`, "_blank", "noopener,noreferrer")}>
                      Download files ZIP
                    </Button>
                    <Button type="button" variant="secondary" size="sm" onClick={() => openResponsesInNewTab(selectedForm)}>
                      Open responses in new tab
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </aside>
        </div>

        {selectedIdentifier ? (
          <section className="mt-8 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-primary">Responses</p>
                  <h2 className="mt-2 text-2xl font-bold text-slate-900">{selectedForm?.title || "Selected form responses"}</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" onClick={() => void submissionsQuery.refetch()}>
                    Refresh
                  </Button>
                  {selectedForm ? (
                    <Link href={selectedForm.publicUrl} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                      View public form
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="p-6">

            {submissionsQuery.isLoading ? (
              <p className="text-sm text-slate-600">Loading submissions…</p>
            ) : submissionsQuery.isError ? (
              <p className="text-sm text-red-600">{submissionsQuery.error.message}</p>
            ) : submissionsQuery.data?.submissions.length ? (
              <div className="space-y-4">
                {submissionsQuery.data.submissions.map((submission) => (
                  <div key={submission.id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{submission.responderName || submission.responderEmail || submission.publicSubmissionId}</p>
                        <p className="text-xs text-slate-500">{formatSubmittedAt(submission.submittedAt)}</p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">{submission.status}</span>
                    </div>
                    <div className="mt-4 space-y-3 text-sm text-slate-700">
                      {Object.entries(submission.payload).map(([key, value]) => (
                        <div key={key} className="grid gap-1 rounded-2xl border border-slate-200 bg-white p-3 sm:grid-cols-[160px_minmax(0,1fr)]">
                          <span className="font-semibold text-slate-800">{key}</span>
                          <span>{typeof value === "string" ? value : JSON.stringify(value)}</span>
                        </div>
                      ))}
                      {submission.files.length ? (
                        <div className="grid gap-1 rounded-2xl border border-slate-200 bg-white p-3 sm:grid-cols-[160px_minmax(0,1fr)]">
                          <span className="font-semibold text-slate-800">Files</span>
                          <div className="space-y-2">
                            {submission.files.map((file, fileIndex) => (
                              <div key={`${file.fieldName}-${file.originalName}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                                <p className="font-semibold">{file.originalName}</p>
                                <p>{file.mimeType} · {(file.size / 1024).toFixed(1)} KB</p>
                                {selectedIdentifier ? (
                                  <a href={`/api/admin/forms/${encodeURIComponent(selectedIdentifier)}/submissions/${encodeURIComponent(submission.publicSubmissionId)}/files/${fileIndex}`} className="mt-2 inline-block font-semibold text-brand-primary hover:underline">
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
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-600">No submissions received for this form yet.</p>
            )}
            </div>
          </section>
        ) : null}
      </div>
    </Layout>
  );
}
