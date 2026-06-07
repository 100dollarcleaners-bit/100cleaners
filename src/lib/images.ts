/** Curated Unsplash stock — clean homes & spaces (free to use per Unsplash license) */

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
    src: "https://images.unsplash.com/photo-1600566753190-17f63baa83a6?w=1200&q=85&auto=format&fit=crop",
    alt: "Sparkling modern bathroom",
  },
  bedroom: {
    src: "https://images.unsplash.com/photo-1616598332085-ef8e22778f0e?w=1200&q=85&auto=format&fit=crop",
    alt: "Freshly made bed in a tidy bedroom",
  },
  laundry: {
    src: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=1200&q=85&auto=format&fit=crop",
    alt: "Neatly folded laundry in a clean home",
  },
  standardClean: {
    src: "https://images.unsplash.com/photo-1527515637465-c67071dc8268?w=1200&q=85&auto=format&fit=crop",
    alt: "Minimalist clean interior space",
  },
  deepClean: {
    src: "https://images.unsplash.com/photo-1628177142898-93eaa8a406c2?w=1200&q=85&auto=format&fit=crop",
    alt: "Professional deep cleaning with steam and detail work",
  },
  professional: {
    src: "https://images.unsplash.com/photo-1581578731548-236343684e51?w=1200&q=85&auto=format&fit=crop",
    alt: "Professional cleaner caring for a home",
  },
  dining: {
    src: "https://images.unsplash.com/photo-1600210492486-724fe994c213?w=1200&q=85&auto=format&fit=crop",
    alt: "Elegant dining area ready for guests",
  },
  office: {
    src: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=85&auto=format&fit=crop",
    alt: "Organized home office after cleaning",
  },
  hallway: {
    src: "https://images.unsplash.com/photo-1600573472592-401b289b3589?w=1200&q=85&auto=format&fit=crop",
    alt: "Bright hallway with polished floors",
  },
  closet: {
    src: "https://images.unsplash.com/photo-1631889993956-57b469626765?w=1200&q=85&auto=format&fit=crop",
    alt: "Organized closet and tidy storage",
  },
  steamClean: {
    src: "https://images.unsplash.com/photo-1563458043571-854ab91c8c6b?w=1200&q=85&auto=format&fit=crop",
    alt: "Steam cleaning surfaces for a sanitized finish",
  },
  tiles: {
    src: "https://images.unsplash.com/photo-1604709177223-079f86541791?w=1200&q=85&auto=format&fit=crop",
    alt: "Gleaming tile and grout after deep cleaning",
  },
} as const;

export const galleryImages = [
  { ...siteImages.livingRoom, caption: "Living spaces" },
  { ...siteImages.kitchen, caption: "Kitchens" },
  { ...siteImages.bathroom, caption: "Bathrooms" },
  { ...siteImages.deepClean, caption: "Deep cleans" },
  { ...siteImages.bedroom, caption: "Bedrooms" },
  { ...siteImages.steamClean, caption: "Steam treatment" },
  { ...siteImages.dining, caption: "Dining areas" },
  { ...siteImages.tiles, caption: "Tile & grout" },
  { ...siteImages.office, caption: "Home offices" },
  { ...siteImages.hallway, caption: "Floors & details" },
  { ...siteImages.closet, caption: "Organization" },
  { ...siteImages.standardClean, caption: "Every detail" },
] as const;

export const reviewImages = [
  siteImages.livingRoom,
  siteImages.kitchen,
  siteImages.deepClean,
  siteImages.bathroom,
  siteImages.bedroom,
  siteImages.steamClean,
] as const;
