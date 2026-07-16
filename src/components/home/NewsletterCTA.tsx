"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const handleVideoLoad = useCallback(() => setVideoLoaded(true), []);

  return (
    <section className="relative max-w-[1600px] mx-auto px-5 md:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden bg-ink text-paper px-6 py-16 md:py-24 text-center"
      >
        <video
          src="/videos/6.mp4"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: videoLoaded ? 0.4 : 0 }}
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,rgba(201,169,110,0.5),transparent_60%)]" />
        <div className="relative max-w-xl mx-auto">
          <p className="text-gold text-xs tracking-[0.3em] mb-4">JOIN THE ELKO INSIDER LIST</p>
          <h2 className="font-display text-3xl md:text-5xl mb-4 text-balance">Get 15% Off Your First Order</h2>
          <p className="text-white/70 mb-8">
            Sign up for early access to new drops, restocks, and members-only offers.
          </p>
          {!submitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-4 text-sm outline-none focus:border-gold transition-colors placeholder:text-white/40"
              />
              <button
                type="submit"
                className="group cursor-pointer pl-6 pr-2 py-2 rounded-full bg-gold text-ink font-semibold text-sm flex items-center justify-center gap-3 hover:bg-gold-light transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] active:scale-[0.98]"
              >
                Subscribe
                <span className="w-10 h-10 rounded-full bg-ink text-paper flex items-center justify-center shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-12">
                  <ArrowRight size={16} />
                </span>
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-gold font-medium"
            >
              <Check size={20} /> Check your inbox for your 15% off code.
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
