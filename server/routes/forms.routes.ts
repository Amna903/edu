import type { Express, Request } from "express";
import multer from "multer";
import { z } from "zod";
import { ensureFormsReady, createForm, exportFormSubmissionsCsv, getDefaultContactIdentifier, getDefaultTeacherIdentifier, getFormByIdentifier, listForms, listFormSubmissions, submitFormSubmission, type FormFieldType, type StoredForm } from "../services/forms.js";
import type { RouteContext } from "./context.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 8,
  },
});

const formFieldSchema = z.object({
  label: z.string().min(1),
  name: z.string().min(1),
  type: z.enum(["text", "email", "textarea", "select", "file", "number", "tel", "date"]),
  required: z.boolean().optional(),
  placeholder: z.string().optional().nullable(),
  helpText: z.string().optional().nullable(),
  options: z.array(z.string()).optional(),
  sortOrder: z.number().int().optional(),
});

const createFormSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional().nullable(),
  kind: z.string().min(1).optional(),
  isActive: z.boolean().optional(),
  fields: z.array(formFieldSchema).min(1),
});

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function readSubmissionValues(req: Request): Record<string, unknown> {
  const values: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(req.body ?? {})) {
    if (typeof value === "string") {
      values[key] = value;
    } else if (Array.isArray(value)) {
      values[key] = value.map((entry) => String(entry));
    }
  }
  return values;
}

function readUploadedFiles(req: Request) {
  const files = (req.files ?? []) as Express.Multer.File[];
  return files.map((file) => ({
    fieldName: file.fieldname,
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    base64: file.buffer.toString("base64"),
  }));
}

function isAdmin(req: Request) {
  return Boolean(req.session.user && req.session.user.role === "admin");
}

function buildPublicFormUrl(form: StoredForm) {
  if (form.kind === getDefaultContactIdentifier() || form.kind === getDefaultTeacherIdentifier()) {
    return `/forms/${form.kind}`;
  }
  if (form.kind === "general-enquiry") {
    return "/contact?type=general";
  }
  return `/forms/${form.publicId}`;
}

export function registerFormsRoutes(app: Express, ctx: RouteContext) {
  void ctx;

  app.get("/api/forms/public/:identifier", async (req, res) => {
    try {
      const identifier = String(req.params.identifier || "").trim();
      if (!identifier) {
        return res.status(400).json({ message: "Form identifier is required" });
      }

      const form = await getFormByIdentifier(identifier);
      if (!form || !form.isActive) {
        return res.status(404).json({ message: "Form not found" });
      }

      return res.json({
        ...form,
        publicUrl: buildPublicFormUrl(form),
      });
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to load form" });
    }
  });

  app.post("/api/forms/public/:identifier/submissions", upload.any(), async (req, res) => {
    try {
      const identifier = String(req.params.identifier || "").trim();
      const form = await getFormByIdentifier(identifier);
      if (!form || !form.isActive) {
        return res.status(404).json({ message: "Form not found" });
      }

      const values = readSubmissionValues(req);
      const files = readUploadedFiles(req);

      const responderName = asText(values.fullName || values.name || values.responderName);
      const responderEmail = asText(values.email || values.responderEmail);
      const payload = { ...values };
      delete payload.fullName;
      delete payload.name;
      delete payload.responderName;
      delete payload.email;
      delete payload.responderEmail;

      const created = await submitFormSubmission({
        identifier: form.kind === getDefaultContactIdentifier() ? getDefaultContactIdentifier() : form.publicId,
        values: payload,
        files,
        responderName: responderName || null,
        responderEmail: responderEmail || null,
        ipAddress: req.ip || req.socket.remoteAddress || null,
        userAgent: req.headers["user-agent"] || null,
      });

      return res.status(201).json(created);
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to submit form" });
    }
  });

  app.get("/api/admin/forms", async (req, res) => {
    try {
      if (!isAdmin(req)) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const forms = await listForms();
      return res.json({
        forms: forms.map((form) => ({
          ...form,
          publicUrl: buildPublicFormUrl(form),
        })),
      });
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to load forms" });
    }
  });

  app.post("/api/admin/forms", async (req, res) => {
    try {
      if (!isAdmin(req)) {
        return res.status(403).json({ message: "Admin access required" });
      }

      await ensureFormsReady();
      const input = createFormSchema.parse(req.body);
      const created = await createForm({
        title: input.title,
        description: input.description ?? null,
        kind: input.kind ?? "custom",
        isActive: input.isActive ?? true,
        fields: input.fields.map((field, index) => ({
          label: field.label,
          name: field.name,
          type: field.type as FormFieldType,
          required: field.required ?? false,
          placeholder: field.placeholder ?? null,
          helpText: field.helpText ?? null,
          options: field.options ?? [],
          sortOrder: field.sortOrder ?? index,
        })),
      });

      return res.status(201).json({
        ...created,
        publicUrl: `/forms/${created.kind === getDefaultContactIdentifier() ? "contact" : created.publicId}`,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to create form" });
    }
  });

  app.get("/api/admin/forms/:identifier", async (req, res) => {
    try {
      if (!isAdmin(req)) {
        return res.status(403).json({ message: "Admin access required" });
      }

      await ensureFormsReady();
      const identifier = String(req.params.identifier || "").trim();
      const result = await listFormSubmissions(identifier);
      if (!result) {
        return res.status(404).json({ message: "Form not found" });
      }

      return res.json({
        form: {
          ...result.form,
          publicUrl: result.form.kind === "general-enquiry" ? "/contact?type=general" : `/forms/${result.form.kind === getDefaultContactIdentifier() ? "contact" : result.form.publicId}`,
        },
        submissions: result.submissions,
      });
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to load form" });
    }
  });

  app.get("/api/admin/forms/:identifier/submissions", async (req, res) => {
    try {
      if (!isAdmin(req)) {
        return res.status(403).json({ message: "Admin access required" });
      }

      await ensureFormsReady();
      const identifier = String(req.params.identifier || "").trim();
      const result = await listFormSubmissions(identifier);
      if (!result) {
        return res.status(404).json({ message: "Form not found" });
      }

      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to load submissions" });
    }
  });

  app.get("/api/admin/forms/:identifier/export.csv", async (req, res) => {
    try {
      if (!isAdmin(req)) {
        return res.status(403).json({ message: "Admin access required" });
      }

      await ensureFormsReady();
      const identifier = String(req.params.identifier || "").trim();
      const result = await exportFormSubmissionsCsv(identifier);
      if (!result) {
        return res.status(404).json({ message: "Form not found" });
      }

      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="${result.filename}"`);
      return res.send(result.csv);
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to export form submissions" });
    }
  });

  app.get("/api/forms/contact", async (_req, res) => {
    return res.status(200).json({ publicId: getDefaultContactIdentifier() });
  });
}
