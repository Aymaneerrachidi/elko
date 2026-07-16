"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryItem {
  type: "image" | "video";
  src: string;
}

export default function ProductGallery({
  images,
  videoSrc,
  name,
}: {
  images: string[];
  videoSrc?: string;
  name: string;
}) {
  const items: GalleryItem[] = [
    ...images.map((src): GalleryItem => ({ type: "image", src })),
    ...(videoSrc ? [{ type: "video" as const, src: videoSrc }] : []),
  ];

  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const activeItem = items[active];

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              "relative cursor-pointer shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 transition-colors",
              active === i ? "border-gold" : "border-transparent"
            )}
          >
            {item.type === "video" ? (
              <>
                <video src={item.src} className="w-full h-full object-cover" muted playsInline />
                <span className="absolute inset-0 bg-black/20 flex items-center justify-center transition-colors group-hover:bg-black/30">
                  <span className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center">
                    <Play size={12} className="text-ink ml-0.5 fill-ink" />
                  </span>
                </span>
              </>
            ) : (
              <img src={item.src} alt={`${name} view ${i + 1}`} className="w-full h-full object-cover" />
            )}
          </button>
        ))}
      </div>
      <div
        className="relative flex-1 aspect-square rounded-2xl overflow-hidden bg-cream cursor-zoom-in"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
          });
        }}
      >
        {activeItem.type === "video" ? (
          <video
            src={activeItem.src}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src={activeItem.src}
            alt={`${name} — main image`}
            className="w-full h-full object-cover transition-transform duration-200"
            style={
              zoom
                ? { transform: "scale(1.8)", transformOrigin: `${pos.x}% ${pos.y}%` }
                : { transform: "scale(1)" }
            }
          />
        )}
      </div>
    </div>
  );
}
