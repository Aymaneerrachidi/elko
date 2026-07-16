"use client";

import Link from "next/link";
import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { categoryImages } from "@/lib/images";

const categories: {
  name: string;
  image: string;
  video?: string;
}[] = [
  { name: "Boxer Briefs", image: categoryImages["Boxer Briefs"], video: "/videos/boxers.mp4" },
  { name: "Briefs", image: categoryImages["Briefs"] },
  { name: "Trunks", image: categoryImages["Trunks"], video: "/videos/trunks.mp4" },
  { name: "Boxers", image: categoryImages["Boxers"] },
  { name: "Undershirts", image: categoryImages["Undershirts"], video: "/videos/crew%20neck.mp4" },
  { name: "Multipacks", image: categoryImages["Multipacks"] },
  { name: "Performance", image: categoryImages["Performance"], video: "/videos/performance%20short.mp4" },
  { name: "Tank Tops", image: categoryImages["Tank Tops"] },
];

export default function ShopByCategory() {
  const [hovered, setHovered] = useState<string | null>(null);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  const setVideoRef = useCallback((name: string) => (el: HTMLVideoElement | null) => {
    if (el) {
      videoRefs.current.set(name, el);
    } else {
      videoRefs.current.delete(name);
    }
  }, []);

  const handleMouseEnter = useCallback((name: string) => {
    setHovered(name);
    const video = videoRefs.current.get(name);
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  }, []);

  const handleMouseLeave = useCallback((name: string) => {
    setHovered(null);
    const video = videoRefs.current.get(name);
    if (video) video.pause();
  }, []);

  return (
    <section className="max-w-[1600px] mx-auto px-5 md:px-8 py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
        <h2 className="font-display text-3xl md:text-5xl">Shop by Category</h2>
        <p className="text-charcoal/60 text-sm max-w-xs">
          Eight fits, one standard: it should disappear against your skin by 9am.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {categories.map((cat, i) => {
          const isHovered = hovered === cat.name;
          return (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group relative block aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
                onMouseEnter={() => handleMouseEnter(cat.name)}
                onMouseLeave={() => handleMouseLeave(cat.name)}
              >
                <div className="absolute inset-0">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform: isHovered ? "scale(1.1)" : "scale(1)",
                      opacity: cat.video && isHovered ? 0 : 1,
                    }}
                    loading="lazy"
                  />
                  {cat.video && (
                    <video
                      ref={setVideoRef(cat.name)}
                      src={cat.video}
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        transform: isHovered ? "scale(1.1)" : "scale(1)",
                        opacity: isHovered ? 1 : 0,
                      }}
                    />
                  )}
                </div>
                <div
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    background: isHovered
                      ? "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 40%, transparent 100%)"
                      : "linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.05) 40%, transparent 100%)",
                  }}
                />
                <div className="relative h-full flex flex-col justify-end p-4 md:p-5">
                  <p className="text-white font-display text-lg md:text-xl">{cat.name}</p>
                  <span
                    className="text-white/70 text-xs mt-1 transition-all duration-300"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? "translateX(4px)" : "translateX(0)",
                    }}
                  >
                    Shop Now →
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
