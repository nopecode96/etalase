"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import {
  Palette,
  Sparkles,
  Lock,
  Check,
  Loader2,
  ExternalLink,
  Save,
  Eye,
  X,
  Smartphone,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  ShoppingBag,
  MessageCircle,
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

interface TemplateArchetype {
  id: string;
  name: string;
  badge: string;
  desc: string;
  isPro: boolean;
  bgPreview: string;
}

const TEMPLATES: TemplateArchetype[] = [
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

/* -------------------------------------------------------------
 * 1. MINI-WIREFRAME COMPONENTS (Exact specifications)
 * ----------------------------------------------------------- */

function CleanMinimalWireframe() {
  return (
    <div className="w-full h-40 bg-white border border-[#E5E7EB] rounded-xl overflow-hidden p-2.5 flex flex-col justify-between shadow-2xs select-none">
      {/* Top: Avatar & bio pills */}
      <div className="text-center space-y-1">
        <div className="w-6 h-6 rounded-full bg-stone-300 mx-auto shadow-2xs border border-white" />
        <div className="w-14 h-1.5 bg-stone-300/80 rounded-full mx-auto" />
        <div className="w-20 h-1 bg-stone-200 rounded-full mx-auto" />
      </div>

      {/* Middle: 3 vertical stacked product cards (1-column stack) */}
      <div className="space-y-1.5 my-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-5 bg-stone-50 border border-stone-200/80 rounded-md px-1.5 flex items-center justify-between"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-xs bg-stone-300 shrink-0" />
              <div className="w-12 h-1 bg-stone-400 rounded-full" />
            </div>
            <div className="w-6 h-1.5 bg-stone-200 rounded-full" />
          </div>
        ))}
      </div>

      {/* Bottom: Terracotta accent CTA */}
      <div className="w-full h-4 bg-[#D94E28] rounded-md flex items-center justify-center shadow-2xs">
        <div className="w-12 h-1 bg-white/80 rounded-full" />
      </div>
    </div>
  );
}

function VisualMenuGridWireframe() {
  return (
    <div className="w-full h-40 bg-[#FEF9E7] border border-[#FDE68A] rounded-xl overflow-hidden p-2.5 flex flex-col justify-between shadow-2xs select-none">
      {/* Top: Promo banner */}
      <div className="w-full h-5 rounded-md bg-amber-200/90 border border-amber-300/70 px-2 flex items-center justify-between">
        <div className="w-12 h-1 bg-amber-800/70 rounded-full" />
        <div className="w-4 h-2 bg-amber-500/80 rounded-xs" />
      </div>

      {/* Middle: 2x2 grid of photo boxes with price badges */}
      <div className="grid grid-cols-2 gap-1.5 my-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-10 bg-amber-100/90 border border-amber-200/90 rounded-lg p-1 flex flex-col justify-between"
          >
            <div className="w-full h-4.5 bg-amber-200/80 rounded-sm" />
            <div className="flex items-center justify-between">
              <div className="w-6 h-1 bg-amber-700/60 rounded-full" />
              <div className="w-4 h-1.5 bg-amber-500 rounded-xs" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom: F&B Order Bar */}
      <div className="w-full h-4 bg-amber-600 rounded-md flex items-center justify-center shadow-2xs">
        <div className="w-14 h-1 bg-white/90 rounded-full" />
      </div>
    </div>
  );
}

