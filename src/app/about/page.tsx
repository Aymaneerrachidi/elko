import type { Metadata } from "next";
import { Leaf, Recycle, HandHeart, Factory } from "lucide-react";
import { editorial, lifestyle } from "@/lib/images";

export const metadata: Metadata = {
  title: "About — ELKO",
  description: "The story, mission, and craftsmanship behind ELKO's premium men's essentials.",
};

const timeline = [
  { year: "2019", title: "The Idea", desc: "Founded on a simple frustration — the everyday underwear market hadn't evolved in decades." },
  { year: "2020", title: "First Fabric Lab", desc: "Partnered with mills in Portugal to develop our signature premium cotton blend." },
  { year: "2022", title: "10,000 Customers", desc: "Word of mouth alone brought us to five figures of loyal, repeat customers." },
  { year: "2024", title: "Modal & Bamboo Lines", desc: "Expanded into sustainably sourced modal and bamboo viscose fabrics." },
  { year: "2026", title: "100,000+ Customers", desc: "Now trusted by men in over 30 countries for their everyday essentials." },
];

const values = [
  { icon: Leaf, title: "Sustainability", desc: "Low-impact dyes, responsibly sourced fibers, and minimal packaging waste." },
  { icon: Factory, title: "Premium Manufacturing", desc: "Small-batch production with mills we've partnered with for years, not months." },
  { icon: HandHeart, title: "Ethical Sourcing", desc: "Fair-wage certified factories audited twice yearly by independent bodies." },
  { icon: Recycle, title: "Built to Last", desc: "Designed for hundreds of washes — fewer replacements, less waste." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img
          src={editorial.aboutHero}
          alt="ELKO founders and craftsmanship"
          className="w-full h-full object-cover"
          style={{ objectPosition: "50% 25%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-[1600px] mx-auto">
          <p className="text-gold text-xs tracking-[0.3em] mb-3">OUR STORY</p>
          <h1 className="font-display text-white text-4xl md:text-6xl max-w-2xl text-balance">
            Quiet Confidence, Engineered Daily.
          </h1>
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-5 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div>
          <h2 className="font-display text-3xl md:text-4xl mb-6 text-balance">
            The best essentials should never be an afterthought.
          </h2>
          <p className="text-charcoal/70 leading-relaxed mb-4">
            ELKO was founded on the belief that what men wear closest to their skin deserves the same care and
            precision as any other piece in their wardrobe. We started with a single question — why does everyday
            underwear feel like an afterthought? — and spent two years testing fabrics before shipping our first pair.
          </p>
          <p className="text-charcoal/70 leading-relaxed">
            Today, every ELKO piece goes through the same rigorous process: fabric sourcing, fit testing across
            hundreds of body types, and a 60-wash durability test before it ever reaches a customer.
          </p>
        </div>
        <div className="rounded-2xl overflow-hidden aspect-[4/5]">
          <img src={lifestyle[1]} alt="ELKO craftsmanship detail" className="w-full h-full object-cover" />
        </div>
      </section>

      <section id="sustainability" className="bg-cream py-20 md:py-28 scroll-mt-24">
        <div className="max-w-[1600px] mx-auto px-5 md:px-8">
          <h2 className="font-display text-3xl md:text-5xl mb-14 text-center">Sustainability & Ethics</h2>
          <div className="grid md:grid-cols-2 md:gap-x-16 max-w-4xl mx-auto">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-5 py-6 border-b border-line last:border-b-0 md:[&:nth-last-child(2)]:border-b-0"
              >
                <span className="shrink-0 w-11 h-11 rounded-full bg-white/70 flex items-center justify-center">
                  <Icon size={19} className="text-gold" strokeWidth={1.5} />
                </span>
                <div className="text-left">
                  <p className="font-medium text-[15px] mb-1">{title}</p>
                  <p className="text-charcoal/55 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-5 md:px-8 py-20 md:py-28">
        <h2 className="font-display text-3xl md:text-5xl mb-14 text-center">Our Journey</h2>
        <div className="max-w-2xl mx-auto space-y-10 relative before:absolute before:left-[27px] before:top-2 before:bottom-2 before:w-px before:bg-line">
          {timeline.map((item) => (
            <div key={item.year} className="flex gap-6 relative">
              <div className="w-14 h-14 shrink-0 rounded-full bg-ink text-paper flex items-center justify-center font-display text-xs z-10">
                {item.year}
              </div>
              <div className="pt-2">
                <p className="font-medium mb-1">{item.title}</p>
                <p className="text-sm text-charcoal/60 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
