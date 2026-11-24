"use client";

import React, { useState, useTransition } from "react";
import {
  Palette,
  Sparkles,
  Lock,
  Check,
  Loader2,
  ExternalLink,
  Save,
} from "lucide-react";
import { actionUpdateStorefront } from "@/app/admin/actions";
import { showToast } from "@/components/ui/GlobalToast";
import { ImageUploadDropzone } from "@/components/admin/ImageUploadDropzone";
import { SocialChannelsBuilder } from "@/components/admin/SocialChannelsBuilder";
import { SocialLinkItem, parseSocialLinks } from "@/lib/utils/social-channels";

interface AdminStorefrontThemeClientProps {
  store: any;
  tier: "FREE" | "PRO" | "DFY";
}

const TEMPLATES = [
  {
    id: "clean-minimal",
    name: "Clean Minimal",
    badge: "Free & Pro",
    desc: "Mobile-first link in bio with modern product cards and 1-click checkout.",
    isPro: false,
    bgPreview: "bg-white border-stone-200 text-stone-900",
  },
  {
    id: "visual-menu-grid",
    name: "Visual Menu Grid",
    badge: "PRO Only",
    desc: "Optimized for Cafes, Restaurants, and F&B visual menu ordering.",
    isPro: true,
    bgPreview: "bg-amber-50 border-amber-200 text-amber-950",
  },
  {
    id: "showroom-pro",
    name: "Showroom Pro",
    badge: "PRO Only",
    desc: "Tailored for Automotive Dealers, Real Estate brokers & vehicle catalogs.",
    isPro: true,
    bgPreview: "bg-slate-900 border-slate-800 text-white",
  },
  {
    id: "editorial-pastel",
    name: "Editorial Pastel",
    badge: "PRO Only",
    desc: "Soft warm aesthetic for Beauty, Fashion, Skincare & Lifestyle creators.",
    isPro: true,
    bgPreview: "bg-rose-50 border-rose-200 text-rose-950",
  },
];

const ACCENT_COLORS = [
  { id: "#D94E28", name: "Warm Editorial (Default)", class: "bg-[#D94E28]" },
  { id: "#0F172A", name: "Obsidian Slate", class: "bg-slate-900" },
  { id: "#059669", name: "Emerald Growth", class: "bg-emerald-600" },
  { id: "#7C3AED", name: "Royal Violet", class: "bg-purple-600" },
  { id: "#D97706", name: "Warm Amber", class: "bg-amber-600" },
];

