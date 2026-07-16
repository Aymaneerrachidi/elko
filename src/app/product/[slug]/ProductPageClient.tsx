"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Minus, Plus, Truck, ShieldCheck, BadgeCheck, Ruler } from "lucide-react";
import { Product, Size } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCartStore, useWishlistStore } from "@/lib/store";
import Stars from "@/components/ui/Stars";
import ProductGallery from "@/components/product/ProductGallery";
import SizeGuideModal from "@/components/product/SizeGuideModal";
import Accordion from "@/components/ui/Accordion";
import ProductCard from "@/components/product/ProductCard";
import { getRelatedProducts } from "@/lib/products";

export default function ProductPageClient({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));
  const related = getRelatedProducts(product, 4);

  useEffect(() => {
    const onScroll = () => setShowStickyBar(window.scrollY > 640);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    try {
      const key = "elko-recently-viewed";
      const raw = JSON.parse(localStorage.getItem(key) ?? "[]") as string[];
      const updated = [product.slug, ...raw.filter((s) => s !== product.slug)].slice(0, 6);
      localStorage.setItem(key, JSON.stringify(updated));
      import("@/lib/products").then(({ products }) => {
        setRecentlyViewed(
          updated.filter((s) => s !== product.slug).map((s) => products.find((p) => p.slug === s)).filter(Boolean) as Product[]
        );
      });
    } catch {
      // localStorage unavailable — skip recently viewed
    }
  }, [product.slug]);

  const handleAdd = () => {
    if (!size) return;
    addItem(product, color, size, quantity);
  };

  const stockForSize = size ? product.stock[size] : null;

  return (
    <div className="max-w-[1600px] mx-auto px-5 md:px-8 py-8 md:py-14">
      <nav className="text-xs text-charcoal/50 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-gold cursor-pointer">Home</Link> /
        <Link href="/shop" className="hover:text-gold cursor-pointer">Shop</Link> /
        <span className="text-charcoal">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        <ProductGallery images={product.images} videoSrc="/videos/2.mp4" name={product.name} />

        <div>
          <p className="text-xs tracking-widest text-gold mb-3">{product.collection.toUpperCase()}</p>
          <h1 className="font-display text-3xl md:text-4xl mb-3">{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <Stars rating={product.rating} />
            <a href="#reviews" className="text-sm text-charcoal/60 hover:text-gold cursor-pointer">
              {product.rating} ({product.reviewCount} reviews)
            </a>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-semibold">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-base text-charcoal/40 line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
            {product.badges.includes("Sale") && product.compareAtPrice && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-600 text-white">
                -{Math.round(100 - (product.price / product.compareAtPrice) * 100)}%
              </span>
            )}
          </div>

          <p className="text-sm text-charcoal/70 leading-relaxed mb-7 max-w-md">{product.description}</p>

          <div className="mb-6">
            <p className="text-xs tracking-widest text-charcoal/50 mb-3">COLOR — {color}</p>
            <div className="flex gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={cn(
                    "cursor-pointer w-9 h-9 rounded-full border-2 transition-all",
                    color === c.name ? "border-gold scale-110" : "border-transparent hover:border-line"
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs tracking-widest text-charcoal/50">SIZE</p>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="cursor-pointer text-xs font-medium flex items-center gap-1 hover:text-gold transition-colors"
              >
                <Ruler size={13} /> Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => {
                const outOfStock = product.stock[s] === 0;
                return (
                  <button
                    key={s}
                    disabled={outOfStock}
                    onClick={() => setSize(s)}
                    className={cn(
                      "cursor-pointer w-12 h-12 rounded-full border text-sm font-medium transition-colors",
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
            {size && stockForSize !== null && stockForSize > 0 && stockForSize <= 6 && (
              <p className="text-xs text-red-600 mt-2">Only {stockForSize} left in size {size}</p>
            )}
          </div>

          <div className="flex items-center gap-4 mb-7">
            <p className="text-xs tracking-widest text-charcoal/50">QTY</p>
            <div className="flex items-center border border-line rounded-full">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="cursor-pointer p-2.5 hover:text-gold transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
                className="cursor-pointer p-2.5 hover:text-gold transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAdd}
              disabled={!size}
              className="cursor-pointer flex-1 py-4 rounded-full bg-ink text-paper font-semibold hover:bg-charcoal transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {size ? "Add to Bag" : "Select a Size"}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Add to wishlist"
              className={cn(
                "cursor-pointer w-14 h-14 shrink-0 rounded-full border flex items-center justify-center transition-colors",
                isWishlisted ? "border-gold bg-gold/10" : "border-line hover:border-ink"
              )}
            >
              <Heart size={20} className={isWishlisted ? "fill-gold text-gold" : ""} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 p-4 rounded-2xl bg-cream">
            <div className="flex items-center gap-2.5">
              <Truck size={18} className="text-gold shrink-0" />
              <span className="text-xs">Free shipping, arrives in 3–5 days</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-gold shrink-0" />
              <span className="text-xs">365-day quality guarantee</span>
            </div>
            <div className="flex items-center gap-2.5">
              <BadgeCheck size={18} className="text-gold shrink-0" />
              <span className="text-xs">Secure checkout</span>
            </div>
          </div>

          <Accordion
            items={[
              { title: "Description", content: <p>{product.description}</p> },
              {
                title: "Highlights",
                content: (
                  <ul className="list-disc pl-4 space-y-1">
                    {product.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                ),
              },
              { title: "Materials", content: <p>{product.materials}</p> },
              {
                title: "Care Instructions",
                content: (
                  <ul className="list-disc pl-4 space-y-1">
                    {product.care.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                ),
              },
              {
                title: "Shipping",
                content: <p>Free standard shipping on orders over $50. Express shipping available at checkout. Orders ship within 1 business day.</p>,
              },
              {
                title: "Returns",
                content: <p>Free returns within 60 days. Unworn items with tags attached qualify for a full refund under our 365-day quality guarantee.</p>,
              },
            ]}
          />
        </div>
      </div>

      <section id="reviews" className="mt-20 md:mt-28">
        <h2 className="font-display text-2xl md:text-3xl mb-8">Customer Reviews</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="p-6 rounded-2xl bg-cream text-center">
              <p className="font-display text-5xl mb-2">{product.rating}</p>
              <Stars rating={product.rating} size={18} />
              <p className="text-sm text-charcoal/60 mt-2">Based on {product.reviewCount} reviews</p>
            </div>
          </div>
          <div className="md:col-span-2 space-y-6">
            {product.reviews.map((r) => (
              <div key={r.id} className="pb-6 border-b border-line last:border-0">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{r.author}</span>
                    {r.verified && (
                      <span className="flex items-center gap-1 text-[11px] text-gold">
                        <BadgeCheck size={12} /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-charcoal/40">{r.date}</span>
                </div>
                <Stars rating={r.rating} size={13} />
                <p className="font-medium text-sm mt-2 mb-1">{r.title}</p>
                <p className="text-sm text-charcoal/70 leading-relaxed">{r.body}</p>
                {r.size && r.fit && (
                  <p className="text-xs text-charcoal/50 mt-2">
                    Purchased size {r.size} · Fit: {r.fit}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-20 md:mt-28">
          <h2 className="font-display text-2xl md:text-3xl mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {recentlyViewed.length > 0 && (
        <section className="mt-20 md:mt-28">
          <h2 className="font-display text-2xl md:text-3xl mb-8">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {recentlyViewed.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <AnimatePresence>
        {sizeGuideOpen && <SizeGuideModal onClose={() => setSizeGuideOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-0 left-0 right-0 z-30 bg-paper/95 backdrop-blur border-t border-line px-5 md:px-8 py-3 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img src={product.images[0]} alt={product.name} className="w-11 h-11 rounded-lg object-cover hidden sm:block" />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{product.name}</p>
                <p className="text-sm text-charcoal/60">{formatPrice(product.price)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!size && (
                <select
                  onChange={(e) => setSize(e.target.value as Size)}
                  defaultValue=""
                  className="cursor-pointer text-sm border border-line rounded-full px-3 py-2 outline-none"
                >
                  <option value="" disabled>Size</option>
                  {product.sizes.map((s) => (
                    <option key={s} value={s} disabled={product.stock[s] === 0}>
                      {s}
                    </option>
                  ))}
                </select>
              )}
              <button
                onClick={handleAdd}
                disabled={!size}
                className="cursor-pointer px-6 py-2.5 rounded-full bg-ink text-paper text-sm font-semibold hover:bg-charcoal transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Add to Bag
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
