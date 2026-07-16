"use client";

import { motion } from "framer-motion";
import { Gem, Scissors, Waves, Wind, Ruler, Sun, Timer, Minus } from "lucide-react";

const reasons = [
  { icon: Gem, title: "Luxury Comfort", desc: "Every detail engineered for all-day wear." },
  { icon: Scissors, title: "Premium Stitching", desc: "Reinforced flat-lock seams that last." },
  { icon: Waves, title: "Elastic Waistband", desc: "No roll, no dig, no compromise." },
  { icon: Wind, title: "Breathable", desc: "Engineered airflow keeps you cool." },
  { icon: Ruler, title: "Perfect Fit", desc: "Tailored cuts for every body type." },
  { icon: Sun, title: "Everyday Wear", desc: "Designed for real life, not just launch day." },
  { icon: Timer, title: "Long-Lasting", desc: "Holds shape wash after wash." },
  { icon: Minus, title: "Minimal Branding", desc: "Quiet luxury, no logos required." },
];

export default function WhyElko() {
  return (
    <section className="max-w-[1600px] mx-auto px-5 md:px-8 py-20 md:py-28">
      <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
        <h2 className="font-display text-3xl md:text-5xl mb-4">Why ELKO</h2>
        <p className="text-charcoal/60 leading-relaxed">
          We obsess over the details you never see so the fit you feel is effortless.
        </p>
      </div>
      <div className="grid md:grid-cols-2 md:gap-x-16">
        {reasons.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="group flex items-start gap-5 py-6 border-b border-line last:md:border-b md:[&:nth-last-child(2)]:border-b-0 last:border-b-0"
          >
            <span className="shrink-0 w-11 h-11 rounded-full bg-cream flex items-center justify-center transition-colors duration-300 group-hover:bg-gold/15">
              <Icon size={19} className="text-gold" strokeWidth={1.5} />
            </span>
            <div>
              <p className="font-medium text-[15px] mb-1">{title}</p>
              <p className="text-charcoal/55 text-sm leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
