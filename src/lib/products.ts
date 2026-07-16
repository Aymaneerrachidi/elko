import { Product, CollectionInfo, Size } from "./types";
import { productImages, categoryImages } from "./images";

const allSizes: Size[] = ["S", "M", "L", "XL", "XXL"];

const fullStock: Record<Size, number> = { S: 24, M: 40, L: 52, XL: 18, XXL: 6 };
const lowStock: Record<Size, number> = { S: 3, M: 5, L: 2, XL: 0, XXL: 0 };
const mixStock: Record<Size, number> = { S: 12, M: 0, L: 30, XL: 8, XXL: 2 };

const baseReviews = (seed: number) => [
  {
    id: `r${seed}-1`,
    author: "Marcus T.",
    rating: 5,
    title: "Best fit I've owned",
    body: "The waistband doesn't roll and the fabric stays soft after 30+ washes. Worth every penny.",
    date: "2026-05-14",
    verified: true,
    size: "M",
    fit: "True to Size" as const,
  },
  {
    id: `r${seed}-2`,
    author: "James R.",
    rating: 4,
    title: "Great everyday pair",
    body: "Comfortable all day at the office. Sized up once and it was perfect.",
    date: "2026-04-02",
    verified: true,
    size: "L",
    fit: "Runs Small" as const,
  },
  {
    id: `r${seed}-3`,
    author: "Daniel K.",
    rating: 5,
    title: "No more chafing",
    body: "Switched from a big-box brand and the difference in breathability is night and day.",
    date: "2026-03-21",
    verified: true,
    size: "L",
    fit: "True to Size" as const,
  },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "essential-boxer-brief-black",
    name: "Essential Boxer Brief",
    category: "Boxer Briefs",
    collection: "Everyday Collection",
    fabric: "Premium Cotton",
    price: 32,
    compareAtPrice: 42,
    colors: [
      { name: "Black", hex: "#111110" },
      { name: "Charcoal", hex: "#4b4a47" },
      { name: "Navy", hex: "#1f2a3d" },
    ],
    sizes: allSizes,
    images: productImages.essentialBoxerBrief,
    hoverImage: productImages.essentialBoxerBrief[1],
    description:
      "The ELKO Essential Boxer Brief is our signature everyday pair — engineered from a 95% premium cotton and 5% elastane blend for a no-ride-up fit that moves with you. A tagless waistband and flat-lock seams keep the entire experience frictionless from morning to night.",
    highlights: [
      "95% Premium Cotton, 5% Elastane",
      "Tagless comfort waistband",
      "Flat-lock seams, zero chafing",
      "4-way stretch construction",
    ],
    materials: "95% Cotton, 5% Elastane. OEKO-TEX certified dyes.",
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low", "Do not iron print"],
    badges: ["Best Seller"],
    rating: 4.8,
    reviewCount: 1284,
    stock: fullStock,
    reviews: baseReviews(1),
  },
  {
    id: "p2",
    slug: "premium-modal-trunk",
    name: "Premium Modal Trunk",
    category: "Trunks",
    collection: "Luxury Modal Collection",
    fabric: "Modal",
    price: 38,
    colors: [
      { name: "Onyx", hex: "#161513" },
      { name: "Stone", hex: "#a79c8c" },
      { name: "Deep Green", hex: "#2c3b30" },
    ],
    sizes: allSizes,
    images: productImages.premiumModalTrunk,
    hoverImage: productImages.premiumModalTrunk[1],
    description:
      "Cut from ultra-fine Austrian modal, the Premium Modal Trunk delivers a silk-like hand feel with 3x the moisture absorption of cotton. A mid-rise trunk silhouette offers extra coverage without excess fabric — refined, quiet luxury for everyday wear.",
    highlights: [
      "Botanic Modal — silk-soft hand feel",
      "Mid-rise trunk silhouette",
      "Breathable & temperature regulating",
      "Anti-odor treatment",
    ],
    materials: "92% Modal, 8% Spandex.",
    care: ["Machine wash cold", "Do not bleach", "Hang dry recommended", "Cool iron if needed"],
    badges: ["New"],
    rating: 4.9,
    reviewCount: 632,
    stock: fullStock,
    reviews: baseReviews(2),
  },
  {
    id: "p3",
    slug: "cotton-brief-white",
    name: "Cotton Brief",
    category: "Briefs",
    collection: "Everyday Collection",
    fabric: "Premium Cotton",
    price: 26,
    colors: [
      { name: "White", hex: "#f5f4f0" },
      { name: "Black", hex: "#111110" },
      { name: "Grey Marl", hex: "#9a968f" },
    ],
    sizes: allSizes,
    images: productImages.cottonBriefWhite,
    hoverImage: productImages.cottonBriefWhite[1],
    description:
      "A modern take on the classic brief. Structured support with a contoured pouch, finished in combed cotton for a fabric that feels soft from the very first wear — no break-in period required.",
    highlights: [
      "Combed cotton, feels soft immediately",
      "Contoured support pouch",
      "Reinforced waistband",
      "Tagless comfort",
    ],
    materials: "97% Combed Cotton, 3% Elastane.",
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low"],
    badges: [],
    rating: 4.6,
    reviewCount: 891,
    stock: lowStock,
    reviews: baseReviews(3),
  },
  {
    id: "p4",
    slug: "performance-boxer",
    name: "Performance Boxer",
    category: "Boxers",
    collection: "Performance Collection",
    fabric: "Performance Mesh",
    price: 34,
    compareAtPrice: 44,
    colors: [
      { name: "Jet Black", hex: "#0d0d0c" },
      { name: "Steel", hex: "#5b6067" },
    ],
    sizes: allSizes,
    images: productImages.performanceBoxer,
    hoverImage: productImages.performanceBoxer[1],
    description:
      "Built for movement. The Performance Boxer uses a quick-dry, moisture-wicking mesh fabric with 4-way stretch to keep you cool and supported through workouts, travel, or long days on your feet.",
    highlights: [
      "Moisture-wicking performance mesh",
      "4-way stretch, unrestricted movement",
      "Anti-odor antimicrobial finish",
      "Seamless inner thigh panel",
    ],
    materials: "88% Recycled Polyester, 12% Elastane.",
    care: ["Machine wash cold", "Do not bleach", "Hang dry", "Do not iron"],
    badges: ["Best Seller", "Sale"],
    rating: 4.7,
    reviewCount: 445,
    stock: mixStock,
    reviews: baseReviews(4),
  },
  {
    id: "p5",
    slug: "everyday-tank-top",
    name: "Everyday Tank Top",
    category: "Tank Tops",
    collection: "Essentials",
    fabric: "Cotton Stretch",
    price: 28,
    colors: [
      { name: "White", hex: "#f5f4f0" },
      { name: "Black", hex: "#111110" },
      { name: "Heather Grey", hex: "#8c8a86" },
    ],
    sizes: allSizes,
    images: productImages.everydayTankTop,
    hoverImage: productImages.everydayTankTop[1],
    description:
      "A refined ribbed tank built from a heavyweight cotton-stretch jersey. Slim through the body without clinging — designed to layer clean under everything from tailoring to weekend fits.",
    highlights: [
      "Heavyweight ribbed cotton jersey",
      "Slim, tailored fit",
      "Pre-shrunk fabric",
      "Reinforced shoulder seams",
    ],
    materials: "94% Cotton, 6% Elastane.",
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low"],
    badges: [],
    rating: 4.5,
    reviewCount: 210,
    stock: fullStock,
    reviews: baseReviews(5),
  },
  {
    id: "p6",
    slug: "essential-crew-neck",
    name: "Essential Crew Neck",
    category: "Undershirts",
    collection: "Essentials",
    fabric: "Premium Cotton",
    price: 30,
    colors: [
      { name: "White", hex: "#f5f4f0" },
      { name: "Black", hex: "#111110" },
    ],
    sizes: allSizes,
    images: productImages.essentialCrewNeck,
    hoverImage: productImages.essentialCrewNeck[1],
    description:
      "The undershirt reimagined. A precise crew neckline sits invisibly under dress shirts, while a longer body length keeps it tucked through the day. Soft, breathable, and virtually undetectable.",
    highlights: [
      "Low-profile crew neckline",
      "Extended body length, stays tucked",
      "Breathable single-jersey cotton",
      "Fades and shrink resistant",
    ],
    materials: "100% Combed Cotton.",
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low"],
    badges: ["New"],
    rating: 4.7,
    reviewCount: 156,
    stock: fullStock,
    reviews: baseReviews(6),
  },
  {
    id: "p7",
    slug: "bamboo-boxer-brief",
    name: "Bamboo Boxer Brief",
    category: "Boxer Briefs",
    collection: "Luxury Modal Collection",
    fabric: "Bamboo",
    price: 36,
    colors: [
      { name: "Forest", hex: "#2c3b30" },
      { name: "Black", hex: "#111110" },
      { name: "Clay", hex: "#8a5a44" },
    ],
    sizes: allSizes,
    images: productImages.bambooBoxerBrief,
    hoverImage: productImages.bambooBoxerBrief[1],
    description:
      "Sustainably sourced bamboo viscose meets our signature boxer brief cut. Naturally thermoregulating and antibacterial, this pair stays fresh through the hottest days while feeling remarkably light against skin.",
    highlights: [
      "Sustainably sourced bamboo viscose",
      "Naturally antibacterial & thermoregulating",
      "Ultra-lightweight, breathable handfeel",
      "No-ride-up leg bands",
    ],
    materials: "95% Bamboo Viscose, 5% Spandex.",
    care: ["Machine wash cold", "Do not bleach", "Hang dry recommended"],
    badges: ["Limited"],
    rating: 4.9,
    reviewCount: 302,
    stock: lowStock,
    reviews: baseReviews(7),
  },
  {
    id: "p8",
    slug: "signature-multipack-3",
    name: "Signature Multipack (3-Pack)",
    category: "Multipacks",
    collection: "New Collection",
    fabric: "Premium Cotton",
    price: 78,
    compareAtPrice: 96,
    colors: [{ name: "Mixed Black/Charcoal/Navy", hex: "#111110" }],
    sizes: allSizes,
    images: productImages.signatureMultipack,
    hoverImage: productImages.signatureMultipack[1],
    description:
      "Three of our best-selling Essential Boxer Briefs in a curated color trio. The smart way to stock your drawer — same premium cotton blend, same tailored fit, better value.",
    highlights: [
      "3x Essential Boxer Briefs",
      "Curated black / charcoal / navy trio",
      "95% Premium Cotton, 5% Elastane",
      "Best value per pair",
    ],
    materials: "95% Cotton, 5% Elastane.",
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low"],
    badges: ["Best Seller", "Sale"],
    rating: 4.8,
    reviewCount: 974,
    stock: fullStock,
    reviews: baseReviews(8),
  },
];

export const collections: CollectionInfo[] = [
  {
    slug: "new-collection",
    name: "New Collection",
    description: "Fresh drops, engineered with our latest fabric technology.",
    image: productImages.essentialCrewNeck[0],
  },
  {
    slug: "summer-collection",
    name: "Summer Collection",
    description: "Lightweight, breathable essentials built for the heat.",
    image: categoryImages["Tank Tops"],
  },
  {
    slug: "everyday-collection",
    name: "Everyday Collection",
    description: "The foundation of your drawer. Reliable comfort, every day.",
    image: categoryImages["Boxer Briefs"],
  },
  {
    slug: "performance-collection",
    name: "Performance Collection",
    description: "Moisture-wicking, 4-way stretch fabrics for active days.",
    image: categoryImages["Performance"],
  },
  {
    slug: "luxury-modal-collection",
    name: "Luxury Modal Collection",
    description: "Ultra-soft modal and bamboo fibers for elevated comfort.",
    image: productImages.bambooBoxerBrief[0],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4) {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, count);
}

export function getBestSellers() {
  return products.filter((p) => p.badges.includes("Best Seller"));
}

export function getNewArrivals() {
  return products.filter((p) => p.badges.includes("New"));
}
