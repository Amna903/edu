import { randomUUID } from "crypto";
import { nanoid } from "nanoid";
import { prisma } from "../db/prisma.js";

export type FormFieldType = "text" | "email" | "textarea" | "select" | "file" | "number" | "tel" | "date";

export interface FormFieldInput {
  label: string;
  name: string;
  type: FormFieldType;
  required?: boolean;
  placeholder?: string | null;
  helpText?: string | null;
  options?: string[];
  sortOrder?: number;
}

export interface FormInput {
  title: string;
  description?: string | null;
  kind?: string;
  isActive?: boolean;
  fields: FormFieldInput[];
}

export interface StoredFormField {
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

export interface StoredForm {
  id: string;
  publicId: string;
  title: string;
  description: string | null;
  kind: string;
  isActive: boolean;
  submissionCount: number;
  createdAt: string;
  updatedAt: string;
  fields: StoredFormField[];
}

export interface StoredFormSubmission {
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

export interface StoredSubmissionFile {
  fieldName: string;
  originalName: string;
  mimeType: string;
  size: number;
  base64: string;
}

export class FormSubmissionValidationError extends Error {}

const CONTACT_ALIAS = "contact";
const TEACHER_ALIAS = "teacher-application";
const GENERAL_ENQUIRY_ALIAS = "general-enquiry";
const DEFAULT_CONTACT_PUBLIC_ID = nanoid(24);
const DEFAULT_TEACHER_PUBLIC_ID = nanoid(24);

let formsReadyPromise: Promise<void> | null = null;

function toStoredFormField(row: {
  id: string;
  form_id: string;
  label: string;
  name: string;
  type: string;
  required: boolean;
  placeholder: string | null;
  help_text: string | null;
  options: unknown;
  sort_order: number;
}): StoredFormField {
  return {
    id: row.id,
    formId: row.form_id,
    label: row.label,
    name: row.name,
    type: row.type as FormFieldType,
    required: row.required,
    placeholder: row.placeholder,
    helpText: row.help_text,
    options: Array.isArray(row.options) ? row.options.map((value) => String(value)) : [],
    sortOrder: row.sort_order,
  };
}

function toStoredForm(row: {
  id: string;
  public_id: string;
  title: string;
  description: string | null;
  kind: string;
  is_active: boolean;
  submission_count: number;
  created_at: Date;
  updated_at: Date;
}): StoredForm {
  return {
    id: row.id,
    publicId: row.public_id,
    title: row.title,
    description: row.description,
    kind: row.kind,
    isActive: row.is_active,
    submissionCount: row.submission_count,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
    fields: [],
  };
}

function toStoredSubmission(row: {
  id: string;
  form_id: string;
  public_submission_id: string;
  status: string;
  responder_name: string | null;
  responder_email: string | null;
  payload: unknown;
  files: unknown;
  ip_address: string | null;
  user_agent: string | null;
  submitted_at: Date;
  created_at: Date;
  updated_at: Date;
}, includeFileContents = false): StoredFormSubmission {
  return {
    id: row.id,
    formId: row.form_id,
    publicSubmissionId: row.public_submission_id,
    status: row.status,
    responderName: row.responder_name,
    responderEmail: row.responder_email,
    payload: (row.payload as Record<string, unknown>) ?? {},
    files: Array.isArray(row.files)
      ? row.files.map((file) => ({
          fieldName: String((file as Record<string, unknown>).fieldName ?? ""),
          originalName: String((file as Record<string, unknown>).originalName ?? ""),
          mimeType: String((file as Record<string, unknown>).mimeType ?? "application/octet-stream"),
          size: Number((file as Record<string, unknown>).size ?? 0),
          base64: includeFileContents ? String((file as Record<string, unknown>).base64 ?? "") : "",
        }))
      : [],
    ipAddress: row.ip_address,
    userAgent: row.user_agent,
    submittedAt: row.submitted_at.toISOString(),
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

function getGeneralEnquirySyntheticForm(count = 0): StoredForm {
  const now = new Date().toISOString();
  return {
    id: GENERAL_ENQUIRY_ALIAS,
    publicId: GENERAL_ENQUIRY_ALIAS,
    title: "General Enquiry Form — Students & Parents",
    description: "Public general enquiry form submitted through /contact?type=general.",
    kind: GENERAL_ENQUIRY_ALIAS,
    isActive: true,
    submissionCount: count,
    createdAt: now,
    updatedAt: now,
    fields: [],
  };
}

async function getGeneralEnquirySubmissionCount() {
  const rows = await prisma.$queryRawUnsafe<Array<{ count: number }>>(
    `SELECT COUNT(*)::int AS count FROM edume_contact_submissions WHERE consultation_type = 'general_enquiry'`,
  );
  return rows[0]?.count ?? 0;
}

function toContactSubmissionRecord(row: {
  id: number;
  consultation_type: string;
  name: string;
  email: string;
  country: string | null;
  subject: string | null;
  message: string | null;
  school_name: string | null;
  student_count: string | null;
  device: string | null;
  problem_type: string | null;
  created_at: Date;
}): StoredFormSubmission {
  return {
    id: `contact-${row.id}`,
    formId: GENERAL_ENQUIRY_ALIAS,
    publicSubmissionId: `contact-${row.id}`,
    status: "new",
    responderName: row.name,
    responderEmail: row.email,
    payload: {
      fullName: row.name,
      email: row.email,
      country: row.country ?? "",
      subject: row.subject ?? "",
      message: row.message ?? "",
      schoolName: row.school_name ?? "",
      studentCount: row.student_count ?? "",
      device: row.device ?? "",
      problemType: row.problem_type ?? "",
    },
    files: [],
    ipAddress: null,
    userAgent: null,
    submittedAt: row.created_at.toISOString(),
    createdAt: row.created_at.toISOString(),
    updatedAt: row.created_at.toISOString(),
  };
}

async function ensureBaseTables() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS forms (
      id TEXT PRIMARY KEY,
      public_id TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT,
      kind TEXT NOT NULL DEFAULT 'custom',
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      submission_count INTEGER NOT NULL DEFAULT 0,
      created_by_user_id INTEGER,
      meta JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS form_fields (
      id TEXT PRIMARY KEY,
      form_id TEXT NOT NULL REFERENCES forms(id) ON DELETE CASCADE,
      label TEXT NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      required BOOLEAN NOT NULL DEFAULT FALSE,
      placeholder TEXT,
      help_text TEXT,
      options JSONB NOT NULL DEFAULT '[]'::jsonb,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS form_submissions (
      id TEXT PRIMARY KEY,
      form_id TEXT NOT NULL REFERENCES forms(id) ON DELETE CASCADE,
      public_submission_id TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'new',
      responder_name TEXT,
      responder_email TEXT,
      payload JSONB NOT NULL DEFAULT '{}'::jsonb,
      files JSONB NOT NULL DEFAULT '[]'::jsonb,
      submission_token TEXT,
      ip_address TEXT,
      user_agent TEXT,
      submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS form_fields_form_id_idx ON form_fields(form_id)
  `);
  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS form_submissions_form_id_idx ON form_submissions(form_id)
  `);
  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS form_submissions_status_idx ON form_submissions(status)
  `);
  await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS forms_kind_idx ON forms(kind)`);
  await prisma.$executeRawUnsafe(`ALTER TABLE form_submissions ADD COLUMN IF NOT EXISTS submission_token TEXT`);
  await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX IF NOT EXISTS form_submissions_submission_token_idx ON form_submissions(submission_token) WHERE submission_token IS NOT NULL`);
}

async function seedSystemForms() {
  const existingForms = await prisma.$queryRawUnsafe<Array<{ count: number }>>(
    `SELECT COUNT(*)::int AS count FROM forms`,
  );
  if ((existingForms[0]?.count ?? 0) > 0) {
    return;
  }

  await createForm({
    title: "Technical Support Contact Form",
    description: "Public support form for login, payment, access, and technical help requests.",
    kind: CONTACT_ALIAS,
    isActive: true,
    fields: [
      { label: "Full Name", name: "fullName", type: "text", required: true, placeholder: "Your full name", sortOrder: 0 },
      { label: "Email Address", name: "email", type: "email", required: true, placeholder: "you@example.com", sortOrder: 1 },
      {
        label: "Issue Type",
        name: "issueType",
        type: "select",
        required: true,
        options: ["Login issue", "Course access", "Payment problem", "Download issue", "Other"],
        sortOrder: 2,
      },
      { label: "Account Email", name: "accountEmail", type: "email", required: false, placeholder: "Email used on the account", sortOrder: 3 },
      { label: "Message", name: "message", type: "textarea", required: true, placeholder: "Describe the problem in detail", sortOrder: 4 },
      { label: "Attachment", name: "attachment", type: "file", required: false, helpText: "Screenshots or receipts help us resolve the issue faster.", sortOrder: 5 },
    ],
  });

  await createForm({
    title: "Teacher Application Form",
    description: "Application form for teachers and tutors who want to join the network.",
    kind: TEACHER_ALIAS,
    isActive: true,
    fields: [
      { label: "Full Name", name: "fullName", type: "text", required: true, placeholder: "Your full name", sortOrder: 0 },
      { label: "Email Address", name: "email", type: "email", required: true, placeholder: "you@example.com", sortOrder: 1 },
      { label: "School / Organisation", name: "organisation", type: "text", required: true, placeholder: "Current school or organisation", sortOrder: 2 },
      { label: "Subjects", name: "subjects", type: "text", required: true, placeholder: "e.g. Physics, Mathematics", sortOrder: 3 },
      { label: "Experience", name: "experience", type: "textarea", required: true, placeholder: "Briefly share your experience", sortOrder: 4 },
      { label: "CV / Resume", name: "cv", type: "file", required: false, helpText: "Upload a recent CV if available.", sortOrder: 5 },
    ],
  });
}

export async function ensureFormsReady() {
  if (!formsReadyPromise) {
    formsReadyPromise = (async () => {
      await ensureBaseTables();
      await seedSystemForms();
    })();
  }

  return formsReadyPromise;
}

export async function createForm(input: FormInput): Promise<StoredForm> {
  await ensureBaseTables();
  const fieldNames = new Set<string>();
  for (const field of input.fields) {
    const name = field.name.trim();
    if (!name) throw new Error("Each field needs a name");
    if (fieldNames.has(name)) throw new Error(`Duplicate field name: ${name}`);
    if (field.type === "select" && !(field.options ?? []).some((option) => option.trim())) {
      throw new Error(`Select field \"${field.label}\" needs at least one option`);
    }
    fieldNames.add(name);
  }
  const formId = randomUUID();
  const publicId = nanoid(24);
  const now = new Date();
  const rows = await prisma.$transaction(async (tx) => {
    await tx.$executeRawUnsafe(
      `INSERT INTO forms (id, public_id, title, description, kind, is_active, submission_count, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, 0, $7, $8)`,
      formId,
      publicId,
      input.title,
      input.description ?? null,
      input.kind ?? "custom",
      input.isActive ?? true,
      now,
      now,
    );

    for (const field of input.fields) {
      await tx.$executeRawUnsafe(
        `INSERT INTO form_fields (id, form_id, label, name, type, required, placeholder, help_text, options, sort_order, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10, $11, $12)`,
        randomUUID(),
        formId,
        field.label,
        field.name,
        field.type,
        field.required ?? false,
        field.placeholder ?? null,
        field.helpText ?? null,
        JSON.stringify(field.options ?? []),
        field.sortOrder ?? 0,
        now,
        now,
      );
    }

    const created = await tx.$queryRawUnsafe<Array<{
      id: string;
      public_id: string;
      title: string;
      description: string | null;
      kind: string;
      is_active: boolean;
      submission_count: number;
      created_at: Date;
      updated_at: Date;
    }>>(`SELECT * FROM forms WHERE id = $1 LIMIT 1`, formId);
    return created[0];
  });

  if (!rows) {
    throw new Error("Failed to create form");
  }

  return {
    ...toStoredForm(rows),
    fields: input.fields.map((field, index) => ({
      id: randomUUID(),
      formId,
      label: field.label,
      name: field.name,
      type: field.type,
      required: field.required ?? false,
      placeholder: field.placeholder ?? null,
      helpText: field.helpText ?? null,
      options: field.options ?? [],
      sortOrder: field.sortOrder ?? index,
    })),
  };
}

export async function listForms(): Promise<StoredForm[]> {
  await ensureFormsReady();
  const forms = await prisma.$queryRawUnsafe<Array<{
    id: string;
    public_id: string;
    title: string;
    description: string | null;
    kind: string;
    is_active: boolean;
    submission_count: number;
    created_at: Date;
    updated_at: Date;
  }>>(`SELECT * FROM forms ORDER BY created_at DESC`);

  const fields = await prisma.$queryRawUnsafe<Array<{
    id: string;
    form_id: string;
    label: string;
    name: string;
    type: string;
    required: boolean;
    placeholder: string | null;
    help_text: string | null;
    options: unknown;
    sort_order: number;
  }>>(`SELECT * FROM form_fields ORDER BY sort_order ASC, created_at ASC`);

  const groupedFields = new Map<string, StoredFormField[]>();
  for (const field of fields) {
    const grouped = groupedFields.get(field.form_id) ?? [];
    grouped.push(toStoredFormField(field));
    groupedFields.set(field.form_id, grouped);
  }

  const existingForms = forms.map((form) => ({
    ...toStoredForm(form),
    fields: groupedFields.get(form.id) ?? [],
  }));

  const generalCount = await getGeneralEnquirySubmissionCount();
  existingForms.unshift(getGeneralEnquirySyntheticForm(generalCount));

  return existingForms;
}

export async function getFormByIdentifier(identifier: string): Promise<StoredForm | undefined> {
  await ensureFormsReady();
  const normalizedIdentifier = identifier.trim().toLowerCase();
  if (["general", "general-enquiry", "contact-general"].includes(normalizedIdentifier)) {
    const submissionCount = await getGeneralEnquirySubmissionCount();
    return getGeneralEnquirySyntheticForm(submissionCount);
  }

  const rows = await prisma.$queryRawUnsafe<Array<{
    id: string;
    public_id: string;
    title: string;
    description: string | null;
    kind: string;
    is_active: boolean;
    submission_count: number;
    created_at: Date;
    updated_at: Date;
  }>>(
    `SELECT * FROM forms WHERE public_id = $1 OR kind = $1 ORDER BY (public_id = $1) DESC LIMIT 1`,
    identifier,
  );

  const form = rows[0];
  if (!form) {
    return undefined;
  }

  const fields = await prisma.$queryRawUnsafe<Array<{
    id: string;
    form_id: string;
    label: string;
    name: string;
    type: string;
    required: boolean;
    placeholder: string | null;
    help_text: string | null;
    options: unknown;
    sort_order: number;
  }>>(
    `SELECT * FROM form_fields WHERE form_id = $1 ORDER BY sort_order ASC, created_at ASC`,
    form.id,
  );

  return {
    ...toStoredForm(form),
    fields: fields.map(toStoredFormField),
  };
}

export async function listFormSubmissions(identifier: string, includeFileContents = false): Promise<{ form: StoredForm; submissions: StoredFormSubmission[] } | undefined> {
  const form = await getFormByIdentifier(identifier);
  if (!form) {
    return undefined;
  }

  const normalizedIdentifier = identifier.trim().toLowerCase();
  if (["general", "general-enquiry", "contact-general"].includes(normalizedIdentifier)) {
    const rows = await prisma.$queryRawUnsafe<Array<{
      id: number;
      consultation_type: string;
      name: string;
      email: string;
      country: string | null;
      subject: string | null;
      message: string | null;
      school_name: string | null;
      student_count: string | null;
      device: string | null;
      problem_type: string | null;
      created_at: Date;
    }>>(
      `SELECT * FROM edume_contact_submissions WHERE consultation_type = 'general_enquiry' ORDER BY created_at DESC`,
    );

    return {
      form,
      submissions: rows.map(toContactSubmissionRecord),
    };
  }

  const filesSelect = includeFileContents
    ? "files"
    : "COALESCE((SELECT jsonb_agg(file - 'base64') FROM jsonb_array_elements(files) AS file), '[]'::jsonb) AS files";
  const rows = await prisma.$queryRawUnsafe<Array<{
    id: string;
    form_id: string;
    public_submission_id: string;
    status: string;
    responder_name: string | null;
    responder_email: string | null;
    payload: unknown;
    files: unknown;
    ip_address: string | null;
    user_agent: string | null;
    submitted_at: Date;
    created_at: Date;
    updated_at: Date;
  }>>(
    `SELECT id, form_id, public_submission_id, status, responder_name, responder_email, payload, ${filesSelect}, ip_address, user_agent, submitted_at, created_at, updated_at
     FROM form_submissions WHERE form_id = $1 ORDER BY submitted_at DESC`,
    form.id,
  );

  return {
    form,
    submissions: rows.map((row) => toStoredSubmission(row, includeFileContents)),
  };
}

export async function exportFormSubmissionsCsv(identifier: string): Promise<{ filename: string; csv: string } | undefined> {
  const result = await listFormSubmissions(identifier);
  if (!result) {
    return undefined;
  }

  const allKeys = new Set<string>();
  for (const submission of result.submissions) {
    Object.keys(submission.payload).forEach((key) => allKeys.add(key));
  }

  const orderedKeys = Array.from(allKeys).sort();
  const escape = (value: unknown) => {
    const text = value === null || value === undefined ? "" : String(value);
    return `"${text.replace(/"/g, '""')}"`;
  };

  const header = ["Submission ID", "Status", "Name", "Email", "Submitted At", "Uploaded Files", ...orderedKeys].map(escape).join(",");
  const rows = result.submissions.map((submission) => [
    submission.publicSubmissionId,
    submission.status,
    submission.responderName ?? "",
    submission.responderEmail ?? "",
    submission.submittedAt,
    submission.files.map((file) => `${file.fieldName}: ${file.originalName}`).join("; "),
    ...orderedKeys.map((key) => submission.payload[key] ?? ""),
  ].map(escape).join(","));

  return {
    filename: `${result.form.publicId}-submissions.csv`,
    csv: [header, ...rows].join("\n"),
  };
}

export async function getFormSubmissionFile(
  identifier: string,
  publicSubmissionId: string,
  fileIndex: number,
): Promise<{ file: StoredSubmissionFile } | undefined> {
  const form = await getFormByIdentifier(identifier);
  if (!form || !Number.isInteger(fileIndex) || fileIndex < 0) return undefined;
  const rows = await prisma.$queryRawUnsafe<Array<{ files: unknown }>>(
    `SELECT files FROM form_submissions WHERE form_id = $1 AND public_submission_id = $2 LIMIT 1`,
    form.id,
    publicSubmissionId,
  );
  const file = Array.isArray(rows[0]?.files) ? rows[0].files[fileIndex] as StoredSubmissionFile | undefined : undefined;
  if (!file || !Number.isInteger(fileIndex) || fileIndex < 0) return undefined;
  return { file };
}

function crc32(content: Buffer) {
  let crc = 0xffffffff;
  for (const byte of Array.from(content)) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function zipStoredFiles(entries: Array<{ name: string; content: Buffer }>) {
  const localParts: Buffer[] = [];
  const centralParts: Buffer[] = [];
  let offset = 0;
  for (const entry of entries) {
    const name = Buffer.from(entry.name, "utf8");
    const crc = crc32(entry.content);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(0, 8); // stored (no compression)
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(entry.content.length, 18);
    local.writeUInt32LE(entry.content.length, 22);
    local.writeUInt16LE(name.length, 26);
    localParts.push(local, name, entry.content);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(entry.content.length, 20);
    central.writeUInt32LE(entry.content.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt32LE(offset, 42);
    centralParts.push(central, name);
    offset += local.length + name.length + entry.content.length;
  }
  const centralDirectory = Buffer.concat(centralParts);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(entries.length, 8);
  end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralDirectory.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...localParts, centralDirectory, end]);
}

export async function exportFormSubmissionFilesZip(identifier: string): Promise<{ filename: string; content: Buffer } | undefined> {
  const result = await listFormSubmissions(identifier, true);
  if (!result) return undefined;
  const entries: Array<{ name: string; content: Buffer }> = [];
  for (const submission of result.submissions) {
    for (const [index, file] of Array.from(submission.files.entries())) {
      const content = Buffer.from(file.base64, "base64");
      const safeName = file.originalName.replace(/[\\/:*?"<>|\r\n]/g, "_") || `file-${index + 1}`;
      entries.push({ name: `${submission.publicSubmissionId}/${safeName}`, content });
    }
  }
  return { filename: `${result.form.publicId}-uploaded-files.zip`, content: zipStoredFiles(entries) };
}

export async function submitFormSubmission(input: {
  identifier: string;
  values: Record<string, unknown>;
  files: Array<{
    fieldName: string;
    originalName: string;
    mimeType: string;
    size: number;
    base64: string;
  }>;
  responderName?: string | null;
  responderEmail?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  submissionToken?: string | null;
}): Promise<StoredFormSubmission> {
  const form = await getFormByIdentifier(input.identifier);
  if (!form || !form.isActive) {
    throw new Error("Form not found");
  }

  const fieldsByName = new Map(form.fields.map((field) => [field.name, field]));
  for (const file of input.files) {
    const field = fieldsByName.get(file.fieldName);
    if (!field || field.type !== "file") {
      throw new FormSubmissionValidationError(`File upload is not allowed for field \"${file.fieldName}\"`);
    }
  }
  for (const field of form.fields) {
    const value = input.values[field.name];
    const responderValue = ["fullName", "name", "responderName"].includes(field.name)
      ? input.responderName
      : ["email", "responderEmail"].includes(field.name)
        ? input.responderEmail
        : undefined;
    const hasValue = Array.isArray(value)
      ? value.some((entry) => String(entry).trim())
      : Boolean((typeof value === "string" && value.trim()) || responderValue?.trim());
    const hasFile = input.files.some((file) => file.fieldName === field.name);
    if (field.required && !hasValue && !hasFile) {
      throw new FormSubmissionValidationError(`${field.label} is required`);
    }
    if (field.type === "select" && hasValue && typeof value === "string" && !field.options.includes(value)) {
      throw new FormSubmissionValidationError(`Invalid selection for ${field.label}`);
    }
  }

  const submissionId = randomUUID();
  const publicSubmissionId = nanoid(18);
  const now = new Date();

  if (input.submissionToken) {
    const existing = await prisma.$queryRawUnsafe<Array<{
      id: string; form_id: string; public_submission_id: string; status: string; responder_name: string | null; responder_email: string | null;
      payload: unknown; files: unknown; ip_address: string | null; user_agent: string | null; submitted_at: Date; created_at: Date; updated_at: Date;
    }>>(`SELECT * FROM form_submissions WHERE form_id = $1 AND submission_token = $2 LIMIT 1`, form.id, input.submissionToken);
    if (existing[0]) return toStoredSubmission(existing[0]);
  }

  const created = await prisma.$transaction(async (tx) => {
    await tx.$executeRawUnsafe(
      `INSERT INTO form_submissions
       (id, form_id, public_submission_id, status, responder_name, responder_email, payload, files, submission_token, ip_address, user_agent, submitted_at, created_at, updated_at)
       VALUES ($1, $2, $3, 'new', $4, $5, $6::jsonb, $7::jsonb, $8, $9, $10, $11, $12, $13)`,
      submissionId,
      form.id,
      publicSubmissionId,
      input.responderName ?? null,
      input.responderEmail ?? null,
      JSON.stringify(input.values),
      JSON.stringify(input.files),
      input.submissionToken ?? null,
      input.ipAddress ?? null,
      input.userAgent ?? null,
      now,
      now,
      now,
    );

    await tx.$executeRawUnsafe(
      `UPDATE forms SET submission_count = submission_count + 1, updated_at = NOW() WHERE id = $1`,
      form.id,
    );

    const rows = await tx.$queryRawUnsafe<Array<{
      id: string;
      form_id: string;
      public_submission_id: string;
      status: string;
      responder_name: string | null;
      responder_email: string | null;
      payload: unknown;
      files: unknown;
      ip_address: string | null;
      user_agent: string | null;
      submitted_at: Date;
      created_at: Date;
      updated_at: Date;
    }>>(`SELECT * FROM form_submissions WHERE id = $1 LIMIT 1`, submissionId);

    return rows[0];
  });

  if (!created) {
    throw new Error("Failed to create form submission");
  }

  return toStoredSubmission(created);
}

export function getDefaultContactIdentifier() {
  return CONTACT_ALIAS;
}

export function getDefaultTeacherIdentifier() {
  return TEACHER_ALIAS;
}
