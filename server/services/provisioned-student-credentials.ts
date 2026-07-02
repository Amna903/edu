import { appendFile, mkdir, stat } from "fs/promises";
import { dirname, resolve } from "path";

const CREDENTIALS_DOC_PATH = resolve(process.cwd(), "docs", "provisioned-student-credentials.csv");

async function ensureCredentialsDoc() {
  const dir = dirname(CREDENTIALS_DOC_PATH);
  await mkdir(dir, { recursive: true });

  try {
    await stat(CREDENTIALS_DOC_PATH);
  } catch {
    const header = "created_at_utc,email,password,moodle_user_id\n";
    await appendFile(CREDENTIALS_DOC_PATH, header, "utf8");
  }
}

export async function recordProvisionedStudentCredential(input: {
  email: string;
  password: string;
  moodleUserId: number;
}) {
  await ensureCredentialsDoc();
  const timestamp = new Date().toISOString();
  const row = `${timestamp},${input.email},${input.password},${input.moodleUserId}\n`;
  await appendFile(CREDENTIALS_DOC_PATH, row, "utf8");
}

