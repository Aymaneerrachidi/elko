"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Heart, Eye } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Product, Size } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";
import { useCartStore, useWishlistStore } from "@/lib/store";
import Stars from "@/components/ui/Stars";
import QuickViewModal from "./QuickViewModal";

export default function ProductCard({ product, videoSrc }: { product: Product; videoSrc?: string }) {
  const [showSizes, setShowSizes] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [videoHover, setVideoHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.has(product.id));

  const discount = product.compareAtPrice
    ? Math.round(100 - (product.price / product.compareAtPrice) * 100)
    : null;

  const handleQuickAdd = (size: Size) => {
    addItem(product, product.colors[0].name, size);
    setShowSizes(false);
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => { if (videoSrc) { setVideoHover(true); videoRef.current?.play().catch(() => {}); } }}
      onMouseLeave={() => { if (videoSrc) { setVideoHover(false); videoRef.current?.pause(); } }}
    >
      <div className="bezel-outer transition-shadow duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:shadow-[0_24px_48px_-16px_rgba(17,17,16,0.18)]">
      <div className="bezel-inner relative aspect-[3/4] overflow-hidden bg-cream">
        <Link href={`/product/${product.slug}`} className="cursor-pointer block w-full h-full">
          {videoSrc ? (
            <>
              <img
                src={product.images[0]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ opacity: videoHover ? 0 : 1 }}
                loading="lazy"
              />
              <video
                ref={videoRef}
                src={videoSrc}
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ opacity: videoHover ? 1 : 0 }}
              />
            </>
          ) : (
            <>
              <img
                src={product.images[0]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-0 group-hover:scale-105"
                loading="lazy"
              />
              <img
                src={product.hoverImage ?? product.images[1] ?? product.images[0]}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100"
                loading="lazy"
              />
            </>
          )}
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badges.map((badge) => (
            <span
              key={badge}
              className={cn(
                "text-[10px] font-semibold tracking-wide px-2.5 py-1 rounded-full",
                badge === "Sale" && "bg-red-600 text-white",
                badge === "New" && "bg-ink text-paper",
                badge === "Best Seller" && "bg-gold text-ink",
                badge === "Limited" && "bg-charcoal text-paper"
              )}
            >
              {badge === "Sale" && discount ? `-${discount}%` : badge.toUpperCase()}
            </span>
          ))}
        </div>

        <button
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 z-10 cursor-pointer w-9 h-9 rounded-full bg-paper/90 backdrop-blur flex items-center justify-center hover:scale-105 transition-transform"
        >
          <Heart size={16} className={isWishlisted ? "fill-gold text-gold" : "text-ink"} />
        </button>

        <button
          aria-label="Quick view"
          onClick={() => setQuickViewOpen(true)}
          className="absolute top-14 right-3 z-10 cursor-pointer w-9 h-9 rounded-full bg-paper/90 backdrop-blur items-center justify-center hover:scale-105 transition-transform hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Eye size={16} className="text-ink" />
        </button>

        <div className="absolute bottom-3 left-3 right-3 z-10 md:opacity-0 md:translate-y-3 md:blur-[2px] md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:blur-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          {!showSizes ? (
            <button
              onClick={() => setShowSizes(true)}
              className="cursor-pointer w-full py-2.5 rounded-full bg-paper/95 backdrop-blur text-ink text-xs font-semibold tracking-wide hover:bg-ink hover:text-paper transition-colors duration-300"
            >
              QUICK ADD
            </button>
          ) : (
            <div className="flex gap-1 bg-paper/95 backdrop-blur rounded-full p-1">
              {product.sizes.map((size) => {
                const outOfStock = product.stock[size] === 0;
                return (
                  <button
                    key={size}
                    disabled={outOfStock}
                    onClick={() => handleQuickAdd(size)}
                    className={cn(
                      "cursor-pointer flex-1 py-2 rounded-full text-[11px] font-semibold transition-colors duration-300",
                      outOfStock
                        ? "text-charcoal/30 cursor-not-allowed line-through"
                        : "hover:bg-ink hover:text-paper"
                    )}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      </div>

      <div className="pt-4">
        <div className="flex items-center gap-1.5 mb-1">
          <Stars rating={product.rating} size={12} />
          <span className="text-[11px] text-charcoal/50">({product.reviewCount})</span>
        </div>
        <Link href={`/product/${product.slug}`} className="cursor-pointer">
          <h3 className="text-sm font-medium hover:text-gold transition-colors">{product.name}</h3>
        </Link>
        <p className="text-xs text-charcoal/50 mb-2">{product.fabric}</p>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-sm">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-xs text-charcoal/40 line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {product.colors.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="w-4 h-4 rounded-full border border-line"
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {quickViewOpen && <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
