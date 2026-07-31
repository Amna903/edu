import { FormEvent, useEffect, useRef, useState } from "react";
import { Link, useRoute } from "wouter";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePublicForm, useSubmitPublicForm, type FormField } from "@/hooks/use-forms";

function renderFormField(field: FormField) {
  const commonProps = {
    id: field.name,
    name: field.name,
    required: field.required,
    placeholder: field.placeholder ?? "",
    className: "mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/10",
  };

  if (field.type === "textarea") {
    return <Textarea {...commonProps} rows={5} />;
  }

  if (field.type === "select") {
    return (
      <select {...commonProps}>
        <option value="">Select an option</option>
        {field.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "file") {
    return <Input {...commonProps} type="file" />;
  }

  return <Input {...commonProps} type={field.type} />;
}

export default function FormPage() {
  const [match, params] = useRoute("/forms/:identifier");
  const identifier = params?.identifier;
  const formQuery = usePublicForm(identifier);
  const submitMutation = useSubmitPublicForm(identifier);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLockRef = useRef(false);

  useEffect(() => {
    if (formQuery.data) {
      document.title = `${formQuery.data.title} | EduMeUp`; 
    } else if (identifier) {
      document.title = `Loading form... | EduMeUp`;
    }
  }, [formQuery.data, identifier]);

  if (!match) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">Form not found</h1>
          <p className="mt-4 text-slate-600">The form link appears invalid. Please check the URL or return to the homepage.</p>
          <Link href="/">
            <Button className="mt-6">Return Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!identifier || submitLockRef.current || isSubmitting || submitMutation.isPending) {
      return;
    }

    submitLockRef.current = true;
    setFeedback(null);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      await submitMutation.mutateAsync(formData);
      setFeedback({ type: "success", message: "Your response has been received. Thank you!" });
      if (typeof form?.reset === "function") {
        form.reset();
      }
    } catch (error) {
      setFeedback({ type: "error", message: error instanceof Error ? error.message : "Failed to submit the form." });
    } finally {
      submitLockRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          {formQuery.isLoading && (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center shadow-sm">
              <p className="text-lg font-semibold text-slate-900">Loading form...</p>
              <p className="mt-3 text-sm text-slate-600">Please wait while we load your public form.</p>
            </div>
          )}

          {formQuery.isError && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center shadow-sm">
              <p className="text-lg font-semibold text-red-900">Unable to load this form.</p>
              <p className="mt-3 text-sm text-red-700">{formQuery.error?.message || "This form may not exist or may be inactive."}</p>
              <Link href="/contact">
                <Button className="mt-6">Contact Support</Button>
              </Link>
            </div>
          )}

          {formQuery.data && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-primary">Public Form</p>
                  <h1 className="mt-3 text-3xl font-bold text-slate-900">{formQuery.data.title}</h1>
                  {formQuery.data.description ? <p className="mt-2 text-slate-600">{formQuery.data.description}</p> : null}
                  <p className="mt-4 text-sm text-slate-500">This form is available publicly at <span className="font-semibold text-slate-900">{formQuery.data.publicUrl}</span>.</p>
                </div>

                {feedback ? (
                  <div className={`rounded-3xl p-4 ${feedback.type === "success" ? "bg-emerald-50 border border-emerald-200 text-emerald-900" : "bg-red-50 border border-red-200 text-red-900"}`}>
                    {feedback.message}
                  </div>
                ) : null}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {formQuery.data.fields.map((field) => (
                    <div key={field.id} className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <Label htmlFor={field.name} className="block text-sm font-semibold text-slate-700">
                          {field.label}
                          {field.required ? <span className="ml-1 text-rose-600">*</span> : null}
                        </Label>
                        {field.helpText ? <p className="text-xs text-slate-500">{field.helpText}</p> : null}
                      </div>
                      {renderFormField(field)}
                    </div>
                  ))}

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Button type="submit" className="bg-brand-primary text-white hover:bg-brand-primary-dark" disabled={submitMutation.isPending || isSubmitting}>
                      {submitMutation.isPending || isSubmitting ? "Submitting..." : "Submit Response"}
                    </Button>
                    <p className="text-sm text-slate-500">Submitted responses are stored securely for admin review.</p>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
