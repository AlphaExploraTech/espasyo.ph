// src/shared/models/apiService.ts
// All API/data fetching functions — NO React code here.

import type { ContactFormState, Business, ReviewData } from './types';
import testimonialsJson from '../../data/testimonials.json';
import reviewsJson from '../../data/reviews.json';

/**
 * Submit the contact form to the server API.
 */
export const submitContactForm = async (formData: ContactFormState): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || 'Something went wrong. Please try again.');
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unexpected error occurred.';
    return { success: false, error: message };
  }
};

/**
 * Load all testimonials (businesses) from the local JSON data.
 */
export const getTestimonials = (): Business[] => {
  return testimonialsJson as Business[];
};

/**
 * Load all reviews from the local JSON data.
 */
export const getReviews = (): ReviewData[] => {
  return reviewsJson as ReviewData[];
};
