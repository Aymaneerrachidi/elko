import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — ELKO",
  description: "How ELKO uses cookies and how to manage your preferences.",
};

const cookieTypes = [
  { name: "Essential", desc: "Required for core site functions like your shopping bag and checkout. Cannot be disabled." },
  { name: "Preference", desc: "Remembers choices like grid/list view and recently viewed items." },
  { name: "Analytics", desc: "Helps us understand site traffic and usage patterns to improve the shopping experience." },
  { name: "Marketing", desc: "Used to personalize offers and measure the performance of our campaigns." },
];

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-16">
      <div className="mb-10">
        <h1 className="font-display text-3xl md:text-5xl mb-3">Cookie Policy</h1>
        <p className="text-charcoal/60 text-sm">Last updated July 1, 2026.</p>
      </div>

      <p className="text-sm text-charcoal/70 leading-relaxed mb-10">
        ELKO uses cookies and similar technologies to run our site, remember your preferences, and understand how the
        site is used. You can manage non-essential cookies through your browser settings at any time.
      </p>

      <div className="space-y-5">
        {cookieTypes.map((c) => (
          <div key={c.name} className="flex gap-4 py-4 border-b border-line last:border-0">
            <p className="font-medium text-sm w-32 shrink-0">{c.name}</p>
            <p className="text-sm text-charcoal/60">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
