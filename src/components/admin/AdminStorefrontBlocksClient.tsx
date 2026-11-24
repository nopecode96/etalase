"use client";

import React, { useState, useTransition } from "react";
import {
  Layers,
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
  Loader2,
  X,
  ExternalLink,
} from "lucide-react";
import {
  actionCreateStoreBlock,
  actionUpdateStoreBlock,
  actionReorderStoreBlocks,
  actionDeleteStoreBlock,
} from "@/app/admin/actions";
import { showToast } from "@/components/ui/GlobalToast";
import { ImageUploadDropzone } from "@/components/admin/ImageUploadDropzone";

interface AdminStorefrontBlocksClientProps {
  store: any;
  tier: "FREE" | "PRO" | "DFY";
}

export function AdminStorefrontBlocksClient({ store }: AdminStorefrontBlocksClientProps) {
  const [blocks, setBlocks] = useState<any[]>(store.storeBlocks || []);
  const [isPending, startTransition] = useTransition();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [blockType, setBlockType] = useState("IMAGE_BANNER");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [badgeText, setBadgeText] = useState("");

  const handleMoveBlock = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;

    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIndex];
    newBlocks[targetIndex] = temp;
    setBlocks(newBlocks);

    startTransition(async () => {
      await actionReorderStoreBlocks({
        storeId: store.id,
        blockIds: newBlocks.map((b) => b.id),
      });
    });
  };

  const handleToggleBlock = (block: any) => {
    const updatedStatus = !block.isActive;
    setBlocks(blocks.map((b) => (b.id === block.id ? { ...b, isActive: updatedStatus } : b)));

    startTransition(async () => {
      await actionUpdateStoreBlock({
        blockId: block.id,
        storeId: store.id,
        isActive: updatedStatus,
      });
      showToast(updatedStatus ? "Block visible on storefront" : "Block hidden", "success");
    });
  };

  const handleDelete = (blockId: string) => {
    if (!confirm("Are you sure you want to delete this block?")) return;

    setBlocks(blocks.filter((b) => b.id !== blockId));
    startTransition(async () => {
      await actionDeleteStoreBlock({
        blockId,
        storeId: store.id,
      });
      showToast("Block deleted successfully", "success");
    });
  };

  const handleCreateBlock = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await actionCreateStoreBlock({
        storeId: store.id,
        type: blockType,
        title,
        subtitle,
        imageUrl,
        targetUrl,
        badgeText,
      });

      if (res.success && res.data) {
        setBlocks([...blocks, res.data]);
        setAddModalOpen(false);
        setTitle("");
        setSubtitle("");
        setImageUrl("");
        setTargetUrl("");
        setBadgeText("");
        showToast("New block added to storefront!", "success");
      } else {
        showToast(res.error || "Failed to create block", "error");
      }
    });
  };

  return (
    <div className="space-y-8 animate-fade-in w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#E7E5E4]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1917]">
            Content Blocks
          </h1>
          <p className="text-xs sm:text-sm text-[#57534E] mt-1">
            Build and arrange vertical Canva posters, promotional banners, and custom action links.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-semibold shadow-xs transition self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Block</span>
        </button>
      </div>

      {/* Block List */}
      <div className="space-y-3">
        {blocks.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border-2 border-dashed border-[#E7E5E4] p-8 shadow-xs">
            <Layers className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-[#1C1917]">No Content Blocks Yet</h3>
            <p className="text-xs text-[#78716C] mt-1 max-w-sm mx-auto">
              Add Canva banners, flash sale graphics, or link buttons to spotlight special offers.
            </p>
            <button
              type="button"
              onClick={() => setAddModalOpen(true)}
              className="mt-4 px-4 py-2 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              + Create First Block
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
              <div className="flex items-center gap-3.5 min-w-0">
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

                {block.imageUrl && (
                  <img
                    src={block.imageUrl}
                    alt={block.title || "Block"}
                    className="w-14 h-10 rounded-xl object-cover border border-[#E7E5E4] shrink-0"
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

              {/* Controls */}
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
                  onClick={() => handleToggleBlock(block)}
                  className="p-1.5 rounded-lg border border-[#E7E5E4] hover:bg-stone-100 text-stone-600 transition"
                  title={block.isActive ? "Hide from Storefront" : "Show on Storefront"}
                >
                  {block.isActive ? (
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5 text-stone-400" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(block.id)}
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

      {/* Add Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <h3 className="text-base font-bold text-[#1C1917]">
                Add Content Block
              </h3>
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBlock} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1C1917] mb-1">
                  Block Type
                </label>
                <select
                  value={blockType}
                  onChange={(e) => setBlockType(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E5E4] bg-white font-semibold"
                >
                  <option value="IMAGE_BANNER">Image Banner / Canva Poster</option>
                  <option value="LINK_BUTTON">Custom Link Button</option>
                  <option value="TEXT_QUOTE">Announcement / Text Quote</option>
                  <option value="FEATURED_PRODUCT">Featured Product Spotlight</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] mb-1">
                  Headline / Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Flash Sale Weekend Up to 50% Off"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E5E4]"
                />
              </div>

              {blockType === "IMAGE_BANNER" && (
                <ImageUploadDropzone
                  label="Image Banner / Canva Poster"
                  value={imageUrl}
                  onChange={setImageUrl}
                  folder="block"
                  aspectRatio="banner"
                  helperText="Upload Canva poster or banner graphic (Max 5MB)"
                />
              )}

              <div>
                <label className="block text-xs font-bold text-[#1C1917] mb-1">
                  Target URL (Optional)
                </label>
                <input
                  type="url"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E5E4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C1917] mb-1">
                  Subtitle / Promo Period Note
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Only valid for the first 50 buyers"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E5E4]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E7E5E4]">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#D94E28] hover:bg-[#B83E1D] rounded-xl transition shadow-xs flex items-center gap-2 disabled:opacity-50"
                >
                  {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  <span>Add Block</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
