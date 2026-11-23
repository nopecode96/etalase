"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const TYPEWRITER_WORDS = ["rafacreative", "kopisenja", "bastianmobil", "aisyahlook"];

interface SubdomainClaimerProps {
  buttonText?: string;
  defaultPlaceholder?: string;
}

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetSlug = claimSlug.trim() || placeholderText || defaultPlaceholder;
    const clean = targetSlug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
    router.push(`/register?slug=${encodeURIComponent(clean)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto lg:mx-0 bg-white border border-[#E7E5E4] rounded-2xl p-1.5 shadow-sm focus-within:border-[#D94E28] focus-within:ring-2 focus-within:ring-[#D94E28]/15 transition-all flex items-center justify-between"
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
  );
}
