"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/lib/store";
import { products } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";

export default function WishlistPage() {
  const ids = useWishlistStore((s) => s.ids);
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <div className="max-w-[1600px] mx-auto px-5 md:px-8 py-10 md:py-16">
      <h1 className="font-display text-3xl md:text-5xl mb-10">Your Wishlist</h1>
      {items.length === 0 ? (
        <div className="py-24 text-center">
          <Heart size={40} className="text-charcoal/30 mx-auto mb-4" />
          <p className="text-charcoal/60 mb-6">Save your favorite pieces here for later.</p>
          <Link
            href="/shop"
            className="cursor-pointer inline-block px-8 py-4 rounded-full bg-ink text-paper font-semibold hover:bg-charcoal transition-colors"
          >
            Browse the Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
