"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { heroImage } from "@/lib/images";

export default function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleVideoLoad = useCallback(() => setVideoLoaded(true), []);

  return (
    <section className="relative h-[92dvh] min-h-[640px] w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        {reduceMotion ? (
          <img
            src={heroImage}
            alt="ELKO premium fabric detail"
            className="w-full h-full object-cover"
            style={{ objectPosition: "50% 30%" }}
          />
        ) : (
          <>
            <img
              src={heroImage}
              alt="ELKO premium fabric detail"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
              style={{ objectPosition: "50% 30%", opacity: videoLoaded ? 0 : 1 }}
            />
            <video
              src="/videos/1.mp4"
              poster={heroImage}
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={handleVideoLoad}
              className="w-full h-full object-cover transition-opacity duration-700"
              style={{ objectPosition: "50% 30%", opacity: videoLoaded ? 1 : 0 }}
            />
          </>
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      <div className="relative h-full max-w-[1600px] mx-auto px-5 md:px-8 flex flex-col justify-end pb-20 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-gold text-xs md:text-sm tracking-[0.35em] mb-5"
        >
          THE EVERYDAY ESSENTIALS COLLECTION
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="font-display text-white text-4xl sm:text-5xl md:text-7xl leading-[1.05] max-w-2xl text-balance"
        >
          Engineered for Comfort.
          <br />
          Designed for Confidence.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="text-white/80 mt-6 max-w-md text-base md:text-lg leading-relaxed"
        >
          Premium everyday essentials crafted with the softest fabrics.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <Link
            href="/shop"
            className="group cursor-pointer pl-8 pr-2 py-2 rounded-full bg-gold text-ink font-semibold text-sm tracking-wide flex items-center gap-4 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-gold-light active:scale-[0.98]"
          >
            Shop Now
            <span className="w-11 h-11 rounded-full bg-ink text-paper flex items-center justify-center shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-12">
              <ArrowUpRight size={18} />
            </span>
          </Link>
          <Link
            href="/collections"
            className="group cursor-pointer pl-8 pr-2 py-2 rounded-full border border-white/40 text-white font-semibold text-sm tracking-wide flex items-center gap-4 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-white/70 active:scale-[0.98]"
          >
            Explore Collection
            <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-12 group-hover:bg-white/20">
              <ArrowUpRight size={18} />
            </span>
          </Link>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/70"
      >
        <span className="text-[10px] tracking-widest">SCROLL</span>
        <span className="w-px h-8 bg-white/40" />
      </motion.div>
    </section>
  );
}
