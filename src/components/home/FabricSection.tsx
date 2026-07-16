"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Droplets, Wind, Feather, ShieldOff, Sparkles, Tag } from "lucide-react";
import { editorial } from "@/lib/images";

const fabrics = [
  { icon: Sparkles, title: "95% Premium Cotton", desc: "Combed for a soft, durable hand feel." },
  { icon: Feather, title: "Modal & Bamboo", desc: "Silk-like softness, naturally sourced." },
  { icon: Wind, title: "Moisture Wicking", desc: "Stays dry through your most active days." },
  { icon: Droplets, title: "Breathable", desc: "Engineered airflow, all-day freshness." },
  { icon: ShieldOff, title: "Anti-Odor", desc: "Antimicrobial finish, fewer washes needed." },
  { icon: Tag, title: "Tagless Comfort", desc: "No scratchy labels, ever." },
];

export default function FabricSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const handleVideoLoad = useCallback(() => setVideoLoaded(true), []);

  return (
    <section id="fabrics" className="bg-ink text-paper py-20 md:py-28 scroll-mt-24">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/5] rounded-2xl overflow-hidden order-2 md:order-1"
        >
          <img
            src={editorial.fabricCloseup}
            alt="Close-up of premium fabric weave"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: videoLoaded ? 0 : 1 }}
          />
          <video
            src="/videos/5.mp4"
            poster={editorial.fabricCloseup}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={handleVideoLoad}
            className="w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: videoLoaded ? 1 : 0 }}
          />
        </motion.div>
        <div className="order-1 md:order-2">
          <h2 className="font-display text-3xl md:text-5xl mb-6 text-balance">Fabric, Perfected.</h2>
          <p className="text-white/70 max-w-lg mb-10 leading-relaxed">
            Every ELKO piece begins with fabric sourced for one purpose: to disappear against your skin. We test each
            blend for stretch recovery, breathability, and longevity before it ever reaches production.
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-8">
            {fabrics.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Icon size={22} className="text-gold mb-3" strokeWidth={1.5} />
                <p className="font-medium text-sm mb-1">{title}</p>
                <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
