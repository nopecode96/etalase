"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Loader2, QrCode } from "lucide-react";

interface QrCodeImageProps {
  value: string;
  alt: string;
  size?: number;
  className?: string;
}

/**
 * Generates and renders a crisp local QR code data URL directly in-browser
 * without delegating payment strings to third-party image APIs.
 */
export function QrCodeImage({
  value,
  alt,
  size = 320,
  className = "w-full h-full object-contain",
}: QrCodeImageProps) {
  const [dataUrl, setDataUrl] = useState<string>("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    setFailed(false);

    if (!value) {
      setDataUrl("");
      return;
    }

    QRCode.toDataURL(value, {
      width: size,
      margin: 1,
      errorCorrectionLevel: "M",
      color: {
        dark: "#111827",
        light: "#FFFFFF",
      },
    })
      .then((url) => {
        if (active) setDataUrl(url);
      })
      .catch(() => {
        if (active) setFailed(true);
      });

    return () => {
      active = false;
    };
  }, [value, size]);

  if (failed) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 gap-1">
        <QrCode className="w-8 h-8" />
        <span className="text-[10px]">QR error</span>
      </div>
    );
  }

  if (!dataUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center text-stone-400">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return <img src={dataUrl} alt={alt} className={className} />;
}
