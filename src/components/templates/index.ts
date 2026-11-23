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
  { id: "clean-minimal", name: "Clean Minimal", tag: "Gratis", category: "General / Creator" },
  { id: "classic-dark", name: "Classic Dark", tag: "Gratis", category: "Tech / Personal" },
  { id: "catalog-grid", name: "Catalog Grid", tag: "Gratis", category: "Online Shop" },
  { id: "sage-creator", name: "Sage Creator", tag: "Pro", category: "Coaching & Courses" },
  { id: "beauty-glam", name: "Beauty & Glam", tag: "Pro", category: "Skincare & Fashion" },
  { id: "midnight-glow", name: "Midnight Glow", tag: "Pro", category: "Gaming & Crypto" },
  { id: "editorial-paper", name: "Warm Editorial", tag: "Pro", category: "Writers & Books" },
  { id: "sales-showcase", name: "Sales & Showroom", tag: "Pro", category: "Automotive & Property" },
  { id: "cafe-menu", name: "Aesthetic Menu", tag: "Pro", category: "F&B & Coffee Shop" },
  { id: "boutique-visual", name: "Visual Boutique", tag: "Pro", category: "Apparel & Jewelry" },
  { id: "wellness-pro", name: "Wellness & Health", tag: "Pro", category: "Doctor & Fitness" },
];

export function getTemplateComponent(templateId: string): React.FC<StoreTemplateProps> {
  return TEMPLATE_COMPONENTS[templateId] || CleanMinimal;
}
