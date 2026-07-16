"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import Stars from "@/components/ui/Stars";
import { avatars } from "@/lib/images";

const reviews = [
  {
    name: "Marcus T.",
    avatar: avatars[0],
    rating: 5,
    text: "Genuinely the most comfortable underwear I've ever worn. The waistband doesn't roll and the fabric only gets softer with washes.",
  },
  {
    name: "James R.",
    avatar: avatars[1],
    rating: 5,
    text: "I bought one pair to try and ended up ordering the multipack the next week. Fit is exactly true to size.",
  },
  {
    name: "Daniel K.",
    avatar: avatars[2],
    rating: 4,
    text: "The modal trunks feel unreal against skin. Slightly pricier than what I'm used to but worth it for daily wear.",
  },
  {
    name: "Andre P.",
    avatar: avatars[3],
    rating: 5,
    text: "Switched my entire drawer over to ELKO. No more chafing on long run days thanks to the performance line.",
  },
  {
    name: "Chris M.",
    avatar: avatars[4],
    rating: 5,
    text: "Packaging alone feels premium. But the product backs it up — breathable, soft, and holds its shape.",
  },
];

export default function ReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const visible = 3;

  const next = () => setIndex((i) => (i + 1) % reviews.length);
  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);

  const displayed = Array.from({ length: visible }, (_, i) => reviews[(index + i) % reviews.length]);

  return (
    <section className="max-w-[1600px] mx-auto px-5 md:px-8 py-20 md:py-28">
      <div className="flex items-end justify-between mb-10 md:mb-14">
        <h2 className="font-display text-3xl md:text-5xl">
          What Men Are Saying <span className="text-gold">·</span>{" "}
          <span className="text-charcoal/40 text-2xl md:text-3xl">verified only</span>
        </h2>
        <div className="hidden md:flex gap-2">
          <button
            aria-label="Previous reviews"
            onClick={prev}
            className="cursor-pointer w-11 h-11 rounded-full border border-line flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            aria-label="Next reviews"
            onClick={next}
            className="cursor-pointer w-11 h-11 rounded-full border border-line flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {displayed.map((review, i) => (
            <motion.div
              key={`${review.name}-${index}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="p-6 md:p-7 rounded-2xl bg-white/60 backdrop-blur-sm border border-line"
            >
              <Stars rating={review.rating} />
              <p className="text-sm text-charcoal/80 leading-relaxed my-4">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <img src={review.avatar} alt={review.name} className="w-9 h-9 rounded-full object-cover" />
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium">{review.name}</span>
                  <BadgeCheck size={14} className="text-gold" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex md:hidden justify-center gap-3 mt-8">
        <button
          aria-label="Previous reviews"
          onClick={prev}
          className="cursor-pointer w-11 h-11 rounded-full border border-line flex items-center justify-center"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          aria-label="Next reviews"
          onClick={next}
          className="cursor-pointer w-11 h-11 rounded-full border border-line flex items-center justify-center"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
