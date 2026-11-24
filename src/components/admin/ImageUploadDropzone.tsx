"use client";

import React, { useState, useRef, useTransition } from "react";
import {
  UploadCloud,
  Image as ImageIcon,
  Loader2,
  Trash2,
  RefreshCw,
  Link as LinkIcon,
  Check,
  AlertCircle,
} from "lucide-react";
import { showToast } from "@/components/ui/GlobalToast";

interface ImageUploadDropzoneProps {
  value: string;
  onChange: (url: string) => void;
  folder: "avatar" | "banner" | "product" | "block" | "payment";
  label?: string;
  helperText?: string;
  aspectRatio?: "square" | "banner" | "product";
  disabled?: boolean;
}

export function ImageUploadDropzone({
  value,
  onChange,
  folder,
  label,
  helperText,
  aspectRatio = "square",
  disabled = false,
}: ImageUploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState(value);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync internal URL input state when external value changes
  React.useEffect(() => {
    setUrlInputValue(value);
  }, [value]);

  const uploadFile = async (file: File) => {
    // Basic client validations
    if (!file.type.startsWith("image/")) {
      showToast("Please upload a valid image file (PNG, JPG, WebP, GIF)", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("File size exceeds 5MB limit. Please optimize your image.", "error");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.url) {
        onChange(data.url);
        setUrlInputValue(data.url);
        showToast("Image uploaded successfully!", "success");
      } else {
        showToast(data.error || "Failed to upload image", "error");
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      showToast("Upload failed. Please check your network connection.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isUploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled || isUploading) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      uploadFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      uploadFile(file);
      // Reset input value so same file can be re-selected if needed
      e.target.value = "";
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setUrlInputValue("");
    showToast("Image removed", "info");
  };

  const handleManualUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(urlInputValue.trim());
    showToast("Image URL applied", "info");
  };

  return (
    <div className="space-y-2 w-full">
      {/* Label and Helper Header */}
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-[#1C1917]">
            {label}
          </label>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] font-semibold text-[#D94E28] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{showUrlInput ? "Hide URL Field" : "Paste URL"}</span>
          </button>
        </div>
      )}

      {/* Hidden Native File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {/* Dropzone Container */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          if (!disabled && !isUploading && fileInputRef.current) {
            fileInputRef.current.click();
          }
        }}
        className={`relative border-2 border-dashed rounded-2xl transition-all cursor-pointer overflow-hidden ${
          isDragging
            ? "border-[#D94E28] bg-[#FDF0EC] ring-4 ring-[#D94E28]/15"
            : value
            ? "border-[#E7E5E4] bg-white hover:border-[#D94E28]/40"
            : "border-[#E7E5E4] bg-[#FAF8F5] hover:bg-stone-50 hover:border-[#D94E28]/50"
        } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        {isUploading ? (
          /* Uploading State */
          <div className="flex flex-col items-center justify-center p-8 space-y-2 text-center min-h-[140px]">
            <Loader2 className="w-8 h-8 animate-spin text-[#D94E28]" />
            <p className="text-xs font-bold text-[#1C1917]">
              Uploading &amp; isolating image...
            </p>
            <p className="text-[11px] text-[#78716C]">
              Storing securely in your tenant vault
            </p>
          </div>
        ) : value ? (
          /* Image Preview State */
          <div className="p-3">
            <div className="flex items-center gap-4">
              <div
                className={`relative rounded-xl overflow-hidden border border-[#E7E5E4] bg-stone-100 shrink-0 ${
                  aspectRatio === "banner"
                    ? "w-36 h-20 sm:w-48 sm:h-24"
                    : aspectRatio === "product"
                    ? "w-20 h-20 sm:w-24 sm:h-24"
                    : "w-16 h-16 sm:w-20 sm:h-20"
                }`}
              >
                <img
                  src={value}
                  alt={label || "Uploaded preview"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback on broken image link
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C1917]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="truncate">Active Image Attached</span>
                </div>
                <p className="text-[11px] text-[#78716C] font-mono truncate">
                  {value}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-semibold transition">
                    <RefreshCw className="w-3 h-3" />
                    <span>Change Image</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-semibold transition cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Dropzone State */
          <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF0EC] text-[#D94E28] flex items-center justify-center">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1C1917]">
                Click to browse or drag &amp; drop image here
              </p>
              <p className="text-[11px] text-[#78716C] mt-0.5">
                PNG, JPG, WebP or GIF (Max. 5MB) &bull; Isolated per tenant
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Helper text */}
      {helperText && !showUrlInput && (
        <p className="text-[11px] text-[#78716C]">{helperText}</p>
      )}

      {/* Collapsible Manual URL Input */}
      {showUrlInput && (
        <div className="flex gap-2 items-center pt-1 animate-fade-in">
          <input
            type="url"
            value={urlInputValue}
            onChange={(e) => setUrlInputValue(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[#E7E5E4] font-mono focus:border-[#D94E28] focus:ring-1 focus:ring-[#D94E28] outline-none"
          />
          <button
            type="button"
            onClick={handleManualUrlSubmit}
            className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-black text-white text-xs font-semibold cursor-pointer transition shrink-0"
          >
            Apply URL
          </button>
        </div>
      )}
    </div>
  );
}
