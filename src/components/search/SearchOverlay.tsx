"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useSearchStore } from "@/lib/store";

const trending = ["Boxer Briefs", "Multipacks", "Bamboo", "Modal Trunks", "Performance"];

export default function SearchOverlay() {
  const open = useSearchStore((s) => s.isOpen);
  const onClose = useSearchStore((s) => s.close);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-paper text-ink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="max-w-3xl mx-auto pt-24 px-6">
            <div className="flex items-center justify-between mb-8">
              <p className="font-display text-2xl">Search</p>
              <button aria-label="Close search" className="cursor-pointer p-2" onClick={onClose}>
                <X size={24} />
              </button>
            </div>
            <div className="flex items-center gap-3 border-b-2 border-ink pb-4">
              <Search size={22} className="text-charcoal/60" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for boxer briefs, trunks, multipacks..."
                className="flex-1 bg-transparent text-xl md:text-2xl font-display outline-none placeholder:text-charcoal/40"
              />
            </div>

            {!query && (
              <div className="mt-10">
                <p className="text-xs tracking-widest text-charcoal/50 mb-4">TRENDING SEARCHES</p>
                <div className="flex flex-wrap gap-2">
                  {trending.map((t) => (
                    <button
                      key={t}
                      onClick={() => setQuery(t)}
                      className="cursor-pointer px-4 py-2 rounded-full border border-line text-sm hover:border-gold hover:text-gold transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query && (
              <div className="mt-8 space-y-1">
                {results.length === 0 && (
                  <p className="text-charcoal/60 py-8 text-center">No results for &ldquo;{query}&rdquo;</p>
                )}
                {results.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-cream transition-colors cursor-pointer"
                  >
                    <img src={p.images[0]} alt={p.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-charcoal/60">{p.category}</p>
                    </div>
                    <p className="font-medium">{formatPrice(p.price)}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
