"use client";

import React, { useState, useTransition } from "react";
import {
  Palette,
  LayoutTemplate,
  Lock,
  Sparkles,
  MoveUp,
  MoveDown,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Link as LinkIcon,
  Quote,
  Star,
  ExternalLink,
  Check,
  AlertCircle,
  Loader2,
  Upload,
} from "lucide-react";
import {
  actionUpdateStorefront,
  actionCreateStoreBlock,
  actionUpdateStoreBlock,
  actionReorderStoreBlocks,
  actionDeleteStoreBlock,
} from "@/app/admin/actions";
import { showToast } from "@/components/ui/GlobalToast";
import { ImageUploadDropzone } from "@/components/admin/ImageUploadDropzone";
import { SocialChannelsBuilder } from "@/components/admin/SocialChannelsBuilder";
import { SocialLinkItem, parseSocialLinks } from "@/lib/utils/social-channels";

interface AdminStorefrontClientProps {
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
    bgPreview: "bg-white border-stone-200",
  },
  {
    id: "visual-menu-grid",
    name: "Visual Menu Grid",
    badge: "PRO Only",
    desc: "Optimized for Cafes, Restaurants, and F&B visual menu ordering.",
    isPro: true,
    bgPreview: "bg-amber-50 border-amber-200",
  },
  {
    id: "showroom-pro",
    name: "Showroom Pro",
    badge: "PRO Only",
    desc: "Tailored for Automotive Dealers, Real Estate brokers & heavy equipment.",
    isPro: true,
    bgPreview: "bg-slate-900 border-slate-800 text-white",
  },
  {
    id: "editorial-pastel",
    name: "Editorial Pastel",
    badge: "PRO Only",
    desc: "Soft warm aesthetic for Beauty, Fashion, Skincare & Lifestyle creators.",
    isPro: true,
    bgPreview: "bg-rose-50 border-rose-200",
  },
];

const ACCENT_COLORS = [
  { id: "#D94E28", name: "Warm Editorial (Default)", class: "bg-[#D94E28]" },
  { id: "#0F172A", name: "Obsidian Slate", class: "bg-slate-900" },
  { id: "#059669", name: "Emerald Growth", class: "bg-emerald-600" },
  { id: "#7C3AED", name: "Royal Violet", class: "bg-purple-600" },
  { id: "#D97706", name: "Warm Amber", class: "bg-amber-600" },
];

