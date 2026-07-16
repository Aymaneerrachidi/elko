import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections, products } from "@/lib/products";
import ProductCard from "@/components/product/ProductCard";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return {};
  return { title: `${collection.name} — ELKO`, description: collection.description };
}

export default async function CollectionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();

  const items = products.filter((p) => p.collection === collection.name);

  return (
    <div>
      <section className="relative h-[45vh] min-h-[320px] overflow-hidden">
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover"
          style={{ objectPosition: "50% 20%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/20" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-[1600px] mx-auto">
          <h1 className="font-display text-white text-4xl md:text-6xl mb-3">{collection.name}</h1>
          <p className="text-white/75 max-w-lg">{collection.description}</p>
        </div>
      </section>
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 py-14">
        {items.length === 0 ? (
          <p className="text-charcoal/60 text-center py-16">More pieces coming soon to this collection.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
