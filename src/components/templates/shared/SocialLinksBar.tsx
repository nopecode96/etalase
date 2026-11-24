import React from "react";
import {
  parseSocialLinks,
  normalizeSocialUrl,
  SUPPORTED_PLATFORMS,
} from "@/lib/utils/social-channels";
import { SocialIcon } from "@/components/ui/SocialIcons";

export function SocialLinksBar({
  links,
  accentColor,
}: {
  links?: any;
  accentColor?: string;
}) {
  const parsedItems = parseSocialLinks(links);

  const activeLinks = parsedItems
    .map((item) => ({
      id: item.id,
      platform: item.platform,
      url: normalizeSocialUrl(item.platform, item.handleOrUrl),
      label: SUPPORTED_PLATFORMS[item.platform]?.name || item.platform,
    }))
    .filter((item) => Boolean(item.url));

  if (activeLinks.length === 0) return null;

  return (
    <div className="flex items-center justify-center gap-2.5 my-3 flex-wrap">
      {activeLinks.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          title={item.label}
          className="w-8 h-8 rounded-full bg-white/90 border border-black/10 text-stone-700 hover:text-stone-900 shadow-2xs hover:scale-105 transition-all flex items-center justify-center backdrop-blur-xs"
          style={accentColor ? { color: accentColor } : undefined}
        >
          <SocialIcon platform={item.platform} className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
}
