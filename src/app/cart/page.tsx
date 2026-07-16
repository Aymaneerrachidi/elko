"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Tag, Truck } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 50;

export default function CartPage() {
  const lines = useCartStore((s) => s.lines);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeLine = useCartStore((s) => s.removeLine);
  const subtotal = useCartStore((s) => s.subtotal());
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [zip, setZip] = useState("");
  const [shippingEstimate, setShippingEstimate] = useState<string | null>(null);

  const discount = couponApplied ? subtotal * 0.15 : 0;
  const shipping = subtotal - discount >= FREE_SHIPPING_THRESHOLD || lines.length === 0 ? 0 : 6.95;
  const total = subtotal - discount + shipping;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-10 md:py-16">
      <h1 className="font-display text-3xl md:text-5xl mb-10">Your Bag</h1>

      {lines.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-charcoal/60 mb-6">Your bag is empty.</p>
          <Link
            href="/shop"
            className="cursor-pointer inline-block px-8 py-4 rounded-full bg-ink text-paper font-semibold hover:bg-charcoal transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {remaining > 0 && (
              <div className="mb-6 p-4 rounded-xl bg-cream text-sm flex items-center gap-2">
                <Truck size={16} className="text-gold" />
                Spend <span className="font-semibold">{formatPrice(remaining)}</span> more for free shipping.
              </div>
            )}
            <ul className="divide-y divide-line">
              {lines.map((line) => (
                <li key={`${line.productId}-${line.color}-${line.size}`} className="flex gap-5 py-6">
                  <img src={line.image} alt={line.name} className="w-24 h-28 md:w-28 md:h-32 object-cover rounded-xl shrink-0" />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link href={`/product/${line.slug}`} className="font-medium hover:text-gold transition-colors cursor-pointer">
                          {line.name}
                        </Link>
                        <p className="text-sm text-charcoal/60 mt-0.5">
                          {line.color} / {line.size}
                        </p>
                      </div>
                      <p className="font-semibold">{formatPrice(line.price * line.quantity)}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-line rounded-full">
                        <button
                          aria-label="Decrease quantity"
                          className="cursor-pointer p-2 hover:text-gold transition-colors"
                          onClick={() => updateQuantity(line.productId, line.color, line.size, line.quantity - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm">{line.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          className="cursor-pointer p-2 hover:text-gold transition-colors"
                          onClick={() => updateQuantity(line.productId, line.color, line.size, line.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeLine(line.productId, line.color, line.size)}
                        className="cursor-pointer text-xs text-charcoal/50 hover:text-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="sticky top-28 p-6 rounded-2xl border border-line bg-white/40 backdrop-blur-sm">
              <h2 className="font-display text-xl mb-5">Order Summary</h2>

              <div className="flex gap-2 mb-5">
                <div className="flex-1 relative">
                  <Tag size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40" />
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code"
                    className="w-full pl-10 pr-3 py-2.5 text-sm rounded-full border border-line outline-none focus:border-gold"
                  />
                </div>
                <button
                  onClick={() => setCouponApplied(coupon.trim().length > 0)}
                  className="cursor-pointer px-5 py-2.5 rounded-full border border-ink text-sm font-semibold hover:bg-ink hover:text-paper transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponApplied && <p className="text-xs text-gold mb-4">15% discount applied.</p>}

              <div className="flex gap-2 mb-5">
                <input
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="ZIP code for shipping estimate"
                  className="flex-1 px-4 py-2.5 text-sm rounded-full border border-line outline-none focus:border-gold"
                />
                <button
                  onClick={() => setShippingEstimate(zip ? "3–5 business days" : null)}
                  className="cursor-pointer px-5 py-2.5 rounded-full border border-ink text-sm font-semibold hover:bg-ink hover:text-paper transition-colors"
                >
                  Check
                </button>
              </div>
              {shippingEstimate && <p className="text-xs text-charcoal/60 mb-4">Estimated delivery: {shippingEstimate}</p>}

              <div className="space-y-3 py-5 border-y border-line text-sm">
                <div className="flex justify-between">
                  <span className="text-charcoal/70">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-gold">
                    <span>Discount (15%)</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-charcoal/70">Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center py-5">
                <span className="font-medium">Total</span>
                <span className="font-display text-2xl">{formatPrice(total)}</span>
              </div>

              <Link
                href="/checkout"
                className="block text-center cursor-pointer w-full py-4 rounded-full bg-ink text-paper font-semibold hover:bg-charcoal transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
