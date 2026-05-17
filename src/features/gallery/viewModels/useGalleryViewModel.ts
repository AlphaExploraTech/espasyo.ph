// src/features/gallery/viewModels/useGalleryViewModel.ts
// ViewModel for the Gallery page.

import { useState, useEffect, useCallback, useRef } from 'react';
import { useGalleryAnimations } from '../../../shared/hooks/useGalleryAnimations';

const INTRO_DURATION_MS = 2300;
const IDLE_TIMEOUT_MS = 2000;

export const useGalleryViewModel = () => {
  const { refs, state } = useGalleryAnimations();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [indicatorVisible, setIndicatorVisible] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-dismiss cream overlay
  useEffect(() => {
    const timer = setTimeout(() => setOverlayVisible(false), INTRO_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  // Show indicator after overlay is gone
  useEffect(() => {
    if (!overlayVisible) {
      const t = setTimeout(() => setIndicatorVisible(true), 400);
      return () => clearTimeout(t);
    }
  }, [overlayVisible]);

  // Idle timer
  const resetIdleTimer = useCallback(() => {
    if (overlayVisible) return;
    setIndicatorVisible(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => setIndicatorVisible(true), IDLE_TIMEOUT_MS);
  }, [overlayVisible]);

  // Global activity listeners
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'touchstart', 'touchmove'] as const;
    const onActivity = () => resetIdleTimer();
    events.forEach(e => window.addEventListener(e, onActivity, { passive: true }));
    return () => {
      events.forEach(e => window.removeEventListener(e, onActivity));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [resetIdleTimer]);

  // Lock body scroll when image selected
  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : '';
  }, [selectedImage]);

  const handleClick = useCallback((src: string) => {
    if (state.isDragging) return;
    setSelectedImage(src);
  }, [state.isDragging]);

  return {
    refs,
    state,
    selectedImage,
    setSelectedImage,
    overlayVisible,
    indicatorVisible,
    handleClick,
  };
};