function ShowroomProWireframe() {
  return (
    <div className="w-full h-40 bg-[#0F172A] border border-[#1E293B] rounded-xl overflow-hidden p-2.5 flex flex-col justify-between shadow-2xs select-none">
      {/* Top: Header badge */}
      <div className="flex items-center justify-between">
        <div className="w-12 h-1.5 bg-slate-400 rounded-full" />
        <div className="w-6 h-2 bg-slate-700 rounded-xs" />
      </div>

      {/* Middle: 1-column wide showcase hero card */}
      <div className="w-full h-18 bg-slate-800 border border-slate-700 rounded-lg p-1.5 flex flex-col justify-between my-1">
        <div className="w-full h-8 bg-slate-700/80 rounded-sm" />
        <div className="flex items-center justify-between mt-1">
          <div className="flex gap-1">
            <div className="w-6 h-1.5 bg-slate-600 rounded-xs" />
            <div className="w-6 h-1.5 bg-slate-600 rounded-xs" />
          </div>
          <div className="w-8 h-1.5 bg-emerald-400 rounded-full" />
        </div>
      </div>

      {/* Bottom: Bright CTA Bar */}
      <div className="w-full h-4 bg-emerald-500 rounded-md flex items-center justify-center shadow-2xs">
        <div className="w-14 h-1 bg-slate-900 rounded-full" />
      </div>
    </div>
  );
}

