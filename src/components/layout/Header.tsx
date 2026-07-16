"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore, useWishlistStore, useSearchStore } from "@/lib/store";
import { collections, products } from "@/lib/products";

const categories = [
  { name: "Boxer Briefs", slug: "boxer-briefs" },
  { name: "Briefs", slug: "briefs" },
  { name: "Trunks", slug: "trunks" },
  { name: "Boxers", slug: "boxers" },
  { name: "Undershirts", slug: "undershirts" },
  { name: "Multipacks", slug: "multipacks" },
];

const navLinks = [
  { name: "Shop", href: "/shop" },
  { name: "New Arrivals", href: "/shop?badge=new" },
  { name: "Best Sellers", href: "/shop?badge=best-seller" },
  { name: "Collections", href: "/collections" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const isHome = pathname === "/";

  const cartCount = useCartStore((s) => s.itemCount());
  const cartOpen = useCartStore((s) => s.open);
  const wishlistCount = useWishlistStore((s) => s.ids.length);
  const openSearch = useSearchStore((s) => s.open);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== prevPath.current) {
      prevPath.current = pathname;
      setMobileOpen(false);
      setMegaOpen(false);
    }
  }, [pathname]);

  const transparent = isHome && !scrolled && !mobileOpen;

  return (
    <div className="contents">
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 bg-paper/95 backdrop-blur-md text-ink shadow-[0_1px_0_0_rgba(0,0,0,0.06)] ${
        scrolled ? "top-0" : "top-9"
      } ${
        transparent
          ? "md:bg-transparent md:text-paper md:shadow-none"
          : ""
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            aria-label="Open menu"
            className="lg:hidden cursor-pointer p-2 -ml-2"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>

          <Link
            href="/"
            className="font-display text-2xl md:text-[28px] tracking-[0.18em] font-semibold select-none"
          >
            ELKO
          </Link>

          <nav className="hidden lg:flex items-center gap-9 text-[13px] font-medium tracking-wide uppercase">
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <Link href="/shop" className="flex items-center gap-1 py-8 cursor-pointer hover:opacity-70 transition-opacity">
                Shop <ChevronDown size={14} />
              </Link>
              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full w-[720px] bg-paper text-ink rounded-2xl shadow-2xl border border-line p-8 grid grid-cols-3 gap-8"
                  >
                    <div className="col-span-1">
                      <p className="text-[11px] text-charcoal/60 mb-4 tracking-widest">SHOP BY CATEGORY</p>
                      <ul className="space-y-3">
                        {categories.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/shop?category=${encodeURIComponent(c.name)}`}
                              className="text-sm normal-case hover:text-gold transition-colors cursor-pointer"
                            >
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="col-span-1">
                      <p className="text-[11px] text-charcoal/60 mb-4 tracking-widest">COLLECTIONS</p>
                      <ul className="space-y-3">
                        {collections.slice(0, 5).map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/collections/${c.slug}`}
                              className="text-sm normal-case hover:text-gold transition-colors cursor-pointer"
                            >
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={`/product/${products[0].slug}`}
                      className="col-span-1 relative rounded-xl overflow-hidden group cursor-pointer"
                    >
                      <img
                        src={products[0].images[0]}
                        alt={products[0].name}
                        className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="relative p-4 flex flex-col justify-end h-full min-h-[180px]">
                        <p className="text-white text-xs tracking-widest mb-1">BEST SELLER</p>
                        <p className="text-white font-display text-lg">{products[0].name}</p>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-8 cursor-pointer hover:opacity-70 transition-opacity"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              aria-label="Search"
              className="p-2 md:p-2.5 cursor-pointer hover:opacity-70 transition-opacity"
              onClick={openSearch}
            >
              <Search size={20} />
            </button>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="p-2 md:p-2.5 relative cursor-pointer hover:opacity-70 transition-opacity"
            >
              <Heart size={20} />
              {mounted && wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-gold text-[10px] leading-4 text-center text-ink font-semibold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              href="/account"
              aria-label="Account"
              className="p-2 md:p-2.5 hidden sm:inline-flex cursor-pointer hover:opacity-70 transition-opacity"
            >
              <User size={20} />
            </Link>
            <button
              aria-label={mounted ? `Shopping bag, ${cartCount} items` : "Shopping bag"}
              className="p-2 md:p-2.5 relative cursor-pointer hover:opacity-70 transition-opacity"
              onClick={cartOpen}
            >
              <ShoppingBag size={20} />
              {mounted && cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-gold text-[10px] leading-4 text-center text-ink font-semibold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>

    {/* Mobile drawer — outside header so z-index works at root level */}
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-paper text-ink z-50 lg:hidden overflow-y-auto"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between p-5 border-b border-line">
              <span className="font-display text-xl tracking-[0.18em] font-semibold">ELKO</span>
              <button
                aria-label="Close menu"
                className="p-2 cursor-pointer"
                onClick={() => setMobileOpen(false)}
              >
                <X size={22} />
              </button>
            </div>
            <nav className="p-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-3.5 text-base border-b border-line cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/account" className="py-3.5 text-base border-b border-line cursor-pointer">
                Account
              </Link>
              <Link href="/wishlist" className="py-3.5 text-base cursor-pointer">
                Wishlist
              </Link>
            </nav>
            <div className="p-5">
              <p className="text-[11px] tracking-widest text-charcoal/60 mb-3">SHOP BY CATEGORY</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/shop?category=${encodeURIComponent(c.name)}`}
                    className="text-sm py-2 px-3 rounded-lg bg-cream cursor-pointer"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </div>
  );
}
