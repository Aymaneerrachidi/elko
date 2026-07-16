"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Product, Size } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store";
import Stars from "@/components/ui/Stars";

export default function QuickViewModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState<Size | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/60 z-[60]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 max-w-3xl w-full md:w-[90%] bg-paper rounded-2xl z-[60] overflow-hidden max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25 }}
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 cursor-pointer w-9 h-9 rounded-full bg-paper/90 flex items-center justify-center shadow"
        >
          <X size={18} />
        </button>
        <div className="grid md:grid-cols-2">
          <div className="aspect-square bg-cream">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="p-6 md:p-8">
            <p className="text-xs tracking-widest text-charcoal/50 mb-2">{product.collection.toUpperCase()}</p>
            <h2 className="font-display text-2xl mb-2">{product.name}</h2>
            <div className="flex items-center gap-2 mb-3">
              <Stars rating={product.rating} />
              <span className="text-sm text-charcoal/60">({product.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xl font-semibold">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-sm text-charcoal/40 line-through">{formatPrice(product.compareAtPrice)}</span>
              )}
            </div>
            <p className="text-sm text-charcoal/70 leading-relaxed mb-5 line-clamp-3">{product.description}</p>

            <div className="mb-5">
              <p className="text-xs tracking-widest text-charcoal/50 mb-2">COLOR — {color}</p>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    className={cn(
                      "cursor-pointer w-8 h-8 rounded-full border-2 transition-all",
                      color === c.name ? "border-gold" : "border-transparent"
                    )}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs tracking-widest text-charcoal/50 mb-2">SIZE</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const outOfStock = product.stock[s] === 0;
                  return (
                    <button
                      key={s}
                      disabled={outOfStock}
                      onClick={() => setSize(s)}
                      className={cn(
                        "cursor-pointer w-11 h-11 rounded-full border text-sm font-medium transition-colors",
                        outOfStock
                          ? "border-line text-charcoal/30 cursor-not-allowed line-through"
                          : size === s
                          ? "bg-ink text-paper border-ink"
                          : "border-line hover:border-ink"
                      )}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              disabled={!size}
              onClick={() => {
                if (size) {
                  addItem(product, color, size);
                  onClose();
                }
              }}
              className="cursor-pointer w-full py-3.5 rounded-full bg-ink text-paper font-semibold hover:bg-charcoal transition-colors disabled:opacity-40 disabled:cursor-not-allowed mb-3"
            >
              {size ? "Add to Bag" : "Select a Size"}
            </button>
            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="block text-center text-sm font-medium hover:text-gold transition-colors cursor-pointer"
            >
              View Full Details
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}
