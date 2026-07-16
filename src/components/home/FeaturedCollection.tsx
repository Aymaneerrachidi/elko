"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { collections } from "@/lib/products";

export default function FeaturedCollection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const handleVideoLoad = useCallback(() => setVideoLoaded(true), []);

  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8">
        <div className="mb-10 md:mb-14 max-w-2xl">
          <h2 className="font-display text-3xl md:text-5xl mb-3">Featured Collections</h2>
          <p className="text-charcoal/60 text-sm">
            Five ways to build a drawer that works — from everyday basics to modal-soft luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 md:gap-5 md:h-[860px]">
          {collections.map((col, i) => {
            const span =
              i === 0
                ? "md:col-span-4 md:row-span-2"
                : i === 1
                ? "md:col-span-2 md:row-span-1"
                : i === 2
                ? "md:col-span-2 md:row-span-1"
                : "md:col-span-3 md:row-span-1";
            return (
              <motion.div
                key={col.slug}
                initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-2xl overflow-hidden group ${span} min-h-[280px] md:min-h-0`}
              >
                <Link href={`/collections/${col.slug}`} className="cursor-pointer block w-full h-full">
                  {i === 0 ? (
                    <>
                      <img
                        src={col.image}
                        alt={col.name}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                        style={{ objectPosition: "50% 22%", opacity: videoLoaded ? 0 : 1 }}
                        loading="lazy"
                      />
                      <video
                        src="/videos/4.mp4"
                        poster={col.image}
                        autoPlay
                        muted
                        loop
                        playsInline
                        onLoadedData={handleVideoLoad}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                        style={{ opacity: videoLoaded ? 1 : 0 }}
                      />
                    </>
                  ) : (
                    <img
                      src={col.image}
                      alt={col.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                      style={{ objectPosition: "50% 22%" }}
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                    <p className="text-white font-display text-2xl md:text-3xl mb-2">{col.name}</p>
                    <p className="text-white/75 text-sm max-w-xs mb-3">{col.description}</p>
                    <span className="group/cta inline-flex items-center gap-2 text-gold text-xs tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      DISCOVER
                      <span className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
