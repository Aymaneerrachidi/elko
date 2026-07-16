"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Heart, MapPin, CreditCard, RotateCcw, Settings, Gift, Star, LogOut } from "lucide-react";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/store";
import AuthForm from "@/components/account/AuthForm";

const tabs = [
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "payment", label: "Payment Methods", icon: CreditCard },
  { id: "returns", label: "Returns", icon: RotateCcw },
  { id: "loyalty", label: "Loyalty & Referrals", icon: Gift },
  { id: "settings", label: "Settings", icon: Settings },
];

const mockOrders = [
  { id: "ELKO-10482", date: "2026-07-02", status: "Delivered", total: 78, items: [products[7]] },
  { id: "ELKO-10221", date: "2026-06-14", status: "In Transit", total: 66, items: [products[0], products[2]] },
  { id: "ELKO-09876", date: "2026-05-01", status: "Delivered", total: 34, items: [products[3]] },
];

export default function AccountPage() {
  const [tab, setTab] = useState("orders");
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  if (!user) return <AuthForm />;

  return (
    <div className="max-w-[1400px] mx-auto px-5 md:px-8 py-10 md:py-16">
      <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs tracking-widest text-gold mb-2">WELCOME BACK, {user.name.toUpperCase()}</p>
          <h1 className="font-display text-3xl md:text-5xl">My Account</h1>
        </div>
        <button
          onClick={signOut}
          className="cursor-pointer flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full border border-line hover:border-ink transition-colors"
        >
          <LogOut size={15} /> Sign Out
        </button>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-10">
        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-colors",
                tab === id ? "bg-ink text-paper" : "hover:bg-cream"
              )}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </nav>

        <div>
          {tab === "orders" && (
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="p-5 rounded-2xl border border-line">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-xs text-charcoal/50">Placed on {order.date}</p>
                    </div>
                    <span
                      className={cn(
                        "text-xs font-semibold px-3 py-1.5 rounded-full",
                        order.status === "Delivered" ? "bg-gold/15 text-gold" : "bg-charcoal/10 text-charcoal"
                      )}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    {order.items.map((p) => (
                      <img key={p.id} src={p.images[0]} alt={p.name} className="w-14 h-16 object-cover rounded-lg" />
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-charcoal/60">Total</span>
                    <span className="font-semibold">{formatPrice(order.total)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "wishlist" && (
            <div className="p-8 rounded-2xl border border-line text-center">
              <p className="text-charcoal/60 mb-4">Manage your saved items on the wishlist page.</p>
              <Link href="/wishlist" className="cursor-pointer text-sm font-semibold underline underline-offset-4 hover:text-gold transition-colors">
                Go to Wishlist
              </Link>
            </div>
          )}

          {tab === "addresses" && (
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-line">
                <p className="text-xs tracking-widest text-charcoal/50 mb-2">DEFAULT SHIPPING</p>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-charcoal/70">128 Madison Ave, Apt 4B<br />New York, NY 10016</p>
              </div>
              <button className="cursor-pointer p-5 rounded-2xl border border-dashed border-line text-sm font-medium hover:border-gold hover:text-gold transition-colors">
                + Add New Address
              </button>
            </div>
          )}

          {tab === "payment" && (
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-line flex items-center justify-between">
                <div>
                  <p className="font-medium">Visa •••• 4242</p>
                  <p className="text-xs text-charcoal/50">Expires 08/28</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gold/15 text-gold">Default</span>
              </div>
              <button className="cursor-pointer p-5 rounded-2xl border border-dashed border-line text-sm font-medium hover:border-gold hover:text-gold transition-colors">
                + Add Payment Method
              </button>
            </div>
          )}

          {tab === "returns" && (
            <div className="p-8 rounded-2xl border border-line text-center">
              <p className="text-charcoal/60 mb-4">No active returns. Start one from an order in the Orders tab.</p>
            </div>
          )}

          {tab === "loyalty" && (
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-line">
                <div className="flex items-center gap-2 mb-2">
                  <Star size={16} className="text-gold fill-gold" />
                  <p className="font-medium">1,240 Points</p>
                </div>
                <p className="text-sm text-charcoal/60">Redeemable for $12.40 off your next order.</p>
              </div>
              <div className="p-5 rounded-2xl border border-line">
                <p className="font-medium mb-2">Referral Program</p>
                <p className="text-sm text-charcoal/60 mb-3">Share your code and both of you get $10.</p>
                <div className="flex items-center gap-2">
                  <input readOnly value="ELKO-ALEX10" className="flex-1 px-3 py-2 rounded-full border border-line text-sm bg-cream" />
                  <button className="cursor-pointer px-4 py-2 rounded-full bg-ink text-paper text-xs font-semibold">Copy</button>
                </div>
              </div>
            </div>
          )}

          {tab === "settings" && (
            <div className="space-y-4 max-w-md">
              <input placeholder="Full name" defaultValue={user.name} className="w-full px-4 py-3 rounded-xl border border-line outline-none focus:border-gold" />
              <input placeholder="Email" defaultValue={user.email} className="w-full px-4 py-3 rounded-xl border border-line outline-none focus:border-gold" />
              <button className="cursor-pointer px-6 py-3 rounded-full bg-ink text-paper text-sm font-semibold hover:bg-charcoal transition-colors">
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
