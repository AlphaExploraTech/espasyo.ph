// src/shared/utils/testimonialsData.ts
// Categories and utility functions for testimonials (no types - those are in shared/models/types.ts)

export const CATEGORIES = [
  "All",
  "Architecture & Construction",
  "Art & Design",
  "Beauty & Wellness",
  "Consulting",
  "Education",
  "Financial Services",
  "Healthcare",
  "Information Technology",
  "Logistics & Transport",
  "Marketing & Advertising",
  "Real Estate & Property",
  "Retail & General Trade"
];

export const resolvePath = (path: string) => {
  if (!path) return '';
  return path.startsWith('public/') ? path.replace('public/', '/') : path;
};
