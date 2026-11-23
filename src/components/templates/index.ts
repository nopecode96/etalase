import React from "react";
import { StoreTemplateProps } from "./types";
import { CleanMinimal } from "./clean-minimal/CleanMinimal";
import { ClassicDark } from "./classic-dark/ClassicDark";
import { CatalogGrid } from "./catalog-grid/CatalogGrid";
import { SageCreator } from "./sage-creator/SageCreator";
import { EditorialPaper } from "./editorial-paper/EditorialPaper";
import { BeautyGlam } from "./beauty-glam/BeautyGlam";
import { MidnightGlow } from "./midnight-glow/MidnightGlow";
import { SalesShowcase } from "./sales-showcase/SalesShowcase";
import { CafeMenu } from "./cafe-menu/CafeMenu";
import { BoutiqueVisual } from "./boutique-visual/BoutiqueVisual";
import { WellnessPro } from "./wellness-pro/WellnessPro";

// 4 Modern Mini-Store Archetypes
import { VisualMenuGrid } from "./visual-menu-grid/VisualMenuGrid";
import { ShowroomPro } from "./showroom-pro/ShowroomPro";
import { EditorialPastel } from "./editorial-pastel/EditorialPastel";
import { TemplateRenderer } from "./TemplateRenderer";

export { CleanMinimal, VisualMenuGrid, ShowroomPro, EditorialPastel, TemplateRenderer };

export const TEMPLATE_COMPONENTS: Record<string, React.FC<StoreTemplateProps>> = {
  // New 4 Mini-Store Archetypes
  "clean-minimal": CleanMinimal,
  "visual-menu-grid": VisualMenuGrid,
  "showroom-pro": ShowroomPro,
  "editorial-pastel": EditorialPastel,

  // Aliases for backward compatibility
  "cafe-menu": VisualMenuGrid,
  "sales-showcase": ShowroomPro,
  "beauty-glam": EditorialPastel,

  // Extended Archetypes
  "classic-dark": ClassicDark,
  "catalog-grid": CatalogGrid,
  "sage-creator": SageCreator,
  "editorial-paper": EditorialPaper,
  "midnight-glow": MidnightGlow,
  "boutique-visual": BoutiqueVisual,
  "wellness-pro": WellnessPro,
};

export const TEMPLATE_METADATA = [
  { id: "clean-minimal", name: "Clean Minimal", tag: "Gratis", category: "Kreator Digital", description: "Latar putih bersih dengan kartu rounded, hero product terlaris, compact strip e-book, dan 2-kolom gear." },
  { id: "visual-menu-grid", name: "Visual Menu Grid", tag: "Pro", category: "Cafe & F&B", description: "Buku menu visual F&B beraksen espresso hangat, cover kedai, jam operasional, dan filter kategori horizontal." },
  { id: "showroom-pro", name: "Showroom Pro", tag: "Pro", category: "Sales Mobil & Properti", description: "Executive slate dengan chip spesifikasi (DP mulai 15 Jt), unit unggulan, banner promo bunga, dan listing unit." },
  { id: "editorial-pastel", name: "Editorial Pastel", tag: "Pro", category: "Beauty & Affiliate", description: "Palet blush rose & pearl lembut, racun spill viral, banner promo gajian, dan katalog pill marketplace SEA." },
  { id: "classic-dark", name: "Classic Dark", tag: "Gratis", category: "Tech / Personal", description: "Latar obsidian gelap dengan aksen kontras tegas untuk tech reviewer dan personal branding." },
  { id: "catalog-grid", name: "Catalog Grid", tag: "Gratis", category: "Online Shop", description: "Tata letak 2-kolom rapi untuk etalase katalog produk dan affiliator media sosial." },
  { id: "sage-creator", name: "Sage Creator", tag: "Pro", category: "Coaching & Courses", description: "Nuansa sage/olive elegan dengan header besar dan statistik medsos untuk coach & edukator." },
  { id: "editorial-paper", name: "Warm Editorial", tag: "Pro", category: "Writers & Books", description: "Tekstur kertas krem hangat dan tipografi serif untuk penulis, jurnalis, dan penerbit buku." },
  { id: "midnight-glow", name: "Midnight Glow", tag: "Pro", category: "Gaming & Crypto", description: "Nuansa cyberpunk neon violet/cyan untuk gamer, streamer, dan kreator web3." },
  { id: "boutique-visual", name: "Visual Boutique", tag: "Pro", category: "Apparel & Jewelry", description: "Etalase chic monochrome dengan banner promosi dan fokus visual fotografi produk." },
  { id: "wellness-pro", name: "Wellness & Health", tag: "Pro", category: "Doctor & Fitness", description: "Palet teal/ocean menenangkan untuk dokter, klinik estetika, yoga, dan instruktur kebugaran." },
];

export function getTemplateComponent(templateId?: string): React.FC<StoreTemplateProps> {
  if (!templateId) return CleanMinimal;
  return TEMPLATE_COMPONENTS[templateId] || CleanMinimal;
}
