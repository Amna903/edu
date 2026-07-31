import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthUser } from "./use-auth";

export type FormFieldType = "text" | "email" | "textarea" | "select" | "file" | "number" | "tel" | "date";

export interface FormField {
  id: string;
  formId: string;
  label: string;
  name: string;
  type: FormFieldType;
  required: boolean;
  placeholder: string | null;
  helpText: string | null;
  options: string[];
  sortOrder: number;
}

export interface PublicForm {
  id: string;
  publicId: string;
  title: string;
  description: string | null;
  kind: string;
  isActive: boolean;
  submissionCount: number;
  createdAt: string;
  updatedAt: string;
  fields: FormField[];
  publicUrl: string;
}

export interface FormSubmission {
  id: string;
  formId: string;
  publicSubmissionId: string;
  status: string;
  responderName: string | null;
  responderEmail: string | null;
  payload: Record<string, unknown>;
  files: Array<{
    fieldName: string;
    originalName: string;
    mimeType: string;
    size: number;
    base64: string;
  }>;
  ipAddress: string | null;
  userAgent: string | null;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminFormsResponse {
  forms: PublicForm[];
}

export interface AdminFormDetailsResponse {
  form: PublicForm;
  submissions: FormSubmission[];
}

export interface CreateFormFieldInput {
  label: string;
  name: string;
  type: FormFieldType;
  required?: boolean;
  placeholder?: string | null;
  helpText?: string | null;
  options?: string[];
  sortOrder?: number;
}

export interface CreateFormInput {
  title: string;
  description?: string | null;
  kind?: string;
  isActive?: boolean;
  fields: CreateFormFieldInput[];
}

function safeJsonParse(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

export function usePublicForm(identifier?: string | null) {
  return useQuery<PublicForm, Error>({
    queryKey: ["publicForm", identifier],
    enabled: Boolean(identifier),
    queryFn: async () => {
      if (!identifier) {
        throw new Error("Form identifier is required");
      }
      const response = await fetch(`/api/forms/public/${encodeURIComponent(identifier)}`, {
        credentials: "include",
      });
      const body = await response.text();
      const data = body ? safeJsonParse(body) : {};
      if (!response.ok) {
        throw new Error(data?.message || "Failed to load form");
      }
      return data as PublicForm;
    },
  });
}

export function useSubmitPublicForm(identifier?: string | null) {
  const queryClient = useQueryClient();
  return useMutation<FormSubmission, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      if (!identifier) {
        throw new Error("Form identifier is required");
      }
      const response = await fetch(`/api/forms/public/${encodeURIComponent(identifier)}/submissions`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const body = await response.text();
      const data = body ? safeJsonParse(body) : {};
      if (!response.ok) {
        throw new Error(data?.message || "Failed to submit form");
      }
      return data as FormSubmission;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["publicForm", identifier] });
    },
  });
}

export function useAdminForms(enabled = true) {
  const { data: authUser, isLoading: authLoading } = useAuthUser();

  return useQuery<AdminFormsResponse, Error>({
    queryKey: ["adminForms"],
    enabled: enabled && !authLoading && Boolean(authUser?.role === "admin"),
    queryFn: async () => {
      const response = await fetch("/api/admin/forms", {
        credentials: "include",
      });
      const body = await response.text();
      const data = body ? safeJsonParse(body) : {};
      if (!response.ok) {
        let message = data?.message || "Failed to load forms";
        if (response.status === 401) {
          message = "Authentication required to load admin forms.";
        } else if (response.status === 403) {
          message = "Admin access required to load admin forms.";
        }
        throw new Error(message);
      }
      return data as AdminFormsResponse;
    },
  });
}

export function useAdminFormSubmissions(identifier?: string | null, enabled = true) {
  const { data: authUser, isLoading: authLoading } = useAuthUser();

  return useQuery<AdminFormDetailsResponse, Error>({
    queryKey: ["adminFormSubmissions", identifier],
    enabled: Boolean(identifier) && enabled && !authLoading && Boolean(authUser?.role === "admin"),
    queryFn: async () => {
      if (!identifier) {
        throw new Error("Form identifier is required");
      }
      const response = await fetch(`/api/admin/forms/${encodeURIComponent(identifier)}/submissions`, {
        credentials: "include",
      });
      const body = await response.text();
      const data = body ? safeJsonParse(body) : {};
      if (!response.ok) {
        throw new Error(data?.message || "Failed to load submissions");
      }
      return data as AdminFormDetailsResponse;
    },
  });
}

export function useCreateAdminForm() {
  const queryClient = useQueryClient();
  const { data: authUser, isLoading: authLoading } = useAuthUser();

  return useMutation<PublicForm, Error, CreateFormInput>({
    mutationFn: async (formInput: CreateFormInput) => {
      if (authLoading) {
        throw new Error("Checking your admin access...");
      }
      if (authUser?.role !== "admin") {
        throw new Error("Admin access is required to create forms.");
      }
      const response = await fetch("/api/admin/forms", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInput),
      });
      const body = await response.text();
      const data = body ? safeJsonParse(body) : {};
      if (!response.ok) {
        let message = data?.message || "Failed to create form";
        if (response.status === 401) {
          message = "Authentication required to create forms.";
        } else if (response.status === 403) {
          message = "Admin access required to create forms.";
        }
        throw new Error(message);
      }
      return data as PublicForm;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["adminForms"] });
    },
  });
}
