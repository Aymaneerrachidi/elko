import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — ELKO",
  description: "The terms governing your use of the ELKO website and purchases.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using the ELKO website, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our site.",
  },
  {
    title: "Orders & Payment",
    body: "All orders are subject to acceptance and availability. Prices are listed in USD and may change without notice. We reserve the right to refuse or cancel any order at our discretion, including in cases of suspected fraud.",
  },
  {
    title: "Shipping & Risk of Loss",
    body: "Risk of loss and title for items purchased pass to you upon delivery to the carrier. See our Shipping Info page for delivery estimates.",
  },
  {
    title: "Returns",
    body: "Returns and exchanges are governed by our Returns & Exchanges policy, available on this site.",
  },
  {
    title: "Intellectual Property",
    body: "All content on this site — including text, graphics, logos, and images — is the property of ELKO and protected by applicable intellectual property laws.",
  },
  {
    title: "Limitation of Liability",
    body: "ELKO is not liable for any indirect, incidental, or consequential damages arising from your use of the site or products purchased through it, to the fullest extent permitted by law.",
  },
];

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-16">
      <div className="mb-10">
        <h1 className="font-display text-3xl md:text-5xl mb-3">Terms of Service</h1>
        <p className="text-charcoal/60 text-sm">Last updated July 1, 2026.</p>
      </div>
      <div className="space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-xl mb-2">{s.title}</h2>
            <p className="text-sm text-charcoal/70 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
