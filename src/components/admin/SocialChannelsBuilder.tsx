"use client";

import React from "react";
import {
  Plus,
  Trash2,
  Share2,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import {
  SocialPlatform,
  SocialLinkItem,
  SUPPORTED_PLATFORMS,
  normalizeSocialUrl,
} from "@/lib/utils/social-channels";
import { SocialIcon } from "@/components/ui/SocialIcons";

interface SocialChannelsBuilderProps {
  channels: SocialLinkItem[];
  onChange: (channels: SocialLinkItem[]) => void;
  maxChannels?: number;
}

const QUICK_PRESETS: SocialPlatform[] = [
  "instagram",
  "tiktok",
  "youtube",
  "facebook",
  "telegram",
  "x",
];

export function SocialChannelsBuilder({
  channels,
  onChange,
  maxChannels = 8,
}: SocialChannelsBuilderProps) {
  const isMaxReached = channels.length >= maxChannels;

  const handleAddChannel = (platform: SocialPlatform = "instagram") => {
    if (isMaxReached) return;

    const newItem: SocialLinkItem = {
      id: `social-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      platform,
      handleOrUrl: "",
      sortOrder: channels.length,
    };

    onChange([...channels, newItem]);
  };

  const handleUpdatePlatform = (id: string, platform: SocialPlatform) => {
    const updated = channels.map((item) =>
      item.id === id ? { ...item, platform } : item
    );
    onChange(updated);
  };

  const handleUpdateHandleOrUrl = (id: string, handleOrUrl: string) => {
    const updated = channels.map((item) =>
      item.id === id ? { ...item, handleOrUrl } : item
    );
    onChange(updated);
  };

  const handleRemoveChannel = (id: string) => {
    const updated = channels
      .filter((item) => item.id !== id)
      .map((item, idx) => ({ ...item, sortOrder: idx }));
    onChange(updated);
  };

  // Find platforms not yet added for Quick Add Pills
  const existingPlatforms = new Set(channels.map((c) => c.platform));
  const availableQuickPills = QUICK_PRESETS.filter(
    (p) => !existingPlatforms.has(p)
  );

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <label className="block text-xs font-bold text-[#1C1917] uppercase tracking-wider flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5 text-[#D94E28]" />
            <span>Social Media Channels ({channels.length}/{maxChannels})</span>
          </label>
          <p className="text-[11px] text-[#78716C] mt-0.5">
            Connect your official profiles to render clickable social icons on your live storefront.
          </p>
        </div>

        {!isMaxReached && (
          <button
            type="button"
            onClick={() => handleAddChannel()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E7E5E4] hover:bg-[#FAF8F5] text-xs font-semibold text-[#1C1917] shadow-2xs transition self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#D94E28]" />
            <span>Add Channel</span>
          </button>
        )}
      </div>

      {/* List of Active Channels */}
      {channels.length > 0 ? (
        <div className="space-y-2.5">
          {channels.map((item, index) => {
            const meta = SUPPORTED_PLATFORMS[item.platform] || SUPPORTED_PLATFORMS.website;
            const previewUrl = normalizeSocialUrl(item.platform, item.handleOrUrl);

            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl transition hover:border-[#D94E28]/30 group"
              >
                {/* Platform Dropdown */}
                <div className="relative sm:w-44 shrink-0">
                  <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-[#E7E5E4] shadow-2xs">
                    <SocialIcon platform={item.platform} className="w-4 h-4 text-[#1C1917] shrink-0" />
                    <select
                      value={item.platform}
                      onChange={(e) =>
                        handleUpdatePlatform(item.id, e.target.value as SocialPlatform)
                      }
                      className="w-full bg-transparent text-xs font-semibold text-[#1C1917] focus:outline-none cursor-pointer"
                    >
                      {Object.values(SUPPORTED_PLATFORMS).map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Handle / URL Input */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={item.handleOrUrl}
                    onChange={(e) =>
                      handleUpdateHandleOrUrl(item.id, e.target.value)
                    }
                    placeholder={meta.placeholder}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E7E5E4] bg-white font-mono text-[#1C1917] placeholder:text-stone-400 focus:outline-none focus:border-[#D94E28] focus:ring-1 focus:ring-[#D94E28]"
                  />
                  {previewUrl && (
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Preview: ${previewUrl}`}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#D94E28] transition p-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Delete Row Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveChannel(item.id)}
                  title="Remove Channel"
                  className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer self-end sm:self-auto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State with Quick Add Buttons */
        <div className="p-6 bg-[#FAF8F5] border border-dashed border-[#E7E5E4] rounded-2xl text-center space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-white border border-[#E7E5E4] flex items-center justify-center mx-auto text-stone-400 shadow-2xs">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#1C1917]">
              No Social Media Channels Configured
            </p>
            <p className="text-[11px] text-[#78716C] mt-0.5">
              Select a popular channel below to add it instantly:
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
            {QUICK_PRESETS.map((p) => {
              const meta = SUPPORTED_PLATFORMS[p];
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => handleAddChannel(p)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E7E5E4] hover:border-[#D94E28]/40 hover:bg-stone-50 text-xs font-semibold text-[#1C1917] shadow-2xs transition cursor-pointer"
                >
                  <SocialIcon platform={p} className="w-3.5 h-3.5 text-[#D94E28]" />
                  <span>+ {meta.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Add Pills if channels exist but not all popular ones are added yet */}
      {channels.length > 0 && !isMaxReached && availableQuickPills.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-[11px] font-medium text-[#78716C] mr-1">
            Quick Add:
          </span>
          {availableQuickPills.map((p) => {
            const meta = SUPPORTED_PLATFORMS[p];
            return (
              <button
                key={p}
                type="button"
                onClick={() => handleAddChannel(p)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-semibold transition cursor-pointer"
              >
                <SocialIcon platform={p} className="w-3 h-3 text-[#D94E28]" />
                <span>+ {meta.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {isMaxReached && (
        <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Maximum {maxChannels} social channels reached to keep storefront header tidy.</span>
        </p>
      )}
    </div>
  );
}
