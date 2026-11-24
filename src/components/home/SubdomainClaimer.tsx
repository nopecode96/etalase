"use client";

import React, { useState, useEffect, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { actionCheckSlug } from "@/app/onboarding/actions";

const TYPEWRITER_WORDS = ["rafacreative", "kopisenja", "bastianmobil", "aisyahlook"];

interface SubdomainClaimerProps {
  buttonText?: string;
  defaultPlaceholder?: string;
}

type AvailabilityStatus = "idle" | "checking" | "available" | "taken";

export function SubdomainClaimer({
  buttonText = "Klaim Gratis",
  defaultPlaceholder = "namamu",
}: SubdomainClaimerProps) {
  const router = useRouter();
  const [claimSlug, setClaimSlug] = useState("");
  const [placeholderText, setPlaceholderText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [status, setStatus] = useState<AvailabilityStatus>("idle");
  const [checkedSlug, setCheckedSlug] = useState("");
  const [, startTransition] = useTransition();

  // Typewriter effect inside input placeholder
  useEffect(() => {
    const currentWord = TYPEWRITER_WORDS[wordIndex % TYPEWRITER_WORDS.length];
    const typingSpeed = isDeleting ? 40 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          setPlaceholderText(currentWord.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1400);
        }
      } else {
        if (charIndex > 0) {
          setPlaceholderText(currentWord.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => prev + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex]);

  // Debounced availability check
  const checkAvailability = useCallback((slug: string) => {
    const clean = slug.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/^-+|-+$/g, "");
    if (!clean || clean.length < 2) {
      setStatus("idle");
      return;
    }
    setStatus("checking");
    setCheckedSlug(clean);
    startTransition(async () => {
      try {
        const result = await actionCheckSlug(clean);
        if (result && result.success && result.data) {
          setStatus(result.data.available ? "available" : "taken");
        } else {
          setStatus("idle");
        }
      } catch {
        setStatus("idle");
      }
    });
  }, []);

  useEffect(() => {
    if (!claimSlug.trim()) {
      setStatus("idle");
      return;
    }
    const timer = setTimeout(() => checkAvailability(claimSlug), 350);
    return () => clearTimeout(timer);
  }, [claimSlug, checkAvailability]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetSlug = claimSlug.trim() || placeholderText || defaultPlaceholder;
    const clean = targetSlug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
    router.push(`/register?slug=${encodeURIComponent(clean)}`);
  };

  return (
    <div className="max-w-lg mx-auto lg:mx-0 space-y-2">
      <form
        onSubmit={handleSubmit}
        className={`bg-white border rounded-2xl p-1.5 shadow-sm transition-all flex items-center justify-between ${
          status === "available"
            ? "border-emerald-400 ring-2 ring-emerald-400/15"
            : status === "taken"
            ? "border-red-400 ring-2 ring-red-400/15"
            : "border-[#E7E5E4] focus-within:border-[#D94E28] focus-within:ring-2 focus-within:ring-[#D94E28]/15"
        }`}
      >
        <div className="flex items-center w-full px-3 py-2 text-sm">
          <input
            type="text"
            placeholder={placeholderText || defaultPlaceholder}
            value={claimSlug}
            onChange={(e) => setClaimSlug(e.target.value)}
            className="w-full bg-transparent text-[#1C1917] font-semibold focus:outline-none placeholder:text-[#57534E]/40 text-sm sm:text-base tracking-tight"
          />
          <span className="text-[#57534E]/70 font-semibold select-none text-xs sm:text-sm pl-1 pr-2 whitespace-nowrap">
            .etalase.online
          </span>
        </div>

        <button
          type="submit"
          className="bg-[#D94E28] hover:bg-[#B83E1D] text-white font-semibold px-5 sm:px-6 py-3 rounded-xl text-xs sm:text-sm transition-colors shrink-0 shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Availability status feedback */}
      {status === "checking" && (
        <div className="flex items-center gap-2 text-xs text-[#57534E] pl-1">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D94E28]" />
          <span>Memeriksa ketersediaan...</span>
        </div>
      )}
      {status === "available" && (
        <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold pl-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{checkedSlug}.etalase.online tersedia! 🎉</span>
        </div>
      )}
      {status === "taken" && (
        <div className="flex items-center gap-2 text-xs text-red-600 font-semibold pl-1">
          <XCircle className="w-3.5 h-3.5" />
          <span>Slug sudah digunakan, coba nama lain</span>
        </div>
      )}
    </div>
  );
}
