"use client";

import { motion } from "framer-motion";
import { instagramPosts } from "@/lib/images";
import { InstagramIcon } from "@/components/ui/SocialIcons";

export default function InstagramGallery() {
  return (
    <section className="max-w-[1600px] mx-auto px-5 md:px-8 py-20 md:py-28">
      <div className="text-center mb-10 md:mb-14">
        <h2 className="font-display text-3xl md:text-5xl mb-3">@wearelko</h2>
        <p className="text-charcoal/60">Tag us for a chance to be featured.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
        {instagramPosts.map((src, i) => (
          <motion.a
            key={i}
            href="#"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
          >
            <img
              src={src}
              alt="ELKO customer Instagram post"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <InstagramIcon size={22} />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
