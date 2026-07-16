import type { Metadata } from "next";
import Link from "next/link";
import { collections } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collections — ELKO",
  description: "Explore ELKO's curated collections of premium men's essentials.",
};

export default function CollectionsPage() {
  return (
    <div className="max-w-[1600px] mx-auto px-5 md:px-8 py-10 md:py-16">
      <div className="mb-12 max-w-xl">
        <h1 className="font-display text-3xl md:text-5xl mb-3">Collections</h1>
        <p className="text-charcoal/60">Five ways to build a drawer that works, curated by fabric and fit.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {collections.map((col) => (
          <Link
            key={col.slug}
            href={`/collections/${col.slug}`}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
          >
            <img
              src={col.image}
              alt={col.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              style={{ objectPosition: "50% 22%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-7">
              <p className="text-white font-display text-2xl md:text-3xl mb-2">{col.name}</p>
              <p className="text-white/75 text-sm max-w-sm mb-3">{col.description}</p>
              <span className="text-gold text-xs tracking-widest font-semibold md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                DISCOVER →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
