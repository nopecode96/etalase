import React from "react";
import { ArrowUpRight } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcons";
import {
  OFFICIAL_SOCIAL_ACCOUNTS,
  SupportedLocale,
} from "@/lib/config/constants";

interface OfficialSocialLinksProps {
  locale?: SupportedLocale;
  variant?: "pills" | "cards" | "inline";
  cardBg?: "white" | "cream";
  showHeading?: boolean;
  align?: "left" | "center";
  gridItemsOnly?: boolean;
}

const SOCIAL_COPY: Record<
  SupportedLocale,
  { heading: string; officialLabel: (platform: string) => string }
> = {
  id: {
    heading: "Media Sosial Resmi",
    officialLabel: (platform) => `${platform} Resmi`,
  },
  en: {
    heading: "Official Social Channels",
    officialLabel: (platform) => `Official ${platform}`,
  },
  ms: {
    heading: "Media Sosial Rasmi",
    officialLabel: (platform) => `${platform} Rasmi`,
  },
  th: {
    heading: "โซเชียลมีเดียทางการ",
    officialLabel: (platform) => `${platform} ทางการ`,
  },
  vi: {
    heading: "Mạng Xã Hội Chính Thức",
    officialLabel: (platform) => `${platform} Chính Thức`,
  },
};

/**
 * Renders verified official Etalase.online social links (Instagram & Threads)
 * in uniform visual variants across footer, contact, about, help center, and blog pages.
 */
export function OfficialSocialLinks({
  locale = "id",
  variant = "pills",
  cardBg = "white",
  showHeading = false,
  align = "left",
  gridItemsOnly = false,
}: OfficialSocialLinksProps) {
  const copy = SOCIAL_COPY[locale] || SOCIAL_COPY.id;

  if (variant === "cards") {
    const bgClass = cardBg === "cream" ? "bg-[#FAF8F5]" : "bg-white";
    const cards = OFFICIAL_SOCIAL_ACCOUNTS.map((account) => (
      <a
        key={account.id}
        href={account.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${copy.officialLabel(account.name)} (${account.handle})`}
        className={`${bgClass} p-4 rounded-2xl border border-[#E7E5E4] hover:border-[#D94E28] transition group flex items-center justify-between gap-3`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#FDF0EC] border border-[#FADCD3] flex items-center justify-center text-[#D94E28] shrink-0 group-hover:bg-[#D94E28] group-hover:text-white transition">
            <SocialIcon platform={account.id} className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] uppercase font-bold text-[#57534E] block">
              {copy.officialLabel(account.name)}
            </span>
            <span className="font-bold text-xs sm:text-sm text-[#1C1917] group-hover:text-[#D94E28] transition truncate block">
              {account.handle}
            </span>
          </div>
        </div>
        <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-[#D94E28] transition shrink-0" />
      </a>
    ));

    if (gridItemsOnly) {
      return <>{cards}</>;
    }

    return (
      <div className="space-y-3">
        {showHeading && (
          <div className="text-xs font-bold uppercase tracking-wider text-[#57534E]">
            {copy.heading}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{cards}</div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className="flex flex-wrap items-center gap-3">
        {OFFICIAL_SOCIAL_ACCOUNTS.map((account) => (
          <a
            key={account.id}
            href={account.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${copy.officialLabel(account.name)} (${account.handle})`}
            className="inline-flex items-center gap-1.5 text-[#57534E] hover:text-[#D94E28] font-medium transition"
          >
            <SocialIcon platform={account.id} className="w-3.5 h-3.5 text-[#D94E28]" />
            <span>{account.name}</span>
            <span className="font-semibold text-[#1C1917] hover:text-[#D94E28]">
              {account.handle}
            </span>
          </a>
        ))}
      </div>
    );
  }

  const alignClass = align === "center" ? "justify-center" : "justify-start";

  return (
    <div className={`space-y-2 ${align === "center" ? "text-center" : ""}`}>
      {showHeading && (
        <div className="text-[11px] font-bold uppercase tracking-wider text-[#57534E]">
          {copy.heading}
        </div>
      )}
      <div className={`flex flex-wrap items-center gap-2 ${alignClass}`}>
        {OFFICIAL_SOCIAL_ACCOUNTS.map((account) => (
          <a
            key={account.id}
            href={account.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${copy.officialLabel(account.name)} (${account.handle})`}
            className="inline-flex items-center gap-2 bg-[#FAF8F5] hover:bg-[#FDF0EC] border border-[#E7E5E4] hover:border-[#D94E28] text-[#1C1917] hover:text-[#D94E28] px-3 py-1.5 rounded-xl text-xs font-medium transition"
          >
            <SocialIcon platform={account.id} className="w-3.5 h-3.5 text-[#D94E28] shrink-0" />
            <span className="font-semibold">{account.name}</span>
            <span className="text-[#57534E] text-[11px]">{account.handle}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
