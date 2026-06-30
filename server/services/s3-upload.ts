/**
 * 4.2 — S3 Profile Image Upload Service
 * Handles multipart uploads to AWS S3.
 * Falls back gracefully when AWS credentials are not configured.
 */
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { env } from "../config/config.js";

function getS3Client(): S3Client | null {
  if (
    !env.aws.accessKeyId ||
    env.aws.accessKeyId === "your_access_key_here" ||
    !env.aws.secretAccessKey ||
    !env.aws.region ||
    !env.aws.s3BucketName
  ) {
    return null;
  }
  return new S3Client({
    region: env.aws.region,
    credentials: {
      accessKeyId: env.aws.accessKeyId,
      secretAccessKey: env.aws.secretAccessKey,
    },
  });
}

export type UploadResult =
  | { success: true; url: string; key: string }
  | { success: false; error: string };

/**
 * Upload a profile image buffer to S3.
 * Returns the public URL on success.
 */
export async function uploadProfileImage(
  moodleUserId: number,
  buffer: Buffer,
  mimeType: string
): Promise<UploadResult> {
  const client = getS3Client();
  if (!client) {
    return {
      success: false,
      error: "S3 is not configured. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, and AWS_S3_BUCKET_NAME in .env",
    };
  }

  const ext = mimeType === "image/png" ? "png" : mimeType === "image/webp" ? "webp" : "jpg";
  const key = `profile-images/${moodleUserId}/${randomUUID()}.${ext}`;

  await client.send(
    new PutObjectCommand({
      Bucket: env.aws.s3BucketName,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
      CacheControl: "max-age=31536000",
    })
  );

  const url = `https://${env.aws.s3BucketName}.s3.${env.aws.region}.amazonaws.com/${key}`;
  return { success: true, url, key };
}

/** Delete an old profile image from S3 by its key. */
export async function deleteProfileImage(key: string): Promise<void> {
  const client = getS3Client();
  if (!client) return;
  await client.send(
    new DeleteObjectCommand({ Bucket: env.aws.s3BucketName, Key: key })
  ).catch(() => undefined);
}

/** Check if S3 is configured and available. */
export function isS3Configured(): boolean {
  return getS3Client() !== null;
}
