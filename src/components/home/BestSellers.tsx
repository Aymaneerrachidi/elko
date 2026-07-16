"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";

export default function BestSellers() {
  const items = products.slice(0, 4);
  return (
    <section className="max-w-[1600px] mx-auto px-5 md:px-8 py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
        <h2 className="font-display text-3xl md:text-5xl max-w-md text-balance">
          The four pairs men reorder without thinking twice.
        </h2>
        <div className="flex items-center gap-6">
          <p className="text-sm text-charcoal/60 whitespace-nowrap">4.9★ average across 1,200+ reviews</p>
          <Link
            href="/shop?badge=best-seller"
            className="hidden md:inline-block cursor-pointer text-sm font-semibold border-b border-ink pb-0.5 hover:text-gold hover:border-gold transition-colors whitespace-nowrap"
          >
            View All
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProductCard product={product} videoSrc="/videos/7.mp4" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
