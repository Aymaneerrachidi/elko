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
  metadataBase: new URL("https://elko.example.com"),
  openGraph: {
    title: "ELKO — Premium Men's Essentials",
    description:
      "Premium men's underwear essentials crafted with the softest fabrics.",
    type: "website",
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
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <SearchOverlay />
      </body>
    </html>
  );
}
