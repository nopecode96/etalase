import React from "react";

export function CoverBanner({
  bannerUrl,
  defaultGradient = "from-teal-800 via-teal-900 to-stone-900",
  heightClass = "h-32",
}: {
  bannerUrl?: string | null;
  defaultGradient?: string;
  heightClass?: string;
}) {
  return (
    <div className={`relative w-full ${heightClass} overflow-hidden shrink-0`}>
      {bannerUrl ? (
        <img
          src={bannerUrl}
          alt="Cover Banner"
          className="w-full h-full object-cover object-center"
        />
      ) : (
        <div className={`w-full h-full bg-gradient-to-r ${defaultGradient}`} />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none" />
    </div>
  );
}
