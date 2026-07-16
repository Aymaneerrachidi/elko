import type { Metadata } from "next";
import { RotateCcw, ShieldCheck, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Returns & Exchanges — ELKO",
  description: "ELKO's 60-day free returns policy and 365-day quality guarantee.",
};

export default function ReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-10 md:py-16">
      <div className="mb-10">
        <h1 className="font-display text-3xl md:text-5xl mb-3">Returns & Exchanges</h1>
        <p className="text-charcoal/60">Free, easy, and backed by our 365-day quality guarantee.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-14">
        <div className="p-6 rounded-2xl bg-cream">
          <RotateCcw size={22} className="text-gold mb-3" strokeWidth={1.5} />
          <p className="font-medium text-sm mb-1.5">60-Day Free Returns</p>
          <p className="text-charcoal/60 text-xs leading-relaxed">
            Unworn items with tags attached qualify for a full refund within 60 days of delivery.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-cream">
          <ShieldCheck size={22} className="text-gold mb-3" strokeWidth={1.5} />
          <p className="font-medium text-sm mb-1.5">365-Day Quality Guarantee</p>
          <p className="text-charcoal/60 text-xs leading-relaxed">
            If a defect appears in normal wear within a year, we&apos;ll replace it — no questions asked.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-cream">
          <Mail size={22} className="text-gold mb-3" strokeWidth={1.5} />
          <p className="font-medium text-sm mb-1.5">Start a Return</p>
          <p className="text-charcoal/60 text-xs leading-relaxed">
            Sign in to your account and select the order, or email support@elko.com with your order number.
          </p>
        </div>
      </div>

      <div className="space-y-6 text-sm text-charcoal/70 leading-relaxed">
        <div>
          <h2 className="font-display text-xl text-ink mb-2">How Returns Work</h2>
          <p>
            Start a return from your account&apos;s Orders tab, or contact support with your order number. We&apos;ll
            email a prepaid return label — drop the package at any carrier location. Refunds are issued to your
            original payment method within 5–7 business days of us receiving the return.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-ink mb-2">Exchanges</h2>
          <p>
            Need a different size or color? Select &ldquo;Exchange&rdquo; instead of &ldquo;Refund&rdquo; when starting your
            return, and we&apos;ll ship the replacement as soon as the original is scanned by the carrier — no need to
            wait for it to arrive back at our warehouse.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-ink mb-2">Final Sale Items</h2>
          <p>Multipacks and items marked &ldquo;Final Sale&rdquo; at checkout are not eligible for return or exchange.</p>
        </div>
      </div>
    </div>
  );
}
