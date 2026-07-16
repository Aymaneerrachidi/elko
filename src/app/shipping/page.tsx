import type { Metadata } from "next";
import { Truck, Clock, Globe, PackageCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping Info — ELKO",
  description: "Shipping rates, delivery times, and order tracking for ELKO orders.",
};

const rates = [
  { method: "Standard Shipping", time: "3–5 business days", cost: "Free on orders $50+, otherwise $6.95" },
  { method: "Express Shipping", time: "1–2 business days", cost: "$14.95" },
  { method: "International", time: "7–14 business days", cost: "Calculated at checkout" },
];

const steps = [
  { icon: PackageCheck, title: "Order Placed", desc: "You'll receive a confirmation email immediately." },
  { icon: Clock, title: "Processed in 1 Business Day", desc: "Orders placed before 2pm ET ship the same day." },
  { icon: Truck, title: "On Its Way", desc: "Tracking details are emailed as soon as your order ships." },
  { icon: Globe, title: "Delivered", desc: "Sign-free delivery to your door or mailbox." },
];

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-16">
      <div className="mb-10">
        <h1 className="font-display text-3xl md:text-5xl mb-3">Shipping Info</h1>
        <p className="text-charcoal/60">Everything you need to know about getting your order.</p>
      </div>

      <div className="overflow-x-auto mb-14">
        <table className="w-full text-sm min-w-[480px]">
          <thead>
            <tr className="border-b border-line text-left text-charcoal/50 text-xs tracking-wide">
              <th className="py-3">METHOD</th>
              <th className="py-3">DELIVERY TIME</th>
              <th className="py-3">COST</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((r) => (
              <tr key={r.method} className="border-b border-line/60">
                <td className="py-4 font-medium">{r.method}</td>
                <td className="py-4 text-charcoal/70">{r.time}</td>
                <td className="py-4 text-charcoal/70">{r.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {steps.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="text-center md:text-left">
            <Icon size={22} className="text-gold mb-3 mx-auto md:mx-0" strokeWidth={1.5} />
            <p className="font-medium text-sm mb-1">{title}</p>
            <p className="text-charcoal/55 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
