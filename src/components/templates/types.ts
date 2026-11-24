import { SocialLinkItem, SocialPlatform } from "@/lib/utils/social-channels";

export type { SocialLinkItem, SocialPlatform };

export type SocialLinks =
  | SocialLinkItem[]
  | {
      tiktok?: string;
      instagram?: string;
      whatsapp?: string;
      youtube?: string;
      website?: string;
      [key: string]: string | undefined;
    };

export interface AppearanceConfig {
  bgType?: "preset" | "solid" | "gradient" | "pattern" | "image";
  bgValue?: string;
  coverBannerUrl?: string;
  buttonStyle?: "rounded" | "pill" | "sharp";
  accentColor?: string;
  socialLinks?: SocialLinks;
}

export interface StoreBlockItem {
  id: string;
  type: "FEATURED_PRODUCT" | "PRODUCT_GRID" | "COMPACT_STRIP" | "IMAGE_BANNER" | "LINK_BUTTON" | "TEXT_QUOTE" | string;
  title?: string | null;
  subtitle?: string | null;
  imageUrl?: string | null;
  targetUrl?: string | null;
  productId?: string | null;
  badgeText?: string | null;
  isActive?: boolean;
  sortOrder?: number;
}

export interface StoreTemplateProduct {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  price: number | string;
  compareAtPrice?: number | string | null;
  images?: string[];
  checkoutMode: string;
  externalPlatform?: string | null;
  externalUrl?: string | null;
  externalLabel?: string | null;
  isFeatured?: boolean;
  category?: string | null;
  productType?: string | null;
  secondaryModes?: Array<{
    mode: string;
    label?: string;
    chatChannel?: string;
    chatHandle?: string;
    externalUrl?: string;
  }> | null;
}

export interface StoreTemplateStore {
  name: string;
  slug: string;
  bio?: string | null;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  locale: string;
  currency: string;
  chatChannel?: string;
  chatHandle?: string | null;
  chatChannels?: Array<{ channel: string; handle: string; isPrimary?: boolean }> | null;
  tier: string;
  templateId?: string;
  appearanceConfig?: AppearanceConfig | null;
  blocks?: StoreBlockItem[] | null;
}

export interface StoreTemplateProps {
  store: StoreTemplateStore;
  products?: StoreTemplateProduct[];
  blocks?: StoreBlockItem[];
  isPreview?: boolean;
  isMockup?: boolean;
}
