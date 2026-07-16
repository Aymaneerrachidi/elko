"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { InstagramIcon, FacebookIcon, XIcon, YoutubeIcon } from "@/components/ui/SocialIcons";

const columns = [
  {
    title: "Shop",
    links: [
      { name: "Boxer Briefs", href: "/shop?category=Boxer Briefs" },
      { name: "Trunks", href: "/shop?category=Trunks" },
      { name: "Briefs", href: "/shop?category=Briefs" },
      { name: "Multipacks", href: "/shop?category=Multipacks" },
      { name: "New Arrivals", href: "/shop?badge=new" },
    ],
  },
  {
    title: "Customer Support",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "Size Guide", href: "/size-guide" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Returns & Exchanges", href: "/returns" },
      { name: "FAQ", href: "/contact#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About ELKO", href: "/about" },
      { name: "Sustainability", href: "/about#sustainability" },
      { name: "Our Fabrics", href: "/#fabrics" },
      { name: "Account", href: "/account" },
      { name: "Wishlist", href: "/wishlist" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="bg-ink text-paper">
      <div className="max-w-[1600px] mx-auto px-5 md:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-12 pb-16 border-b border-white/10">
          <div>
            <p className="font-display text-3xl tracking-[0.18em] mb-4">ELKO</p>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-6">
              Premium everyday essentials engineered for comfort and designed for confidence.
            </p>
            <div className="flex items-center gap-3">
              {[InstagramIcon, FacebookIcon, XIcon, YoutubeIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-gold hover:text-gold transition-colors cursor-pointer"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs tracking-widest text-white/50 mb-4">{col.title.toUpperCase()}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className="text-sm text-white/80 hover:text-gold transition-colors cursor-pointer">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-10 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display text-xl mb-1">Get 15% Off Your First Order</p>
            <p className="text-white/60 text-sm">Sign up for exclusive drops, restocks, and offers.</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubmitted(true);
            }}
            className="flex w-full md:w-auto gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 md:w-72 bg-white/5 border border-white/15 rounded-full px-5 py-3 text-sm outline-none focus:border-gold transition-colors placeholder:text-white/40"
            />
            <button
              type="submit"
              className="cursor-pointer shrink-0 w-12 h-12 rounded-full bg-gold text-ink flex items-center justify-center hover:bg-gold-light transition-colors"
              aria-label="Subscribe"
            >
              <ArrowRight size={18} />
            </button>
          </form>
          {submitted && <p className="text-gold text-xs">Thanks — check your inbox for your code.</p>}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">© 2026 ELKO. All rights reserved.</p>
          <div className="flex items-center gap-3 text-white/50 text-xs">
            <span className="px-3 py-1.5 rounded border border-white/15">VISA</span>
            <span className="px-3 py-1.5 rounded border border-white/15">Mastercard</span>
            <span className="px-3 py-1.5 rounded border border-white/15">Amex</span>
            <span className="px-3 py-1.5 rounded border border-white/15">Apple Pay</span>
            <span className="px-3 py-1.5 rounded border border-white/15">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
