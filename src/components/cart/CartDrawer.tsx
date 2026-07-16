"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { products } from "@/lib/products";

const FREE_SHIPPING_THRESHOLD = 50;

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const lines = useCartStore((s) => s.lines);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeLine = useCartStore((s) => s.removeLine);
  const subtotal = useCartStore((s) => s.subtotal());

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const upsell = products.find((p) => !lines.some((l) => l.productId === p.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-paper z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between p-5 border-b border-line">
              <p className="font-display text-xl">Your Bag ({lines.reduce((s, l) => s + l.quantity, 0)})</p>
              <button aria-label="Close cart" onClick={close} className="cursor-pointer p-2">
                <X size={22} />
              </button>
            </div>

            <div className="px-5 py-4 border-b border-line">
              {remaining > 0 ? (
                <p className="text-sm mb-2">
                  Spend <span className="font-semibold text-gold">{formatPrice(remaining)}</span> more for free shipping
                </p>
              ) : (
                <p className="text-sm mb-2 text-gold font-medium">You&apos;ve unlocked free shipping!</p>
              )}
              <div className="h-1.5 rounded-full bg-line overflow-hidden">
                <motion.div
                  className="h-full bg-gold"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingBag size={40} className="text-charcoal/30" />
                  <p className="text-charcoal/60">Your bag is empty.</p>
                  <button
                    onClick={close}
                    className="cursor-pointer px-6 py-3 rounded-full bg-ink text-paper text-sm font-semibold hover:bg-charcoal transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-5">
                  {lines.map((line) => (
                    <li key={`${line.productId}-${line.color}-${line.size}`} className="flex gap-4">
                      <img
                        src={line.image}
                        alt={line.name}
                        className="w-20 h-24 object-cover rounded-lg shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              href={`/product/${line.slug}`}
                              onClick={close}
                              className="font-medium text-sm hover:text-gold transition-colors cursor-pointer"
                            >
                              {line.name}
                            </Link>
                            <p className="text-xs text-charcoal/60 mt-0.5">
                              {line.color} / {line.size}
                            </p>
                          </div>
                          <p className="font-medium text-sm shrink-0">{formatPrice(line.price * line.quantity)}</p>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-line rounded-full">
                            <button
                              aria-label="Decrease quantity"
                              className="cursor-pointer p-1.5 hover:text-gold transition-colors"
                              onClick={() => updateQuantity(line.productId, line.color, line.size, line.quantity - 1)}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center text-sm">{line.quantity}</span>
                            <button
                              aria-label="Increase quantity"
                              className="cursor-pointer p-1.5 hover:text-gold transition-colors"
                              onClick={() => updateQuantity(line.productId, line.color, line.size, line.quantity + 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            className="cursor-pointer text-xs text-charcoal/50 hover:text-red-600 transition-colors"
                            onClick={() => removeLine(line.productId, line.color, line.size)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {lines.length > 0 && upsell && (
                <div className="mt-8 pt-6 border-t border-line">
                  <p className="text-xs tracking-widest text-charcoal/50 mb-3">YOU MIGHT ALSO LIKE</p>
                  <Link
                    href={`/product/${upsell.slug}`}
                    onClick={close}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    <img src={upsell.images[0]} alt={upsell.name} className="w-14 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="text-sm font-medium group-hover:text-gold transition-colors">{upsell.name}</p>
                      <p className="text-xs text-charcoal/60">{formatPrice(upsell.price)}</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {lines.length > 0 && (
              <div className="p-5 border-t border-line space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-charcoal/70">Subtotal</span>
                  <span className="font-semibold text-base">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-charcoal/50">Shipping and taxes calculated at checkout.</p>
                <Link
                  href="/checkout"
                  onClick={close}
                  className="block text-center cursor-pointer w-full py-3.5 rounded-full bg-ink text-paper font-semibold hover:bg-charcoal transition-colors"
                >
                  Checkout
                </Link>
                <Link
                  href="/cart"
                  onClick={close}
                  className="block text-center cursor-pointer w-full py-3 text-sm font-medium hover:text-gold transition-colors"
                >
                  View Bag
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
