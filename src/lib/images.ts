// Product-only photography (flat lays / folded garments / fabric close-ups) — no models wearing
// the items. Every ID below was opened and visually inspected before use.
const u = (id: string, params = "w=1400&q=82&auto=format&fit=crop") =>
  `https://images.unsplash.com/${id}?${params}`;

// --- Verified photo pool -----------------------------------------------------
const FOLDED_STACK = "photo-1504198458649-3128b932f49e"; // black/white/grey folded clothes on a white Eames chair
const FOLDED_SHIRTS_DARK = "photo-1548768041-2fceab4c0b85"; // folded shirts stacked, moody dark background
const KNIT_WAISTBAND = "photo-1715269291637-d3c5859fffec"; // folded knit fabric with waistband elastic, blue/tan/cream
const FABRIC_FOLDS = "photo-1593250816874-8edf4f732edb"; // dark navy fabric macro folds
const BOXER_ON_LINE = "photo-1601393709771-3938c63d41a6"; // black boxer brief on a washing line, outdoor light

export const heroImage = u(KNIT_WAISTBAND, "w=2000&q=85&auto=format&fit=crop");
export const heroImageMobile = u(KNIT_WAISTBAND, "w=1200&q=80&auto=format&fit=crop");

export const editorial = {
  aboutHero: u(FOLDED_STACK, "w=2000&q=85&auto=format&fit=crop"),
  aboutStory1: u(FOLDED_SHIRTS_DARK),
  aboutStory2: u(KNIT_WAISTBAND),
  fabricCloseup: u(FABRIC_FOLDS, "w=1600&q=85&auto=format&fit=crop"),
  contactHero: u(FABRIC_FOLDS, "w=2000&q=85&auto=format&fit=crop"),
};

// Per-product image sets — product-only shots, reused deliberately across items rather than
// forcing more unique photos than the free-stock pool has for this specific product category.
export const productImages = {
  essentialBoxerBrief: [u(BOXER_ON_LINE), u(FOLDED_STACK), u(FABRIC_FOLDS)],
  premiumModalTrunk: [u(KNIT_WAISTBAND), u(FOLDED_STACK), u(FABRIC_FOLDS)],
  cottonBriefWhite: [u(FOLDED_STACK), u(KNIT_WAISTBAND), u(FABRIC_FOLDS)],
  performanceBoxer: [u(KNIT_WAISTBAND), u(BOXER_ON_LINE), u(FABRIC_FOLDS)],
  everydayTankTop: [u(FOLDED_SHIRTS_DARK), u(FOLDED_STACK), u(FABRIC_FOLDS)],
  essentialCrewNeck: [u(FOLDED_SHIRTS_DARK), u(FOLDED_STACK), u(FABRIC_FOLDS)],
  bambooBoxerBrief: [u(BOXER_ON_LINE), u(KNIT_WAISTBAND), u(FOLDED_STACK)],
  signatureMultipack: [u(FOLDED_STACK), u(FOLDED_SHIRTS_DARK), u(BOXER_ON_LINE), u(FABRIC_FOLDS)],
};

export const categoryImages: Record<string, string> = {
  "Boxer Briefs": u(BOXER_ON_LINE),
  Briefs: u(KNIT_WAISTBAND),
  Trunks: u(FOLDED_STACK),
  Boxers: u(BOXER_ON_LINE),
  Undershirts: u(FOLDED_SHIRTS_DARK),
  "Tank Tops": u(FOLDED_STACK),
  Multipacks: u(FOLDED_STACK),
  Performance: u(KNIT_WAISTBAND),
};

export const lifestyle = [
  u(FOLDED_STACK),
  u(FOLDED_SHIRTS_DARK),
  u(KNIT_WAISTBAND),
  u(FABRIC_FOLDS),
  u(BOXER_ON_LINE),
];

export const instagramPosts = [
  u(FOLDED_STACK, "w=600&q=80&auto=format&fit=crop"),
  u(FOLDED_SHIRTS_DARK, "w=600&q=80&auto=format&fit=crop"),
  u(KNIT_WAISTBAND, "w=600&q=80&auto=format&fit=crop"),
  u(BOXER_ON_LINE, "w=600&q=80&auto=format&fit=crop"),
  u(FABRIC_FOLDS, "w=600&q=80&auto=format&fit=crop"),
  u(FOLDED_STACK, "w=600&q=80&auto=format&fit=crop"),
];

export const avatars = [
  u("photo-1500648767791-00dcc994a43e", "w=200&q=80&auto=format&fit=crop"),
  u("photo-1507003211169-0a1dd7228f2d", "w=200&q=80&auto=format&fit=crop"),
  u("photo-1590086782792-42dd2350140d", "w=200&q=80&auto=format&fit=crop"),
  u("photo-1669277752825-d7c26a392b4d", "w=200&q=80&auto=format&fit=crop"),
  u("photo-1500648767791-00dcc994a43e", "w=200&q=80&auto=format&fit=crop"),
];
