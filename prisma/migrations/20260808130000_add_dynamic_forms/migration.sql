-- Dynamic public forms, their fields, and complete submissions (including file metadata/content).
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
);

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
);

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
);

CREATE INDEX IF NOT EXISTS form_fields_form_id_idx ON form_fields(form_id);
CREATE INDEX IF NOT EXISTS form_submissions_form_id_idx ON form_submissions(form_id);
CREATE INDEX IF NOT EXISTS form_submissions_status_idx ON form_submissions(status);
CREATE INDEX IF NOT EXISTS forms_kind_idx ON forms(kind);
ALTER TABLE form_submissions ADD COLUMN IF NOT EXISTS submission_token TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS form_submissions_submission_token_idx ON form_submissions(submission_token) WHERE submission_token IS NOT NULL;