export function AdminStorefrontClient({ store, tier }: AdminStorefrontClientProps) {
  const isFree = tier === "FREE";
  const [isPending, startTransition] = useTransition();

  // Template & Appearance State
  const [selectedTemplate, setSelectedTemplate] = useState(store.templateId || "clean-minimal");
  const [displayMode, setDisplayMode] = useState(store.displayMode || "HYBRID");
  const [avatarUrl, setAvatarUrl] = useState(store.avatarUrl || "");
  const [bannerUrl, setBannerUrl] = useState(store.bannerUrl || "");

  const appearance = typeof store.appearanceConfig === "object" ? store.appearanceConfig : {};
  const [accentColor, setAccentColor] = useState(appearance?.accentColor || "#D94E28");
  const [socialChannels, setSocialChannels] = useState<SocialLinkItem[]>(() =>
    parseSocialLinks(appearance?.socialLinks)
  );

  // Upgrade Modal State
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [upgradeFeatureName, setUpgradeFeatureName] = useState("");

  // Blocks State
  const [blocks, setBlocks] = useState<any[]>(store.storeBlocks || []);
  const [addBlockModalOpen, setAddBlockModalOpen] = useState(false);
  const [newBlockType, setNewBlockType] = useState("IMAGE_BANNER");
  const [newBlockTitle, setNewBlockTitle] = useState("");
  const [newBlockSubtitle, setNewBlockSubtitle] = useState("");
  const [newBlockImageUrl, setNewBlockImageUrl] = useState("");
  const [newBlockTargetUrl, setNewBlockTargetUrl] = useState("");
  const [newBlockBadge, setNewBlockBadge] = useState("");

  // Handle Template Select
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
        showToast(`Template changed to ${tpl.name}!`, "success");
      } else {
        showToast(res.error || "Failed to change template", "error");
      }
    });
  };

  // Handle Save Appearance
  const handleSaveAppearance = () => {
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
        showToast("Storefront appearance saved successfully!", "success");
      } else {
        showToast(res.error || "Failed to save appearance", "error");
      }
    });
  };

  // Block Actions: Move Up / Down
  const handleMoveBlock = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;

    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIndex];
    newBlocks[targetIndex] = temp;
    setBlocks(newBlocks);

    startTransition(async () => {
      const blockIds = newBlocks.map((b) => b.id);
      await actionReorderStoreBlocks({
        storeId: store.id,
        blockIds,
      });
    });
  };

  // Toggle Block Visibility
  const handleToggleBlockActive = (block: any) => {
    const updatedStatus = !block.isActive;
    setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, isActive: updatedStatus } : b)));

    startTransition(async () => {
      await actionUpdateStoreBlock({
        blockId: block.id,
        storeId: store.id,
        isActive: updatedStatus,
      });
      showToast(updatedStatus ? "Block shown" : "Block hidden", "success");
    });
  };

  // Delete Block
  const handleDeleteBlock = (blockId: string) => {
    if (!confirm("Are you sure you want to delete this block?")) return;

    setBlocks(blocks.filter((b) => b.id !== blockId));
    startTransition(async () => {
      await actionDeleteStoreBlock({
        blockId,
        storeId: store.id,
      });
      showToast("Block deleted", "success");
    });
  };

  // Create New Block
  const handleCreateBlock = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await actionCreateStoreBlock({
        storeId: store.id,
        type: newBlockType,
        title: newBlockTitle,
        subtitle: newBlockSubtitle,
        imageUrl: newBlockImageUrl,
        targetUrl: newBlockTargetUrl,
        badgeText: newBlockBadge,
      });

      if (res.success && res.data) {
        setBlocks([...blocks, res.data]);
        setAddBlockModalOpen(false);
        // Reset inputs
        setNewBlockTitle("");
        setNewBlockSubtitle("");
        setNewBlockImageUrl("");
        setNewBlockTargetUrl("");
        setNewBlockBadge("");
        showToast("Block added to storefront!", "success");
      } else {
        showToast(res.error || "Failed to create block", "error");
      }
    });
  };

  return (
    <div className="space-y-10 animate-fade-in w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E7E5E4]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
            Storefront &amp; Blocks
          </h1>
          <p className="text-xs sm:text-sm text-[#57534E] mt-1">
            Choose your design archetype, customize brand visuals, and reorder vertical content blocks.
          </p>
        </div>

        <a
          href={`/${store.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#E7E5E4] hover:bg-[#FAF8F5] text-xs font-semibold text-[#1C1917] transition shadow-2xs self-start sm:self-auto"
        >
          <span>Preview Live Storefront</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#78716C]" />
        </a>
      </div>

      {/* 1. Template Archetype Selector */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#1C1917]">
              1. Store Archetype (Design Template)
            </h2>
            <p className="text-xs text-[#57534E] mt-0.5">
              Instant mobile-first layout engineered for high conversion rates.
            </p>
          </div>
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
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? "border-[#D94E28] bg-white shadow-sm ring-2 ring-[#D94E28]/10"
                    : isLocked
                    ? "border-[#E7E5E4] bg-stone-50/70 hover:border-stone-300"
                    : "border-[#E7E5E4] bg-white hover:border-[#D94E28]/40"
                }`}
              >
                {/* Status Badges */}
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

                {/* Archetype Preview Box */}
                <div
                  className={`h-24 rounded-xl border flex items-center justify-center mb-3 ${tpl.bgPreview}`}
                >
                  <span className="text-xs font-bold text-center px-2">
                    {tpl.name}
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-[#1C1917]">{tpl.name}</h3>
                  <p className="text-[11px] text-[#78716C] mt-1 line-clamp-2">
                    {tpl.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Brand Visuals & Appearance Customizer */}
      <section className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs p-6 space-y-6">
        <div>
          <h2 className="text-base font-bold text-[#1C1917]">
            2. Brand Visuals &amp; Colors
          </h2>
          <p className="text-xs text-[#57534E] mt-0.5">
            Set your brand cover, avatar photo, accent colors, and official social handles.
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
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#1C1917]">
              Primary Brand Accent Color
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
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#1C1917]">
              Storefront Display Mode
            </label>
            <select
              value={displayMode}
              onChange={(e) => setDisplayMode(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4] bg-white focus:outline-none focus:ring-2 focus:ring-[#D94E28]/20 focus:border-[#D94E28]"
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

        {/* Save Appearance Button */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleSaveAppearance}
            disabled={isPending}
            className="px-5 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-semibold shadow-xs transition flex items-center gap-2 disabled:opacity-50"
          >
            {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
            <span>Save Appearance Changes</span>
          </button>
        </div>
      </section>

      {/* 3. Reorderable Vertical Store Blocks */}
      <section className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#E7E5E4]">
          <div>
            <h2 className="text-base font-bold text-[#1C1917]">
              3. Vertical Content &amp; Banner Blocks
            </h2>
            <p className="text-xs text-[#57534E] mt-0.5">
              Add Canva posters, custom announcement banners, and links. Reorder cleanly with Move Up / Down.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setAddBlockModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] hover:border-[#D94E28]/40 hover:text-[#D94E28] text-xs font-bold text-[#1C1917] transition shadow-2xs self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-[#D94E28]" />
            <span>Add Store Block</span>
          </button>
        </div>

        {/* Blocks List */}
        <div className="space-y-3">
          {blocks.length === 0 ? (
            <div className="py-10 text-center rounded-2xl border-2 border-dashed border-[#E7E5E4] bg-[#FAF8F5]/50">
              <ImageIcon className="w-8 h-8 text-stone-300 mx-auto mb-2" />
              <p className="text-xs font-semibold text-[#1C1917]">No vertical blocks yet</p>
              <p className="text-[11px] text-[#78716C] mt-0.5">
                Add an Image Banner / Canva Poster or Link Button to spotlight your best campaigns.
              </p>
              <button
                type="button"
                onClick={() => setAddBlockModalOpen(true)}
                className="mt-3 px-3.5 py-1.5 rounded-lg bg-white border border-[#E7E5E4] text-xs font-bold text-[#D94E28] hover:bg-[#FDF0EC] transition"
              >
                + Add First Block
              </button>
            </div>
          ) : (
            blocks.map((block, index) => (
              <div
                key={block.id}
                className={`p-4 rounded-2xl border transition flex items-center justify-between gap-4 ${
                  block.isActive ? "bg-white border-[#E7E5E4]" : "bg-stone-50 border-stone-200 opacity-60"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Block Type Icon */}
                  <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] flex items-center justify-center text-[#D94E28] shrink-0">
                    {block.type === "IMAGE_BANNER" ? (
                      <ImageIcon className="w-4 h-4" />
                    ) : block.type === "LINK_BUTTON" ? (
                      <LinkIcon className="w-4 h-4" />
                    ) : block.type === "TEXT_QUOTE" ? (
                      <Quote className="w-4 h-4" />
                    ) : (
                      <Star className="w-4 h-4" />
                    )}
                  </div>

                  {/* Thumbnail if Image Banner */}
                  {block.imageUrl && (
                    <img
                      src={block.imageUrl}
                      alt={block.title || "Block"}
                      className="w-12 h-9 rounded-lg object-cover border border-[#E7E5E4] shrink-0"
                    />
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1C1917] truncate">
                        {block.title || "Untitled Block"}
                      </span>
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-stone-100 text-stone-600">
                        {block.type.replace("_", " ")}
                      </span>
                    </div>
                    {block.subtitle && (
                      <p className="text-[11px] text-[#78716C] truncate mt-0.5">
                        {block.subtitle}
                      </p>
                    )}
                    {block.targetUrl && (
                      <p className="text-[10px] text-[#D94E28] truncate mt-0.5">
                        Link: {block.targetUrl}
                      </p>
                    )}
                  </div>
                </div>

                {/* Block Controls: Move Up, Move Down, Toggle, Delete */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleMoveBlock(index, "up")}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg border border-[#E7E5E4] hover:bg-stone-100 disabled:opacity-30 text-stone-600 transition"
                    title="Move Up"
                  >
                    <MoveUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveBlock(index, "down")}
                    disabled={index === blocks.length - 1}
                    className="p-1.5 rounded-lg border border-[#E7E5E4] hover:bg-stone-100 disabled:opacity-30 text-stone-600 transition"
                    title="Move Down"
                  >
                    <MoveDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleBlockActive(block)}
                    className="p-1.5 rounded-lg border border-[#E7E5E4] hover:bg-stone-100 text-stone-600 transition"
                    title={block.isActive ? "Hide from Store" : "Show on Store"}
                  >
                    {block.isActive ? (
                      <Eye className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-stone-400" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteBlock(block.id)}
                    className="p-1.5 rounded-lg border border-[#E7E5E4] hover:bg-rose-50 hover:border-rose-200 text-stone-400 hover:text-rose-600 transition"
                    title="Delete Block"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Add Block Modal */}
      {addBlockModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] shadow-2xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <h3 className="text-base font-bold text-[#1C1917]">
                Add Storefront Block
              </h3>
              <button
                type="button"
                onClick={() => setAddBlockModalOpen(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBlock} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1C1917] mb-1">
                  Block Type
                </label>
                <select
                  value={newBlockType}
                  onChange={(e) => setNewBlockType(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E5E4] bg-white"
                >
                  <option value="IMAGE_BANNER">Image Banner / Canva Poster</option>
                  <option value="LINK_BUTTON">Custom Link Button</option>
                  <option value="TEXT_QUOTE">Announcement / Text Quote</option>
                  <option value="FEATURED_PRODUCT">Featured Product Spotlight</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] mb-1">
                  Title / Headline
                </label>
                <input
                  type="text"
                  required
                  value={newBlockTitle}
                  onChange={(e) => setNewBlockTitle(e.target.value)}
                  placeholder="e.g. Special Promo Ramadhan 50% Off"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E5E4]"
                />
              </div>

              {newBlockType === "IMAGE_BANNER" && (
                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1">
                    Image Banner URL (Canva / Cloudinary)
                  </label>
                  <input
                    type="url"
                    required
                    value={newBlockImageUrl}
                    onChange={(e) => setNewBlockImageUrl(e.target.value)}
                    placeholder="https://example.com/canva-poster.jpg"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E5E4]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#1C1917] mb-1">
                  Target Link (Optional)
                </label>
                <input
                  type="url"
                  value={newBlockTargetUrl}
                  onChange={(e) => setNewBlockTargetUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E5E4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] mb-1">
                  Subtitle / Additional Note
                </label>
                <input
                  type="text"
                  value={newBlockSubtitle}
                  onChange={(e) => setNewBlockSubtitle(e.target.value)}
                  placeholder="e.g. Valid until end of this week"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E5E4]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E7E5E4]">
                <button
                  type="button"
                  onClick={() => setAddBlockModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#D94E28] hover:bg-[#B83E1D] rounded-xl transition shadow-xs disabled:opacity-50"
                >
                  {isPending ? "Adding..." : "Add Block"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                This template archetype is exclusive to <strong>PRO</strong> and <strong>DFY</strong> subscribers. Upgrade now to get:
              </p>
            </div>

            <div className="p-3 bg-[#FAF8F5] rounded-xl text-left text-xs text-[#57534E] space-y-1.5 border border-[#E7E5E4]">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>All 4 high-converting industry templates</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>2% QRIS fee (Save over 55% vs Free 4.5%)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Custom domain support (yourbrand.com)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>4x FREE monthly balance withdrawals</span>
              </div>
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
