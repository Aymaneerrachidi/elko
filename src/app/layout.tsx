import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import SearchOverlay from "@/components/search/SearchOverlay";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ELKO — Engineered for Comfort, Designed for Confidence",
  description:
    "Premium men's underwear essentials crafted with the softest fabrics. Boxer briefs, trunks, briefs, and everyday essentials engineered for comfort and confidence.",
  metadataBase: new URL("https://elko.app"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  openGraph: {
    title: "ELKO — Premium Men's Essentials",
    description:
      "Premium men's underwear essentials crafted with the softest fabrics.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 360, alt: "ELKO" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ELKO — Premium Men's Essentials",
    description:
      "Premium men's underwear essentials crafted with the softest fabrics.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <div className="grain-overlay" aria-hidden />
        <AnnouncementBar />
        <Header />
        <main className="flex-1 relative z-0">{children}</main>
        <Footer />
        <CartDrawer />
        <SearchOverlay />
      </body>
    </html>
  );
}
