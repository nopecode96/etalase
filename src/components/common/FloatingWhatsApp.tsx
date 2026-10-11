"use client";

import { PhoneCall } from "lucide-react";

interface FloatingWhatsAppProps {
  whatsappNumber: string;
  businessName: string;
  themeColor?: string;
}

export function FloatingWhatsApp({
  whatsappNumber,
  businessName,
  themeColor = "#25D366",
}: FloatingWhatsAppProps) {
  const message = encodeURIComponent(
    `Halo *${businessName}*, saya ingin bertanya lebih lanjut. 😊`
  );
  const url = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg text-white font-semibold text-sm transition-transform hover:scale-105"
      style={{ backgroundColor: "#25D366" }}
      aria-label="Hubungi via WhatsApp"
    >
      <PhoneCall size={20} />
      <span>WhatsApp</span>
    </a>
  );
}
