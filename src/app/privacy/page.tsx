import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ELKO",
  description: "How ELKO collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "Information We Collect",
    body: "We collect information you provide directly — name, email, shipping address, and payment details at checkout — along with basic browsing data (pages viewed, device type) to improve our site.",
  },
  {
    title: "How We Use Your Information",
    body: "Your information is used to process orders, provide customer support, send order updates, and — if you opt in — share news about new drops and offers. We never sell your personal data to third parties.",
  },
  {
    title: "Cookies",
    body: "We use cookies to keep items in your cart, remember your preferences, and understand how visitors use our site. See our Cookie Policy for details on managing cookie preferences.",
  },
  {
    title: "Data Security",
    body: "Payment information is processed through PCI-compliant providers and is never stored on our servers. We use industry-standard encryption for all data in transit.",
  },
  {
    title: "Your Rights",
    body: "You can request a copy of your data, ask us to correct or delete it, or unsubscribe from marketing emails at any time via your account settings or by contacting support@elko.com.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-16">
      <div className="mb-10">
        <h1 className="font-display text-3xl md:text-5xl mb-3">Privacy Policy</h1>
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
