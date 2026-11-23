export interface StoreTemplateProps {
  store: {
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
  };
  products?: Array<{
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
    secondaryModes?: Array<{
      mode: string;
      label?: string;
      chatChannel?: string;
      chatHandle?: string;
      externalUrl?: string;
    }> | null;
  }>;
  blocks?: Array<{
    id: string;
    type: string;
    title?: string | null;
    content?: Record<string, unknown> | null;
  }>;
  isPreview?: boolean;
}