export function AdminStorefrontThemeClient({ store, tier }: AdminStorefrontThemeClientProps) {
  const isFree = tier === "FREE";
  const [isPending, startTransition] = useTransition();

  const [selectedTemplate, setSelectedTemplate] = useState(store.templateId || "clean-minimal");
  const [displayMode, setDisplayMode] = useState(store.displayMode || "HYBRID");
  const [avatarUrl, setAvatarUrl] = useState(store.avatarUrl || "");
  const [bannerUrl, setBannerUrl] = useState(store.bannerUrl || "");

  const appearance = typeof store.appearanceConfig === "object" ? store.appearanceConfig : {};
  const [accentColor, setAccentColor] = useState(appearance?.accentColor || "#D94E28");
  const [socialChannels, setSocialChannels] = useState<SocialLinkItem[]>(() =>
    parseSocialLinks(appearance?.socialLinks)
  );

  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [upgradeFeatureName, setUpgradeFeatureName] = useState("");

  const handleSelectTemplate = (tpl: (typeof TEMPLATES)[0]) => {
    if (tpl.isPro && isFree) {
      setUpgradeFeatureName(tpl.name);
      setUpgradeModalOpen(true);
      return;
    }

    setSelectedTemplate(tpl.id);
    startTransition(async () => {
      const res = await actionUpdateStorefront({
        storeId: store.id,
        templateId: tpl.id,
      });
      if (res.success) {
        showToast(`Template switched to ${tpl.name}!`, "success");
      } else {
        showToast(res.error || "Failed to switch template", "error");
      }
    });
  };

  const handleSaveAppearance = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await actionUpdateStorefront({
        storeId: store.id,
        templateId: selectedTemplate,
        displayMode,
        avatarUrl,
        bannerUrl,
        accentColor,
        socialLinks: socialChannels,
      });

      if (res.success) {
        showToast("Templates & Brand Theme saved successfully!", "success");
      } else {
        showToast(res.error || "Failed to save theme", "error");
      }
    });
  };

  return (
    <div className="space-y-8 animate-fade-in w-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1C1917]">
          Templates &amp; Theme
        </h1>
        <p className="text-xs sm:text-sm text-[#57534E] mt-1">
          Pick your high-converting storefront layout archetype and customize brand visual elements.
        </p>
      </div>

      {/* 1. Template Archetype Cards */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#1C1917]">
            1. Layout Archetype
          </h2>
          {isFree && (
            <span className="text-[11px] font-semibold text-[#D94E28] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3 PRO Templates Locked</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TEMPLATES.map((tpl) => {
            const isSelected = selectedTemplate === tpl.id;
            const isLocked = tpl.isPro && isFree;

            return (
              <div
                key={tpl.id}
                onClick={() => handleSelectTemplate(tpl)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "border-[#D94E28] bg-white shadow-sm ring-2 ring-[#D94E28]/10"
                    : isLocked
                    ? "border-[#E7E5E4] bg-stone-50/70 hover:border-stone-300"
                    : "border-[#E7E5E4] bg-white hover:border-[#D94E28]/40"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      tpl.isPro
                        ? "bg-[#FDF0EC] text-[#D94E28] border border-[#FADCD3]"
                        : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {tpl.badge}
                  </span>

                  {isLocked ? (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#D94E28]">
                      <Lock className="w-3.5 h-3.5" />
                      <span>PRO</span>
                    </div>
                  ) : isSelected ? (
                    <div className="w-5 h-5 rounded-full bg-[#D94E28] text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : null}
                </div>

                <div className={`h-24 rounded-xl border flex items-center justify-center mb-3 ${tpl.bgPreview}`}>
                  <span className="text-xs font-bold text-center px-2">{tpl.name}</span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-[#1C1917]">{tpl.name}</h3>
                  <p className="text-[11px] text-[#78716C] mt-1 line-clamp-2">{tpl.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Brand Visuals Form */}
      <form onSubmit={handleSaveAppearance} className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs p-6 space-y-6">
        <div>
          <h2 className="text-sm font-bold text-[#1C1917]">
            2. Brand Visuals &amp; Colors
          </h2>
          <p className="text-xs text-[#57534E] mt-0.5">
            Configure avatar logo, cover banner, accent colors, and official social media handles.
          </p>
        </div>        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Avatar / Logo Upload Dropzone */}
          <ImageUploadDropzone
            label="Store Avatar / Logo"
            value={avatarUrl}
            onChange={setAvatarUrl}
            folder="avatar"
            aspectRatio="square"
            helperText="Square 1:1 format recommended (400x400px)"
          />

          {/* Banner Upload Dropzone */}
          <ImageUploadDropzone
            label="Cover Banner Image"
            value={bannerUrl}
            onChange={setBannerUrl}
            folder="banner"
            aspectRatio="banner"
            helperText="Landscape 16:9 or 3:1 recommended (1200x400px)"
          />

          {/* Accent Color */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#1C1917]">
              Brand Accent Color
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {ACCENT_COLORS.map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setAccentColor(col.id)}
                  title={col.name}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition ${
                    col.class
                  } ${
                    accentColor === col.id
                      ? "ring-2 ring-offset-2 ring-[#1C1917] scale-110"
                      : "opacity-80 hover:opacity-100"
                  }`}
                >
                  {accentColor === col.id ? (
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  ) : null}
                </button>
              ))}
              <input
                type="text"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-24 px-2.5 py-1 text-xs rounded-lg border border-[#E7E5E4] font-mono text-center ml-2"
              />
            </div>
          </div>

          {/* Display Mode */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#1C1917]">
              Storefront Display Mode
            </label>
            <select
              value={displayMode}
              onChange={(e) => setDisplayMode(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4] bg-white font-semibold"
            >
              <option value="HYBRID">Hybrid (Bio Links &amp; Product Catalog)</option>
              <option value="CATALOG">Catalog Focused (E-Commerce First)</option>
              <option value="BIO_LINK">Bio Link Focused (Minimal Social Hub)</option>
            </select>
          </div>
        </div>

        {/* Dynamic Social Media Channels Builder */}
        <div className="pt-4 border-t border-[#E7E5E4]">
          <SocialChannelsBuilder
            channels={socialChannels}
            onChange={setSocialChannels}
            maxChannels={8}
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold shadow-xs transition flex items-center gap-2 disabled:opacity-50"
          >
            {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save Appearance Changes</span>
          </button>
        </div>
      </form>

      {/* PRO Upgrade Modal */}
      {upgradeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] shadow-2xl max-w-sm w-full p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF0EC] text-[#D94E28] flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-[#1C1917]">
                Unlock {upgradeFeatureName}
              </h3>
              <p className="text-xs text-[#57534E] mt-1.5 leading-relaxed">
                This template archetype is exclusive to <strong>PRO</strong> and <strong>DFY</strong> subscribers.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <a
                href="/pricing"
                className="w-full py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold shadow-xs transition"
              >
                Upgrade to PRO (Rp 49.000/mo)
              </a>
              <button
                type="button"
                onClick={() => setUpgradeModalOpen(false)}
                className="text-xs text-[#78716C] hover:text-[#1C1917] py-1"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
