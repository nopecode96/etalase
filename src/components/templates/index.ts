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

export const TEMPLATE_COMPONENTS: Record<string, React.FC<StoreTemplateProps>> = {
  "clean-minimal": CleanMinimal,
  "classic-dark": ClassicDark,
  "catalog-grid": CatalogGrid,
  "sage-creator": SageCreator,
  "editorial-paper": EditorialPaper,
  "beauty-glam": BeautyGlam,
  "midnight-glow": MidnightGlow,
  "sales-showcase": SalesShowcase,
  "cafe-menu": CafeMenu,
  "boutique-visual": BoutiqueVisual,
  "wellness-pro": WellnessPro,
};

export const TEMPLATE_METADATA = [
  { id: "clean-minimal", name: "Clean Minimal", tag: "Gratis", category: "General / Creator", description: "Latar putih bersih dengan kartu rounded dan kontras tipografi tinggi untuk semua kreator." },
  { id: "classic-dark", name: "Classic Dark", tag: "Gratis", category: "Tech / Personal", description: "Latar obsidian gelap dengan aksen kontras tegas untuk tech reviewer dan personal branding." },
  { id: "catalog-grid", name: "Catalog Grid", tag: "Gratis", category: "Online Shop", description: "Tata letak 2-kolom rapi untuk etalase katalog produk dan affiliator media sosial." },
  { id: "sage-creator", name: "Sage Creator", tag: "Pro", category: "Coaching & Courses", description: "Nuansa sage/olive elegan dengan header besar dan statistik medsos untuk coach & edukator." },
  { id: "beauty-glam", name: "Beauty & Glam", tag: "Pro", category: "Skincare & Fashion", description: "Palet blush rose lembut beraksen modern untuk brand kecantikan, skincare, dan fashion." },
  { id: "midnight-glow", name: "Midnight Glow", tag: "Pro", category: "Gaming & Crypto", description: "Nuansa cyberpunk neon violet/cyan untuk gamer, streamer, dan kreator web3." },
  { id: "editorial-paper", name: "Warm Editorial", tag: "Pro", category: "Writers & Books", description: "Tekstur kertas krem hangat dan tipografi serif untuk penulis, jurnalis, dan penerbit buku." },
  { id: "sales-showcase", name: "Sales & Showroom", tag: "Pro", category: "Automotive & Property", description: "Format etalase unit, galeri serah terima, dan simulasi cicilan khusus sales mobil & properti." },
  { id: "cafe-menu", name: "Aesthetic Menu", tag: "Pro", category: "F&B & Coffee Shop", description: "Buku menu visual F&B beraksen espresso hangat, jam operasional, dan arah Google Maps." },
  { id: "boutique-visual", name: "Visual Boutique", tag: "Pro", category: "Apparel & Jewelry", description: "Etalase chic monochrome dengan banner promosi dan fokus visual fotografi produk." },
  { id: "wellness-pro", name: "Wellness & Health", tag: "Pro", category: "Doctor & Fitness", description: "Palet teal/ocean menenangkan untuk dokter, klinik estetika, yoga, dan instruktur kebugaran." },
];

export function getTemplateComponent(templateId: string): React.FC<StoreTemplateProps> {
  return TEMPLATE_COMPONENTS[templateId] || CleanMinimal;
}
