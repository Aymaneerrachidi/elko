export type Category =
  | "Boxer Briefs"
  | "Briefs"
  | "Trunks"
  | "Boxers"
  | "Undershirts"
  | "Tank Tops"
  | "T-Shirts"
  | "Multipacks"
  | "Socks";

export type Fabric =
  | "Premium Cotton"
  | "Modal"
  | "Bamboo"
  | "Performance Mesh"
  | "Cotton Stretch";

export type Size = "S" | "M" | "L" | "XL" | "XXL";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  size?: string;
  fit?: "Runs Small" | "True to Size" | "Runs Large";
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  collection: string;
  fabric: Fabric;
  price: number;
  compareAtPrice?: number;
  colors: ColorOption[];
  sizes: Size[];
  images: string[];
  hoverImage?: string;
  description: string;
  highlights: string[];
  materials: string;
  care: string[];
  badges: Array<"Best Seller" | "New" | "Limited" | "Sale">;
  rating: number;
  reviewCount: number;
  stock: Record<Size, number>;
  reviews: Review[];
}

export interface CollectionInfo {
  slug: string;
  name: string;
  description: string;
  image: string;
}
