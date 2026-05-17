// src/features/testimonials/viewModels/useTestimonialsViewModel.ts
// ViewModel for the Testimonials page (Meet the Community).

import { useState, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { getTestimonials } from '../../../shared/models/apiService';
import type { Business } from '../../../shared/models/types';
import { CATEGORIES } from '../../../shared/utils/testimonialsData';

export const useTestimonialsViewModel = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);

  const allBusinesses = useMemo(() => getTestimonials(), []);

  const filteredBusinesses = useMemo(() => {
    const data = [...allBusinesses].sort((a, b) =>
      a.businessName.localeCompare(b.businessName)
    );

    if (activeCategory === "All") return data;

    return data.filter(b => {
      return b.categories?.includes(activeCategory) || false;
    });
  }, [activeCategory, allBusinesses]);

  const { mediaBusinesses, listBusinesses } = useMemo(() => {
    const media: Business[] = [];
    const list: Business[] = [];

    filteredBusinesses.forEach(b => {
      const m = b.media;
      const hasMedia = m && (m.video || m.image1 || m.image2 || m.image3);
      const hasTestimonial = b.testimonial && b.testimonial.trim().length > 0;
      const hasCustomLogo = b.logo && !b.logo.includes('LOGO.png') && !b.logo.includes('Logo.png') && !b.logo.includes('LogoWhite.jpg');

      if (hasMedia || hasTestimonial || hasCustomLogo) {
        media.push(b);
      } else {
        list.push(b);
      }
    });

    return { mediaBusinesses: media, listBusinesses: list };
  }, [filteredBusinesses]);

  // GSAP entry animation
  useGSAP(() => {
    gsap.fromTo(".gallery-anim-item",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        overwrite: "auto"
      }
    );
  }, { scope: containerRef, dependencies: [activeCategory] });

  return {
    activeCategory,
    setActiveCategory,
    containerRef,
    mediaBusinesses,
    listBusinesses,
    categories: CATEGORIES,
  };
};
