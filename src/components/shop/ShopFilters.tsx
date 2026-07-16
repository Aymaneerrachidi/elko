"use client";

import { cn } from "@/lib/utils";
import { Category, Fabric } from "@/lib/types";

export interface FilterState {
  categories: Category[];
  fabrics: Fabric[];
  maxPrice: number;
  inStockOnly: boolean;
}

const allCategories: Category[] = [
  "Boxer Briefs",
  "Briefs",
  "Trunks",
  "Boxers",
  "Undershirts",
  "Tank Tops",
  "Multipacks",
];

const allFabrics: Fabric[] = ["Premium Cotton", "Modal", "Bamboo", "Performance Mesh", "Cotton Stretch"];

export default function ShopFilters({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
}) {
  const toggleCategory = (c: Category) => {
    onChange({
      ...filters,
      categories: filters.categories.includes(c)
        ? filters.categories.filter((x) => x !== c)
        : [...filters.categories, c],
    });
  };

  const toggleFabric = (f: Fabric) => {
    onChange({
      ...filters,
      fabrics: filters.fabrics.includes(f) ? filters.fabrics.filter((x) => x !== f) : [...filters.fabrics, f],
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs tracking-widest text-charcoal/50 mb-4">CATEGORY</p>
        <ul className="space-y-2.5">
          {allCategories.map((c) => (
            <li key={c}>
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(c)}
                  onChange={() => toggleCategory(c)}
                  className="w-4 h-4 accent-black cursor-pointer"
                />
                <span
                  className={cn(
                    "text-sm group-hover:text-gold transition-colors",
                    filters.categories.includes(c) && "font-medium"
                  )}
                >
                  {c}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs tracking-widest text-charcoal/50 mb-4">FABRIC</p>
        <ul className="space-y-2.5">
          {allFabrics.map((f) => (
            <li key={f}>
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.fabrics.includes(f)}
                  onChange={() => toggleFabric(f)}
                  className="w-4 h-4 accent-black cursor-pointer"
                />
                <span
                  className={cn(
                    "text-sm group-hover:text-gold transition-colors",
                    filters.fabrics.includes(f) && "font-medium"
                  )}
                >
                  {f}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs tracking-widest text-charcoal/50">MAX PRICE</p>
          <span className="text-sm font-medium">${filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min={20}
          max={100}
          step={2}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-black cursor-pointer"
        />
      </div>

      <div>
        <label className="flex items-center gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
            className="w-4 h-4 accent-black cursor-pointer"
          />
          <span className="text-sm group-hover:text-gold transition-colors">In Stock Only</span>
        </label>
      </div>

      <button
        onClick={() => onChange({ categories: [], fabrics: [], maxPrice: 100, inStockOnly: false })}
        className="cursor-pointer text-xs font-semibold underline underline-offset-4 hover:text-gold transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
}
