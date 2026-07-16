"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, Size } from "./types";

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  color: string;
  size: Size;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (product: Product, color: string, size: Size, quantity?: number) => void;
  removeLine: (productId: string, color: string, size: Size) => void;
  updateQuantity: (productId: string, color: string, size: Size, quantity: number) => void;
  clear: () => void;
  subtotal: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      addItem: (product, color, size, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find(
            (l) => l.productId === product.id && l.color === color && l.size === size
          );
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l === existing ? { ...l, quantity: l.quantity + quantity } : l
              ),
              isOpen: true,
            };
          }
          return {
            lines: [
              ...state.lines,
              {
                productId: product.id,
                slug: product.slug,
                name: product.name,
                image: product.images[0],
                price: product.price,
                color,
                size,
                quantity,
              },
            ],
            isOpen: true,
          };
        }),
      removeLine: (productId, color, size) =>
        set((state) => ({
          lines: state.lines.filter(
            (l) => !(l.productId === productId && l.color === color && l.size === size)
          ),
        })),
      updateQuantity: (productId, color, size, quantity) =>
        set((state) => ({
          lines: state.lines.map((l) =>
            l.productId === productId && l.color === color && l.size === size
              ? { ...l, quantity: Math.max(1, quantity) }
              : l
          ),
        })),
      clear: () => set({ lines: [] }),
      subtotal: () => get().lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
      itemCount: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
    }),
    { name: "elko-cart" }
  )
);

interface WishlistState {
  ids: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (productId) =>
        set((state) => ({
          ids: state.ids.includes(productId)
            ? state.ids.filter((id) => id !== productId)
            : [...state.ids, productId],
        })),
      has: (productId) => get().ids.includes(productId),
    }),
    { name: "elko-wishlist" }
  )
);

interface SearchState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useSearchStore = create<SearchState>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

export interface AuthUser {
  name: string;
  email: string;
}

interface AuthState {
  user: AuthUser | null;
  signIn: (email: string, password: string) => { ok: boolean; error?: string };
  signUp: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  signOut: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      signIn: (email, password) => {
        if (!email.trim() || !password.trim()) return { ok: false, error: "Enter your email and password." };
        if (password.length < 6) return { ok: false, error: "Incorrect email or password." };
        const existing = get().user;
        const name = existing && existing.email === email ? existing.name : email.split("@")[0];
        set({ user: { name, email } });
        return { ok: true };
      },
      signUp: (name, email, password) => {
        if (!name.trim() || !email.trim() || !password.trim()) return { ok: false, error: "Fill in every field to continue." };
        if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
        set({ user: { name, email } });
        return { ok: true };
      },
      signOut: () => set({ user: null }),
    }),
    { name: "elko-auth" }
  )
);
