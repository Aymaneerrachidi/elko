"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, CreditCard, Check } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

type PaymentMethod = "card" | "paypal" | "apple" | "google";

export default function CheckoutPage() {
  const lines = useCartStore((s) => s.lines);
  const subtotal = useCartStore((s) => s.subtotal());
  const clear = useCartStore((s) => s.clear);
  const router = useRouter();

  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);

  const shipping = subtotal >= 50 || lines.length === 0 ? 0 : 6.95;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      setPlaced(true);
      clear();
    }, 1200);
  };

  if (placed) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-6">
          <Check size={28} className="text-gold" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl mb-4">Order Confirmed</h1>
        <p className="text-charcoal/60 mb-8">
          Thank you for shopping with ELKO. A confirmation email with your order details and tracking information is
          on its way.
        </p>
        <button
          onClick={() => router.push("/shop")}
          className="cursor-pointer px-8 py-4 rounded-full bg-ink text-paper font-semibold hover:bg-charcoal transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-24 text-center">
        <p className="text-charcoal/60 mb-6">Your bag is empty — add something before checking out.</p>
        <button
          onClick={() => router.push("/shop")}
          className="cursor-pointer px-8 py-4 rounded-full bg-ink text-paper font-semibold hover:bg-charcoal transition-colors"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-10 md:py-16">
      <h1 className="font-display text-3xl md:text-5xl mb-2">Checkout</h1>
      <p className="text-charcoal/60 mb-10 flex items-center gap-1.5 text-sm">
        <Lock size={14} /> Secure, encrypted checkout
      </p>

      <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="font-display text-xl mb-4">Contact</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required type="email" placeholder="Email address" className="px-4 py-3 rounded-xl border border-line outline-none focus:border-gold sm:col-span-2" />
              <label className="flex items-center gap-2 text-sm sm:col-span-2 text-charcoal/60">
                <input type="checkbox" defaultChecked className="accent-black" /> Email me with news and offers
              </label>
            </div>
            <p className="text-xs text-charcoal/50 mt-2">Checking out as guest — no account required.</p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-4">Shipping Address</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="First name" className="px-4 py-3 rounded-xl border border-line outline-none focus:border-gold" />
              <input required placeholder="Last name" className="px-4 py-3 rounded-xl border border-line outline-none focus:border-gold" />
              <input required placeholder="Address" className="px-4 py-3 rounded-xl border border-line outline-none focus:border-gold sm:col-span-2" />
              <input placeholder="Apartment, suite, etc. (optional)" className="px-4 py-3 rounded-xl border border-line outline-none focus:border-gold sm:col-span-2" />
              <input required placeholder="City" className="px-4 py-3 rounded-xl border border-line outline-none focus:border-gold" />
              <input required placeholder="ZIP code" className="px-4 py-3 rounded-xl border border-line outline-none focus:border-gold" />
              <input required placeholder="Country" defaultValue="United States" className="px-4 py-3 rounded-xl border border-line outline-none focus:border-gold" />
              <input required placeholder="Phone" className="px-4 py-3 rounded-xl border border-line outline-none focus:border-gold" />
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl mb-4">Payment</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {(
                [
                  { id: "card", label: "Credit Card" },
                  { id: "paypal", label: "PayPal" },
                  { id: "apple", label: "Apple Pay" },
                  { id: "google", label: "Google Pay" },
                ] as { id: PaymentMethod; label: string }[]
              ).map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setPayment(m.id)}
                  className={`cursor-pointer py-3 rounded-xl border text-xs font-semibold transition-colors ${
                    payment === m.id ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            {payment === "card" && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative sm:col-span-2">
                  <CreditCard size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40" />
                  <input required placeholder="Card number" className="w-full pl-10 pr-4 py-3 rounded-xl border border-line outline-none focus:border-gold" />
                </div>
                <input required placeholder="MM / YY" className="px-4 py-3 rounded-xl border border-line outline-none focus:border-gold" />
                <input required placeholder="CVC" className="px-4 py-3 rounded-xl border border-line outline-none focus:border-gold" />
              </div>
            )}
            {payment !== "card" && (
              <p className="text-sm text-charcoal/60 p-4 rounded-xl bg-cream">
                You&apos;ll be redirected to complete payment securely after placing your order.
              </p>
            )}
          </section>

          <button
            type="submit"
            disabled={placing}
            className="cursor-pointer w-full py-4 rounded-full bg-ink text-paper font-semibold hover:bg-charcoal transition-colors disabled:opacity-60"
          >
            {placing ? "Placing Order…" : `Place Order — ${formatPrice(total)}`}
          </button>
        </div>

        <div>
          <div className="sticky top-28 p-6 rounded-2xl border border-line bg-white/40 backdrop-blur-sm">
            <h2 className="font-display text-xl mb-5">Order Summary</h2>
            <ul className="space-y-4 mb-5">
              {lines.map((line) => (
                <li key={`${line.productId}-${line.color}-${line.size}`} className="flex gap-3">
                  <div className="relative shrink-0">
                    <img src={line.image} alt={line.name} className="w-14 h-16 object-cover rounded-lg" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-charcoal text-white text-[10px] flex items-center justify-center">
                      {line.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{line.name}</p>
                    <p className="text-xs text-charcoal/60">{line.color} / {line.size}</p>
                  </div>
                  <p className="text-sm font-medium">{formatPrice(line.price * line.quantity)}</p>
                </li>
              ))}
            </ul>
            <div className="space-y-3 py-5 border-y border-line text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal/70">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/70">Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/70">Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center py-5">
              <span className="font-medium">Total</span>
              <span className="font-display text-2xl">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
