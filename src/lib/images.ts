/** Verified Unsplash URLs (404s removed) */

export const siteImages = {
  hero: {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=85&auto=format&fit=crop",
    alt: "Bright, immaculate modern living room after a professional clean",
  },
  livingRoom: {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&auto=format&fit=crop",
    alt: "Spotless open-plan living area with natural light",
  },
  kitchen: {
    src: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&q=85&auto=format&fit=crop",
    alt: "Pristine white kitchen with gleaming countertops",
  },
  bathroom: {
    src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=85&auto=format&fit=crop",
    alt: "Sparkling modern bathroom",
  },
  bedroom: {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85&auto=format&fit=crop",
    alt: "Freshly made bed in a tidy bedroom",
  },
  laundry: {
    src: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1200&q=85&auto=format&fit=crop",
    alt: "Neatly folded laundry in a clean home",
  },
  standardClean: {
    src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=85&auto=format&fit=crop",
    alt: "Minimalist clean interior space",
  },
  deepClean: {
    src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=85&auto=format&fit=crop",
    alt: "Professional deep cleaning with detail work",
  },
  professional: {
    src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=85&auto=format&fit=crop",
    alt: "Professional cleaner caring for a home",
  },
  dining: {
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85&auto=format&fit=crop",
    alt: "Elegant dining area ready for guests",
  },
  steamClean: {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85&auto=format&fit=crop",
    alt: "Steam cleaning surfaces for a sanitized finish",
  },
} as const;

export const galleryImages = [
  { ...siteImages.livingRoom, caption: "Living spaces" },
  { ...siteImages.kitchen, caption: "Kitchens" },
  { ...siteImages.bathroom, caption: "Bathrooms" },
  { ...siteImages.bedroom, caption: "Bedrooms" },
  { ...siteImages.deepClean, caption: "Deep cleans" },
  { ...siteImages.steamClean, caption: "Steam treatment" },
] as const;

export const reviewImages = [
  siteImages.livingRoom,
  siteImages.kitchen,
  siteImages.bathroom,
  siteImages.bedroom,
  siteImages.deepClean,
  siteImages.steamClean,
] as const;
