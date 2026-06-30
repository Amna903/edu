/**
 * 4.2 — Profile Image Upload Component
 * Handles file selection, preview, and POST to /api/profile/upload-image
 */
import { useRef, useState } from "react";
import { Camera, Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";

interface ProfileImageUploadProps {
  currentImageUrl?: string | null;
  userName?: string;
  size?: "sm" | "md" | "lg";
  onUploaded?: (url: string) => void;
}

export function ProfileImageUpload({
  currentImageUrl,
  userName = "",
  size = "md",
  onUploaded,
}: ProfileImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const queryClient = useQueryClient();

  const sizes = {
    sm: "h-16 w-16 text-xl",
    md: "h-24 w-24 text-3xl",
    lg: "h-32 w-32 text-4xl",
  };

  const initials = userName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const displayUrl = preview ?? currentImageUrl;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Only JPEG, PNG, and WebP images are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5 MB.");
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    // Upload
    setError("");
    setSuccess("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/profile/upload-image", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const body = await res.json();

      if (!res.ok) {
        setError(body.message ?? "Upload failed.");
        setPreview(null);
        return;
      }

      if (body.configured === false) {
        setError("S3 storage is not yet configured — contact your administrator.");
        setPreview(null);
        return;
      }

      setSuccess("Profile photo updated.");
      onUploaded?.(body.url);
      // Refresh auth/me so header avatar updates
      queryClient.invalidateQueries({ queryKey: [api.auth.me.path] });
    } catch {
      setError("Upload failed. Please try again.");
      setPreview(null);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Avatar */}
      <div className={`relative ${sizes[size]} rounded-full overflow-hidden bg-blue-100 flex items-center justify-center`}>
        {displayUrl ? (
          <img
            src={displayUrl}
            alt={userName || "Profile"}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-bold text-blue-700">
            {initials || <User className="h-1/2 w-1/2 text-blue-400" />}
          </span>
        )}

        {/* Overlay button */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          aria-label="Change profile photo"
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition rounded-full"
        >
          {uploading ? (
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          ) : (
            <Camera className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="text-xs"
      >
        {uploading ? "Uploading..." : "Change Photo"}
      </Button>

      {error && (
        <p className="text-xs text-red-600 text-center max-w-[200px]">{error}</p>
      )}
      {success && (
        <p className="text-xs text-emerald-600 text-center">{success}</p>
      )}
      <p className="text-xs text-slate-400 text-center">JPEG, PNG or WebP · max 5 MB</p>
    </div>
  );
}
