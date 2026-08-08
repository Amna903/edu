import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";
import { env } from "../config/config.js";

const ALGORITHM = "aes-256-gcm";
const KEY = createHash("sha256").update(env.sessionEncryptionKey).digest();

/** Encrypts data stored by this server; encryption keys are never sent to clients. */
export function encryptAtRest(value: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGORITHM, KEY, iv);
  const ciphertext = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `v1.${iv.toString("base64url")}.${tag.toString("base64url")}.${ciphertext.toString("base64url")}`;
}

export function decryptAtRest(value: string): string {
  const [version, ivPart, tagPart, ciphertextPart] = value.split(".");
  if (version !== "v1" || !ivPart || !tagPart || !ciphertextPart) {
    throw new Error("Unsupported encrypted value");
  }
  const decipher = createDecipheriv(ALGORITHM, KEY, Buffer.from(ivPart, "base64url"));
  decipher.setAuthTag(Buffer.from(tagPart, "base64url"));
  return Buffer.concat([
    decipher.update(Buffer.from(ciphertextPart, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}
