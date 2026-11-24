"use client";

import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";

function PopupCallbackContent() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/onboarding";

  useEffect(() => {
    // Notify parent window that authentication completed successfully
    if (window.opener && !window.opener.closed) {
      try {
        window.opener.postMessage(
          {
            type: "ETALASE_AUTH_SUCCESS",
            url: redirectUrl,
          },
          window.location.origin
        );
      } catch (err) {
        console.error("Popup postMessage error:", err);
      }

      // Close this mini popup window
      const timer = setTimeout(() => {
        window.close();
      }, 400);

      return () => clearTimeout(timer);
    } else {
      // In case the user opened this tab directly without opener
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center items-center p-6 text-center">
      <div className="w-full max-w-xs bg-white rounded-3xl border border-[#E7E5E4] p-8 shadow-sm space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mx-auto">
          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
        </div>
        <div className="space-y-1">
          <h2 className="text-base font-bold text-[#1C1917]">
            Sign-in Successful!
          </h2>
          <p className="text-xs text-[#57534E]">
            Closing this window and opening your dashboard...
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PopupCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-[#D94E28]" />
        </div>
      }
    >
      <PopupCallbackContent />
    </Suspense>
  );
}
