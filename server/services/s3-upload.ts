/**
 * 4.2 — S3 Profile Image Upload Service (Memory Storage Method)
 * Handles multipart uploads directly to AWS S3 without saving locally,
 * and syncs the image to Moodle's native profile.
 */
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";
import { env } from "../config/config.js";
import multer from "multer";
import { prisma } from "../db/prisma.js";

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
 * Upload a profile image buffer directly to S3.
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
      error: "S3 is not configured. Set AWS credentials in .env",
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


// ==========================================
// 🚀 UPLOAD HANDLERS & MIDDLEWARE (MEMORY METHOD)
// ==========================================

/** Multer middleware configuration for parsing image uploads directly into Memory (Buffer) */
export const uploadSingleImage = multer({
  storage: multer.memoryStorage(), // 🔥 Saves directly to RAM instead of Disk
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_req, file, cb) => {
    if (["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPG, PNG, and WEBP are allowed."));
    }
  },
}).single("image");

export type UploadProfileImageResult =
  | { success: true; imageUrl: string }
  | { success: false; status: number; message: string };

/**
 * Handles profile image processing from memory buffer, S3 upload, Moodle sync, local DB sync, and session update.
 */
export async function handleUserProfileImageUpload(
  moodleUserId: number,
  file: Express.Multer.File | undefined,
  sessionUser: Record<string, any>,
  moodleToken: string | undefined
): Promise<UploadProfileImageResult> {
  if (!file || !file.buffer) {
    return { success: false, status: 400, message: "No image file provided" };
  }

  // --- 1. S3 UPLOAD TEMPORARILY COMMENTED OUT ---
  /*
  if (!isS3Configured()) {
    return { success: false, status: 500, message: "S3 storage is not configured on the server." };
  }

  console.log(`[Profile Image] Uploading new image from memory buffer for user ${moodleUserId}...`);

  const result = await uploadProfileImage(
    moodleUserId,
    file.buffer, 
    file.mimetype
  );

  if (!result.success) {
    return { success: false, status: 500, message: result.error };
  }
  */

  // --- 2. MOODLE SYNC ONLY ---
  console.log(`[Profile Image] Attempting Moodle upload ONLY for user ${moodleUserId}...`);

  if (moodleToken) {
    const ext = file.mimetype === "image/png" ? "png" : file.mimetype === "image/webp" ? "webp" : "jpg";
    const fileName = `profile-${moodleUserId}-${Date.now()}.${ext}`;
    
    const moodleSyncRes = await updateMoodleUserPictureFromBuffer(
      moodleToken,
      moodleUserId,
      file.buffer,
      fileName,
      file.mimetype
    );

    if (!moodleSyncRes.success) {
      console.error(`⚠️ [Profile Image] Moodle sync failed: ${moodleSyncRes.message}`);
      // Failing the request entirely since we are only testing Moodle right now
      return { success: false, status: 500, message: `Moodle Sync Failed: ${moodleSyncRes.message}` };
    }
  } else {
    console.warn(`⚠️ [Profile Image] No Moodle token provided. Skipping native Moodle profile update.`);
    return { success: false, status: 400, message: "No Moodle token provided" };
  }

  // --- 3. LOCAL DB TEMPORARILY COMMENTED OUT ---
  /*
  await prisma.user.update({
    where: { moodleUserId },
    data: { profileImage: result.url },
  }).catch((err) => {
    console.warn("[Profile Image] Could not update local DB:", err.message);
  });
  */

  // --- 4. SESSION UPDATE TEMPORARILY COMMENTED OUT ---
  /*
  sessionUser.profileImageUrl = result.url;
  */

  console.log(`✅ [Profile Image] Successfully updated for user ${moodleUserId} on Moodle ONLY`);

  // Returning the existing session URL or a dummy string just to satisfy the frontend response format
  return { success: true, imageUrl: sessionUser.profileImageUrl || "https://dummy-moodle-test.com/image.jpg" };
}
// server/services/moodle/moodle-auth.ts

/**
 * Upload image buffer to Moodle user draft area and update user's native profile picture.
 */
// server/services/moodle/moodle-auth.ts

import { getMoodleAdminToken } from "./moodle/moodle-tokens.js";

export async function updateMoodleUserPictureFromBuffer(
  moodleToken: string,
  userId: number,
  buffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<{ success: boolean; message?: string }> {
  try {
    if (!moodleToken) {
      return { success: false, message: "No user token provided" };
    }

    const baseUrl = env.moodle.baseUrl;

    // ==========================================
    // STEP 1: UPLOAD BINARY FILE TO MOODLE
    // 🔥 Strictly using the Student's own token
    // ==========================================
    const draftEndpoint = `${baseUrl}/webservice/upload.php?token=${moodleToken}`;
    const formData = new FormData();
    
    // Send raw binary buffer directly
    const blob = new Blob([new Uint8Array(buffer)], { type: mimeType });
    formData.append("file", blob, fileName);

    console.log(`📸 [Moodle] Uploading binary to upload.php as the user...`);
    const draftRes = await fetch(draftEndpoint, { 
      method: "POST", 
      body: formData 
    });
    
    const draftText = await draftRes.text();
    let draftData;
    try {
      draftData = JSON.parse(draftText);
    } catch (e) {
      return { success: false, message: "Invalid JSON from upload.php: " + draftText.substring(0, 100) };
    }

    // upload.php usually returns an array containing the file info
    const uploadedFile = Array.isArray(draftData) ? draftData[0] : draftData;

    if (uploadedFile?.error || !uploadedFile?.itemid) {
      return { success: false, message: uploadedFile?.error || "Binary draft upload failed" };
    }
    
    const draftId = uploadedFile.itemid;
    console.log(`✅ [Moodle] File uploaded! Draft ID: ${draftId}`);

    // ==========================================
    // STEP 2: APPLY DRAFT TO USER PROFILE
    // ==========================================
    const updateEndpoint = `${baseUrl}/webservice/rest/server.php`;
    const updateParams = new URLSearchParams({
      wstoken: moodleToken, // Using student's token here as well
      wsfunction: "core_user_update_picture",
      moodlewsrestformat: "json",
      draftitemid: String(draftId),
      userid: String(userId),
    });

    console.log(`📸 [Moodle] Applying draft ${draftId} to profile...`);
    const updateRes = await fetch(updateEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: updateParams,
    });
    const updateData = await updateRes.json();

    if (updateData && updateData.exception) {
      return { success: false, message: updateData.message || "Picture assignment failed" };
    }

    console.log(`✅ [Moodle] Profile picture successfully synced for user ${userId}!`);
    return { success: true };
  } catch (error) {
    console.error("❌ updateMoodleUserPictureFromBuffer error:", error);
    return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
  }
}