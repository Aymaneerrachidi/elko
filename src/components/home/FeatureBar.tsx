import { Truck, RefreshCw, Leaf, ShieldCheck, Lock } from "lucide-react";

const features = [
  { icon: Truck, label: "Free Shipping" },
  { icon: RefreshCw, label: "Easy Returns" },
  { icon: Leaf, label: "Premium Fabrics" },
  { icon: ShieldCheck, label: "365-Day Guarantee" },
  { icon: Lock, label: "Secure Checkout" },
];

export default function FeatureBar() {
  return (
    <section className="border-b border-line bg-paper">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 py-6 flex flex-wrap items-center justify-center md:justify-between gap-x-10 gap-y-4">
        {features.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2.5 text-charcoal">
            <Icon size={18} className="text-gold" strokeWidth={1.75} />
            <span className="text-xs md:text-sm font-medium tracking-wide">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
