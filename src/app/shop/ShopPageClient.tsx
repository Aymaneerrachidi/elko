"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, LayoutGrid, List, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/lib/products";
import { Category } from "@/lib/types";
import ProductCard from "@/components/product/ProductCard";
import ShopFilters, { FilterState } from "@/components/shop/ShopFilters";
import { formatPrice, cn } from "@/lib/utils";
import Stars from "@/components/ui/Stars";
import Link from "next/link";

type SortOption = "newest" | "popular" | "price-asc" | "price-desc" | "rating";

const PAGE_SIZE = 8;

type BadgeFilter = "new" | "best-seller" | null;

export default function ShopPageClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as Category | null;
  const badgeParam = searchParams.get("badge");
  const initialBadge: BadgeFilter = badgeParam === "new" || badgeParam === "best-seller" ? badgeParam : null;
  const initialSort: SortOption = initialBadge === "new" ? "newest" : initialBadge === "best-seller" ? "popular" : "newest";

  const [filters, setFilters] = useState<FilterState>({
    categories: initialCategory ? [initialCategory] : [],
    fabrics: [],
    maxPrice: 100,
    inStockOnly: false,
  });
  const [badgeFilter, setBadgeFilter] = useState<BadgeFilter>(initialBadge);
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const pageTitle = badgeFilter === "new" ? "New Arrivals" : badgeFilter === "best-seller" ? "Best Sellers" : "Shop All";

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= filters.maxPrice);
    if (badgeFilter === "new") list = list.filter((p) => p.badges.includes("New"));
    if (badgeFilter === "best-seller") list = list.filter((p) => p.badges.includes("Best Seller"));
    if (filters.categories.length) list = list.filter((p) => filters.categories.includes(p.category));
    if (filters.fabrics.length) list = list.filter((p) => filters.fabrics.includes(p.fabric));
    if (filters.inStockOnly) list = list.filter((p) => Object.values(p.stock).some((s) => s > 0));

    switch (sort) {
      case "popular":
        list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
      default:
        list = [...list].sort((a, b) => (b.badges.includes("New") ? 1 : 0) - (a.badges.includes("New") ? 1 : 0));
        break;
    }
    return list;
  }, [filters, sort, badgeFilter]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="max-w-[1600px] mx-auto px-5 md:px-8 py-10 md:py-14">
      <div className="mb-8 flex items-center gap-4 flex-wrap">
        <h1 className="font-display text-3xl md:text-5xl">{pageTitle}</h1>
        {badgeFilter && (
          <button
            onClick={() => setBadgeFilter(null)}
            className="cursor-pointer flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-cream hover:bg-line transition-colors"
          >
            Viewing {pageTitle} <X size={12} />
          </button>
        )}
      </div>

      <div className="flex gap-10">
        <aside className="hidden lg:block w-64 shrink-0">
          <ShopFilters filters={filters} onChange={setFilters} />
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-line">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden cursor-pointer flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-line"
              >
                <SlidersHorizontal size={15} /> Filters
              </button>
              <p className="text-sm text-charcoal/60">{filtered.length} products</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="cursor-pointer text-sm border border-line rounded-full px-4 py-2 bg-paper outline-none focus:border-gold"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <div className="hidden sm:flex items-center border border-line rounded-full">
                <button
                  aria-label="Grid view"
                  onClick={() => setView("grid")}
                  className={cn("cursor-pointer p-2 rounded-full", view === "grid" && "bg-ink text-paper")}
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  aria-label="List view"
                  onClick={() => setView("list")}
                  className={cn("cursor-pointer p-2 rounded-full", view === "list" && "bg-ink text-paper")}
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="py-24 text-center text-charcoal/60">No products match your filters.</div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {visible.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="flex gap-5 p-4 rounded-2xl border border-line hover:border-gold/50 transition-colors cursor-pointer"
                >
                  <img src={p.images[0]} alt={p.name} className="w-32 h-36 object-cover rounded-xl shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Stars rating={p.rating} size={12} />
                      <span className="text-[11px] text-charcoal/50">({p.reviewCount})</span>
                    </div>
                    <p className="font-medium mb-1">{p.name}</p>
                    <p className="text-sm text-charcoal/60 mb-2 line-clamp-2 max-w-xl">{p.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{formatPrice(p.price)}</span>
                      {p.compareAtPrice && (
                        <span className="text-sm text-charcoal/40 line-through">{formatPrice(p.compareAtPrice)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {visibleCount < filtered.length && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="cursor-pointer px-8 py-3.5 rounded-full border border-ink text-sm font-semibold hover:bg-ink hover:text-paper transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-paper z-50 lg:hidden overflow-y-auto p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <p className="font-display text-xl">Filters</p>
                <button onClick={() => setMobileFiltersOpen(false)} className="cursor-pointer p-2">
                  <X size={20} />
                </button>
              </div>
              <ShopFilters filters={filters} onChange={setFilters} />
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="cursor-pointer w-full mt-8 py-3.5 rounded-full bg-ink text-paper font-semibold"
              >
                Show {filtered.length} Results
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
