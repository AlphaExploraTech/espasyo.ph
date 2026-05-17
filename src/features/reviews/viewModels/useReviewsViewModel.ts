// src/features/reviews/viewModels/useReviewsViewModel.ts
// ViewModel for the Reviews page.

import { useState, useRef, useEffect } from 'react';
import { getReviews } from '../../../shared/models/apiService';
import type { ReviewData } from '../../../shared/models/types';

export const useReviewsViewModel = () => {
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<ReviewData | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const exactScrollPos = useRef(0);

  const reviewData = getReviews();
  const shouldScroll = isAutoPlaying && activeCardId === null && !selectedReview;

  // --- MODAL ANIMATION LOGIC ---
  const openModal = (review: ReviewData) => {
    setSelectedReview(review);
    setTimeout(() => setIsModalVisible(true), 10);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setTimeout(() => setSelectedReview(null), 300);
  };

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedReview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedReview]);

  // --- AUTO-SCROLL LOGIC ---
  useEffect(() => {
    let animationFrameId: number;

    const autoScroll = () => {
      if (scrollRef.current && shouldScroll) {
        if (Math.abs(scrollRef.current.scrollLeft - exactScrollPos.current) > 1) {
          exactScrollPos.current = scrollRef.current.scrollLeft;
        }

        exactScrollPos.current += 0.5;
        scrollRef.current.scrollLeft = exactScrollPos.current;

        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
          exactScrollPos.current = 0;
        }
        animationFrameId = requestAnimationFrame(autoScroll);
      }
    };

    if (shouldScroll) {
      animationFrameId = requestAnimationFrame(autoScroll);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [shouldScroll]);

  const manualScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 640 ? window.innerWidth * 0.85 : 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return {
    isAutoPlaying,
    setIsAutoPlaying,
    activeCardId,
    setActiveCardId,
    selectedReview,
    isModalVisible,
    scrollRef,
    reviewData,
    shouldScroll,
    openModal,
    closeModal,
    manualScroll,
  };
};
