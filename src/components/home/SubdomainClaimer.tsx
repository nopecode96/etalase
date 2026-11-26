"use client";

import React, { useState, useEffect, useTransition, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, XCircle, Loader2, Sparkles } from "lucide-react";
import { actionCheckSlug } from "@/app/onboarding/actions";
import { validateSubdomainFormat } from "@/lib/core/formatters";
import { trackGtmClaimClick } from "@/lib/analytics/gtm";

const TYPEWRITER_WORDS = ["tokokamu", "kopisenja", "bastianmobil", "aisyahlook"];

interface SubdomainClaimerProps {
  buttonText?: string;
  defaultPlaceholder?: string;
  registerBasePath?: string;
}

type AvailabilityStatus = "idle" | "checking" | "available" | "taken" | "invalid";

export function SubdomainClaimer({
  buttonText = "Klaim Gratis",
  defaultPlaceholder = "namamu",
  registerBasePath = "/register",
}: SubdomainClaimerProps) {
  const router = useRouter();
  const [claimSlug, setClaimSlug] = useState("");
  const [placeholderText, setPlaceholderText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [status, setStatus] = useState<AvailabilityStatus>("idle");
  const [checkedSlug, setCheckedSlug] = useState("");
  const [suggestion, setSuggestion] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [, startTransition] = useTransition();
  const latestQueryRef = useRef("");

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

  const checkAvailability = useCallback((rawInput: string) => {
    const trimmed = rawInput.trim().toLowerCase();
    if (!trimmed) {
      setStatus("idle");
      setCheckedSlug("");
      setSuggestion(undefined);
      setErrorMessage(undefined);
      return;
    }

    const formatCheck = validateSubdomainFormat(trimmed);
    if (!formatCheck.valid) {
      setStatus("invalid");
      setCheckedSlug(trimmed);
      setSuggestion(undefined);
      setErrorMessage(formatCheck.message);
      return;
    }

    const clean = formatCheck.slug;
    latestQueryRef.current = clean;
    setStatus("checking");
    setCheckedSlug(clean);
    setSuggestion(undefined);
    setErrorMessage(undefined);

    startTransition(async () => {
      try {
        const result = await actionCheckSlug(clean);
        if (latestQueryRef.current !== clean) return;
        if (result && result.success && result.data) {
          setCheckedSlug(result.data.slug);
          setSuggestion(result.data.suggestion);
          setErrorMessage(result.data.message);
          if (result.data.available) {
            setStatus("available");
          } else if (result.data.reason === "format" || result.data.reason === "length") {
            setStatus("invalid");
          } else {
            setStatus("taken");
          }
        } else {
          setStatus("invalid");
          setErrorMessage("Subdomain tidak dapat diperiksa saat ini.");
        }
      } catch {
        if (latestQueryRef.current === clean) {
          setStatus("idle");
        }
      }
    });
  }, []);

  useEffect(() => {
    if (!claimSlug.trim()) {
      latestQueryRef.current = "";
      setStatus("idle");
      setSuggestion(undefined);
      setErrorMessage(undefined);
      return;
    }
    const timer = setTimeout(() => checkAvailability(claimSlug), 300);
    return () => clearTimeout(timer);
  }, [claimSlug, checkAvailability]);

  const handleApplySuggestion = () => {
    if (!suggestion) return;
    setClaimSlug(suggestion);
    checkAvailability(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = claimSlug.trim().toLowerCase();

    if (trimmed) {
      const formatCheck = validateSubdomainFormat(trimmed);
      if (!formatCheck.valid) {
        setStatus("invalid");
        setErrorMessage(formatCheck.message);
        return;
      }
      if (status === "taken") {
        if (suggestion) {
          trackGtmClaimClick({ slug: suggestion, available: true, source: "hero_suggestion" });
          router.push(`${registerBasePath}?slug=${encodeURIComponent(suggestion)}`);
          return;
        }
        return;
      }
      trackGtmClaimClick({
        slug: formatCheck.slug,
        available: status === "available" ? true : undefined,
        source: "hero_input",
      });
      router.push(`${registerBasePath}?slug=${encodeURIComponent(formatCheck.slug)}`);
      return;
    }

    const fallbackSlug = (placeholderText || defaultPlaceholder)
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "");
    trackGtmClaimClick({ slug: fallbackSlug, source: "hero_placeholder" });
    router.push(`${registerBasePath}?slug=${encodeURIComponent(fallbackSlug)}`);
  };

  return (
    <div className="max-w-lg mx-auto lg:mx-0 space-y-2">
      <form
        onSubmit={handleSubmit}
        className={`bg-white border rounded-2xl p-1.5 shadow-sm transition-all flex items-center justify-between ${
          status === "available"
            ? "border-emerald-400 ring-2 ring-emerald-400/15"
            : status === "taken" || status === "invalid"
            ? "border-red-400 ring-2 ring-red-400/15"
            : "border-[#E7E5E4] focus-within:border-[#D94E28] focus-within:ring-2 focus-within:ring-[#D94E28]/15"
        }`}
      >
        <div className="flex items-center w-full px-3 py-2 text-sm min-w-0">
          <input
            type="text"
            maxLength={30}
            aria-label="Subdomain toko etalase"
            placeholder={placeholderText || defaultPlaceholder}
            value={claimSlug}
            onChange={(e) => setClaimSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
            className="w-full min-w-0 bg-transparent text-[#1C1917] font-semibold focus:outline-none placeholder:text-[#57534E]/40 text-sm sm:text-base tracking-tight"
          />
          <span className="text-[#57534E]/70 font-semibold select-none text-xs sm:text-sm pl-1 pr-2 whitespace-nowrap">
            .etalase.online
          </span>
        </div>

        <button
          type="submit"
          className="bg-[#D94E28] hover:bg-[#B83E1D] text-white font-semibold px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm transition-colors shrink-0 shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Availability status feedback */}
      {status === "checking" && (
        <div className="flex items-center gap-2 text-xs text-[#57534E] pl-1">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D94E28]" />
          <span>Memeriksa ketersediaan {checkedSlug}.etalase.online...</span>
        </div>
      )}
      {status === "available" && (
        <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold pl-1">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>✓ {checkedSlug}.etalase.online tersedia</span>
        </div>
      )}
      {status === "taken" && (
        <div className="flex flex-wrap items-center gap-2 text-xs text-red-600 font-semibold pl-1">
          <span className="inline-flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5 shrink-0" />
            <span>✗ {errorMessage || `${checkedSlug} sudah dipakai`}</span>
          </span>
          {suggestion && (
            <button
              type="button"
              onClick={handleApplySuggestion}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>coba {suggestion}</span>
            </button>
          )}
        </div>
      )}
      {status === "invalid" && (
        <div className="flex items-center gap-2 text-xs text-red-600 font-medium pl-1">
          <XCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMessage || "Format subdomain belum sesuai (3–30 karakter, huruf kecil, angka, satu tanda hubung)."}</span>
        </div>
      )}
      {status === "idle" && (
        <p className="text-[11px] text-[#57534E]/80 pl-1">
          Huruf kecil, angka, atau satu tanda hubung (3–30 karakter).
        </p>
      )}
    </div>
  );
}
