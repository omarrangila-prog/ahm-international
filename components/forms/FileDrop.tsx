"use client";

import { useCallback, useRef, useState } from "react";
import { FileText, Upload, X, AlertCircle } from "lucide-react";
import {
  ACCEPT_ATTRIBUTE,
  MAX_FILE_BYTES,
  MAX_FILES,
  MAX_TOTAL_BYTES,
  isAcceptedUpload,
  sanitiseFilename,
} from "@/lib/upload-policy";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Tech pack upload.
 *
 * Validates type, per-file size and total size in the browser so a buyer sees a
 * problem immediately instead of after a slow upload — the server applies the
 * same rules again, because client-side checks are a courtesy and not a control.
 *
 * Filenames are sanitised before display: they come from the user's machine and
 * are rendered back into the page, so a name containing markup or control
 * characters is neutralised rather than trusted.
 */

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} kB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function FileDrop({
  files,
  onChange,
  tone = "light",
}: {
  files: File[];
  onChange: (files: File[]) => void;
  tone?: "light" | "dark";
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const accept = useCallback(
    (incoming: FileList | null) => {
      if (!incoming || incoming.length === 0) return;
      setError(null);

      const next = [...files];
      let total = files.reduce((sum, f) => sum + f.size, 0);

      for (const file of Array.from(incoming)) {
        const safeName = sanitiseFilename(file.name);

        if (next.length >= MAX_FILES) {
          setError(`You can attach up to ${MAX_FILES} files.`);
          break;
        }
        if (!isAcceptedUpload(safeName, file.type)) {
          setError(`"${safeName}" is not an accepted file type.`);
          track("techpack_upload_error", { reason: "type" });
          continue;
        }
        if (file.size > MAX_FILE_BYTES) {
          setError(`"${safeName}" is larger than ${Math.round(MAX_FILE_BYTES / 1024 / 1024)} MB.`);
          track("techpack_upload_error", { reason: "file_size" });
          continue;
        }
        if (total + file.size > MAX_TOTAL_BYTES) {
          setError(`Attachments total more than ${Math.round(MAX_TOTAL_BYTES / 1024 / 1024)} MB.`);
          track("techpack_upload_error", { reason: "total_size" });
          break;
        }
        // Skip an identical file added twice.
        if (next.some((f) => f.name === file.name && f.size === file.size)) continue;

        next.push(file);
        total += file.size;
      }

      if (next.length !== files.length) {
        track("techpack_upload_complete", { count: next.length });
      }
      onChange(next);
    },
    [files, onChange],
  );

  const dark = tone === "dark";

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          accept(e.dataTransfer.files);
        }}
        className={cn(
          "flex flex-col items-center justify-center gap-3 border-2 border-dashed px-6 py-10 text-center transition-colors duration-200",
          dragging
            ? "border-ink bg-ink/5"
            : dark
              ? "border-current/25 hover:border-current/45"
              : "border-ink/20 hover:border-ink/40",
        )}
      >
        <Upload className={cn("h-6 w-6", dark ? "text-current/70" : "text-ink/60")} aria-hidden="true" />
        <div>
          <button
            type="button"
            onClick={() => {
              track("techpack_upload_start", { location: "rfq_form" });
              inputRef.current?.click();
            }}
            className="font-display text-sm font-bold uppercase tracking-[0.06em] text-ink underline-offset-4 hover:underline"
          >
            Choose files
          </button>
          <span className={cn("ml-1.5 text-sm", dark ? "text-current/60" : "text-ink/60")}>
            or drag them here
          </span>
        </div>
        <p className={cn("text-xs", dark ? "text-current/70" : "text-ink/60")}>
          PDF, XLSX, DOCX, JPG, PNG or ZIP · up to {Math.round(MAX_FILE_BYTES / 1024 / 1024)} MB each ·{" "}
          {MAX_FILES} files max
        </p>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPT_ATTRIBUTE}
          className="sr-only"
          aria-label="Attach tech pack or reference files"
          onChange={(e) => {
            accept(e.target.files);
            // Reset so re-selecting the same file still fires a change event.
            e.target.value = "";
          }}
        />
      </div>

      {error && (
        <p role="alert" className="mt-3 flex items-start gap-2 text-xs font-medium text-ink">
          <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      {files.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2">
            {files.map((file, i) => (
              <li
                key={`${file.name}-${file.size}`}
                className={cn(
                  "flex items-center justify-between gap-4 border px-4 py-3",
                  dark ? "border-current/20" : "border-line bg-paper",
                )}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <FileText className="h-4 w-4 shrink-0 text-ink" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{sanitiseFilename(file.name)}</span>
                    <span className={cn("text-xs", dark ? "text-current/70" : "text-ink/60")}>
                      {formatBytes(file.size)}
                    </span>
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => onChange(files.filter((_, index) => index !== i))}
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center transition-colors",
                    dark ? "text-current/70 hover:text-current" : "text-ink/60 hover:text-ink",
                  )}
                  aria-label={`Remove ${sanitiseFilename(file.name)}`}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