function EditorialPastelWireframe() {
  return (
    <div className="w-full h-40 bg-[#FDF2F4] border border-[#FBCFE8] rounded-xl overflow-hidden p-2.5 flex flex-col justify-between shadow-2xs select-none">
      {/* Top: Curved editorial header */}
      <div className="w-full h-7 bg-rose-200/70 rounded-b-2xl p-1 flex flex-col items-center justify-center">
        <div className="w-10 h-1.5 bg-rose-700/60 rounded-full" />
        <div className="w-14 h-1 bg-rose-400/70 rounded-full mt-0.5" />
      </div>

      {/* Middle: 2 asymmetric soft large radius cards */}
      <div className="space-y-1.5 my-1">
        <div className="w-full h-7 bg-white/90 border border-rose-200/80 rounded-2xl p-1 flex items-center gap-1.5 shadow-2xs">
          <div className="w-5 h-5 rounded-xl bg-rose-200/70 shrink-0" />
          <div className="flex-1 space-y-1">
            <div className="w-12 h-1.5 bg-rose-800/60 rounded-full" />
            <div className="w-8 h-1 bg-rose-400/60 rounded-full" />
          </div>
        </div>
        <div className="w-[92%] ml-auto h-7 bg-rose-100/70 border border-rose-200/80 rounded-2xl p-1 flex items-center gap-1.5 shadow-2xs">
          <div className="w-5 h-5 rounded-xl bg-white/80 shrink-0" />
          <div className="flex-1 space-y-1">
            <div className="w-10 h-1.5 bg-rose-800/60 rounded-full" />
            <div className="w-6 h-1 bg-rose-400/60 rounded-full" />
          </div>
        </div>
      </div>

      {/* Bottom: Delicate rose accent button */}
      <div className="w-full h-4 bg-rose-500 rounded-full flex items-center justify-center shadow-2xs">
        <div className="w-12 h-1 bg-white/90 rounded-full" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
 * 2. MAIN COMPONENT: ADMIN STOREFRONT THEME CLIENT
 * ----------------------------------------------------------- */

export function AdminStorefrontThemeClient({
  store,
  tier,
}: AdminStorefrontThemeClientProps) {
  const isFree = tier === "FREE";
  const [isPending, startTransition] = useTransition();

  const [selectedTemplate, setSelectedTemplate] = useState(
    store.templateId || "clean-minimal"
  );
  const [displayMode, setDisplayMode] = useState(store.displayMode || "HYBRID");
  const [avatarUrl, setAvatarUrl] = useState(store.avatarUrl || "");
  const [bannerUrl, setBannerUrl] = useState(store.bannerUrl || "");

  const appearance =
    typeof store.appearanceConfig === "object" ? store.appearanceConfig : {};
  const [accentColor, setAccentColor] = useState(
    appearance?.accentColor || "#D94E28"
  );
  const [socialChannels, setSocialChannels] = useState<SocialLinkItem[]>(() =>
    parseSocialLinks(appearance?.socialLinks)
  );

  // Preview Modal state
  const [previewTemplate, setPreviewTemplate] = useState<TemplateArchetype | null>(null);

  const handleApplyTemplate = (tpl: TemplateArchetype) => {
    if (tpl.isPro && isFree) {
      setPreviewTemplate(tpl);
      return;
    }

    setSelectedTemplate(tpl.id);
    startTransition(async () => {
      const res = await actionUpdateStorefront({
        storeId: store.id,
        templateId: tpl.id,
      });
      if (res.success) {
        showToast(`Template successfully switched to ${tpl.name}!`, "success");
        if (previewTemplate) setPreviewTemplate(null);
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

  const renderWireframe = (id: string) => {
    switch (id) {
      case "visual-menu-grid":
        return <VisualMenuGridWireframe />;
      case "showroom-pro":
        return <ShowroomProWireframe />;
      case "editorial-pastel":
        return <EditorialPastelWireframe />;
      case "clean-minimal":
      default:
        return <CleanMinimalWireframe />;
    }
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

      {/* 1. Layout Archetype Cards */}
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
                className={`p-4 rounded-3xl border-2 transition-all flex flex-col justify-between relative bg-white ${
                  isSelected
                    ? "border-[#D94E28] shadow-sm ring-2 ring-[#D94E28]/10"
                    : isLocked
                    ? "border-[#E7E5E4] bg-stone-50/50 hover:border-stone-300"
                    : "border-[#E7E5E4] hover:border-[#D94E28]/40"
                }`}
              >
                {/* Card Top Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      tpl.isPro
                        ? "bg-[#FDF0EC] text-[#D94E28] border border-[#FADCD3]"
                        : "bg-stone-100 text-stone-600 border border-stone-200"
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
                    <div className="w-5 h-5 rounded-full bg-[#D94E28] text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  ) : null}
                </div>

                {/* Mini-Wireframe Visual Box */}
                <div
                  onClick={() => handleApplyTemplate(tpl)}
                  className="cursor-pointer mb-3 transition hover:scale-[1.01]"
                  title={`Click to select ${tpl.name}`}
                >
                  {renderWireframe(tpl.id)}
                </div>

                {/* Title & Description */}
                <div className="mb-4">
                  <h3 className="text-xs font-bold text-[#1C1917] flex items-center justify-between">
                    <span>{tpl.name}</span>
                    {isSelected && (
                      <span className="text-[10px] font-semibold text-[#D94E28]">
                        Active
                      </span>
                    )}
                  </h3>
                  <p className="text-[11px] text-[#78716C] mt-1 line-clamp-2 leading-relaxed">
                    {tpl.desc}
                  </p>
                </div>

                {/* Actions: Apply / Preview Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-[#E7E5E4]">
                  {/* Interactive Preview Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewTemplate(tpl);
                    }}
                    className="flex-1 py-2 px-2.5 rounded-xl border border-[#E7E5E4] hover:border-stone-400 bg-white hover:bg-stone-50 text-[11px] font-bold text-stone-700 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5 text-stone-600" />
                    <span>Preview</span>
                  </button>

                  {/* Apply Template / Pro Button */}
                  <button
                    type="button"
                    onClick={() => handleApplyTemplate(tpl)}
                    disabled={isSelected || isPending}
                    className={`py-2 px-3 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 cursor-pointer disabled:cursor-default ${
                      isSelected
                        ? "bg-stone-100 text-stone-400 border border-stone-200"
                        : isLocked
                        ? "bg-[#D94E28] hover:bg-[#B83E1D] text-white shadow-2xs"
                        : "bg-stone-900 hover:bg-black text-white shadow-2xs"
                    }`}
                  >
                    {isLocked ? (
                      <>
                        <Lock className="w-3 h-3" />
                        <span>Unlock</span>
                      </>
                    ) : isSelected ? (
                      <span>Active</span>
                    ) : (
                      <span>Apply</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Brand Visuals Form */}
      <form
        onSubmit={handleSaveAppearance}
        className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs p-6 space-y-6"
      >
        <div>
          <h2 className="text-sm font-bold text-[#1C1917]">
            2. Brand Visuals &amp; Colors
          </h2>
          <p className="text-xs text-[#57534E] mt-0.5">
            Configure avatar logo, cover banner, accent colors, and official social media handles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition cursor-pointer ${
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
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4] bg-white font-semibold cursor-pointer"
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
            className="px-5 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold shadow-xs transition flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isPending ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>Save Appearance Changes</span>
          </button>
        </div>
      </form>

      {/* 3. INTERACTIVE 390px MOBILE PREVIEW MODAL */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] shadow-2xl max-w-md w-full p-6 flex flex-col space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#D94E28]" />
                <h3 className="text-sm font-bold text-[#1C1917]">
                  {previewTemplate.name} Preview
                </h3>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    previewTemplate.isPro
                      ? "bg-[#FDF0EC] text-[#D94E28] border border-[#FADCD3]"
                      : "bg-stone-100 text-stone-600"
                  }`}
                >
                  {previewTemplate.badge}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="w-8 h-8 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-500 hover:text-stone-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated 390px Mobile Viewport Frame */}
            <div className="w-full max-w-[390px] mx-auto bg-stone-900 rounded-[32px] p-2.5 border-4 border-stone-800 shadow-xl">
              {/* Phone Speaker & Camera Notch */}
              <div className="w-20 h-4 bg-stone-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-stone-900 mr-2" />
                <div className="w-8 h-1 bg-stone-700 rounded-full" />
              </div>

              {/* Viewport Content */}
              <div className="rounded-[22px] overflow-hidden bg-white max-h-[360px] overflow-y-auto scrollbar-thin text-stone-900 text-left">
                {previewTemplate.id === "clean-minimal" && (
                  <div className="p-4 space-y-3 bg-white">
                    <div className="text-center space-y-1.5 pt-2">
                      <div className="w-12 h-12 rounded-full bg-stone-200 border-2 border-white mx-auto shadow-sm flex items-center justify-center text-xs font-bold text-stone-600">
                        {store.name.charAt(0)}
                      </div>
                      <h4 className="text-xs font-bold text-stone-900">{store.name}</h4>
                      <p className="text-[10px] text-stone-500 max-w-[200px] mx-auto">
                        Official Link-in-Bio &amp; Instant Catalog
                      </p>
                    </div>

                    <div className="space-y-2 pt-1">
                      {[
                        { title: "Featured Masterclass Bundle", price: "Rp 149.000" },
                        { title: "Standard Starter Kit", price: "Rp 79.000" },
                        { title: "1-on-1 Consultation Session", price: "Rp 250.000" },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl border border-stone-200 bg-stone-50/50 flex items-center justify-between shadow-2xs"
                        >
                          <div className="space-y-0.5">
                            <div className="text-[11px] font-bold text-stone-900">
                              {item.title}
                            </div>
                            <div className="text-[10px] text-[#D94E28] font-bold">
                              {item.price}
                            </div>
                          </div>
                          <span className="text-[9px] font-bold px-2 py-1 rounded-lg bg-[#D94E28] text-white">
                            Order
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 text-center">
                      <div className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-xs">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Order via WhatsApp (0% Fee)</span>
                      </div>
                    </div>
                  </div>
                )}

                {previewTemplate.id === "visual-menu-grid" && (
                  <div className="p-4 space-y-3 bg-[#FEF9E7]">
                    <div className="p-2.5 rounded-xl bg-amber-200/80 border border-amber-300 text-amber-950 text-center">
                      <div className="text-[11px] font-extrabold">{store.name} Cafe &amp; Dining</div>
                      <div className="text-[9px] text-amber-800">Fresh daily visual menu &amp; cashier ordering</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { title: "Signature Latte", price: "Rp 28.000" },
                        { title: "Butter Croissant", price: "Rp 25.000" },
                        { title: "Matcha Blend", price: "Rp 32.000" },
                        { title: "Truffle Fries", price: "Rp 35.000" },
                      ].map((m, i) => (
                        <div
                          key={i}
                          className="bg-white rounded-xl border border-amber-200 p-2 shadow-2xs flex flex-col justify-between"
                        >
                          <div className="w-full h-14 bg-amber-100 rounded-lg flex items-center justify-center text-amber-800 text-[10px] font-bold">
                            Photo
                          </div>
                          <div className="mt-1.5 space-y-0.5">
                            <div className="text-[10px] font-bold text-stone-900 line-clamp-1">{m.title}</div>
                            <div className="text-[10px] text-amber-700 font-extrabold">{m.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="w-full py-2 rounded-xl bg-amber-700 text-white text-[10px] font-bold text-center">
                      + Add Items to Cart
                    </div>
                  </div>
                )}

                {previewTemplate.id === "showroom-pro" && (
                  <div className="p-4 space-y-3 bg-[#0F172A] text-white">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div>
                        <div className="text-xs font-bold text-white">{store.name}</div>
                        <div className="text-[9px] text-slate-400">Automotive &amp; Property Showroom</div>
                      </div>
                      <span className="text-[9px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded-md border border-slate-700">
                        Verified Dealer
                      </span>
                    </div>

                    <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-3 space-y-2">
                      <div className="w-full h-20 bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 text-xs font-bold">
                        Vehicle / Property Showcase
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-[11px] font-bold text-white">All-New Hybrid 2026</div>
                        <div className="text-[10px] text-emerald-400 font-bold">DP 15% Ready</div>
                      </div>
                      <div className="flex gap-1.5 text-[8px] text-slate-300">
                        <span className="bg-slate-700/80 px-1.5 py-0.5 rounded">Automatic</span>
                        <span className="bg-slate-700/80 px-1.5 py-0.5 rounded">Zero KM</span>
                        <span className="bg-slate-700/80 px-1.5 py-0.5 rounded">Warranty 5 Yrs</span>
                      </div>
                    </div>

                    <div className="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 text-[11px] font-extrabold text-center">
                      Request Test Drive / Simulation
                    </div>
                  </div>
                )}

                {previewTemplate.id === "editorial-pastel" && (
                  <div className="p-4 space-y-3 bg-[#FDF2F4]">
                    <div className="bg-rose-200/60 rounded-2xl p-3 text-center space-y-1">
                      <div className="text-[11px] font-bold text-rose-950 font-serif">{store.name}</div>
                      <p className="text-[9px] text-rose-700">Curated Beauty, Skincare &amp; Daily Essentials</p>
                    </div>

                    <div className="space-y-2">
                      {[
                        { title: "Hydra Glow Serum 30ml", price: "Rp 129.000", badge: "Best Seller" },
                        { title: "Gentle Oat Cleanser", price: "Rp 89.000", badge: "Organic" },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="bg-white rounded-2xl border border-rose-200 p-2.5 flex items-center gap-2.5 shadow-2xs"
                        >
                          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-[9px] text-rose-800 font-bold shrink-0">
                            Item
                          </div>
                          <div className="flex-1 space-y-0.5">
                            <span className="text-[8px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded-full font-bold">
                              {item.badge}
                            </span>
                            <div className="text-[10px] font-bold text-stone-900">{item.title}</div>
                            <div className="text-[10px] text-rose-600 font-bold">{item.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="w-full py-2.5 rounded-full bg-rose-600 text-white text-[11px] font-bold text-center shadow-xs">
                      Shop Selected Collection
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-2 flex flex-col gap-2">
              {previewTemplate.isPro && isFree ? (
                <Link
                  href="/admin/billing/upgrade?plan=pro&returnTo=/admin/storefront/theme"
                  className="w-full py-3 px-4 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold shadow-xs transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Upgrade to PRO to Unlock (Rp 49.000/mo)</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => handleApplyTemplate(previewTemplate)}
                  disabled={selectedTemplate === previewTemplate.id || isPending}
                  className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {selectedTemplate === previewTemplate.id
                      ? "Template Currently Active"
                      : "Apply Template to My Store"}
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="w-full py-2 text-xs text-stone-500 hover:text-stone-800 transition cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
