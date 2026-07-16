import type { Metadata } from "next";
import { Ruler } from "lucide-react";

export const metadata: Metadata = {
  title: "Size Guide — ELKO",
  description: "Find your perfect ELKO fit with our detailed size chart and fit recommendations.",
};

const sizeChart = [
  { size: "S", waist: "28-30\"", hip: "34-36\"", weight: "130-155 lbs" },
  { size: "M", waist: "31-33\"", hip: "37-39\"", weight: "155-175 lbs" },
  { size: "L", waist: "34-36\"", hip: "40-42\"", weight: "175-195 lbs" },
  { size: "XL", waist: "37-39\"", hip: "43-45\"", weight: "195-220 lbs" },
  { size: "XXL", waist: "40-42\"", hip: "46-48\"", weight: "220-245 lbs" },
];

const fitNotes = [
  { title: "Boxer Briefs & Trunks", note: "True to size. Size up for a more relaxed leg opening." },
  { title: "Briefs", note: "True to size. Our contoured pouch means most customers don't size up." },
  { title: "Boxers", note: "Runs slightly loose by design — order your usual size." },
  { title: "Undershirts & Tanks", note: "True to size for a slim fit; size up for a relaxed fit." },
];

export default function SizeGuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-16">
      <div className="mb-10">
        <h1 className="font-display text-3xl md:text-5xl mb-3">Size Guide</h1>
        <p className="text-charcoal/60">Measurements in inches. When between sizes, we recommend sizing up for comfort.</p>
      </div>

      <div className="overflow-x-auto mb-12">
        <table className="w-full text-sm min-w-[480px]">
          <thead>
            <tr className="border-b border-line text-left text-charcoal/50 text-xs tracking-wide">
              <th className="py-3">SIZE</th>
              <th className="py-3">WAIST</th>
              <th className="py-3">HIP</th>
              <th className="py-3">WEIGHT</th>
            </tr>
          </thead>
          <tbody>
            {sizeChart.map((row) => (
              <tr key={row.size} className="border-b border-line/60">
                <td className="py-4 font-medium">{row.size}</td>
                <td className="py-4 text-charcoal/70">{row.waist}</td>
                <td className="py-4 text-charcoal/70">{row.hip}</td>
                <td className="py-4 text-charcoal/70">{row.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-2 mb-5">
          <Ruler size={18} className="text-gold" />
          <h2 className="font-display text-xl">Fit Notes by Style</h2>
        </div>
        <div className="space-y-4">
          {fitNotes.map((f) => (
            <div key={f.title} className="flex gap-4 py-3 border-b border-line last:border-0">
              <p className="font-medium text-sm w-44 shrink-0">{f.title}</p>
              <p className="text-sm text-charcoal/60">{f.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-cream">
        <h3 className="font-medium text-sm mb-2">How to Measure</h3>
        <p className="text-sm text-charcoal/60 leading-relaxed">
          Waist: measure around your natural waistline, keeping the tape comfortably loose. Hip: measure around the
          fullest part of your hips. Still unsure? Our support team is happy to help — reach out via the{" "}
          <a href="/contact" className="underline underline-offset-4 hover:text-gold transition-colors">
            contact page
          </a>
          .
        </p>
      </div>
    </div>
  );
}
