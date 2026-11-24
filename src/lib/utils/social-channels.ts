export type SocialPlatform =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "facebook"
  | "x"
  | "threads"
  | "telegram"
  | "linkedin"
  | "website";

export interface SocialLinkItem {
  id: string;
  platform: SocialPlatform;
  handleOrUrl: string;
  sortOrder: number;
}

export interface PlatformMeta {
  id: SocialPlatform;
  name: string;
  placeholder: string;
  baseUrl: string;
  prefix: string;
}

export const SUPPORTED_PLATFORMS: Record<SocialPlatform, PlatformMeta> = {
  instagram: {
    id: "instagram",
    name: "Instagram",
    placeholder: "@username or profile link",
    baseUrl: "https://instagram.com/",
    prefix: "@",
  },
  tiktok: {
    id: "tiktok",
    name: "TikTok",
    placeholder: "@username or profile link",
    baseUrl: "https://tiktok.com/@",
    prefix: "@",
  },
  youtube: {
    id: "youtube",
    name: "YouTube",
    placeholder: "@channel or youtube.com/...",
    baseUrl: "https://youtube.com/@",
    prefix: "@",
  },
  facebook: {
    id: "facebook",
    name: "Facebook",
    placeholder: "username or page URL",
    baseUrl: "https://facebook.com/",
    prefix: "",
  },
  x: {
    id: "x",
    name: "X (Twitter)",
    placeholder: "@handle or x.com/...",
    baseUrl: "https://x.com/",
    prefix: "@",
  },
  threads: {
    id: "threads",
    name: "Threads",
    placeholder: "@username or threads.net/...",
    baseUrl: "https://threads.net/@",
    prefix: "@",
  },
  telegram: {
    id: "telegram",
    name: "Telegram",
    placeholder: "@username or t.me/channel",
    baseUrl: "https://t.me/",
    prefix: "@",
  },
  linkedin: {
    id: "linkedin",
    name: "LinkedIn",
    placeholder: "username or profile URL",
    baseUrl: "https://linkedin.com/in/",
    prefix: "",
  },
  website: {
    id: "website",
    name: "Website / Link",
    placeholder: "https://yourwebsite.com",
    baseUrl: "https://",
    prefix: "",
  },
};

/**
 * Normalizes input handle or raw URL into a secure, absolute destination URL.
 * Automatically guards against dangerous schemes (javascript:, data:) and formats @usernames.
 */
export function normalizeSocialUrl(
  platform: SocialPlatform,
  rawInput: string
): string {
  if (!rawInput) return "";

  const trimmed = rawInput.trim();
  if (!trimmed) return "";

  // Security guard: prevent XSS through pseudo-protocols
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("vbscript:")
  ) {
    return "";
  }

  // If already an absolute URL (http:// or https://)
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // Strip leading @ for handle reconstruction
  const cleanHandle = trimmed.startsWith("@") ? trimmed.slice(1) : trimmed;

  switch (platform) {
    case "instagram":
      return `https://instagram.com/${cleanHandle.replace(/^https?:\/\/(www\.)?instagram\.com\//, "")}`;

    case "tiktok":
      return `https://tiktok.com/@${cleanHandle.replace(/^https?:\/\/(www\.)?tiktok\.com\/@?/, "")}`;

    case "youtube":
      if (cleanHandle.includes("/")) {
        return `https://youtube.com/${cleanHandle.replace(/^https?:\/\/(www\.)?youtube\.com\//, "")}`;
      }
      return `https://youtube.com/@${cleanHandle}`;

    case "facebook":
      return `https://facebook.com/${cleanHandle.replace(/^https?:\/\/(www\.)?facebook\.com\//, "")}`;

    case "x":
      return `https://x.com/${cleanHandle.replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//, "")}`;

    case "threads":
      return `https://threads.net/@${cleanHandle.replace(/^https?:\/\/(www\.)?threads\.net\/@?/, "")}`;

    case "telegram":
      return `https://t.me/${cleanHandle.replace(/^https?:\/\/(www\.)?t\.me\//, "")}`;

    case "linkedin":
      if (cleanHandle.includes("/")) {
        return `https://linkedin.com/${cleanHandle.replace(/^https?:\/\/(www\.)?linkedin\.com\//, "")}`;
      }
      return `https://linkedin.com/in/${cleanHandle}`;

    case "website":
      return trimmed.startsWith("http://") || trimmed.startsWith("https://")
        ? trimmed
        : `https://${trimmed}`;

    default:
      return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
  }
}

/**
 * Parses social links safely from either the new SocialLinkItem[] array format
 * or the legacy Record<string, string> format, providing seamless backward compatibility.
 */
export function parseSocialLinks(raw: any): SocialLinkItem[] {
  if (!raw) return [];

  // Case 1: Already an array of SocialLinkItem
  if (Array.isArray(raw)) {
    return raw
      .filter((item) => item && typeof item === "object" && item.platform)
      .map((item, index) => ({
        id: item.id || `social-${index}-${Date.now()}`,
        platform: (item.platform in SUPPORTED_PLATFORMS
          ? item.platform
          : "website") as SocialPlatform,
        handleOrUrl: typeof item.handleOrUrl === "string" ? item.handleOrUrl : "",
        sortOrder: typeof item.sortOrder === "number" ? item.sortOrder : index,
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  // Case 2: Legacy Object format ({ instagram: "...", tiktok: "...", ... })
  if (typeof raw === "object") {
    const list: SocialLinkItem[] = [];
    let idx = 0;

    for (const [key, val] of Object.entries(raw)) {
      if (typeof val === "string" && val.trim()) {
        const platformKey = key.toLowerCase() as SocialPlatform;
        if (platformKey in SUPPORTED_PLATFORMS) {
          list.push({
            id: `legacy-${platformKey}-${idx}`,
            platform: platformKey,
            handleOrUrl: val.trim(),
            sortOrder: idx,
          });
          idx++;
        }
      }
    }

    return list;
  }

  return [];
}
