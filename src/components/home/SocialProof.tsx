"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1600;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(to * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, to]);

  return (
    <span ref={ref}>
      {value.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 100000, suffix: "+", label: "Satisfied Customers" },
  { value: 4.9, suffix: "★", label: "Average Rating", decimals: 1 },
  { value: 500000, suffix: "+", label: "Products Sold" },
];

export default function SocialProof() {
  return (
    <section className="bg-cream py-16 md:py-24 border-y border-line">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <p className="font-display text-4xl md:text-6xl text-gold mb-2">
              <Counter to={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
            </p>
            <p className="text-charcoal/60 text-sm tracking-wide">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
