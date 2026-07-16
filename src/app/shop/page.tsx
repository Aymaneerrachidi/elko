import { Suspense } from "react";
import type { Metadata } from "next";
import ShopPageClient from "./ShopPageClient";

export const metadata: Metadata = {
  title: "Shop All — ELKO",
  description: "Browse the full ELKO catalog of premium men's underwear essentials.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-[1600px] mx-auto px-5 md:px-8 py-24 text-center text-charcoal/50">Loading…</div>}>
      <ShopPageClient />
    </Suspense>
  );
}
