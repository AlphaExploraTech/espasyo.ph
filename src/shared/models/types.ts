// src/shared/models/types.ts
// All TypeScript interfaces — NO React code here.

export interface Media {
  video: string;
  image1: string;
  image2: string;
  image3: string;
}

export interface Links {
  website: string;
  facebook: string;
  instagram?: string;
  email?: string;
  phone?: string;
  address?: string;
  office?: string;
  contactPerson?: string;
  LinkedIn?: string;
  LinkedI?: string;
  mail?: string;
  [key: string]: string | undefined;
}

export interface Business {
  id: number;
  isFounder: boolean;
  businessName: string;
  industry: string[];
  services: string[];
  categories?: string[];
  links: Links;
  testimonial: string;
  media: Media;
  logo: string;
  placeholderImage?: string;
}

export interface TestimonialItem {
  id: string | number;
  isFounder: boolean;
  businessName: string;
  industry: string[];
  services: string[];
  categories?: string[];
  links?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    LinkedIn?: string;
  };
  testimonial: string;
  media?: {
    video?: string;
    image1?: string;
    image2?: string;
    image3?: string;
  };
  placeholderImage?: string;
  src: string;
  isPlaceholder?: boolean;
}

export interface ContactFormState {
  firstName: string;
  lastName: string;
  email: string;
  inquiryType: string;
  message: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  provider: string;
  providerLink?: string;
  bgText: string;
  image: string;
  description: string;
  services: {
    title: string;
    items: string[];
  }[];
}

export interface GalleryItem {
  id: number;
  src: string;
}

export interface EventData {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
}

export interface PartnerArticle {
  category: string;
  business: string;
  title: string;
  excerpt: string;
  image: string;
}

export interface ReviewData {
  user: string;
  statement: string;
}
