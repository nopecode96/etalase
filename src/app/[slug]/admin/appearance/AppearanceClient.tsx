"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import { StoreTemplateProps, StoreBlockItem, AppearanceConfig } from "@/components/templates/types";
import { actionUpdateAppearance, actionSaveBlocks } from "../actions";
import { toast } from "sonner";
import {
  ArrowLeft,
  Save,
  Loader2,
  Sparkles,
  Palette,
  LayoutGrid,
  ArrowUp,
  ArrowDown,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  Check,
  ExternalLink,
  Image as ImageIcon,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface AppearanceClientProps {
  store: StoreTemplateProps["store"] & { id: string };
  products: StoreTemplateProps["products"];
  initialBlocks: StoreBlockItem[];
}

const ARCHETYPE_OPTIONS = [
  {
    id: "clean-minimal",
    name: "Clean Minimal",
    category: "Kreator Digital",
    badge: "Gratis",
    isPro: false,
    desc: "Hero product, e-book strip, dan rekomendasi gear.",
    demoBanner: "/images/demo/banner-creator.jpg",
    accent: "#D94E28",
  },
  {
    id: "visual-menu-grid",
    name: "Visual Menu Grid",
    category: "Cafe & F&B",
    badge: "Pro",
    isPro: true,
    desc: "Buku menu foto, filter kategori, dan order WA.",
    demoBanner: "/images/demo/banner-cafe.jpg",
    accent: "#4A2C2A",
  },
  {
    id: "showroom-pro",
    name: "Showroom Pro",
    category: "Sales Mobil & Properti",
    badge: "Pro",
    isPro: true,
    desc: "Spec chips DP mulai 15 Jt, promo bunga, dan listing unit.",
    demoBanner: "/images/demo/banner-showroom.jpg",
    accent: "#18181B",
  },
  {
    id: "editorial-pastel",
    name: "Editorial Pastel",
    category: "Beauty & Affiliate",
    badge: "Pro",
    isPro: true,
    desc: "Racun spill viral, banner gajian, dan badge marketplace SEA.",
    demoBanner: "/images/demo/banner-beauty.jpg",
    accent: "#D94E28",
  },
];

const PRESET_BANNERS = [
  { name: "Creator Teal", url: "/images/demo/banner-creator.jpg" },
  { name: "Cafe Ambiance", url: "/images/demo/banner-cafe.jpg" },
  { name: "Showroom Modern", url: "/images/demo/banner-showroom.jpg" },
  { name: "Beauty Pastel", url: "/images/demo/banner-beauty.jpg" },
];

const ACCENT_PRESETS = ["#D94E28", "#18181B", "#4A2C2A", "#134E4A", "#1D4ED8", "#BE185D"];

export function AppearanceClient({
  store,
  products = [],
  initialBlocks = [],
}: AppearanceClientProps) {
  const [activeTab, setActiveTab] = useState<"appearance" | "blocks">("appearance");
  const [loading, setLoading] = useState(false);

  // Template & Appearance State
  const [templateId, setTemplateId] = useState<string>(store.templateId || "clean-minimal");
  const [bgType, setBgType] = useState<"preset" | "solid" | "gradient" | "pattern" | "image">(
    store.appearanceConfig?.bgType || "pattern"
  );
  const [bgValue, setBgValue] = useState<string>(store.appearanceConfig?.bgValue || "subtle-dots");
  const [coverBannerUrl, setCoverBannerUrl] = useState<string>(
    store.appearanceConfig?.coverBannerUrl || store.bannerUrl || "/images/demo/banner-creator.jpg"
  );
  const [buttonStyle, setButtonStyle] = useState<"rounded" | "pill" | "sharp">(
    store.appearanceConfig?.buttonStyle || "rounded"
  );
  const [accentColor, setAccentColor] = useState<string>(
    store.appearanceConfig?.accentColor || "#D94E28"
  );
  const rawSocial = store.appearanceConfig?.socialLinks as any;
  const [socialLinks, setSocialLinks] = useState({
    tiktok: rawSocial?.tiktok || "",
    instagram: rawSocial?.instagram || "",
    whatsapp: rawSocial?.whatsapp || "",
    youtube: rawSocial?.youtube || "",
    website: rawSocial?.website || "",
  });

  // Reorderable Blocks State
  const [blocks, setBlocks] = useState<StoreBlockItem[]>(
    initialBlocks.length > 0
      ? initialBlocks
      : [
          {
            id: "b-1",
            type: "FEATURED_PRODUCT",
            title: "Produk Unggulan",
            badgeText: "Terlaris",
            sortOrder: 1,
            isActive: true,
          },
          {
            id: "b-2",
            type: "IMAGE_BANNER",
            title: "Promo Spesial Canva Poster",
            imageUrl: "/images/demo/banner-poster-creator.jpg",
            sortOrder: 2,
            isActive: true,
          },
          {
            id: "b-3",
            type: "PRODUCT_GRID",
            title: "Katalog Produk Lengkap",
            sortOrder: 3,
            isActive: true,
          },
        ]
  );

  // Add Block Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newBlockType, setNewBlockType] = useState<string>("IMAGE_BANNER");
  const [newBlockTitle, setNewBlockTitle] = useState("");
  const [newBlockSubtitle, setNewBlockSubtitle] = useState("");
  const [newBlockImage, setNewBlockImage] = useState("/images/demo/banner-poster-creator.jpg");
  const [newBlockTargetUrl, setNewBlockTargetUrl] = useState("");
  const [newBlockBadge, setNewBlockBadge] = useState("");

  // Construct Live Preview Store
  const liveAppearanceConfig: AppearanceConfig = {
    bgType,
    bgValue,
    coverBannerUrl,
    buttonStyle,
    accentColor,
    socialLinks,
  };

  const liveStore: StoreTemplateProps["store"] = {
    ...store,
    templateId,
    appearanceConfig: liveAppearanceConfig,
    blocks,
  };

  // Reordering Helpers
  const moveBlock = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;

    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIndex];
    newBlocks[targetIndex] = temp;

    // Recalculate sortOrder
    const reordered = newBlocks.map((b, i) => ({ ...b, sortOrder: i + 1 }));
    setBlocks(reordered);
  };

  const toggleBlockActive = (index: number) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], isActive: !newBlocks[index].isActive };
    setBlocks(newBlocks);
  };

  const deleteBlock = (index: number) => {
    const newBlocks = blocks.filter((_, i) => i !== index);
    const reordered = newBlocks.map((b, i) => ({ ...b, sortOrder: i + 1 }));
    setBlocks(reordered);
  };

  const handleAddBlock = () => {
    const newBlock: StoreBlockItem = {
      id: `b-${Date.now()}`,
      type: newBlockType,
      title: newBlockTitle || (newBlockType === "IMAGE_BANNER" ? "Poster Promo Baru" : "Blok Baru"),
      subtitle: newBlockSubtitle || null,
      imageUrl: newBlockImage || null,
      targetUrl: newBlockTargetUrl || null,
      badgeText: newBlockBadge || null,
      isActive: true,
      sortOrder: blocks.length + 1,
    };

    setBlocks([...blocks, newBlock]);
    setIsAddModalOpen(false);
    // Reset form
    setNewBlockTitle("");
    setNewBlockSubtitle("");
    setNewBlockTargetUrl("");
    setNewBlockBadge("");
    toast.success("Blok baru berhasil ditambahkan!");
  };

  const handleSaveAll = async () => {
    setLoading(true);
    try {
      const resAppearance = await actionUpdateAppearance(store.slug, liveAppearanceConfig, templateId);
      if (!resAppearance.success) {
        toast.error(resAppearance.error || "Gagal menyimpan tampilan");
        setLoading(false);
        return;
      }

      const resBlocks = await actionSaveBlocks(store.slug, blocks);
      if (!resBlocks.success) {
        toast.error(resBlocks.error || "Gagal menyimpan blok");
        setLoading(false);
        return;
      }

      toast.success("Tampilan & susunan blok etalase berhasil diperbarui!");
    } catch {
      toast.error("Terjadi kesalahan saat menyimpan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col">
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#E7E5E4] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={`/${store.slug}/admin`}
            className="p-2 rounded-xl border border-[#E7E5E4] hover:bg-[#FAF8F5] text-[#57534E] hover:text-[#1C1917] transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-sm sm:text-base text-[#1C1917]">
                Kustomisasi Toko: {store.name}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FDF0EC] text-[#D94E28] border border-[#FADCD3]">
                {store.tier}
              </span>
            </div>
            <p className="text-xs text-[#57534E] hidden sm:block">
              Ubah tema, gaya warna, banner poster Canva, dan susun blok etalasemu.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={`/${store.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#E7E5E4] text-xs font-semibold text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF8F5] transition"
          >
            <span>Buka Toko Asli</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleSaveAll}
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white font-bold text-xs sm:text-sm shadow-xs transition cursor-pointer disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </header>

      {/* Main Split-Screen Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Editor Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 p-1 bg-white border border-[#E7E5E4] rounded-2xl shadow-xs">
            <button
              onClick={() => setActiveTab("appearance")}
              className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
                activeTab === "appearance"
                  ? "bg-[#D94E28] text-white shadow-xs"
                  : "text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF8F5]"
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Tampilan &amp; Desain</span>
            </button>
            <button
              onClick={() => setActiveTab("blocks")}
              className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 ${
                activeTab === "blocks"
                  ? "bg-[#D94E28] text-white shadow-xs"
                  : "text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF8F5]"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Susun Blok Vertikal ({blocks.length})</span>
            </button>
          </div>

          {/* TAB 1: APPEARANCE & TEMPLATE CONTROLS */}
          {activeTab === "appearance" && (
            <div className="space-y-6">
              {/* 1. Pilih Arketipe Template */}
              <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-sm sm:text-base text-[#1C1917]">
                      Arketipe Desain Toko
                    </h2>
                    <p className="text-xs text-[#57534E]">
                      Pilih struktur tata letak yang paling sesuai dengan industri bisnismu.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ARCHETYPE_OPTIONS.map((item) => {
                    const isSelected = templateId === item.id;
                    const isLocked = item.isPro && store.tier === "FREE";
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setTemplateId(item.id);
                          setAccentColor(item.accent);
                          setCoverBannerUrl(item.demoBanner);
                        }}
                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition relative flex flex-col justify-between ${
                          isSelected
                            ? "border-[#D94E28] bg-[#FDF0EC]/30 shadow-xs"
                            : "border-[#E7E5E4] hover:border-stone-400 bg-white"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-xs sm:text-sm text-[#1C1917]">
                              {item.name}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                item.isPro
                                  ? "bg-amber-100 text-amber-900 border border-amber-200"
                                  : "bg-emerald-100 text-emerald-900 border border-emerald-200"
                              }`}
                            >
                              {item.badge}
                            </span>
                          </div>
                          <span className="text-[11px] font-semibold text-[#D94E28] block mb-1">
                            {item.category}
                          </span>
                          <p className="text-[11px] text-[#57534E] leading-relaxed">
                            {item.desc}
                          </p>
                        </div>

                        {isLocked && (
                          <div className="mt-2.5 pt-2 border-t border-[#E7E5E4] flex items-center gap-1.5 text-[10px] font-semibold text-amber-800">
                            <Lock className="w-3 h-3" />
                            <span>Butuh Upgrade Pro</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Background Toko */}
              <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5 shadow-xs space-y-4">
                <div>
                  <h2 className="font-bold text-sm sm:text-base text-[#1C1917]">
                    Latar Belakang (Background)
                  </h2>
                  <p className="text-xs text-[#57534E]">
                    Sesuaikan atmosfer warna atau pola halus latar etalase.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "pattern", label: "Pola Halus" },
                    { id: "solid", label: "Warna Solid" },
                    { id: "gradient", label: "Gradien" },
                    { id: "image", label: "Foto Sampul" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setBgType(t.id as any)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold cursor-pointer transition ${
                        bgType === t.id
                          ? "border-[#D94E28] bg-[#FDF0EC] text-[#D94E28] font-bold"
                          : "border-[#E7E5E4] text-[#57534E] hover:bg-[#FAF8F5]"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {bgType === "pattern" && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {[
                      { id: "subtle-dots", name: "Dots Halus" },
                      { id: "organic-pastel", name: "Organic Pastel" },
                      { id: "grid", name: "Grid Modern" },
                    ].map((pat) => (
                      <button
                        key={pat.id}
                        type="button"
                        onClick={() => setBgValue(pat.id)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                          bgValue === pat.id
                            ? "bg-[#1C1917] text-white border-[#1C1917]"
                            : "bg-white text-[#57534E] border-[#E7E5E4]"
                        }`}
                      >
                        {pat.name}
                      </button>
                    ))}
                  </div>
                )}

                {bgType === "solid" && (
                  <div className="flex items-center gap-3 pt-2">
                    {["#FAF8F5", "#FAF6F0", "#F4F5F7", "#FDF8F6", "#18181B", "#FFFFFF"].map(
                      (hex) => (
                        <button
                          key={hex}
                          type="button"
                          onClick={() => setBgValue(hex)}
                          className={`w-8 h-8 rounded-full border-2 cursor-pointer shadow-xs ${
                            bgValue === hex ? "border-[#D94E28] scale-110" : "border-stone-300"
                          }`}
                          style={{ backgroundColor: hex }}
                        />
                      )
                    )}
                    <input
                      type="text"
                      value={bgValue}
                      onChange={(e) => setBgValue(e.target.value)}
                      placeholder="#FAF8F5"
                      className="px-3 py-1.5 rounded-lg border border-[#E7E5E4] text-xs font-mono w-24"
                    />
                  </div>
                )}

                {bgType === "image" && (
                  <div className="pt-2">
                    <input
                      type="text"
                      value={bgValue}
                      onChange={(e) => setBgValue(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 rounded-xl border border-[#E7E5E4] text-xs font-mono"
                    />
                  </div>
                )}
              </div>

              {/* 3. Cover Banner & Foto Sampul Brand */}
              <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5 shadow-xs space-y-4">
                <div>
                  <h2 className="font-bold text-sm sm:text-base text-[#1C1917]">
                    Cover Banner Atas (Header Hero)
                  </h2>
                  <p className="text-xs text-[#57534E]">
                    Tampilkan foto sampul brand atau pilih dari preset arketipe kami.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {PRESET_BANNERS.map((b) => (
                    <button
                      key={b.name}
                      type="button"
                      onClick={() => setCoverBannerUrl(b.url)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                        coverBannerUrl === b.url
                          ? "bg-[#D94E28] text-white border-[#D94E28]"
                          : "bg-white text-[#57534E] border-[#E7E5E4]"
                      }`}
                    >
                      {b.name}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  value={coverBannerUrl}
                  onChange={(e) => setCoverBannerUrl(e.target.value)}
                  placeholder="/images/demo/banner-creator.jpg"
                  className="w-full px-3 py-2 rounded-xl border border-[#E7E5E4] text-xs font-mono"
                />
              </div>

              {/* 4. Gaya Tombol & Aksen Warna */}
              <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5 shadow-xs space-y-4">
                <div>
                  <h2 className="font-bold text-sm sm:text-base text-[#1C1917]">
                    Gaya Tombol &amp; Warna Aksen
                  </h2>
                  <p className="text-xs text-[#57534E]">
                    Sesuaikan bentuk radius dan warna tombol aksi utama toko.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {[
                      { id: "rounded", label: "Rounded 12px" },
                      { id: "pill", label: "Pill (Oval)" },
                      { id: "sharp", label: "Tegas (Sharp)" },
                    ].map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setButtonStyle(b.id as any)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold cursor-pointer ${
                          buttonStyle === b.id
                            ? "border-[#D94E28] bg-[#FDF0EC] text-[#D94E28] font-bold"
                            : "border-[#E7E5E4] text-[#57534E]"
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs font-semibold text-[#57534E]">Warna Aksen:</span>
                    {ACCENT_PRESETS.map((hex) => (
                      <button
                        key={hex}
                        type="button"
                        onClick={() => setAccentColor(hex)}
                        className={`w-7 h-7 rounded-full border-2 cursor-pointer shadow-xs ${
                          accentColor === hex ? "border-black scale-110" : "border-white"
                        }`}
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="px-2.5 py-1 rounded-lg border border-[#E7E5E4] text-xs font-mono w-24"
                    />
                  </div>
                </div>
              </div>

              {/* 5. Tautan Media Sosial */}
              <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5 shadow-xs space-y-3">
                <div>
                  <h2 className="font-bold text-sm sm:text-base text-[#1C1917]">
                    Tautan Media Sosial Toko
                  </h2>
                  <p className="text-xs text-[#57534E]">
                    Ikon sosmed otomatis tampil di bawah bio toko.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">TikTok</label>
                    <input
                      type="text"
                      value={socialLinks.tiktok}
                      onChange={(e) =>
                        setSocialLinks({ ...socialLinks, tiktok: e.target.value })
                      }
                      placeholder="https://tiktok.com/@namamu"
                      className="w-full px-3 py-2 rounded-xl border border-[#E7E5E4]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Instagram</label>
                    <input
                      type="text"
                      value={socialLinks.instagram}
                      onChange={(e) =>
                        setSocialLinks({ ...socialLinks, instagram: e.target.value })
                      }
                      placeholder="https://instagram.com/namamu"
                      className="w-full px-3 py-2 rounded-xl border border-[#E7E5E4]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">WhatsApp</label>
                    <input
                      type="text"
                      value={socialLinks.whatsapp}
                      onChange={(e) =>
                        setSocialLinks({ ...socialLinks, whatsapp: e.target.value })
                      }
                      placeholder="https://wa.me/62812..."
                      className="w-full px-3 py-2 rounded-xl border border-[#E7E5E4]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">YouTube</label>
                    <input
                      type="text"
                      value={socialLinks.youtube}
                      onChange={(e) =>
                        setSocialLinks({ ...socialLinks, youtube: e.target.value })
                      }
                      placeholder="https://youtube.com/@namamu"
                      className="w-full px-3 py-2 rounded-xl border border-[#E7E5E4]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SUSUN BLOK VERTIKAL */}
          {activeTab === "blocks" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white border border-[#E7E5E4] rounded-2xl p-4 shadow-xs">
                <div>
                  <h2 className="font-bold text-sm sm:text-base text-[#1C1917]">
                    Susunan Blok Vertikal
                  </h2>
                  <p className="text-xs text-[#57534E]">
                    Gunakan tombol panah untuk mengatur urutan blok dari atas ke bawah.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1C1917] hover:bg-black text-white font-bold text-xs shadow-xs transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Blok</span>
                </button>
              </div>

              {/* Block List */}
              <div className="space-y-2.5">
                {blocks.map((block, index) => (
                  <div
                    key={block.id}
                    className={`bg-white border rounded-2xl p-4 shadow-xs flex items-center justify-between gap-3 transition ${
                      block.isActive ? "border-[#E7E5E4]" : "border-dashed border-stone-300 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-[#FAF8F5] border border-[#E7E5E4] flex items-center justify-center font-mono font-bold text-xs text-[#57534E] shrink-0">
                        {index + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs sm:text-sm text-[#1C1917] truncate">
                            {block.title || "Blok Tanpa Judul"}
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FAF8F5] text-[#57534E] border border-[#E7E5E4] uppercase">
                            {block.type}
                          </span>
                        </div>
                        {block.subtitle && (
                          <p className="text-[11px] text-[#57534E] truncate mt-0.5">
                            {block.subtitle}
                          </p>
                        )}
                        {block.imageUrl && (
                          <div className="text-[10px] text-[#D94E28] font-mono truncate mt-0.5">
                            🖼️ {block.imageUrl}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions: Up, Down, Visibility, Delete */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => moveBlock(index, "up")}
                        disabled={index === 0}
                        className="p-1.5 rounded-lg border border-[#E7E5E4] hover:bg-[#FAF8F5] disabled:opacity-30 cursor-pointer"
                        title="Geser ke Atas"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveBlock(index, "down")}
                        disabled={index === blocks.length - 1}
                        className="p-1.5 rounded-lg border border-[#E7E5E4] hover:bg-[#FAF8F5] disabled:opacity-30 cursor-pointer"
                        title="Geser ke Bawah"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleBlockActive(index)}
                        className={`p-1.5 rounded-lg border cursor-pointer ${
                          block.isActive
                            ? "border-[#E7E5E4] text-emerald-600 hover:bg-emerald-50"
                            : "border-stone-300 text-stone-400 hover:bg-stone-50"
                        }`}
                        title={block.isActive ? "Sembunyikan" : "Tampilkan"}
                      >
                        {block.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteBlock(index)}
                        className="p-1.5 rounded-lg border border-[#E7E5E4] text-rose-600 hover:bg-rose-50 cursor-pointer"
                        title="Hapus Blok"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Mobile Preview Phone Mockup */}
        <div className="lg:col-span-5 sticky top-24 flex flex-col items-center">
          <div className="mb-2 text-center">
            <span className="text-[11px] font-bold text-[#57534E] uppercase tracking-wider">
              📱 Live Mobile Preview (Real-Time)
            </span>
          </div>

          <div className="w-full max-w-[320px] sm:max-w-[350px] bg-[#1C1917] rounded-[2.8rem] p-3 shadow-2xl border-4 border-[#292524] flex flex-col items-center">
            {/* Notch */}
            <div className="w-24 h-4 bg-black rounded-full mb-2 flex items-center justify-between px-2.5 shrink-0 z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-800"></div>
              <div className="w-2 h-2 rounded-full bg-stone-800 border border-stone-700"></div>
            </div>

            {/* Live Screen Content - Connected directly to TemplateRenderer */}
            <div className="w-full h-[580px] bg-[#FAF8F5] rounded-[2.1rem] overflow-y-auto no-scrollbar relative shadow-inner">
              <TemplateRenderer
                store={liveStore}
                products={products}
                blocks={blocks}
                isMockup={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: TAMBAH BLOK BARU */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E7E5E4] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-3">
              <h3 className="font-bold text-base text-[#1C1917]">Tambah Blok Etalase Baru</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">Tipe Blok</label>
                <select
                  value={newBlockType}
                  onChange={(e) => setNewBlockType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E7E5E4] font-semibold"
                >
                  <option value="IMAGE_BANNER">🖼️ Image Banner / Poster Canva (16:9)</option>
                  <option value="FEATURED_PRODUCT">⭐ Kartu Produk Unggulan (Hero)</option>
                  <option value="COMPACT_STRIP">📑 Strip Ringkas Produk</option>
                  <option value="PRODUCT_GRID">📦 2-Kolom Katalog Grid</option>
                  <option value="LINK_BUTTON">🔗 Tombol Tautan Khusus</option>
                  <option value="TEXT_QUOTE">💬 Teks / Pengumuman / Quote</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Judul Blok</label>
                <input
                  type="text"
                  value={newBlockTitle}
                  onChange={(e) => setNewBlockTitle(e.target.value)}
                  placeholder="Contoh: Promo Spesial Akhir Bulan"
                  className="w-full px-3 py-2 rounded-xl border border-[#E7E5E4]"
                />
              </div>

              {newBlockType === "IMAGE_BANNER" && (
                <>
                  <div>
                    <label className="font-bold text-stone-700 block mb-1">URL Foto / Poster</label>
                    <input
                      type="text"
                      value={newBlockImage}
                      onChange={(e) => setNewBlockImage(e.target.value)}
                      placeholder="/images/demo/banner-poster-creator.jpg"
                      className="w-full px-3 py-2 rounded-xl border border-[#E7E5E4] font-mono text-[11px]"
                    />
                    <div className="flex gap-1.5 mt-1.5">
                      {PRESET_BANNERS.map((b) => (
                        <button
                          key={b.name}
                          type="button"
                          onClick={() => setNewBlockImage(b.url)}
                          className="text-[10px] bg-[#FAF8F5] border border-[#E7E5E4] px-2 py-0.5 rounded cursor-pointer"
                        >
                          {b.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-stone-700 block mb-1">Target Link (WhatsApp / URL)</label>
                    <input
                      type="text"
                      value={newBlockTargetUrl}
                      onChange={(e) => setNewBlockTargetUrl(e.target.value)}
                      placeholder="https://wa.me/62812... atau https://..."
                      className="w-full px-3 py-2 rounded-xl border border-[#E7E5E4]"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="font-bold text-stone-700 block mb-1">Subjudul / Deskripsi Pendek</label>
                <input
                  type="text"
                  value={newBlockSubtitle}
                  onChange={(e) => setNewBlockSubtitle(e.target.value)}
                  placeholder="Deskripsi singkat yang tampil di bawah judul"
                  className="w-full px-3 py-2 rounded-xl border border-[#E7E5E4]"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">Badge Teks (Opsional)</label>
                <input
                  type="text"
                  value={newBlockBadge}
                  onChange={(e) => setNewBlockBadge(e.target.value)}
                  placeholder="Diskon 50% / Ready Stock / Best Seller"
                  className="w-full px-3 py-2 rounded-xl border border-[#E7E5E4]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E7E5E4]">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-[#E7E5E4] text-xs font-semibold hover:bg-[#FAF8F5]"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleAddBlock}
                className="px-5 py-2 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white font-bold text-xs"
              >
                Tambahkan Blok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
